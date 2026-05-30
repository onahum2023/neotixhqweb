import type { ReactNode } from "react";

type Props = {
  label: string;
  name: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  visual: ReactNode;
};

export function ProductCard({ label, name, tagline, description, ctaLabel, ctaHref, visual }: Props) {
  return (
    <article className="group relative rounded-2xl border border-border bg-surface/70 backdrop-blur p-8 lg:p-10 overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[var(--glow-cyan)]">
      {/* subtle gradient edge */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: "radial-gradient(600px circle at 0% 0%, rgba(139,92,246,0.12), transparent 50%)" }}
      />

      <div className="relative aspect-[16/9] mb-8 rounded-xl border border-border bg-background/40 overflow-hidden">
        <div className="absolute inset-0 p-4">{visual}</div>
      </div>

      <div className="relative">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <h3 className="mt-3 text-3xl lg:text-4xl font-semibold tracking-tight">{name}</h3>
        <p className="mt-3 text-base text-foreground/80">{tagline}</p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground max-w-prose">
          {description}
        </p>
        <a
          href={ctaHref}
          className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-foreground border-b border-foreground/30 hover:border-accent hover:text-accent transition-colors pb-1"
        >
          {ctaLabel}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </a>
      </div>
    </article>
  );
}
