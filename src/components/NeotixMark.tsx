type Props = {
  size?: number;
  className?: string;
  glow?: boolean;
};

/**
 * NeotixHQ mark — abstract "N" as a constellation of nodes.
 * The diagonal signal beam dominates; verticals are implied by hairlines
 * and the alignment of nodes, not by solid bars. Designed to read as a
 * network/signal mark, not a logotype.
 */
export function NeotixMark({ size = 28, className, glow = false }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className ?? ""} ${glow ? "animate-pulse-glow" : ""}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="neotix-beam" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>

      {/* Implied verticals — hairline only, never solid bars */}
      <line x1="9" y1="9" x2="9" y2="31" stroke="#F4F1EA" strokeOpacity="0.18" strokeWidth="0.8" />
      <line x1="31" y1="9" x2="31" y2="31" stroke="#F4F1EA" strokeOpacity="0.18" strokeWidth="0.8" />

      {/* Dominant diagonal signal beam (top-left → bottom-right of the N's diagonal) */}
      <line
        x1="9"
        y1="9"
        x2="31"
        y2="31"
        stroke="url(#neotix-beam)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Faint inner echo on the diagonal — feels like signal trail */}
      <line
        x1="11.5"
        y1="9"
        x2="33.5"
        y2="31"
        stroke="url(#neotix-beam)"
        strokeOpacity="0.25"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Four corner nodes — these define the N silhouette */}
      <circle cx="9" cy="9" r="2.4" fill="#8B5CF6" />
      <circle cx="9" cy="9" r="4.6" stroke="#8B5CF6" strokeOpacity="0.35" />

      <circle cx="31" cy="31" r="2.4" fill="#22D3EE" />
      <circle cx="31" cy="31" r="4.6" stroke="#22D3EE" strokeOpacity="0.35" />

      <circle cx="9" cy="31" r="1.4" fill="#F4F1EA" fillOpacity="0.7" />
      <circle cx="31" cy="9" r="1.4" fill="#F4F1EA" fillOpacity="0.7" />

      {/* Tiny waypoint node mid-diagonal — the "convergence" beat */}
      <circle cx="20" cy="20" r="1.1" fill="#F4F1EA" />
    </svg>
  );
}
