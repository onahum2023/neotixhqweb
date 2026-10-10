/**
 * Hero visual — dense, organic streams of fragmented information flow from
 * the left and converge into the Neotix Core: layered concentric hexagons
 * with a bright violet/cyan center. Structured outputs emit as circuit
 * lines on the right.
 */

function hexPoints(cx: number, cy: number, r: number) {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  }
  return pts;
}

function hexPath(cx: number, cy: number, r: number) {
  const pts = hexPoints(cx, cy, r);
  return (
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z"
  );
}

// Deterministic pseudo-random
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export function SignalConverge() {
  const W = 1000;
  const H = 700;
  const cx = 740;
  const cy = 350;

  // Dense flowing streams spanning full vertical height
  const STREAM_COUNT = 110;
  const streams = Array.from({ length: STREAM_COUNT }, (_, i) => {
    const r1 = rand(i + 1);
    const r2 = rand(i + 101);
    const r3 = rand(i + 201);
    const r4 = rand(i + 301);

    // Start widely fanned across left side
    const startX = 20 + r1 * 220;
    const startY = 20 + (i / STREAM_COUNT) * (H - 40) + (r2 - 0.5) * 40;

    // First control point — large lateral spread
    const cpx1 = startX + 180 + r3 * 220;
    const cpy1 = startY + (r4 - 0.5) * 180;

    // Second control point — pulls toward core
    const cpx2 = cx - 220 + r1 * 120;
    const cpy2 = cy + (r2 - 0.5) * 260;

    // Converge at core left edge
    const endX = cx - 8;
    const endY = cy + (r3 - 0.5) * 24;

    const hue = i % 4 === 0 ? 1 : i % 7 === 0 ? 2 : 0; // mostly violet, some cyan/white
    const opacity = 0.35 + r2 * 0.5;
    const width = 0.5 + r3 * 0.9;
    const delay = (i % 16) * 0.35;

    return {
      d: `M ${startX} ${startY} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${endX} ${endY}`,
      hue,
      opacity,
      width,
      delay,
    };
  });

  // Scattered particles across the left/middle field
  const PARTICLES = 130;
  const particles = Array.from({ length: PARTICLES }, (_, i) => {
    const r1 = rand(i + 500);
    const r2 = rand(i + 600);
    const r3 = rand(i + 700);
    // Bias toward left/middle, sparse near core
    const x = 30 + r1 * (cx - 80);
    const y = 20 + r2 * (H - 40);
    const kind = i % 5;
    const hue = i % 3;
    const size = 1 + r3 * 2.4;
    const delay = (i % 18) * 0.28;
    return { x, y, kind, hue, size, delay };
  });

  // Output circuit lines on the right
  const OUTPUTS = 11;
  const outputs = Array.from({ length: OUTPUTS }, (_, i) => {
    const startX = cx + 110;
    const startY = cy - 180 + i * 36;
    const midX = startX + 70 + (i % 3) * 40;
    const endX = W - 10;
    const endY = startY + (i % 2 === 0 ? -14 : 14);
    return {
      d: `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`,
      sx: startX,
      sy: startY,
      ex: endX,
      ey: endY,
    };
  });

  const colorFor = (hue: number) => (hue === 0 ? "#8B5CF6" : hue === 1 ? "#22D3EE" : "#F4F1EA");

  const outerHex = hexPath(cx, cy, 130);
  const midHex = hexPath(cx, cy, 100);
  const innerHex = hexPath(cx, cy, 72);
  const tinyHex = hexPath(cx, cy, 38);
  const outerPts = hexPoints(cx, cy, 130);

  return (
    <div className="relative w-full aspect-[10/7] max-w-[820px] mx-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stream-violet" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="stream-cyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="stream-white" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F4F1EA" stopOpacity="0" />
            <stop offset="60%" stopColor="#C4B5FD" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.95" />
          </linearGradient>

          <radialGradient id="core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4F1EA" stopOpacity="1" />
            <stop offset="15%" stopColor="#E9D5FF" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer halo glow behind the core */}
        <circle cx={cx} cy={cy} r="280" fill="url(#core-halo)" />

        {/* Flowing streams */}
        <g>
          {streams.map((s, i) => {
            const grad =
              s.hue === 0
                ? "url(#stream-violet)"
                : s.hue === 1
                  ? "url(#stream-cyan)"
                  : "url(#stream-white)";
            return (
              <path
                key={`s-${i}`}
                d={s.d}
                stroke={grad}
                strokeWidth={s.width}
                strokeOpacity={s.opacity}
                strokeLinecap="round"
                fill="none"
                className="animate-dash"
                style={{ animationDelay: `${s.delay}s` }}
              />
            );
          })}
        </g>

        {/* Particle fragments */}
        <g>
          {particles.map((p, i) => {
            const c = colorFor(p.hue);
            return (
              <g
                key={`p-${i}`}
                className="animate-drift"
                style={{
                  animationDelay: `${p.delay}s`,
                  transformOrigin: `${p.x}px ${p.y}px`,
                }}
              >
                {p.kind === 0 && <circle cx={p.x} cy={p.y} r={p.size} fill={c} fillOpacity="0.9" />}
                {p.kind === 1 && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.size + 1.6}
                    stroke={c}
                    strokeOpacity="0.6"
                    strokeWidth="0.8"
                  />
                )}
                {p.kind === 2 && (
                  <rect
                    x={p.x - p.size}
                    y={p.y - p.size}
                    width={p.size * 2}
                    height={p.size * 2}
                    fill={c}
                    fillOpacity="0.8"
                  />
                )}
                {p.kind === 3 && (
                  <rect
                    x={p.x - p.size}
                    y={p.y - p.size}
                    width={p.size * 2}
                    height={p.size * 2}
                    stroke={c}
                    strokeOpacity="0.55"
                    strokeWidth="0.7"
                  />
                )}
                {p.kind === 4 && (
                  <circle cx={p.x} cy={p.y} r="0.9" fill="#F4F1EA" fillOpacity="0.95" />
                )}
              </g>
            );
          })}
        </g>

        {/* Output circuit lines */}
        <g>
          {outputs.map((o, i) => (
            <g key={`o-${i}`}>
              <path
                d={o.d}
                stroke="#22D3EE"
                strokeOpacity="0.55"
                strokeWidth="0.9"
                fill="none"
                strokeLinecap="square"
              />
              <circle cx={o.sx} cy={o.sy} r="1.6" fill="#22D3EE" fillOpacity="0.9" />
              <circle cx={o.ex} cy={o.ey} r="2.2" fill="#22D3EE" fillOpacity="0.95" />
            </g>
          ))}
        </g>

        {/* Core — layered concentric hexagons */}
        <g>
          <path d={outerHex} stroke="#22D3EE" strokeOpacity="0.7" strokeWidth="1.1" />
          <path d={midHex} stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="1" />
          <path d={innerHex} stroke="#8B5CF6" strokeOpacity="0.7" strokeWidth="1" />
          <path d={tinyHex} stroke="#F4F1EA" strokeOpacity="0.6" strokeWidth="0.8" />

          {/* Vertex nodes on outer hex */}
          {outerPts.map((p, i) => (
            <circle
              key={`v-${i}`}
              cx={p.x}
              cy={p.y}
              r="2.6"
              fill={i % 2 === 0 ? "#22D3EE" : "#8B5CF6"}
              fillOpacity="0.95"
            />
          ))}

          {/* Bright center */}
          <circle
            cx={cx}
            cy={cy}
            r="80"
            fill="url(#core-glow)"
            className="animate-pulse-glow"
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
          <circle cx={cx} cy={cy} r="4" fill="#F4F1EA" />
          <circle cx={cx} cy={cy} r="10" stroke="#F4F1EA" strokeOpacity="0.55" />
        </g>
      </svg>
    </div>
  );
}
