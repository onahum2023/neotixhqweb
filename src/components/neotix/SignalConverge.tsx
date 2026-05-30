/**
 * Hero visual — dense streams of fragmented information flow from the left
 * and are absorbed into the Neotix Core: a layered hexagonal device with a
 * bright violet/cyan center. Structured outputs emit as circuit lines on
 * the right, suggesting context turned into action.
 */

function hexPoints(cx: number, cy: number, r: number) {
  // pointy-top hexagon
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
  }
  return pts;
}

function hexPath(cx: number, cy: number, r: number) {
  const pts = hexPoints(cx, cy, r);
  return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ") + " Z";
}

export function SignalConverge() {
  const W = 900;
  const H = 600;
  const cx = 640;
  const cy = 300;

  // Many flowing streams — random-ish but deterministic
  const STREAM_COUNT = 64;
  const streams = Array.from({ length: STREAM_COUNT }, (_, i) => {
    const t = i / (STREAM_COUNT - 1);
    // Vertical fan on the left side
    const startX = 60 + ((i * 37) % 180);
    const startY = 40 + t * (H - 80) + ((i * 53) % 30) - 15;
    // Control points bend toward the core
    const cpx1 = startX + 140 + ((i * 71) % 90);
    const cpy1 = startY + ((i * 91) % 80) - 40;
    const cpx2 = cx - 160 + ((i * 29) % 80);
    const cpy2 = cy + ((i * 113) % 200) - 100;
    const endX = cx - 18; // arrive at core left edge
    const endY = cy + ((i * 17) % 60) - 30;
    const opacity = 0.18 + ((i * 13) % 35) / 100;
    const width = 0.4 + ((i * 7) % 6) / 10;
    const hue = i % 3; // 0 violet, 1 cyan, 2 white
    const delay = (i % 12) * 0.4;
    return {
      d: `M ${startX} ${startY} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${endX} ${endY}`,
      opacity,
      width,
      hue,
      delay,
    };
  });

  // Scattered particle fragments along the streams area
  const PARTICLES = 70;
  const particles = Array.from({ length: PARTICLES }, (_, i) => {
    const x = 70 + ((i * 53) % 460);
    const y = 30 + ((i * 97) % (H - 60));
    const kind = i % 5; // dot, ring, square, micro-square, micro-dot
    const hue = i % 3;
    const delay = (i % 14) * 0.3;
    return { x, y, kind, hue, delay, size: 1 + ((i * 11) % 4) };
  });

  // Output circuit lines on the right
  const OUTPUTS = 9;
  const outputs = Array.from({ length: OUTPUTS }, (_, i) => {
    const startX = cx + 90;
    const startY = cy - 140 + i * 35;
    const midX = startX + 60 + (i % 3) * 30;
    const endX = W - 20;
    const endY = startY + (i % 2 === 0 ? -10 : 10);
    return {
      d: `M ${startX} ${startY} L ${midX} ${startY} L ${midX} ${endY} L ${endX} ${endY}`,
      delay: i * 0.2,
    };
  });

  const colorFor = (hue: number) =>
    hue === 0 ? "#8B5CF6" : hue === 1 ? "#22D3EE" : "#F4F1EA";

  // Core hex layers
  const outerHex = hexPath(cx, cy, 120);
  const midHex = hexPath(cx, cy, 90);
  const innerHex = hexPath(cx, cy, 60);
  const tinyHex = hexPath(cx, cy, 28);

  // Vertices for output anchor dots
  const outerPts = hexPoints(cx, cy, 120);

  return (
    <div className="relative w-full aspect-[3/2] max-w-[720px] mx-auto">
      <div
        className="absolute inset-0 rounded-full blur-3xl opacity-60"
        style={{ background: "var(--gradient-radial)" }}
      />
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="relative w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="stream-violet" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="stream-cyan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="stream-white" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F4F1EA" stopOpacity="0" />
            <stop offset="60%" stopColor="#F4F1EA" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.7" />
          </linearGradient>

          <radialGradient id="core-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4F1EA" stopOpacity="1" />
            <stop offset="25%" stopColor="#C4B5FD" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-halo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#22D3EE" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hex-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>

          <filter id="soft-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Outer halo glow behind the core */}
        <circle cx={cx} cy={cy} r="240" fill="url(#core-halo)" />

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
                {p.kind === 0 && (
                  <circle cx={p.x} cy={p.y} r={p.size} fill={c} fillOpacity="0.85" />
                )}
                {p.kind === 1 && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={p.size + 1.5}
                    stroke={c}
                    strokeOpacity="0.55"
                    strokeWidth="0.7"
                  />
                )}
                {p.kind === 2 && (
                  <rect
                    x={p.x - p.size}
                    y={p.y - p.size}
                    width={p.size * 2}
                    height={p.size * 2}
                    fill={c}
                    fillOpacity="0.7"
                  />
                )}
                {p.kind === 3 && (
                  <rect
                    x={p.x - p.size}
                    y={p.y - p.size}
                    width={p.size * 2}
                    height={p.size * 2}
                    stroke={c}
                    strokeOpacity="0.5"
                    strokeWidth="0.6"
                  />
                )}
                {p.kind === 4 && (
                  <circle cx={p.x} cy={p.y} r="0.8" fill="#F4F1EA" fillOpacity="0.9" />
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
                strokeOpacity="0.45"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="square"
              />
              <circle
                cx={o.d.split("L").slice(-1)[0].trim().split(" ")[0]}
                cy={o.d.split("L").slice(-1)[0].trim().split(" ")[1]}
                r="2"
                fill="#22D3EE"
                fillOpacity="0.8"
              />
            </g>
          ))}
        </g>

        {/* Core — layered hexagons */}
        <g className="animate-pulse-glow" style={{ transformOrigin: `${cx}px ${cy}px` }}>
          {/* Outer hex with gradient edge */}
          <path d={outerHex} stroke="url(#hex-edge)" strokeWidth="1.5" strokeOpacity="0.85" />
          {/* Inner ring hexes */}
          <path d={midHex} stroke="#22D3EE" strokeOpacity="0.55" strokeWidth="1" />
          <path d={innerHex} stroke="#8B5CF6" strokeOpacity="0.6" strokeWidth="1" />
          <path d={tinyHex} stroke="#F4F1EA" strokeOpacity="0.7" strokeWidth="0.8" />

          {/* Vertex nodes on outer hex */}
          {outerPts.map((p, i) => (
            <g key={`v-${i}`}>
              <circle cx={p.x} cy={p.y} r="3.5" fill={i % 2 === 0 ? "#8B5CF6" : "#22D3EE"} />
              <circle
                cx={p.x}
                cy={p.y}
                r="7"
                stroke={i % 2 === 0 ? "#8B5CF6" : "#22D3EE"}
                strokeOpacity="0.35"
              />
            </g>
          ))}

          {/* Bright center */}
          <circle cx={cx} cy={cy} r="60" fill="url(#core-center)" />
          <circle cx={cx} cy={cy} r="6" fill="#F4F1EA" />
          <circle cx={cx} cy={cy} r="14" stroke="#F4F1EA" strokeOpacity="0.55" />
        </g>
      </svg>
    </div>
  );
}
