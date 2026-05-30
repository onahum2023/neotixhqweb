/**
 * Hero visual — fragmented information particles drift on the left and
 * are gently absorbed into the Neotix Core on the right. The Core is the
 * brand device: a geometric N described by corner nodes, a violet→cyan
 * diagonal beam, and a structured center waypoint.
 *
 * Design intent: signals as floating context particles being organized,
 * NOT as projectiles aimed at a target.
 */
type Fragment = {
  type: "arc" | "dot" | "glyph-bracket" | "glyph-cross" | "glyph-square";
  x: number;
  y: number;
  delay: number;
  scale?: number;
};

export function SignalConverge() {
  const fragments: Fragment[] = [
    { type: "arc", x: 30, y: 60, delay: 0 },
    { type: "dot", x: 70, y: 100, delay: 0.6 },
    { type: "glyph-bracket", x: 20, y: 145, delay: 1.2 },
    { type: "arc", x: 95, y: 185, delay: 0.3, scale: 0.8 },
    { type: "glyph-cross", x: 40, y: 230, delay: 1.8 },
    { type: "dot", x: 80, y: 270, delay: 0.9 },
    { type: "glyph-square", x: 30, y: 310, delay: 2.2 },
    { type: "arc", x: 110, y: 80, delay: 1.5, scale: 0.7 },
    { type: "dot", x: 60, y: 340, delay: 0.4 },
    { type: "glyph-bracket", x: 100, y: 250, delay: 1.7, scale: 0.85 },
    { type: "dot", x: 130, y: 160, delay: 2.4 },
    { type: "arc", x: 50, y: 200, delay: 1.0, scale: 0.9 },
  ];

  // Neotix Core geometry
  const cx = 360;
  const cy = 200;
  const r = 90;
  const nTL = { x: cx - r, y: cy - r };
  const nBL = { x: cx - r, y: cy + r };
  const nTR = { x: cx + r, y: cy - r };
  const nBR = { x: cx + r, y: cy + r };
  const waypoint = { x: cx, y: cy };

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
          <linearGradient id="conv-trail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#F4F1EA" stopOpacity="0" />
            <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.55" />
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
          <radialGradient id="absorb-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F4F1EA" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#F4F1EA" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Curved trails — long, gentle, fading INTO the core (no arrowheads) */}
        {fragments.map((f, i) => {
          // Random-feeling control points so trails curve organically toward the waypoint
          const midX = (f.x + waypoint.x) / 2 + (i % 2 === 0 ? -20 : 20);
          const midY = (f.y + waypoint.y) / 2 + (i % 3 === 0 ? -30 : 30);
          return (
            <path
              key={`tr-${i}`}
              d={`M ${f.x} ${f.y} Q ${midX} ${midY} ${waypoint.x} ${waypoint.y}`}
              stroke="url(#conv-trail)"
              strokeWidth="0.6"
              strokeOpacity="0.35"
              className="animate-dash"
              style={{ animationDelay: `${f.delay}s` }}
              fill="none"
            />
          );
        })}

        {/* Floating fragments — particles, arcs, micro-glyphs (NO arrows) */}
        {fragments.map((f, i) => {
          const s = f.scale ?? 1;
          return (
            <g
              key={`f-${i}`}
              className="animate-drift"
              style={{ animationDelay: `${f.delay}s`, transformOrigin: `${f.x}px ${f.y}px` }}
              transform={`translate(${f.x} ${f.y}) scale(${s})`}
            >
              {f.type === "arc" && (
                <path
                  d="M -10 0 Q 0 -6 10 0"
                  stroke="#F4F1EA"
                  strokeOpacity="0.55"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              )}
              {f.type === "dot" && (
                <>
                  <circle r="1.6" fill="#F4F1EA" fillOpacity="0.8" />
                  <circle r="4" stroke="#F4F1EA" strokeOpacity="0.18" />
                </>
              )}
              {f.type === "glyph-bracket" && (
                <>
                  <path
                    d="M -6 -4 L -8 -4 L -8 4 L -6 4"
                    stroke="#8B5CF6"
                    strokeOpacity="0.7"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 6 -4 L 8 -4 L 8 4 L 6 4"
                    stroke="#22D3EE"
                    strokeOpacity="0.7"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <circle r="1" fill="#F4F1EA" fillOpacity="0.7" />
                </>
              )}
              {f.type === "glyph-cross" && (
                <>
                  <line x1="-5" y1="0" x2="5" y2="0" stroke="#F4F1EA" strokeOpacity="0.5" strokeWidth="0.9" />
                  <line x1="0" y1="-5" x2="0" y2="5" stroke="#F4F1EA" strokeOpacity="0.5" strokeWidth="0.9" />
                </>
              )}
              {f.type === "glyph-square" && (
                <>
                  {/* incomplete square — three sides */}
                  <path
                    d="M -5 -5 L 5 -5 L 5 5"
                    stroke="#8B5CF6"
                    strokeOpacity="0.6"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle cx="-5" cy="5" r="1.2" fill="#22D3EE" fillOpacity="0.8" />
                </>
              )}
            </g>
          );
        })}

        {/* Core glow */}
        <circle cx={cx} cy={cy} r="140" fill="url(#core-glow)" />

        {/* Absorption halo — signals dissolve here */}
        <circle cx={cx} cy={cy} r="40" fill="url(#absorb-glow)" />

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
