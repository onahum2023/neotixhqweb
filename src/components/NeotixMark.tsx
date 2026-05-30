type Props = {
  size?: number;
  className?: string;
  glow?: boolean;
};

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
        <linearGradient id="neotix-mark-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      {/* Abstract N: two verticals + diagonal signal path, with nodes at converging vertices */}
      <path
        d="M9 31 L9 9 L31 31 L31 9"
        stroke="url(#neotix-mark-grad)"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* faint inner signal echo */}
      <path
        d="M9 9 L31 31"
        stroke="url(#neotix-mark-grad)"
        strokeWidth="0.8"
        strokeOpacity="0.5"
        strokeDasharray="2 3"
      />
      <circle cx="9" cy="9" r="2.2" fill="#8B5CF6" />
      <circle cx="31" cy="31" r="2.2" fill="#22D3EE" />
      <circle cx="9" cy="31" r="1.3" fill="#F4F1EA" fillOpacity="0.5" />
      <circle cx="31" cy="9" r="1.3" fill="#F4F1EA" fillOpacity="0.5" />
    </svg>
  );
}
