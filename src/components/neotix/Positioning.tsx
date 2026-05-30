const principles = [
  {
    title: "Context over noise",
    body: "We design systems that reduce fragmentation and make important signals easier to see.",
  },
  {
    title: "Workflows over demos",
    body: "We build around real operational friction, not isolated AI tricks.",
  },
  {
    title: "Continuity over fragments",
    body: "We believe the next layer of AI needs persistent context, not disposable interactions.",
  },
  {
    title: "Decisions over answers",
    body: "The goal is not more output. The goal is better judgment and better action.",
  },
];

function Glyph({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
      <defs>
        <linearGradient id={`pg-${i}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {i === 0 && (
        <>
          <circle cx="20" cy="20" r="3" fill={`url(#pg-${i})`} />
          <circle cx="20" cy="20" r="10" stroke={`url(#pg-${i})`} strokeOpacity="0.6" />
          <circle cx="20" cy="20" r="17" stroke={`url(#pg-${i})`} strokeOpacity="0.3" />
        </>
      )}
      {i === 1 && (
        <>
          <line x1="6" y1="12" x2="34" y2="12" stroke={`url(#pg-${i})`} strokeWidth="1.5" />
          <line x1="6" y1="20" x2="26" y2="20" stroke={`url(#pg-${i})`} strokeWidth="1.5" />
          <line x1="6" y1="28" x2="32" y2="28" stroke={`url(#pg-${i})`} strokeWidth="1.5" />
          <circle cx="34" cy="12" r="2" fill="#22D3EE" />
          <circle cx="26" cy="20" r="2" fill="#22D3EE" />
          <circle cx="32" cy="28" r="2" fill="#22D3EE" />
        </>
      )}
      {i === 2 && (
        <>
          <circle cx="10" cy="10" r="2.5" fill={`url(#pg-${i})`} />
          <circle cx="22" cy="18" r="2.5" fill={`url(#pg-${i})`} />
          <circle cx="14" cy="28" r="2.5" fill={`url(#pg-${i})`} />
          <circle cx="30" cy="30" r="2.5" fill={`url(#pg-${i})`} />
          <path d="M10 10 L22 18 L14 28 L30 30" stroke={`url(#pg-${i})`} strokeWidth="1" strokeOpacity="0.6" fill="none" />
        </>
      )}
      {i === 3 && (
        <>
          <path d="M8 26 L18 16 L24 22 L34 10" stroke={`url(#pg-${i})`} strokeWidth="1.5" fill="none" />
          <circle cx="34" cy="10" r="3" fill={`url(#pg-${i})`} />
        </>
      )}
    </svg>
  );
}

export function Positioning() {
  return (
    <section id="principles" className="relative py-14 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-grid-soft mask-fade-edges opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-atmos-cyan opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-3xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Principles
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-balance">
            Principles behind every NeotixHQ system.
          </h2>
        </div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((p, i) => (
            <div
              key={p.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-surface-deep p-7 shadow-card transition-all hover:border-primary/40 hover-glow-cyan overflow-hidden"
            >
              {/* top gradient hairline */}
              <div
                className="absolute inset-x-6 top-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, oklch(0.66 0.22 295 / 0.4), oklch(0.82 0.13 200 / 0.4), transparent)",
                }}
              />
              {/* faint corner Core mark on hover */}
              <svg
                viewBox="0 0 60 60"
                className="absolute -right-2 -top-2 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                aria-hidden
              >
                <line x1="12" y1="12" x2="48" y2="48" stroke="#22D3EE" strokeOpacity="0.35" strokeWidth="1" />
                <circle cx="12" cy="12" r="2" fill="#8B5CF6" />
                <circle cx="48" cy="48" r="2" fill="#22D3EE" />
              </svg>
              <Glyph i={i} />
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
