// Orin — personal AI proposing changes for approval: linked nodes glyph
export function OrinVisual() {
  return (
    <svg viewBox="0 0 64 64" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <rect x="6" y="6" width="52" height="52" rx="9" />
      {/* two nodes */}
      <circle cx="20" cy="32" r="5" />
      <circle cx="44" cy="32" r="5" fill="currentColor" stroke="none" />
      {/* link */}
      <line x1="25" y1="32" x2="39" y2="32" />
      {/* proposal marks above + approval mark below */}
      <line x1="20" y1="18" x2="20" y2="22" />
      <line x1="44" y1="42" x2="44" y2="46" />
    </svg>
  );
}
