/**
 * Soft gradient band divider — atmospheric, no hard line.
 */
export function BeamDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative h-10 overflow-hidden"
    >
      <div
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, oklch(0.66 0.22 295 / 0.5) 30%, oklch(0.82 0.13 200 / 0.5) 70%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, oklch(0.66 0.22 295 / 0.08), transparent 70%)",
        }}
      />
    </div>
  );
}
