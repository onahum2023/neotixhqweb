/**
 * Decorative hero-style graphic backdrop: soft grid, a long diagonal
 * hairline beam, and a few quiet accent dots. Purely visual.
 */
type Props = {
  /** "tl-br" = top-left to bottom-right, "tr-bl" = top-right to bottom-left */
  diagonal?: "tl-br" | "tr-bl";
  gridOpacity?: number;
};

export function SectionGraphics({ diagonal = "tl-br", gridOpacity = 0.35 }: Props) {
  const isTLBR = diagonal === "tl-br";
  return (
    <>
      <div
        className="absolute inset-0 bg-grid-soft mask-fade-edges pointer-events-none"
        style={{ opacity: gridOpacity }}
      />
      <svg
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
        fill="none"
      >
        <defs>
          <linearGradient id="sg-beam" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="35%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="65%" stopColor="#22D3EE" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        {isTLBR ? (
          <line x1="0" y1="0" x2="100" y2="100" stroke="url(#sg-beam)" strokeWidth="0.15" />
        ) : (
          <line x1="100" y1="0" x2="0" y2="100" stroke="url(#sg-beam)" strokeWidth="0.15" />
        )}
      </svg>
      {/* corner accent dots */}
      <div
        className="absolute pointer-events-none size-1.5 rounded-full"
        style={{
          background: "#8B5CF6",
          boxShadow: "0 0 12px 2px oklch(0.66 0.22 295 / 0.5)",
          ...(isTLBR ? { top: "8%", left: "6%" } : { top: "8%", right: "6%" }),
        }}
      />
      <div
        className="absolute pointer-events-none size-1.5 rounded-full"
        style={{
          background: "#22D3EE",
          boxShadow: "0 0 12px 2px oklch(0.82 0.13 200 / 0.45)",
          ...(isTLBR ? { bottom: "10%", right: "8%" } : { bottom: "10%", left: "8%" }),
        }}
      />
      {/* mid waypoint dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none size-1 rounded-full bg-foreground/40" />
    </>
  );
}
