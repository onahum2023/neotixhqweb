import { MeridianVisual } from "./MeridianVisual";
import type { ReactNode } from "react";

type SystemProps = {
  name: string;
  label: string;
  tagline: string;
  description: string;
  status: string;
  visual: ReactNode;
};

function SystemCard({ name, label, tagline, description, status, visual }: SystemProps) {
  return (
    <article className="group relative rounded-xl border border-white/[0.06] bg-surface-deep p-5 shadow-card transition-all hover:border-accent/40 hover-glow-cyan overflow-hidden">
      {/* left-edge violet beam accent */}
      <div
        className="absolute inset-y-4 left-0 w-px opacity-60"
        style={{
          background:
            "linear-gradient(to bottom, transparent, oklch(0.66 0.22 295 / 0.6), transparent)",
        }}
      />
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border border-border text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          <span className="size-1 rounded-full bg-accent" />
          {status}
        </span>
      </div>
      <div className="mt-4 flex items-start gap-4">
        <div className="shrink-0 w-20 h-16 rounded-lg border border-border bg-background/40 overflow-hidden p-1.5">
          {visual}
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-semibold tracking-tight">{name}</h3>
          <p className="mt-0.5 text-sm text-foreground/75">{tagline}</p>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}

export function Products() {
  return (
    <section
      id="products"
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-deep)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 10% 30%, oklch(0.66 0.22 295 / 0.10), transparent 60%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-soft opacity-30 pointer-events-none mask-fade-edges" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Products
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            An idea in use: Meridian.
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            Meridian is a local-first AI History Explorer by NeotixHQ. Explore, search, read,
            analyze, and export your AI conversation history, with processing in your browser by
            default.
          </p>
        </div>

        <div className="mt-12 max-w-2xl">
          <SystemCard
            label="Meridian by NeotixHQ"
            name="Meridian"
            tagline="AI History Explorer"
            status="Available"
            description="Bring your AI conversation history into one place and revisit it with local-first search, reading, analytics, and export."
            visual={<MeridianVisual />}
          />
          <a
            href="https://meridian.neotixhq.com/"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 hover:text-accent hover:border-accent pb-1"
          >
            Explore Meridian <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
