export function OrinVisual() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="orin-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* user node */}
      <circle cx="80" cy="110" r="10" fill="url(#orin-grad)" />
      <circle cx="80" cy="110" r="22" stroke="url(#orin-grad)" strokeOpacity="0.35" />

      {/* AI node */}
      <circle cx="320" cy="110" r="10" stroke="url(#orin-grad)" strokeWidth="1.2" />
      <circle cx="320" cy="110" r="22" stroke="url(#orin-grad)" strokeOpacity="0.25" strokeDasharray="3 4" />

      {/* proposal channel: AI → user (dashed, awaiting approval) */}
      <path d="M 310 100 Q 200 60 90 100" stroke="#22D3EE" strokeOpacity="0.7" strokeDasharray="4 4" />
      <polygon points="92,96 84,100 92,104" fill="#22D3EE" fillOpacity="0.8" />

      {/* approval channel: user → AI (solid) */}
      <path d="M 90 120 Q 200 160 310 120" stroke="#8B5CF6" strokeOpacity="0.8" />
      <polygon points="308,116 316,120 308,124" fill="#8B5CF6" />

      {/* candidate capabilities awaiting approval */}
      {[
        { x: 220, y: 40 },
        { x: 250, y: 65 },
        { x: 200, y: 75 },
      ].map((p, i) => (
        <g key={i}>
          <rect x={p.x - 6} y={p.y - 6} width="12" height="12" stroke="url(#orin-grad)" strokeOpacity="0.5" />
          <line x1={p.x} y1={p.y + 6} x2="200" y2="105" stroke="#F4F1EA" strokeOpacity="0.12" />
        </g>
      ))}

      {/* boundary frame */}
      <rect x="20" y="20" width="360" height="180" stroke="#F4F1EA" strokeOpacity="0.08" strokeDasharray="2 6" />
    </svg>
  );
}
