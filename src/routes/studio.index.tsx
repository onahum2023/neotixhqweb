import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  listAllFieldNotes,
  deleteFieldNote,
  setFieldNoteStatus,
} from "@/lib/field-notes.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/studio/")({
  component: StudioIndex,
});

function StudioIndex() {
  const navigate = useNavigate();
  const list = useServerFn(listAllFieldNotes);
  const del = useServerFn(deleteFieldNote);
  const qc = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["studio", "field-notes"],
    queryFn: () => list(),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Note deleted");
      qc.invalidateQueries({ queryKey: ["studio", "field-notes"] });
      qc.invalidateQueries({ queryKey: ["field-notes", "published"] });
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Field Notes</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">All notes</h1>
        </div>
        <Button onClick={() => navigate({ to: "/studio/new" })}>New note</Button>
      </div>

      <div className="mt-10 rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : error ? (
          <div className="p-8 text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load"}
          </div>
        ) : !data?.notes.length ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No notes yet. Create your first one.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-border/40 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3 font-medium">Title</th>
                <th className="text-left px-5 py-3 font-medium">Category</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Updated</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.notes.map((n) => (
                <tr key={n.id} className="hover:bg-border/20">
                  <td className="px-5 py-4">
                    <Link to="/studio/$id/edit" params={{ id: n.id }} className="font-medium hover:underline">
                      {n.title}
                    </Link>
                    <div className="text-xs text-muted-foreground mt-0.5">{n.slug}</div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground">{n.category}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        n.status === "published"
                          ? "text-xs uppercase tracking-[0.15em] text-emerald-400"
                          : "text-xs uppercase tracking-[0.15em] text-muted-foreground"
                      }
                    >
                      {n.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground text-xs">
                    {new Date(n.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${n.title}"?`)) deleteMutation.mutate(n.id);
                      }}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
