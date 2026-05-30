import { SignalConverge } from "./SignalConverge";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-24 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid mask-fade-edges opacity-60" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="animate-fade-up">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] tracking-tight text-balance">
            Building the cognitive layer of work.
          </h1>
          <p className="mt-7 text-lg text-muted-foreground max-w-xl leading-relaxed">
            NeotixHQ designs AI-native systems that turn fragmented conversations, workflows,
            and signals into structured context for better decisions and action.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[0_0_40px_-10px_rgba(139,92,246,0.6)]"
            >
              Start a conversation
              <span aria-hidden>→</span>
            </a>
            <a
              href="#vision"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium border border-border text-foreground hover:border-foreground/40 transition-colors"
            >
              Explore the vision
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
