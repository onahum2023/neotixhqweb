/**
 * Mission section — restated brand promise with a 4-step horizontal
 * connector showing the flow: signals → context → decisions → impact.
 */

const steps = [
  {
    title: "Fragmented signals",
    body: "Information is everywhere but rarely connected.",
    glyph: "dots",
  },
  {
    title: "Structured context",
    body: "We build systems that preserve continuity and reveal meaning.",
    glyph: "rings",
  },
  {
    title: "Better decisions",
    body: "Context changes how we think, decide, and act.",
    glyph: "triangle",
  },
  {
    title: "Real-world impact",
    body: "Better decisions lead to better outcomes.",
    glyph: "star",
  },
] as const;

function StepGlyph({ kind }: { kind: (typeof steps)[number]["glyph"] }) {
  return (
    <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`mg-${kind}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {kind === "dots" && (
        <g fill="#8B5CF6">
          {Array.from({ length: 13 }).map((_, i) => {
            const angle = (i / 13) * Math.PI * 2;
            const r = 9 + ((i * 7) % 5);
            const x = 24 + r * Math.cos(angle);
            const y = 24 + r * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={1.6}
                fillOpacity={0.5 + ((i * 13) % 50) / 100}
              />
            );
          })}
        </g>
      )}
      {kind === "rings" && (
        <>
          <circle cx="24" cy="24" r="3" fill={`url(#mg-${kind})`} />
          <circle cx="24" cy="24" r="9" stroke="#22D3EE" strokeOpacity="0.7" />
          <circle cx="24" cy="24" r="16" stroke="#22D3EE" strokeOpacity="0.35" />
        </>
      )}
      {kind === "triangle" && (
        <>
          <path
            d="M24 8 L40 36 L8 36 Z"
            stroke={`url(#mg-${kind})`}
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <path
            d="M24 8 L24 36 M8 36 L40 36 M16 22 L32 22"
            stroke="#22D3EE"
            strokeOpacity="0.55"
            strokeWidth="0.8"
          />
          <circle cx="24" cy="24" r="2" fill={`url(#mg-${kind})`} />
        </>
      )}
      {kind === "star" && (
        <g stroke={`url(#mg-${kind})`} strokeWidth="1.2" strokeLinecap="round">
          <line x1="24" y1="6" x2="24" y2="42" />
          <line x1="6" y1="24" x2="42" y2="24" />
          <line x1="11" y1="11" x2="37" y2="37" />
          <line x1="37" y1="11" x2="11" y2="37" />
          <circle cx="24" cy="24" r="2.2" fill="#F4F1EA" stroke="none" />
        </g>
      )}
    </svg>
  );
}

export function Mission() {
  return (
    <div id="mission" className="relative">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground">
            Our mission is simple
          </p>
          <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[1.2] text-balance text-foreground/85">
            Transform{" "}
            <span style={{ color: "#C4B5FD" }}>information</span> into{" "}
            <span style={{ color: "#67E8F9" }}>context</span>. Context into{" "}
            <span style={{ color: "#A5B4FC" }}>insight</span>. Insight into{" "}
            <span style={{ color: "#67E8F9" }}>action</span>.
          </h2>
        </div>

        {/* Connector line with waypoints */}
        <div className="relative mt-20 lg:mt-24">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-0 h-px hidden md:block"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, oklch(0.85 0.02 280 / 0.18) 8%, oklch(0.85 0.02 280 / 0.18) 92%, transparent 100%)",
            }}
          />
          {/* Waypoint dots aligned to step centers */}
          <div className="absolute left-0 right-0 -top-1 hidden md:grid grid-cols-4" aria-hidden="true">
            {steps.map((s, i) => (
              <div key={s.title} className="flex justify-center">
                <span
                  className="size-1.5 rounded-full"
                  style={{
                    background: i % 2 === 0 ? "#8B5CF6" : "#22D3EE",
                    boxShadow:
                      i % 2 === 0
                        ? "0 0 10px 2px oklch(0.66 0.22 295 / 0.55)"
                        : "0 0 10px 2px oklch(0.82 0.13 200 / 0.5)",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pt-12">
            {steps.map((s) => (
              <div key={s.title} className="flex items-start gap-4">
                <StepGlyph kind={s.glyph} />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
