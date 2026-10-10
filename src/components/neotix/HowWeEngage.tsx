import { SectionGraphics } from "./SectionGraphics";

const modes = [
  {
    label: "Advisory",
    body: "Helping organizations navigate emerging AI opportunities and challenges.",
  },
  {
    label: "Design",
    body: "Exploring new interaction models, workflows, and cognitive systems.",
  },
  {
    label: "Build",
    body: "Developing prototypes, platforms, and AI-native experiences.",
  },
];

function Mark({ i }: { i: number }) {
  return (
    <svg viewBox="0 0 40 40" className="w-9 h-9" fill="none" aria-hidden>
      <defs>
        <linearGradient id={`eg-${i}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {i === 0 && (
        <>
          <path d="M8 28 L20 10 L32 28" stroke={`url(#eg-${i})`} strokeWidth="1.5" />
          <circle cx="20" cy="10" r="2.5" fill={`url(#eg-${i})`} />
          <line
            x1="8"
            y1="28"
            x2="32"
            y2="28"
            stroke="#22D3EE"
            strokeOpacity="0.5"
            strokeWidth="1"
          />
        </>
      )}
      {i === 1 && (
        <>
          <rect x="8" y="8" width="24" height="24" stroke={`url(#eg-${i})`} strokeWidth="1.5" />
          <line x1="8" y1="20" x2="32" y2="20" stroke="#22D3EE" strokeOpacity="0.55" />
          <line x1="20" y1="8" x2="20" y2="32" stroke="#22D3EE" strokeOpacity="0.55" />
          <circle cx="20" cy="20" r="3" fill={`url(#eg-${i})`} />
        </>
      )}
      {i === 2 && (
        <>
          <path
            d="M10 30 L10 14 L20 8 L30 14 L30 30 Z"
            stroke={`url(#eg-${i})`}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <line x1="20" y1="8" x2="20" y2="30" stroke="#22D3EE" strokeOpacity="0.5" />
          <circle cx="20" cy="20" r="2.5" fill={`url(#eg-${i})`} />
        </>
      )}
    </svg>
  );
}

export function HowWeEngage() {
  return (
    <section
      id="engage"
      className="relative py-14 lg:py-20 overflow-hidden"
      style={{ backgroundColor: "var(--color-surface-deep)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 90% 30%, oklch(0.82 0.13 200 / 0.08), transparent 60%)",
        }}
      />
      <SectionGraphics diagonal="tr-bl" gridOpacity={0.25} />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            How We Engage
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-semibold tracking-tight text-balance">
            From ideas to practical applications.
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            We explore, design, and build at the intersection of AI, technology, and business. Some
            of that work becomes products, like Meridian. Other work takes shape through
            collaborations with organizations navigating new technologies, exploring opportunities,
            or turning ambitious ideas into practical solutions.
          </p>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed">
            Our experience spans AI strategy, solution architecture, cloud and data platforms, and
            the challenges of bringing emerging technology into real-world environments.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {modes.map((m, i) => (
            <article
              key={m.label}
              className="group relative rounded-2xl border border-white/[0.06] bg-background/40 p-7 shadow-card transition-all hover:border-accent/40 hover-glow-cyan overflow-hidden"
            >
              <div
                className="absolute inset-y-6 left-0 w-px opacity-60"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, oklch(0.66 0.22 295 / 0.6), transparent)",
                }}
              />
              <Mark i={i} />
              <h3 className="mt-6 text-lg font-semibold tracking-tight">{m.label}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
