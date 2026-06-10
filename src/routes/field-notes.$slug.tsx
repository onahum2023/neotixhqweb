import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useSuspenseQuery, queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import { Nav } from "@/components/neotix/Nav";
import { Footer } from "@/components/neotix/Footer";
import { getPublishedFieldNote } from "@/lib/field-notes.functions";
import { ShareButtons } from "@/components/neotix/ShareButtons";

const noteQuery = (slug: string) =>
  queryOptions({
    queryKey: ["field-notes", "published", slug],
    queryFn: () => getPublishedFieldNote({ data: { slug } }),
  });

export const Route = createFileRoute("/field-notes/$slug")({
  loader: async ({ params, context }) => {
    const res = await context.queryClient.ensureQueryData(noteQuery(params.slug));
    if (!res.note) throw notFound();
    return { note: res.note };
  },
  head: ({ loaderData }) => {
    const note = loaderData?.note;
    const title = note ? `${note.title} — Field Notes` : "Field Notes — NeotixHQ";
    const description = note?.excerpt || "A field note from NeotixHQ.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
      ],
    };
  },
  component: FieldNoteDetail,
  errorComponent: ({ error }) => (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-32 mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-sm text-destructive">
          {error instanceof Error ? error.message : "Failed to load this note."}
        </p>
        <Link to="/field-notes" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back to Field Notes
        </Link>
      </div>
      <Footer />
    </main>
  ),
  notFoundComponent: () => (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <div className="pt-32 mx-auto max-w-3xl px-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">Note not found</h1>
        <Link to="/field-notes" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back to Field Notes
        </Link>
      </div>
      <Footer />
    </main>
  ),
});

function formatDate(value: string | null | undefined) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

function FieldNoteDetail() {
  const { slug } = Route.useParams();
  const { data } = useSuspenseQuery(noteQuery(slug));
  const note = data.note!;
  const isExternal = Boolean(note.external_url);

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      <Nav />
      <article className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <Link
            to="/field-notes"
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            ← Field Notes
          </Link>

          <header className="mt-8 pb-10 border-b border-border">
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{note.category}</span>
              {note.published_at ? (
                <>
                  <span aria-hidden>·</span>
                  <time dateTime={note.published_at}>{formatDate(note.published_at)}</time>
                </>
              ) : null}
              {isExternal ? (
                <>
                  <span aria-hidden>·</span>
                  <span>{note.source ?? "External"}</span>
                </>
              ) : null}
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance leading-tight">
              {note.title}
            </h1>
            {note.excerpt ? (
              <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
                {note.excerpt}
              </p>
            ) : null}
          </header>

          {isExternal ? (
            <div className="mt-10 rounded-xl border border-border bg-surface-warm p-8">
              <p className="text-sm text-muted-foreground">
                This note links to a post originally published on{" "}
                <span className="text-foreground">{note.source ?? "another site"}</span>.
              </p>
              <a
                href={note.external_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-border hover:border-primary/60 hover:text-foreground transition-colors"
              >
                Read on {note.source ?? "site"} ↗
              </a>
            </div>
          ) : null}

          {note.body ? (
            <div className="mt-10 prose prose-invert max-w-none text-foreground/90 leading-relaxed whitespace-pre-wrap text-[15px]">
              {note.body}
            </div>
          ) : null}

          <Suspense fallback={null}>
            <div className="mt-14 pt-8 border-t border-border">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Share
              </p>
              <div className="mt-4">
                <ShareButtons
                  title={note.title}
                  path={`/field-notes/${note.slug}`}
                  externalUrl={note.external_url}
                />
              </div>
            </div>
          </Suspense>
        </div>
      </article>
      <Footer />
    </main>
  );
}
