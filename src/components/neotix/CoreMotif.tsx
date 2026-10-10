/**
 * Reusable oversized Neotix Core motif — a faint geometric N with
 * a diagonal beam, intended as a low-opacity background element.
 * Inherits color via currentColor where possible and uses very low
 * stroke opacities so it sits behind content without competing.
 */
type Props = {
  className?: string;
  opacity?: number;
  rotate?: number;
};

export function CoreMotif({ className, opacity = 0.06, rotate = 0 }: Props) {
  return (
    <svg
      viewBox="0 0 400 400"
      className={className}
      fill="none"
      aria-hidden="true"
      style={{ opacity, transform: rotate ? `rotate(${rotate}deg)` : undefined }}
    >
      <defs>
        <linearGradient id="motif-beam" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* implied verticals */}
      <line x1="60" y1="60" x2="60" y2="340" stroke="#F4F1EA" strokeOpacity="0.5" strokeWidth="1" />
      <line
        x1="340"
        y1="60"
        x2="340"
        y2="340"
        stroke="#F4F1EA"
        strokeOpacity="0.5"
        strokeWidth="1"
      />
      {/* diagonal beam */}
      <line
        x1="60"
        y1="60"
        x2="340"
        y2="340"
        stroke="url(#motif-beam)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* corner nodes */}
      <circle cx="60" cy="60" r="8" fill="#8B5CF6" />
      <circle cx="340" cy="340" r="8" fill="#22D3EE" />
      <circle cx="60" cy="340" r="4" fill="#F4F1EA" />
      <circle cx="340" cy="60" r="4" fill="#F4F1EA" />
      {/* center waypoint */}
      <circle cx="200" cy="200" r="4" fill="#F4F1EA" />
      <circle cx="200" cy="200" r="14" stroke="#F4F1EA" strokeOpacity="0.6" />
    </svg>
  );
}
