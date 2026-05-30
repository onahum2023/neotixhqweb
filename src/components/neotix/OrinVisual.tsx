// Orin — personal AI proposing capability changes for user approval.
export function OrinVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="orin-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* boundary — Orin operates inside an approved perimeter */}
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="2 4" />
      {/* core (you) */}
      <circle cx="32" cy="32" r="5" fill="url(#orin-grad)" />
      {/* candidate capabilities orbiting — pending approval */}
      {[
        { cx: 32, cy: 12, r: 2.4 },
        { cx: 52, cy: 32, r: 2.4 },
        { cx: 32, cy: 52, r: 2.4 },
        { cx: 12, cy: 32, r: 2.4 },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r={p.r + 3} stroke="url(#orin-grad)" strokeOpacity="0.35" strokeDasharray="1.5 2" />
          <circle cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke="url(#orin-grad)" strokeWidth="1.2" />
        </g>
      ))}
      {/* one approved capability — solid */}
      <circle cx="46.14" cy="17.86" r="2.6" fill="url(#orin-grad)" />
      <line x1="34.5" y1="29.5" x2="44.5" y2="19.5" stroke="url(#orin-grad)" strokeWidth="1" />
    </svg>
  );
}
