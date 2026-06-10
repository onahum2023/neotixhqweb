import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/neotix/Nav";
import { Footer } from "@/components/neotix/Footer";
import { listPublishedFieldNotes } from "@/lib/field-notes.functions";

export const Route = createFileRoute("/field-notes")({
  head: () => ({
    meta: [
      { title: "Field Notes — NeotixHQ" },
      {
        name: "description",
        content:
          "Essays, short notes, and links on AI, memory, workflows, and the cognitive layer of work.",
      },
      { property: "og:title", content: "Field Notes — NeotixHQ" },
      {
        property: "og:description",
        content:
          "Essays, short notes, and links on AI, memory, workflows, and the cognitive layer of work.",
      },
      { property: "og:url", content: "/field-notes" },
    ],
    links: [{ rel: "canonical", href: "/field-notes" }],
  }),
  component: FieldNotesPage,
});

function formatDate(value: string | null | undefined) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function FieldNotesPage() {
  const list = useServerFn(listPublishedFieldNotes);
  const { data, isLoading, error } = useQuery({
    queryKey: ["field-notes", "published"],
    queryFn: () => list(),
  });

  const notes = data?.notes ?? [];

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <section className="pt-32 pb-20">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <header className="border-b border-border pb-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Journal
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">
              Field Notes
            </h1>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl">
              Essays, short notes, and links from the edge of AI, memory,
              workflows, and the cognitive layer of work.
            </p>
          </header>

          <div className="mt-2">
            {isLoading ? (
              <p className="py-16 text-sm text-muted-foreground">Loading…</p>
            ) : error ? (
              <p className="py-16 text-sm text-destructive">
                {error instanceof Error ? error.message : "Failed to load notes."}
              </p>
            ) : notes.length === 0 ? (
              <p className="py-16 text-sm text-muted-foreground">
                No notes published yet. Check back soon.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {notes.map((n) => {
                  const isExternal = Boolean(n.external_url);
                  const inner = (
                    <article className="py-8 group">
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        <span>{n.category}</span>
                        {n.published_at ? (
                          <>
                            <span aria-hidden>·</span>
                            <time dateTime={n.published_at}>
                              {formatDate(n.published_at)}
                            </time>
                          </>
                        ) : null}
                        {isExternal ? (
                          <>
                            <span aria-hidden>·</span>
                            <span>{n.source ?? "External"}</span>
                          </>
                        ) : null}
                      </div>
                      <h2 className="mt-3 text-xl md:text-2xl font-semibold tracking-tight leading-snug group-hover:text-primary transition-colors">
                        {n.title}
                        {isExternal ? (
                          <ArrowUpRight className="inline-block ml-1.5 h-4 w-4 -translate-y-0.5 opacity-60" />
                        ) : null}
                      </h2>
                      {n.excerpt ? (
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                          {n.excerpt}
                        </p>
                      ) : null}
                      <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground group-hover:text-foreground transition-colors">
                        {isExternal ? "Read on " + (n.source ?? "site") : "Read note"} →
                      </p>
                    </article>
                  );
                  return (
                    <li key={n.id}>
                      {isExternal ? (
                        <a
                          href={n.external_url!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          {inner}
                        </a>
                      ) : (
                        <Link to="/field-notes/$slug" params={{ slug: n.slug }} className="block">
                          {inner}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
