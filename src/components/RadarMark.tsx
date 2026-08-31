interface RadarMarkProps {
  className?: string
  size?: number
}

/**
 * Minimalist, abstract radar mark:
 * A thin-stroke green circle with 2-3 simple concentric arcs/waves radiating from a center dot.
 * Static SVG, clean, light, no complex animation or glow.
 */
export function RadarMark({ className = '', size = 260 }: RadarMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
      aria-hidden="true"
    >
      {/* Outer bounding circle */}
      <circle cx="120" cy="120" r="104" stroke="#245C45" strokeWidth="1.5" strokeOpacity="0.35" />

      {/* Middle concentric wave */}
      <circle cx="120" cy="120" r="72" stroke="#245C45" strokeWidth="1.5" strokeOpacity="0.55" />

      {/* Inner wave */}
      <circle cx="120" cy="120" r="40" stroke="#245C45" strokeWidth="1.5" strokeOpacity="0.8" />

      {/* Soft radar sweep quadrant arc (top-right orientation) */}
      <path
        d="M 120 48 A 72 72 0 0 1 192 120"
        stroke="#245C45"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M 120 16 A 104 104 0 0 1 224 120"
        stroke="#245C45"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Subtle coordinate crosshair markers (minimalist) */}
      <line
        x1="120"
        y1="20"
        x2="120"
        y2="30"
        stroke="#245C45"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="120"
        y1="210"
        x2="120"
        y2="220"
        stroke="#245C45"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="20"
        y1="120"
        x2="30"
        y2="120"
        stroke="#245C45"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />
      <line
        x1="210"
        y1="120"
        x2="220"
        y2="120"
        stroke="#245C45"
        strokeWidth="1.5"
        strokeOpacity="0.6"
      />

      {/* Center signal dot */}
      <circle cx="120" cy="120" r="4.5" fill="#245C45" />

      {/* Subtle small radar blip */}
      <circle cx="160" cy="80" r="3" fill="#245C45" />
    </svg>
  )
}
