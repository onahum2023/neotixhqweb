import { NeotixMark } from "../NeotixMark";

export function ClosingCTA() {
  return (
    <section id="contact" className="relative py-28 lg:py-40 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-radial)" }}
      />
      <div className="absolute inset-0 bg-atmos-violet pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, oklch(0.66 0.22 295 / 0.18), transparent 70%)",
        }}
      />
      <div className="absolute inset-0 bg-grid-soft mask-fade-edges opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-4xl px-6 lg:px-10 text-center">
        <div className="flex justify-center mb-10">
          <NeotixMark size={56} glow />
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
          The next wave of AI will not be defined by more answers.
        </h2>
        <p className="mt-8 text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          It will be defined by systems that preserve continuity, understand context, and help
          people act with better judgment.
        </p>
        <div className="mt-12">
          <a
            href="mailto:hello@neotixhq.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-[0_0_50px_-10px_rgba(139,92,246,0.7)]"
          >
            Start a conversation <span aria-hidden>→</span>
          </a>
          <p className="mt-4 text-sm text-muted-foreground">hello@neotixhq.com</p>
        </div>
      </div>
    </section>
  );
}
