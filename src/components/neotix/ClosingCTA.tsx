import { NeotixMark } from "../NeotixMark";

export function ClosingCTA() {
  return (
    <section id="contact" className="relative py-32 lg:py-44 border-t border-border overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <div className="flex justify-center mb-10">
          <NeotixMark size={56} glow />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          The next wave of AI will not be defined by more answers.
        </h2>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          It will be defined by systems that understand context, preserve continuity, and
          improve how people make decisions.
        </p>
        <div className="mt-12">
          <a
            href="mailto:hello@neotixhq.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[0_0_50px_-10px_rgba(139,92,246,0.7)]"
          >
            Contact NeotixHQ
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
