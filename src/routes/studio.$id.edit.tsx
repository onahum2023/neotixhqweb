import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
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
import { getFieldNote, upsertFieldNote } from "@/lib/field-notes.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/studio/$id/edit")({
  component: EditNote,
});

function EditNote() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const get = useServerFn(getFieldNote);
  const upsert = useServerFn(upsertFieldNote);
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["studio", "field-note", id],
    queryFn: () => get({ data: { id } }),
  });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState<"draft" | "published">("draft");

  useEffect(() => {
    if (data?.note) {
      setTitle(data.note.title);
      setSlug(data.note.slug);
      setCategory(data.note.category);
      setExcerpt(data.note.excerpt ?? "");
      setBody(data.note.body ?? "");
      setStatus(data.note.status);
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: () =>
      upsert({
        data: { id, title, slug, category, excerpt, body, status },
      }),
    onSuccess: () => {
      toast.success("Note saved");
      qc.invalidateQueries({ queryKey: ["studio", "field-notes"] });
      qc.invalidateQueries({ queryKey: ["studio", "field-note", id] });
      qc.invalidateQueries({ queryKey: ["field-notes", "published"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Save failed"),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (error) return <p className="text-sm text-destructive">{error instanceof Error ? error.message : "Error"}</p>;

  return (
    <div className="max-w-3xl">
      <Link to="/studio" className="text-xs text-muted-foreground hover:text-foreground">
        ← All notes
      </Link>
      <h1 className="mt-3 text-2xl font-semibold tracking-tight">Edit Field Note</h1>

      <form onSubmit={handleSubmit} className="mt-10 space-y-6">
        <Field label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
        </Field>
        <Field label="Slug">
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            pattern="[a-z0-9]+(-[a-z0-9]+)*"
          />
        </Field>
        <Field label="Category">
          <Input value={category} onChange={(e) => setCategory(e.target.value)} required maxLength={80} />
        </Field>
        <Field label="Excerpt">
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} maxLength={500} />
        </Field>
        <Field label="Body (markdown)">
          <Textarea value={body} onChange={(e) => setBody(e.target.value)} rows={16} className="font-mono text-sm" />
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
            {mutation.isPending ? "Saving…" : "Save changes"}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate({ to: "/studio" })}>
            Done
          </Button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
