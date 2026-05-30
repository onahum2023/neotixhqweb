// Calix — calibrated hiring decisions. Signals converging into a calibrated dial.
export function AugmentVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="calix-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* signal bars */}
      <line x1="8"  y1="18" x2="22" y2="18" stroke="url(#calix-grad)" strokeWidth="2.5" opacity="0.45" />
      <line x1="8"  y1="26" x2="28" y2="26" stroke="url(#calix-grad)" strokeWidth="2.5" opacity="0.65" />
      <line x1="8"  y1="34" x2="24" y2="34" stroke="url(#calix-grad)" strokeWidth="2.5" opacity="0.85" />
      <line x1="8"  y1="42" x2="30" y2="42" stroke="url(#calix-grad)" strokeWidth="2.5" />
      <line x1="8"  y1="50" x2="20" y2="50" stroke="url(#calix-grad)" strokeWidth="2.5" opacity="0.55" />
      {/* dial */}
      <circle cx="46" cy="34" r="10" stroke="url(#calix-grad)" strokeWidth="2.5" />
      <line x1="46" y1="34" x2="53" y2="27" stroke="url(#calix-grad)" strokeWidth="2.5" />
      <circle cx="46" cy="34" r="1.6" fill="url(#calix-grad)" />
    </svg>
  );
}
