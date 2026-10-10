type Props = {
  size?: number;
  className?: string;
  glow?: boolean;
};

/**
 * NeotixHQ mark — the "Neotix Core".
 * A geometric N described by a constellation of nodes connected by
 * converging signal paths. The diagonal beam carries the dominant signal
 * from the violet origin node down to the cyan structured node, passing
 * through a waypoint that represents the moment fragmented input becomes
 * structured context. Implied verticals are hairlines, never solid bars.
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

      {/* Implied verticals of the N — hairline only */}
      <line x1="9" y1="9" x2="9" y2="31" stroke="#F4F1EA" strokeOpacity="0.22" strokeWidth="0.8" />
      <line
        x1="31"
        y1="9"
        x2="31"
        y2="31"
        stroke="#F4F1EA"
        strokeOpacity="0.22"
        strokeWidth="0.8"
      />

      {/* Converging hairlines — fragmented signals folding into the diagonal */}
      <line
        x1="9"
        y1="31"
        x2="20"
        y2="20"
        stroke="#8B5CF6"
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />
      <line
        x1="31"
        y1="9"
        x2="20"
        y2="20"
        stroke="#22D3EE"
        strokeOpacity="0.35"
        strokeWidth="0.6"
      />

      {/* Dominant diagonal signal beam — the N's diagonal */}
      <line
        x1="9"
        y1="9"
        x2="31"
        y2="31"
        stroke="url(#neotix-beam)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Inner echo on the diagonal — signal trail */}
      <line
        x1="11.5"
        y1="9"
        x2="33.5"
        y2="31"
        stroke="url(#neotix-beam)"
        strokeOpacity="0.22"
        strokeWidth="0.8"
        strokeLinecap="round"
      />

      {/* Corner nodes — define the N silhouette */}
      <circle cx="9" cy="9" r="2.4" fill="#8B5CF6" />
      <circle cx="9" cy="9" r="4.8" stroke="#8B5CF6" strokeOpacity="0.35" />

      <circle cx="31" cy="31" r="2.4" fill="#22D3EE" />
      <circle cx="31" cy="31" r="4.8" stroke="#22D3EE" strokeOpacity="0.35" />

      <circle cx="9" cy="31" r="1.4" fill="#F4F1EA" fillOpacity="0.75" />
      <circle cx="31" cy="9" r="1.4" fill="#F4F1EA" fillOpacity="0.75" />

      {/* Waypoint node — the convergence into structured context */}
      <circle cx="20" cy="20" r="1.6" fill="#F4F1EA" />
      <circle cx="20" cy="20" r="3.2" stroke="#F4F1EA" strokeOpacity="0.35" />
    </svg>
  );
}
