// Calix — calibrated hiring decisions. Signals converging into a calibrated score.
export function AugmentVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="calix-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* signal bars (left) — varying weights = different candidate signals */}
      {[
        { y: 16, w: 14, o: 0.45 },
        { y: 24, w: 20, o: 0.65 },
        { y: 32, w: 12, o: 0.55 },
        { y: 40, w: 22, o: 0.8 },
        { y: 48, w: 16, o: 0.5 },
      ].map((b, i) => (
        <rect key={i} x="6" y={b.y - 1.5} width={b.w} height="3" rx="1.5" fill="currentColor" fillOpacity={b.o} />
      ))}
      {/* convergence lines into pivot */}
      {[16, 24, 32, 40, 48].map((y, i) => (
        <line key={i} x1="30" y1={y} x2="40" y2="32" stroke="url(#calix-grad)" strokeWidth="0.8" strokeOpacity="0.55" />
      ))}
      {/* calibrated score dial */}
      <circle cx="48" cy="32" r="10" stroke="url(#calix-grad)" strokeWidth="1.5" />
      <path d="M 48 32 L 54 26" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" />
      <circle cx="48" cy="32" r="1.8" fill="#22D3EE" />
    </svg>
  );
}
