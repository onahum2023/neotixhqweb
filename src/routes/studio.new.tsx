import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { upsertFieldNote } from "@/lib/field-notes.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/studio/new")({
  component: NewNote,
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 120);
}

function NewNote() {
  const navigate = useNavigate();
  const upsert = useServerFn(upsertFieldNote);
  const qc = useQueryClient();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState("AI & Work");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [externalUrl, setExternalUrl] = useState("");
  const [source, setSource] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  const mutation = useMutation({
    mutationFn: (input: {
      title: string;
      slug: string;
      category: string;
      excerpt: string;
      body: string;
      external_url?: string;
      source?: string;
      status: "draft" | "published";
    }) => upsert({ data: input }),
    onSuccess: () => {
      toast.success("Note created");
      qc.invalidateQueries({ queryKey: ["studio", "field-notes"] });
      qc.invalidateQueries({ queryKey: ["field-notes", "published"] });
      navigate({ to: "/studio" });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      title,
      slug: slug || slugify(title),
      category,
      excerpt,
      body,
      external_url: externalUrl.trim() || undefined,
      source: source.trim() || undefined,
      status,
    });
  };

  return (
    <div className="max-w-3xl">
      <Link to="/studio" className="text-xs text-muted-foreground hover:text-foreground">
        ← All notes
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">New Field Note</h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <Field label="Title">
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (!slugTouched) setSlug(slugify(e.target.value));
            }}
            required
            maxLength={200}
          />
        </Field>
        <Field label="Slug" hint="URL-friendly identifier (lowercase, hyphens).">
          <Input
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
          />
        </Field>
        <Field label="Category">
          <Input value={category} onChange={(e) => setCategory(e.target.value)} required maxLength={80} />
        </Field>
        <Field label="Excerpt" hint="Short summary shown on the home page.">
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} maxLength={500} />
        </Field>
        <Field label="Body (markdown)" hint="Leave empty if you're sharing an external link below.">
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={16} className="font-mono text-sm" />
        </Field>
        <Field label="External URL" hint="Optional — link to a post on LinkedIn, Substack, etc. When set, the listing links out directly.">
          <Input
            type="url"
            value={externalUrl}
            onChange={(e) => setExternalUrl(e.target.value)}
            placeholder="https://www.linkedin.com/posts/..."
            maxLength={2000}
          />
        </Field>
        <Field label="Source" hint="Optional label shown on cards (e.g., LinkedIn, Substack).">
          <Input value={source} onChange={(e) => setSource(e.target.value)} maxLength={80} placeholder="LinkedIn" />
        </Field>
        <Field label="Status">
          <Select value={status} onValueChange={(v) => setStatus(v as "draft" | "published")}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="published">Published</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <div className="flex gap-3">
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saving…" : "Save note"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate({ to: "/studio" })}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
      {hint ? <p className="mt-1 text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
