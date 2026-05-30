// Orin — personal AI proposing capabilities for approval. Logo: core + orbiting nodes inside framed mark.
export function OrinVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      {/* framed mark */}
      <rect x="6" y="6" width="52" height="52" rx="9" />
      {/* core */}
      <circle cx="32" cy="32" r="4" fill="currentColor" stroke="none" />
      {/* orbit */}
      <circle cx="32" cy="32" r="13" strokeWidth="2" strokeDasharray="2 3" />
      {/* approved node */}
      <circle cx="45" cy="32" r="2.6" fill="currentColor" stroke="none" />
      {/* candidate nodes */}
      <circle cx="32" cy="19" r="2.6" strokeWidth="2" />
      <circle cx="19" cy="32" r="2.6" strokeWidth="2" />
    </svg>
  );
}
