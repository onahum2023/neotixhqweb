/**
 * Fragment divider — two short hairlines flanking a faint Core fragment
 * that appears to cross the section boundary.
 */
export function FragmentDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto max-w-7xl px-6 lg:px-10 py-10"
    >
      <div className="relative flex items-center gap-6">
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(1 0 0 / 0.12))",
          }}
        />
        <svg viewBox="0 0 80 40" className="w-20 h-10" fill="none" aria-hidden>
          <defs>
            <linearGradient id="fragdiv-beam" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          {/* fragment of the Core motif — a partial N */}
          <line x1="14" y1="6" x2="14" y2="34" stroke="#F4F1EA" strokeOpacity="0.18" />
          <line x1="66" y1="6" x2="66" y2="34" stroke="#F4F1EA" strokeOpacity="0.18" />
          <line
            x1="14"
            y1="6"
            x2="66"
            y2="34"
            stroke="url(#fragdiv-beam)"
            strokeOpacity="0.7"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <circle cx="14" cy="6" r="2.2" fill="#8B5CF6" />
          <circle cx="66" cy="34" r="2.2" fill="#22D3EE" />
        </svg>
        <div
          className="h-px flex-1"
          style={{
            background:
              "linear-gradient(to left, transparent, oklch(1 0 0 / 0.12))",
          }}
        />
      </div>
    </div>
  );
}
