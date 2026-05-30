import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const upsertSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(slugRegex, "Slug must be lowercase letters, numbers, and hyphens"),
  title: z.string().min(1).max(200),
  category: z.string().min(1).max(80),
  excerpt: z.string().max(500).default(""),
  body: z.string().max(50_000).default(""),
  status: z.enum(["draft", "published"]),
});

async function requireAdmin(supabase: ReturnType<typeof createServerSupabase>, userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

type ServerSupabase = Awaited<ReturnType<typeof requireSupabaseAuth.server>> extends never
  ? never
  : never;
function createServerSupabase() {
  return null as never;
}

// Public — list published notes
export const listPublishedFieldNotes = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await supabaseAdmin
    .from("field_notes")
    .select("id, slug, title, category, excerpt, published_at")
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
      .select("id, slug, title, category, excerpt, body, published_at")
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
    const { supabase, userId } = context;
    await requireAdmin(supabase as never, userId);
    const { data, error } = await supabaseAdmin
      .from("field_notes")
      .select("id, slug, title, category, status, updated_at, published_at")
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
    const { supabase, userId } = context;
    await requireAdmin(supabase as never, userId);
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
    const { supabase, userId } = context;
    await requireAdmin(supabase as never, userId);

    const payload = {
      slug: data.slug,
      title: data.title,
      category: data.category,
      excerpt: data.excerpt,
      body: data.body,
      status: data.status,
      author_id: userId,
      published_at:
        data.status === "published" ? new Date().toISOString() : null,
    };

    if (data.id) {
      // preserve original published_at when already published
      if (data.status === "published") {
        const { data: existing } = await supabaseAdmin
          .from("field_notes")
          .select("published_at, status")
          .eq("id", data.id)
          .maybeSingle();
        if (existing?.status === "published" && existing.published_at) {
          payload.published_at = existing.published_at;
        }
      }
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
    const { supabase, userId } = context;
    await requireAdmin(supabase as never, userId);
    const { error } = await supabaseAdmin
      .from("field_notes")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
