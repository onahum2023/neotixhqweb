export function MeridianVisual() {
  const lines = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" fill="none">
      <defs>
        <linearGradient id="mer-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {lines.map((i) => {
        const y = 30 + i * 30;
        const offset = (i % 2) * 30;
        return (
          <g key={i}>
            <path
              d={`M -20 ${y} Q 100 ${y - 8 + offset / 4} 200 ${y} T 420 ${y}`}
              stroke="url(#mer-grad)"
              strokeWidth="1"
              strokeOpacity={0.4 + i * 0.08}
            />
            {/* memory points */}
            {[60, 140, 220, 310].map((cx, k) => (
              <circle
                key={k}
                cx={cx + offset}
                cy={y}
                r={k === i % 4 ? 3 : 1.6}
                fill={k === i % 4 ? "#22D3EE" : "#F4F1EA"}
                fillOpacity={k === i % 4 ? 1 : 0.5}
              />
            ))}
          </g>
        );
      })}
      {/* vertical "now" marker */}
      <line
        x1="300"
        y1="10"
        x2="300"
        y2="210"
        stroke="#8B5CF6"
        strokeOpacity="0.5"
        strokeDasharray="3 4"
      />
      <circle cx="300" cy="110" r="5" fill="#8B5CF6" />
      <circle cx="300" cy="110" r="12" stroke="#8B5CF6" strokeOpacity="0.4" />
    </svg>
  );
}
