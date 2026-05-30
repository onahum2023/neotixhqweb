/**
 * Abstract visual: fragmented signals on the left drifting and converging
 * into a structured geometric (hexagonal) core on the right.
 * Pure SVG + CSS animations.
 */
export function SignalConverge() {
  // Fragmented signal segments scattered on the left
  const fragments = [
    { x: 20, y: 40, len: 28, delay: 0 },
    { x: 50, y: 90, len: 22, delay: 0.6 },
    { x: 10, y: 150, len: 34, delay: 1.2 },
    { x: 60, y: 200, len: 20, delay: 0.3 },
    { x: 30, y: 250, len: 30, delay: 1.8 },
    { x: 80, y: 310, len: 26, delay: 0.9 },
    { x: 40, y: 360, len: 24, delay: 2.2 },
    { x: 90, y: 60, len: 18, delay: 1.5 },
    { x: 70, y: 130, len: 20, delay: 0.4 },
    { x: 25, y: 320, len: 16, delay: 1.7 },
  ];

  const coreCx = 360;
  const coreCy = 200;

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      {/* radial glow backdrop */}
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
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.1" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="hex-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>
          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Convergence lines from each fragment to core */}
        {fragments.map((f, i) => (
          <line
            key={`l-${i}`}
            x1={f.x + f.len / 2}
            y1={f.y}
            x2={coreCx}
            y2={coreCy}
            stroke="url(#conv-grad)"
            strokeWidth="0.6"
            strokeOpacity="0.35"
            className="animate-dash"
            style={{ animationDelay: `${f.delay}s` }}
          />
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
              strokeOpacity="0.6"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle cx={f.x} cy={f.y} r="1.6" fill="#8B5CF6" />
          </g>
        ))}

        {/* Core glow */}
        <circle cx={coreCx} cy={coreCy} r="120" fill="url(#core-glow)" />

        {/* Structured hexagonal core */}
        <g transform={`translate(${coreCx} ${coreCy})`} className="animate-pulse-glow">
          {/* Outer hex */}
          <polygon
            points="0,-70 60,-35 60,35 0,70 -60,35 -60,-35"
            stroke="url(#hex-grad)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Inner hex */}
          <polygon
            points="0,-44 38,-22 38,22 0,44 -38,22 -38,-22"
            stroke="url(#hex-grad)"
            strokeWidth="1"
            strokeOpacity="0.6"
            fill="none"
          />
          {/* Inner connecting spokes */}
          <g stroke="url(#hex-grad)" strokeWidth="0.8" strokeOpacity="0.4">
            <line x1="0" y1="-70" x2="0" y2="70" />
            <line x1="-60" y1="-35" x2="60" y2="35" />
            <line x1="-60" y1="35" x2="60" y2="-35" />
          </g>
          {/* Center node */}
          <circle r="6" fill="#22D3EE" />
          <circle r="14" fill="none" stroke="#22D3EE" strokeOpacity="0.5" />
          {/* Vertex nodes */}
          {[
            [0, -70],
            [60, -35],
            [60, 35],
            [0, 70],
            [-60, 35],
            [-60, -35],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="2.5" fill="#F4F1EA" />
          ))}
        </g>
      </svg>
    </div>
  );
}
