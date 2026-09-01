interface RadarLogoProps {
  className?: string
  variant?: 'full' | 'symbol' | 'horizontal'
  size?: 'sm' | 'md' | 'lg'
}

/**
 * Official RADAR Logo component:
 * - Symbol: two leaves/petals icon (left is deep green #113D30, right is lavender #9388BF / #7C74AC)
 * - Text: "radar" in lowercase elegant serif font (Playfair Display) in #113D30
 * - Subtitle: "D A   G E R A Ç Ã O" in uppercase lavender #7C74AC with wide letter-spacing (tracking-[0.35em])
 */
export function RadarLogo({ className = '', variant = 'full', size = 'md' }: RadarLogoProps) {
  // Sizing definitions
  const symbolSizes = {
    sm: { w: 26, h: 28 },
    md: { w: 34, h: 36 },
    lg: { w: 48, h: 52 },
  }

  const { w, h } = symbolSizes[size]

  // Leaves symbol SVG
  const symbolSvg = (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100 106"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none flex-shrink-0"
      aria-hidden="true"
    >
      {/* Left green leaf (lower stem + quadrant upper arc) */}
      <path d="M 6 100 L 6 36 C 6 16.1177 22.1177 0 42 0 L 48 0 L 48 100 Z" fill="#113D30" />
      {/* Subtle interior depth tone on left leaf */}
      <path d="M 6 42 C 18 42 36 60 48 85 L 48 100 L 6 100 Z" fill="#0E3228" opacity="0.25" />
      {/* Right lavender leaf (rounded top-left petal shape) */}
      <path
        d="M 52 46 L 52 20 C 52 8.9543 60.9543 0 72 0 L 94 0 C 94 25.4051 73.4051 46 48 46 Z"
        fill="#9388BF"
      />
    </svg>
  )

  if (variant === 'symbol') {
    return <div className={`inline-flex items-center ${className}`}>{symbolSvg}</div>
  }

  const textSizes = {
    sm: {
      radar: 'text-xl tracking-tight leading-none',
      sub: 'text-[0.55rem] tracking-[0.32em] mt-0.5',
    },
    md: {
      radar: 'text-2xl sm:text-[1.75rem] tracking-tight leading-none',
      sub: 'text-[0.625rem] sm:text-[0.7rem] tracking-[0.36em] mt-1',
    },
    lg: {
      radar: 'text-4xl sm:text-5xl tracking-tight leading-none',
      sub: 'text-xs sm:text-sm tracking-[0.4em] mt-1.5',
    },
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      {symbolSvg}
      <div className="flex flex-col justify-center">
        <span
          className={`font-serif font-semibold text-[#113D30] lowercase ${textSizes[size].radar}`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          radar
        </span>
        <span
          className={`font-bold uppercase text-[#7C74AC] ${textSizes[size].sub} font-sans leading-none pl-0.5`}
        >
          DA GERAÇÃO
        </span>
      </div>
    </div>
  )
}
