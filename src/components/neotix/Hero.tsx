import { SignalConverge } from "./SignalConverge";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* background grid + gradient */}
      <div className="absolute inset-0 bg-grid mask-fade-edges opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border bg-surface/60 backdrop-blur text-xs text-muted-foreground tracking-wide">
            <span className="size-1.5 rounded-full bg-accent" />
            NeotixHQ — Cognitive systems
          </div>
          <h1 className="mt-8 text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight text-balance">
            Building cognitive systems for the next layer of work.
          </h1>
          <p className="mt-7 text-lg text-muted-foreground max-w-xl leading-relaxed">
            NeotixHQ designs AI-native products that transform conversations, workflows, and
            fragmented signals into structured context, sharper decisions, and measurable action.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)]"
            >
              Explore products
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border text-foreground hover:border-foreground/40 transition-colors"
            >
              Contact NeotixHQ
            </a>
          </div>
        </div>

        <div className="relative">
          <SignalConverge />
        </div>
      </div>
    </section>
  );
}
