/**
 * Segmented signal-line divider — hairline that breaks into small nodes.
 * Asymmetric placement to feel composed rather than generic.
 */
export function SignalDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative mx-auto max-w-7xl px-6 lg:px-10 py-10"
    >
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="w-full h-6"
        fill="none"
      >
        <defs>
          <linearGradient id="sigdiv-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="30%" stopColor="#8B5CF6" stopOpacity="0.45" />
            <stop offset="70%" stopColor="#22D3EE" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* segmented hairline */}
        <line x1="40" y1="12" x2="380" y2="12" stroke="url(#sigdiv-grad)" strokeWidth="1" />
        <line x1="430" y1="12" x2="700" y2="12" stroke="url(#sigdiv-grad)" strokeWidth="1" />
        <line x1="760" y1="12" x2="1160" y2="12" stroke="url(#sigdiv-grad)" strokeWidth="1" />
        {/* nodes at breaks */}
        <circle cx="405" cy="12" r="2" fill="#8B5CF6" />
        <circle cx="405" cy="12" r="5" stroke="#8B5CF6" strokeOpacity="0.35" />
        <circle cx="730" cy="12" r="1.5" fill="#F4F1EA" fillOpacity="0.8" />
        <circle cx="540" cy="12" r="1.2" fill="#22D3EE" />
      </svg>
    </div>
  );
}
