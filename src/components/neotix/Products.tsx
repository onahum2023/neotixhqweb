import { MeridianVisual } from "./MeridianVisual";
import { AugmentVisual } from "./AugmentVisual";
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
    <article className="group relative rounded-xl border border-border bg-surface/40 backdrop-blur p-6 transition-all hover:border-accent/30 hover:bg-surface/70">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </p>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          <span className="size-1 rounded-full bg-accent" />
          {status}
        </span>
      </div>
      <div className="mt-5 flex items-start gap-5">
        <div className="shrink-0 w-28 h-20 rounded-lg border border-border bg-background/40 overflow-hidden p-2">
          {visual}
        </div>
        <div className="min-w-0">
          <h3 className="text-xl font-semibold tracking-tight">{name}</h3>
          <p className="mt-1 text-sm text-foreground/80">{tagline}</p>
        </div>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </article>
  );
}

export function Products() {
  return (
    <section id="systems" className="relative py-28 lg:py-40 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Systems
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Emerging systems from NeotixHQ.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
            Our first systems explore how AI can help people preserve context, improve judgment,
            and reduce friction in high-cognitive-load workflows.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5 max-w-5xl">
          <SystemCard
            label="Meridian by NeotixHQ"
            name="Meridian"
            tagline="Temporal memory for modern work."
            status="In development"
            description="Meridian explores how conversations can become structured memory, helping important patterns, decisions, and ideas resurface when they matter."
            visual={<MeridianVisual />}
          />
          <SystemCard
            label="Augment-Labs by NeotixHQ"
            name="Augment-Labs"
            tagline="AI-assisted hiring for busy managers."
            status="MVP"
            description="Augment-Labs explores how AI can help hiring managers turn job requirements, candidate profiles, and interview preparation into a clearer, faster hiring workflow."
            visual={<AugmentVisual />}
          />
        </div>
      </div>
    </section>
  );
}
