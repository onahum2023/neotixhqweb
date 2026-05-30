import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import {
  listContactMessages,
  setContactMessageStatus,
  deleteContactMessage,
} from "@/lib/contact.functions";

type StatusFilter = "all" | "new" | "read" | "replied";
type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
};

export const Route = createFileRoute("/studio/inbox")({
  component: InboxPage,
});

function InboxPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [active, setActive] = useState<Message | null>(null);

  const list = useServerFn(listContactMessages);
  const setStatusFn = useServerFn(setContactMessageStatus);
  const del = useServerFn(deleteContactMessage);
  const qc = useQueryClient();

  const queryKey = useMemo(
    () => ["studio", "inbox", { search, status }] as const,
    [search, status],
  );

  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: () => list({ data: { search, status } }),
  });

  const invalidate = () => qc.invalidateQueries({ queryKey: ["studio", "inbox"] });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: "new" | "read" | "replied" }) =>
      setStatusFn({ data: vars }),
    onSuccess: () => invalidate(),
    onError: (e) => toast.error(e instanceof Error ? e.message : "Update failed"),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => del({ data: { id } }),
    onSuccess: () => {
      toast.success("Message deleted");
      setActive(null);
      invalidate();
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Delete failed"),
  });

  const openMessage = (m: Message) => {
    setActive(m);
    if (m.status === "new") {
      statusMutation.mutate({ id: m.id, status: "read" });
    }
  };

  const reply = (m: Message) => {
    const subject = encodeURIComponent(`Re: your message to NeotixHQ`);
    const body = encodeURIComponent(
      `Hi ${m.name.split(" ")[0] || m.name},\n\n\n\n— NeotixHQ\n\n---\nOn ${new Date(
        m.created_at,
      ).toLocaleString()}, you wrote:\n${m.message}`,
    );
    window.location.href = `mailto:${m.email}?subject=${subject}&body=${body}`;
    statusMutation.mutate({ id: m.id, status: "replied" });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">Inbox</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight">Contact messages</h1>
        </div>
        <div className="flex items-center gap-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, email, message…"
            className="w-72"
          />
          <Select value={status} onValueChange={(v) => setStatus(v as StatusFilter)}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-sm text-muted-foreground">Loading…</div>
        ) : error ? (
          <div className="p-8 text-sm text-destructive">
            {error instanceof Error ? error.message : "Failed to load"}
          </div>
        ) : !data?.messages.length ? (
          <div className="p-12 text-center text-sm text-muted-foreground">
            No messages match these filters.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-border/40 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              <tr>
                <th className="text-left px-5 py-3 font-medium">From</th>
                <th className="text-left px-5 py-3 font-medium">Message</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Received</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.messages.map((m) => (
                <tr
                  key={m.id}
                  className="hover:bg-border/20 cursor-pointer"
                  onClick={() => openMessage(m as Message)}
                >
                  <td className="px-5 py-4 align-top">
                    <div className={m.status === "new" ? "font-semibold" : "font-medium"}>
                      {m.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.email}</div>
                  </td>
                  <td className="px-5 py-4 text-muted-foreground max-w-md">
                    <div className="truncate">{m.message}</div>
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-5 py-4 text-muted-foreground text-xs whitespace-nowrap">
                    {new Date(m.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        reply(m as Message);
                      }}
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="sm:max-w-lg">
          {active ? (
            <>
              <DialogHeader>
                <DialogTitle>{active.name}</DialogTitle>
                <DialogDescription>
                  <a href={`mailto:${active.email}`} className="hover:underline">
                    {active.email}
                  </a>
                  {" · "}
                  {new Date(active.created_at).toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-2 text-sm whitespace-pre-wrap leading-relaxed text-foreground/90 max-h-80 overflow-y-auto">
                {active.message}
              </div>
              <DialogFooter className="mt-4 flex sm:justify-between gap-2 sm:gap-0">
                <button
                  onClick={() => {
                    if (confirm("Delete this message?")) deleteMutation.mutate(active.id);
                  }}
                  className="text-xs text-muted-foreground hover:text-destructive"
                >
                  Delete
                </button>
                <div className="flex gap-2">
                  <Select
                    value={active.status}
                    onValueChange={(v) =>
                      statusMutation.mutate({
                        id: active.id,
                        status: v as "new" | "read" | "replied",
                      })
                    }
                  >
                    <SelectTrigger className="w-32 h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="replied">Replied</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => reply(active)}>Reply</Button>
                </div>
              </DialogFooter>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function StatusBadge({ status }: { status: "new" | "read" | "replied" }) {
  const cls =
    status === "new"
      ? "text-emerald-400"
      : status === "replied"
        ? "text-muted-foreground"
        : "text-foreground/70";
  return (
    <span className={`text-xs uppercase tracking-[0.15em] ${cls}`}>{status}</span>
  );
}
