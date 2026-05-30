export function MeridianVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* rounded frame */}
      <rect x="6" y="6" width="52" height="52" rx="9" />
      {/* horizontal strokes */}
      <line x1="16" y1="22" x2="48" y2="22" />
      <line x1="22" y1="32" x2="42" y2="32" />
      <line x1="16" y1="42" x2="48" y2="42" />
      {/* vertical "now" marker */}
      <line x1="32" y1="16" x2="32" y2="48" />
    </svg>
  );
}
