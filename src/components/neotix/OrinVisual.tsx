// Orin — personal AI proposing capabilities for approval. Core + orbiting candidate nodes.
export function OrinVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <defs>
        <linearGradient id="orin-grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* boundary */}
      <circle cx="32" cy="32" r="22" stroke="url(#orin-grad)" strokeWidth="1.5" opacity="0.35" strokeDasharray="2 3" />
      {/* orbit */}
      <circle cx="32" cy="32" r="14" stroke="url(#orin-grad)" strokeWidth="1.5" opacity="0.6" />
      {/* core "you" */}
      <circle cx="32" cy="32" r="4.5" fill="url(#orin-grad)" />
      {/* approved capability with connector */}
      <line x1="32" y1="32" x2="46" y2="32" stroke="url(#orin-grad)" strokeWidth="2" />
      <circle cx="46" cy="32" r="3" fill="url(#orin-grad)" />
      {/* candidate nodes (pending approval) */}
      <circle cx="32" cy="18" r="2.8" stroke="url(#orin-grad)" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="18" cy="32" r="2.8" stroke="url(#orin-grad)" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="32" cy="46" r="2.8" stroke="url(#orin-grad)" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}
