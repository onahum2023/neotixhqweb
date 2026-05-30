/**
 * Subtle section divider using the Neotix Core motif —
 * a hairline rule with the convergence waypoint at its center.
 */
export function CoreDivider() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 lg:px-10" aria-hidden="true">
      <div className="relative flex items-center gap-4 py-6 opacity-70">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-border" />
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <defs>
            <linearGradient id="cd-beam" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
          <line x1="4" y1="4" x2="18" y2="18" stroke="url(#cd-beam)" strokeWidth="1.4" strokeLinecap="round" />
          <circle cx="4" cy="4" r="1.6" fill="#8B5CF6" />
          <circle cx="18" cy="18" r="1.6" fill="#22D3EE" />
          <circle cx="11" cy="11" r="1.2" fill="#F4F1EA" />
          <circle cx="11" cy="11" r="2.6" stroke="#F4F1EA" strokeOpacity="0.3" />
        </svg>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-border" />
      </div>
    </div>
  );
}
