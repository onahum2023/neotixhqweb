// Calix — calibrated hiring decisions: crosshair / target glyph
export function AugmentVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="52" height="52" rx="9" />
      {/* concentric target */}
      <circle cx="32" cy="32" r="11" />
      <circle cx="32" cy="32" r="2.5" fill="currentColor" stroke="none" />
      {/* calibration ticks */}
      <line x1="32" y1="13" x2="32" y2="18" />
      <line x1="32" y1="46" x2="32" y2="51" />
      <line x1="13" y1="32" x2="18" y2="32" />
      <line x1="46" y1="32" x2="51" y2="32" />
    </svg>
  );
}
