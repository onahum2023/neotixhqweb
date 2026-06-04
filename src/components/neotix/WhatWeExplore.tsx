import { SectionGraphics } from "./SectionGraphics";

const areas = [
  {
    title: "Context Engineering",
    body: "Designing the systems that turn fragmented information into structured, durable context.",
  },
  {
    title: "AI Memory Systems",
    body: "Exploring how persistent memory and temporal recall reshape what AI can do over time.",
  },
  {
    title: "Human-AI Collaboration",
    body: "Interaction models where AI augments judgment without displacing it.",
  },
  {
    title: "Decision Intelligence",
    body: "Helping people see what matters and act with clarity when it matters.",
  },
  {
    title: "Workflow Intelligence",
    body: "Understanding the real shape of work so AI can meet it where it lives.",
  },
];

function Marker({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`wx-${i}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="3" fill={`url(#wx-${i})`} />
      <circle cx="16" cy="16" r="9" stroke={`url(#wx-${i})`} strokeOpacity="0.55" />
      <circle cx="16" cy="16" r="14" stroke={`url(#wx-${i})`} strokeOpacity="0.25" />
    </svg>
  );
}

export function WhatWeExplore() {
  return (
    <section id="explore" className="relative py-14 lg:py-20 overflow-hidden">
      <SectionGraphics diagonal="tl-br" gridOpacity={0.3} />
      <div className="absolute inset-0 bg-atmos-violet opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Explorations
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            NeotixHQ explores the intersection of context, memory, and judgment.
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((a, i) => (
            <div
              key={a.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-surface-deep p-7 shadow-card transition-all hover:border-primary/40 hover-glow-cyan overflow-hidden"
            >
              <div
                className="absolute inset-x-6 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.66 0.22 295 / 0.4), oklch(0.82 0.13 200 / 0.4), transparent)",
                }}
              />
              <Marker i={i} />
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{a.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{a.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
