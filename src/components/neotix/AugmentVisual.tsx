export function AugmentVisual() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="aug-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Source nodes (candidates / signals) */}
      {[40, 80, 120, 160, 200].map((y, i) => (
        <g key={i}>
          <rect x="20" y={y - 6} width="34" height="12" rx="2" stroke="#F4F1EA" strokeOpacity="0.35" />
          <line x1="58" y1={y} x2="160" y2={110} stroke="url(#aug-grad)" strokeWidth="0.7" strokeOpacity="0.5" />
        </g>
      ))}

      {/* Middle convergence node */}
      <circle cx="160" cy="110" r="8" fill="#8B5CF6" />
      <circle cx="160" cy="110" r="18" stroke="#8B5CF6" strokeOpacity="0.4" />

      {/* Decision branches */}
      {[60, 110, 160].map((y, i) => (
        <g key={i}>
          <line x1="168" y1="110" x2="260" y2={y} stroke="url(#aug-grad)" strokeWidth="1.2" />
          <circle cx="260" cy={y} r="4" fill="#22D3EE" fillOpacity={0.7 - i * 0.15} />
          <line x1="266" y1={y} x2="340" y2={y} stroke="#22D3EE" strokeOpacity={0.6 - i * 0.15} strokeWidth="0.8" />
          <rect x="340" y={y - 7} width="40" height="14" rx="2" stroke="#22D3EE" strokeOpacity={0.7 - i * 0.15} />
        </g>
      ))}

      {/* Evaluation ticks at right */}
      {[60, 110, 160].map((y, i) => (
        <line
          key={`t-${i}`}
          x1="350"
          y1={y - 3}
          x2="355"
          y2={y + 3}
          stroke="#F4F1EA"
          strokeOpacity={0.8 - i * 0.2}
          strokeWidth="1.2"
        />
      ))}
    </svg>
  );
}
