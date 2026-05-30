import { CoreMotif } from "./CoreMotif";
import { SectionGraphics } from "./SectionGraphics";

export function Vision() {
  return (
    <section
      id="vision"
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-deep)" }}
    >
      <div className="absolute inset-0 bg-atmos-violet opacity-60 pointer-events-none" />
      <SectionGraphics diagonal="tr-bl" gridOpacity={0.35} />
      <div className="absolute -right-40 -top-20 w-[680px] h-[680px] pointer-events-none">
        <CoreMotif opacity={0.045} rotate={18} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Vision
          </p>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05] text-balance">
            Information is abundant. Context is scarce.
          </h2>
        </div>
        <div className="lg:col-span-5 lg:pt-20 space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Most tools help people create, capture, and search more information. That is no
            longer the hard part.
          </p>
          <p>
            The harder problem is turning scattered conversations, decisions, workflows, and
            signals into useful context that people can trust, revisit, and act on.
          </p>
          <p className="text-foreground">
            NeotixHQ exists to build the layer between information and judgment.
          </p>
        </div>
      </div>
    </section>
  );
}
