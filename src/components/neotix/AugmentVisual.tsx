// Calix — calibrated hiring decisions. Logo: signals → calibrated dial inside framed mark.
export function AugmentVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* framed mark */}
      <rect x="6" y="6" width="52" height="52" rx="9" />
      {/* signal bars */}
      <line x1="16" y1="22" x2="24" y2="22" />
      <line x1="16" y1="32" x2="28" y2="32" />
      <line x1="16" y1="42" x2="22" y2="42" />
      {/* dial */}
      <circle cx="42" cy="32" r="8" strokeWidth="2.4" />
      <line x1="42" y1="32" x2="47" y2="27" strokeWidth="2.4" />
    </svg>
  );
}
