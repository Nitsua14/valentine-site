import { useState, useEffect } from 'react'

/**
 * ArcHeading: Displays text along a soft arch with letter-by-letter fade+slide.
 * Letters are spaced so they don't overlap — each gets its own x position along the arc.
 */
const ARC_RADIUS = 480
const ARC_ANGLE_SPAN = 0.85

export default function ArcHeading({ text = "Heyyy! Beautiful!!", visible = true }) {
  const [letters, setLetters] = useState(() =>
    text.split('').map((char, i) => ({ char, i }))
  )

  useEffect(() => {
    setLetters(text.split('').map((char, i) => ({ char, i })))
  }, [text])

  return (
    <div
      className="relative flex justify-center items-center"
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      aria-hidden
    >
      <div
        className="relative font-romantic font-bold text-3xl sm:text-4xl md:text-5xl text-pink-200 select-none"
        style={{
          height: ARC_RADIUS * 0.6,
          width: '100%',
          maxWidth: '95vw',
        }}
      >
        {letters.map(({ char, i }) => {
          const total = letters.length
          const t = total <= 1 ? 0.5 : i / (total - 1)
          const angle = -ARC_ANGLE_SPAN / 2 + t * ARC_ANGLE_SPAN
          const x = Math.sin(angle) * ARC_RADIUS
          const y = -Math.cos(angle) * ARC_RADIUS * 0.4 + ARC_RADIUS * 0.35
          const rotation = (angle * 180) / Math.PI
          return (
            <span
              key={`${char}-${i}`}
              className="absolute inline-block font-romantic whitespace-nowrap"
              style={{
                left: '50%',
                top: 0,
                ['--ax']: `${x}px`,
                ['--ay']: `${y}px`,
                ['--ar']: `${rotation}deg`,
                transform: `translate(calc(-50% + ${x}px), ${y}px) rotate(${rotation}deg)`,
                animation: `arcLetterIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s both`,
                textShadow: '0 0 20px rgba(236, 72, 153, 0.5)',
                letterSpacing: '0.02em',
              }}
            >
              {char}
            </span>
          )
        })}
      </div>
      <style>{`
        @keyframes arcLetterIn {
          from { opacity: 0; transform: translate(calc(-50% + var(--ax, 0px)), var(--ay, 0px)) rotate(var(--ar, 0deg)) scale(0.85); }
          to   { opacity: 1; transform: translate(calc(-50% + var(--ax, 0px)), var(--ay, 0px)) rotate(var(--ar, 0deg)) scale(1); }
        }
      `}</style>
    </div>
  )
}
