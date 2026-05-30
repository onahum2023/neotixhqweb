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
    <article className="group relative rounded-xl border border-border bg-surface/30 backdrop-blur p-5 transition-all hover:border-accent/30 hover:bg-surface/60">
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
    <section id="studio" className="relative py-24 lg:py-32 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Studio
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            Inside the NeotixHQ studio.
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            Our early systems explore how AI can preserve context, improve judgment, and reduce
            friction in high-cognitive-load workflows.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-4 max-w-4xl">
          <SystemCard
            label="Meridian by NeotixHQ"
            name="Meridian"
            tagline="Exploring temporal memory for modern work."
            status="In development"
            description="Meridian investigates how conversations can become structured memory, helping important patterns, decisions, and ideas resurface when they matter."
            visual={<MeridianVisual />}
          />
          <SystemCard
            label="Augment-Labs by NeotixHQ"
            name="Augment-Labs"
            tagline="Exploring AI-assisted hiring workflows."
            status="MVP"
            description="Augment-Labs investigates how AI can help hiring managers turn job requirements, candidate signals, and interview preparation into a clearer decision workflow."
            visual={<AugmentVisual />}
          />
        </div>
      </div>
    </section>
  );
}
