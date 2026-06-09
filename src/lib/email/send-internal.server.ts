import * as React from "react";
import { render } from "@react-email/components";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { TEMPLATES } from "@/lib/email-templates/registry";

const SITE_NAME = "context-engine-hub";
const SENDER_DOMAIN = "notify.neotixhq.com";
const FROM_DOMAIN = "neotixhq.com";

function redactEmail(email: string | null | undefined): string {
  if (!email) return "***";
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) return "***";
  return `${localPart[0]}***@${domain}`;
}

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export type EnqueueResult =
  | { success: true; queued: true; messageId: string }
  | { success: false; reason: "email_suppressed" | "template_not_found" | "failed"; error?: string };

export async function enqueueTemplateEmail(args: {
  templateName: string;
  recipientEmail?: string;
  idempotencyKey?: string;
  templateData?: Record<string, any>;
}): Promise<EnqueueResult> {
  const { templateName, templateData = {} } = args;
  const messageId = crypto.randomUUID();
  const idempotencyKey = args.idempotencyKey || messageId;

  const template = TEMPLATES[templateName];
  if (!template) {
    console.error("Template not found", { templateName });
    return { success: false, reason: "template_not_found", error: `Template '${templateName}' not found` };
  }

  const effectiveRecipient = template.to || args.recipientEmail;
  if (!effectiveRecipient) {
    return { success: false, reason: "failed", error: "recipientEmail is required" };
  }

  const normalizedEmail = effectiveRecipient.toLowerCase();

  // Suppression check
  const { data: suppressed, error: suppressionError } = await supabaseAdmin
    .from("suppressed_emails")
    .select("id")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (suppressionError) {
    console.error("Suppression check failed", { error: suppressionError });
    return { success: false, reason: "failed", error: "Failed to verify suppression status" };
  }

  if (suppressed) {
    await supabaseAdmin.from("email_send_log").insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: "suppressed",
    });
    return { success: false, reason: "email_suppressed" };
  }

  // Unsubscribe token
  let unsubscribeToken: string;
  const { data: existingToken, error: tokenLookupError } = await supabaseAdmin
    .from("email_unsubscribe_tokens")
    .select("token, used_at")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (tokenLookupError) {
    console.error("Token lookup failed", { error: tokenLookupError });
    return { success: false, reason: "failed", error: "Failed to prepare email" };
  }

  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token;
  } else if (!existingToken) {
    unsubscribeToken = generateToken();
    const { error: tokenError } = await supabaseAdmin
      .from("email_unsubscribe_tokens")
      .upsert(
        { token: unsubscribeToken, email: normalizedEmail },
        { onConflict: "email", ignoreDuplicates: true },
      );
    if (tokenError) {
      console.error("Failed to create unsubscribe token", { error: tokenError });
      return { success: false, reason: "failed", error: "Failed to prepare email" };
    }
    const { data: storedToken, error: reReadError } = await supabaseAdmin
      .from("email_unsubscribe_tokens")
      .select("token")
      .eq("email", normalizedEmail)
      .maybeSingle();
    if (reReadError || !storedToken) {
      return { success: false, reason: "failed", error: "Failed to confirm unsubscribe token" };
    }
    unsubscribeToken = storedToken.token;
  } else {
    return { success: false, reason: "email_suppressed" };
  }

  // Render
  const element = React.createElement(template.component, templateData);
  const html = await render(element);
  const plainText = await render(element, { plainText: true });
  const resolvedSubject =
    typeof template.subject === "function" ? template.subject(templateData) : template.subject;

  await supabaseAdmin.from("email_send_log").insert({
    message_id: messageId,
    template_name: templateName,
    recipient_email: effectiveRecipient,
    status: "pending",
  });

  const { error: enqueueError } = await supabaseAdmin.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject: resolvedSubject,
      html,
      text: plainText,
      purpose: "transactional",
      label: templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  });

  if (enqueueError) {
    console.error("Failed to enqueue email", { error: enqueueError });
    await supabaseAdmin.from("email_send_log").insert({
      message_id: messageId,
      template_name: templateName,
      recipient_email: effectiveRecipient,
      status: "failed",
      error_message: "Failed to enqueue email",
    });
    return { success: false, reason: "failed", error: "Failed to enqueue email" };
  }

  console.log("Transactional email enqueued", {
    templateName,
    recipient_redacted: redactEmail(effectiveRecipient),
  });

  return { success: true, queued: true, messageId };
}
