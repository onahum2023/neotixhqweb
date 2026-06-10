import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(slugRegex, "Slug must be lowercase letters, numbers, and hyphens"),
  title: z.string().min(1).max(200),
  category: z.string().min(1).max(80),
  excerpt: z.string().max(500).default(""),
  body: z.string().max(50_000).default(""),
  status: z.enum(["draft", "published"]),
  external_url: z
    .string()
    .trim()
    .max(2000)
    .url()
    .optional()
    .or(z.literal("").transform(() => undefined)),
  source: z.string().trim().max(80).optional().or(z.literal("").transform(() => undefined)),
});

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

// Public — list published notes
export const listPublishedFieldNotes = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("field_notes")
    .select("id, slug, title, category, excerpt, published_at, external_url, source")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return { notes: data ?? [] };
});

// Public — get one published note by slug
export const getPublishedFieldNote = createServerFn({ method: "GET" })
  .inputValidator((input: { slug: string }) =>
    z.object({ slug: z.string().min(1).max(120) }).parse(input),
  )
  .handler(async ({ data }) => {
    const { data: note, error } = await supabaseAdmin
      .from("field_notes")
      .select("id, slug, title, category, excerpt, body, published_at, external_url, source")
      .eq("status", "published")
      .eq("slug", data.slug)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { note };
  });

// Admin — list all
export const listAllFieldNotes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("field_notes")
      .select("id, slug, title, category, status, updated_at, published_at, external_url, source")
      .order("updated_at", { ascending: false });
    if (error) throw new Error(error.message);
    return { notes: data ?? [] };
  });

// Admin — get one by id
export const getFieldNote = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { data: note, error } = await supabaseAdmin
      .from("field_notes")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!note) throw new Error("Not found");
    return { note };
  });

// Admin — upsert
export const upsertFieldNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => upsertSchema.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);

    let publishedAt: string | null =
      data.status === "published" ? new Date().toISOString() : null;

    if (data.id && data.status === "published") {
      const { data: existing } = await supabaseAdmin
        .from("field_notes")
        .select("published_at, status")
        .eq("id", data.id)
        .maybeSingle();
      if (existing?.status === "published" && existing.published_at) {
        publishedAt = existing.published_at;
      }
    }

    const payload = {
      slug: data.slug,
      title: data.title,
      category: data.category,
      excerpt: data.excerpt,
      body: data.body,
      status: data.status,
      external_url: data.external_url ?? null,
      source: data.source ?? null,
      author_id: context.userId,
      published_at: publishedAt,
    };

    if (data.id) {
      const { data: updated, error } = await supabaseAdmin
        .from("field_notes")
        .update(payload)
        .eq("id", data.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return { note: updated };
    }

    const { data: inserted, error } = await supabaseAdmin
      .from("field_notes")
      .insert(payload)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return { note: inserted };
  });

// Admin — delete
export const deleteFieldNote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) =>
    z.object({ id: z.string().uuid() }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("field_notes").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Admin — set status
export const setFieldNoteStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: "draft" | "published" }) =>
    z
      .object({ id: z.string().uuid(), status: z.enum(["draft", "published"]) })
      .parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const patch: { status: "draft" | "published"; published_at?: string | null } = {
      status: data.status,
    };
    if (data.status === "published") {
      const { data: existing } = await supabaseAdmin
        .from("field_notes")
        .select("published_at")
        .eq("id", data.id)
        .maybeSingle();
      patch.published_at = existing?.published_at ?? new Date().toISOString();
    } else {
      patch.published_at = null;
    }
    const { error } = await supabaseAdmin
      .from("field_notes")
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
