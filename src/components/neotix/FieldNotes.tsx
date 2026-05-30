import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { listPublishedFieldNotes } from "@/lib/field-notes.functions";
import { SectionGraphics } from "./SectionGraphics";

const placeholderNotes = [
  {
    category: "AI & Work",
    title: "The cognitive layer of work",
    excerpt:
      "Why the next wave of AI will be less about generating more answers and more about preserving context, continuity, and judgment.",
  },
  {
    category: "Memory & Context",
    title: "Beyond chat history",
    excerpt:
      "Exploring why persistent context and temporal memory may become core infrastructure for human-AI collaboration.",
  },
  {
    category: "Product Thinking",
    title: "Workflows over demos",
    excerpt:
      "A product note on why useful AI systems should start with broken workflows, not isolated model capabilities.",
  },
];

export function FieldNotes() {
  const list = useServerFn(listPublishedFieldNotes);
  const { data } = useQuery({
    queryKey: ["field-notes", "published"],
    queryFn: () => list(),
  });

  const published = data?.notes ?? [];
  const showPlaceholders = published.length === 0;
  const items = showPlaceholders ? placeholderNotes : published;

  return (
    <section
      id="field-notes"
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-warm)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 80% 20%, oklch(0.66 0.22 295 / 0.08), transparent 70%)",
        }}
      />
      <SectionGraphics diagonal="tr-bl" gridOpacity={0.3} />
      <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Field Notes
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            Field Notes
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            Notes from the edge of AI, memory, workflows, and the cognitive layer of work.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-px bg-border/40 border border-white/[0.06] rounded-2xl overflow-hidden shadow-card">
          {items.slice(0, 3).map((n, i) => (
            <article
              key={`note-${i}`}
              className="group relative p-7 lg:p-8 flex flex-col min-h-[220px] transition-colors hover:bg-surface-deep"
              style={{ backgroundColor: "var(--color-surface-warm)" }}
            >
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {n.category}
                </p>
                {showPlaceholders ? (
                  <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
                    Coming soon
                  </span>
                ) : null}
              </div>
              <div
                className="mt-5 h-px w-10"
                style={{
                  background:
                    "linear-gradient(to right, oklch(0.66 0.22 295 / 0.6), transparent)",
                }}
              />
              <h3 className="mt-4 text-lg font-semibold tracking-tight leading-snug">
                {n.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {n.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
