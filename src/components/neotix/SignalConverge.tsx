/**
 * Hero visual — fragmented signals on the left converge through a
 * waypoint into the Neotix Core on the right. The Core is the brand
 * device: a geometric N described by corner nodes, a violet→cyan
 * diagonal beam, and a structured center.
 */
export function SignalConverge() {
  const fragments = [
    { x: 20, y: 50, len: 30, delay: 0 },
    { x: 50, y: 95, len: 22, delay: 0.6 },
    { x: 10, y: 150, len: 36, delay: 1.2 },
    { x: 60, y: 200, len: 20, delay: 0.3 },
    { x: 30, y: 248, len: 28, delay: 1.8 },
    { x: 80, y: 300, len: 26, delay: 0.9 },
    { x: 40, y: 348, len: 24, delay: 2.2 },
    { x: 95, y: 70, len: 18, delay: 1.5 },
    { x: 72, y: 130, len: 22, delay: 0.4 },
    { x: 25, y: 320, len: 16, delay: 1.7 },
  ];

  // Neotix Core geometry — a large geometric N
  const cx = 360;
  const cy = 200;
  const r = 90; // half-size of the N square
  const nTL = { x: cx - r, y: cy - r };
  const nBL = { x: cx - r, y: cy + r };
  const nTR = { x: cx + r, y: cy - r };
  const nBR = { x: cx + r, y: cy + r };
  const waypoint = { x: cx, y: cy };
  // Entry waypoint where fragmented signals fold into the core
  const entry = { x: cx - r - 30, y: cy };

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{ background: "var(--gradient-radial)" }}
      />
      <svg
        viewBox="0 0 480 400"
        className="relative w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="conv-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.05" />
            <stop offset="70%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="n-beam" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#22D3EE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Converging trails: each fragment → entry waypoint → core waypoint */}
        {fragments.map((f, i) => (
          <g key={`l-${i}`}>
            <path
              d={`M ${f.x + f.len / 2} ${f.y} Q ${entry.x - 40} ${(f.y + entry.y) / 2} ${entry.x} ${entry.y}`}
              stroke="url(#conv-grad)"
              strokeWidth="0.7"
              strokeOpacity="0.45"
              className="animate-dash"
              style={{ animationDelay: `${f.delay}s` }}
              fill="none"
            />
          </g>
        ))}

        {/* Fragmented signal segments */}
        {fragments.map((f, i) => (
          <g key={`f-${i}`} className="animate-drift" style={{ animationDelay: `${f.delay}s` }}>
            <line
              x1={f.x}
              y1={f.y}
              x2={f.x + f.len}
              y2={f.y}
              stroke="#F4F1EA"
              strokeOpacity="0.55"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx={f.x} cy={f.y} r="1.6" fill="#8B5CF6" />
          </g>
        ))}

        {/* Entry waypoint — fragments fold here before entering the Core */}
        <line
          x1={entry.x}
          y1={entry.y}
          x2={nTL.x}
          y2={nTL.y}
          stroke="url(#n-beam)"
          strokeOpacity="0.4"
          strokeWidth="0.8"
        />
        <line
          x1={entry.x}
          y1={entry.y}
          x2={nBL.x}
          y2={nBL.y}
          stroke="url(#n-beam)"
          strokeOpacity="0.4"
          strokeWidth="0.8"
        />
        <circle cx={entry.x} cy={entry.y} r="2.4" fill="#F4F1EA" />
        <circle cx={entry.x} cy={entry.y} r="5" stroke="#F4F1EA" strokeOpacity="0.3" />

        {/* Core glow */}
        <circle cx={cx} cy={cy} r="140" fill="url(#core-glow)" />

        {/* Neotix Core — the geometric N */}
        <g className="animate-pulse-glow">
          {/* Implied verticals — hairline */}
          <line x1={nTL.x} y1={nTL.y} x2={nBL.x} y2={nBL.y} stroke="#F4F1EA" strokeOpacity="0.22" strokeWidth="1" />
          <line x1={nTR.x} y1={nTR.y} x2={nBR.x} y2={nBR.y} stroke="#F4F1EA" strokeOpacity="0.22" strokeWidth="1" />

          {/* Inner converging hairlines */}
          <line x1={nBL.x} y1={nBL.y} x2={waypoint.x} y2={waypoint.y} stroke="#8B5CF6" strokeOpacity="0.4" strokeWidth="0.8" />
          <line x1={nTR.x} y1={nTR.y} x2={waypoint.x} y2={waypoint.y} stroke="#22D3EE" strokeOpacity="0.4" strokeWidth="0.8" />

          {/* Dominant diagonal beam of the N */}
          <line
            x1={nTL.x}
            y1={nTL.y}
            x2={nBR.x}
            y2={nBR.y}
            stroke="url(#n-beam)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Beam echo */}
          <line
            x1={nTL.x + 6}
            y1={nTL.y}
            x2={nBR.x + 6}
            y2={nBR.y}
            stroke="url(#n-beam)"
            strokeOpacity="0.2"
            strokeWidth="1"
            strokeLinecap="round"
          />

          {/* Corner nodes */}
          <circle cx={nTL.x} cy={nTL.y} r="6" fill="#8B5CF6" />
          <circle cx={nTL.x} cy={nTL.y} r="12" stroke="#8B5CF6" strokeOpacity="0.4" />

          <circle cx={nBR.x} cy={nBR.y} r="6" fill="#22D3EE" />
          <circle cx={nBR.x} cy={nBR.y} r="12" stroke="#22D3EE" strokeOpacity="0.4" />

          <circle cx={nBL.x} cy={nBL.y} r="3.5" fill="#F4F1EA" fillOpacity="0.85" />
          <circle cx={nTR.x} cy={nTR.y} r="3.5" fill="#F4F1EA" fillOpacity="0.85" />

          {/* Waypoint — structured context */}
          <circle cx={waypoint.x} cy={waypoint.y} r="4" fill="#F4F1EA" />
          <circle cx={waypoint.x} cy={waypoint.y} r="9" stroke="#F4F1EA" strokeOpacity="0.35" />
          <circle cx={waypoint.x} cy={waypoint.y} r="16" stroke="#F4F1EA" strokeOpacity="0.15" />
        </g>
      </svg>
    </div>
  );
}
