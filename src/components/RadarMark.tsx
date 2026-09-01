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
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient background ring elements in soft lavender & green */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 240 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Subtle geometric circles */}
        <circle
          cx="120"
          cy="120"
          r="108"
          stroke="#113D30"
          strokeWidth="1"
          strokeOpacity="0.12"
          strokeDasharray="3 4"
        />
        <circle cx="120" cy="120" r="82" stroke="#7C74AC" strokeWidth="1.2" strokeOpacity="0.25" />
        <circle cx="120" cy="120" r="54" stroke="#113D30" strokeWidth="1.2" strokeOpacity="0.2" />

        {/* Soft elegant arcs */}
        <path
          d="M 120 38 A 82 82 0 0 1 202 120"
          stroke="#9388BF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.75"
        />
        <path
          d="M 120 12 A 108 108 0 0 1 228 120"
          stroke="#113D30"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeOpacity="0.65"
        />

        {/* Minimalist leaf mark at center */}
        <g transform="translate(92, 85) scale(0.55)">
          {/* Left dark green leaf */}
          <path d="M 6 100 L 6 36 C 6 16.1177 22.1177 0 42 0 L 48 0 L 48 100 Z" fill="#113D30" />
          {/* Right lavender leaf */}
          <path
            d="M 52 46 L 52 20 C 52 8.9543 60.9543 0 72 0 L 94 0 C 94 25.4051 73.4051 46 48 46 Z"
            fill="#9388BF"
          />
        </g>
      </svg>
    </div>
  )
}
