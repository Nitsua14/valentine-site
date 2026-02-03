import { useRef, useCallback, useState } from 'react'

/**
 * ActionButtons: YES (fixed) and NO (dodges on hover/click when in final-question state).
 * - Rounded pill, soft glow, hover scale + shimmer
 * - NO moves to random position inside viewport, cannot overlap YES or leave screen
 */
const MIN_GAP = 60

function getRandomPosition(yesRect, viewport) {
  const noWidth = 100
  const noHeight = 48
  const margin = 20
  let x, y
  let attempts = 0
  do {
    x = margin + Math.random() * (viewport.w - noWidth - margin * 2)
    y = margin + Math.random() * (viewport.h - noHeight - margin * 2)
    // Ensure NO doesn't overlap YES (expand YES rect by MIN_GAP)
    const yesLeft = yesRect.left - MIN_GAP
    const yesRight = yesRect.right + MIN_GAP
    const yesTop = yesRect.top - MIN_GAP
    const yesBottom = yesRect.bottom + MIN_GAP
    const noOverlapsYes =
      x + noWidth >= yesLeft && x <= yesRight && y + noHeight >= yesTop && y <= yesBottom
    if (!noOverlapsYes) break
    attempts++
  } while (attempts < 50)
  return { x, y }
}

export default function ActionButtons({
  onYes,
  onNo,
  noDodges = false,
  yesLabel = 'YES',
  noLabel = 'NO',
}) {
  const yesRef = useRef(null)
  const [noPosition, setNoPosition] = useState(null)
  const noRef = useRef(null)

  const dodgeNo = useCallback(() => {
    if (!noDodges || !yesRef.current || !noRef.current) return
    const yesRect = yesRef.current.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const { x, y } = getRandomPosition(yesRect, { w: vw, h: vh })
    setNoPosition({ x, y })
  }, [noDodges])

  return (
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-8">
      <button
        ref={yesRef}
        type="button"
        onClick={onYes}
        className="relative px-8 py-3 rounded-full text-lg font-semibold text-white bg-gradient-to-r from-pink-500 to-rose-500 shadow-glow-soft hover:shadow-glow-strong hover:scale-105 active:scale-100 transition-all duration-300 ease-in-out overflow-hidden group select-none"
        style={{
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)',
        }}
        aria-label="Yes"
      >
        <span className="relative z-10">{yesLabel}</span>
        {/* Shimmer on hover */}
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s ease-in-out infinite',
          }}
          aria-hidden
        />
      </button>

      <button
        ref={noRef}
        type="button"
        onClick={noDodges ? dodgeNo : onNo}
        onMouseEnter={noDodges ? dodgeNo : undefined}
        className="relative px-8 py-3 rounded-full text-lg font-semibold text-pink-200 bg-white/20 backdrop-blur border border-pink-300/50 shadow-glow-soft hover:scale-105 active:scale-100 transition-all duration-200 ease-in-out overflow-hidden group select-none"
        style={{
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.3)',
          ...(noDodges && noPosition
            ? {
                position: 'fixed',
                left: noPosition.x,
                top: noPosition.y,
                transition: 'left 0.25s ease-out, top 0.25s ease-out',
              }
            : {}),
        }}
        aria-label="No"
      >
        <span className="relative z-10">{noLabel}</span>
        <span
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background:
              'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%)',
            backgroundSize: '200% 100%',
          }}
          aria-hidden
        />
      </button>
    </div>
  )
}
