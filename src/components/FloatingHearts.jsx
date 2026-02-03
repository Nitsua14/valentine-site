import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * FloatingHearts
 * - Hearts are visible immediately on page load
 * - Same floating speed & motion as before
 * - Continuous spawning for infinite flow
 */

function Heart({ id, config, onExit }) {
  const elRef = useRef(null)
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  const animate = useCallback(() => {
    if (!elRef.current || !startTimeRef.current) return

    const elapsed = (Date.now() - startTimeRef.current) / 1000
    const progress = elapsed / config.lifespan

    if (progress >= 1) {
      onExit(id)
      return
    }

    // SAME vertical speed as before
    const totalTravel = window.innerHeight + 170
    const y =
      config.startY -
      (elapsed / config.lifespan) * totalTravel

    // SAME drift & rotation
    const drift = Math.sin(elapsed * 0.5) * config.driftAmplitude
    const x = config.startX + drift
    const rotation = config.rotationBase + Math.sin(elapsed * 0.3) * 5

    // Opacity curve unchanged
    let opacity = 0
    if (progress < 0.15) {
      opacity = (progress / 0.15) * config.maxOpacity
    } else if (progress > 0.85) {
      opacity = ((1 - progress) / 0.15) * config.maxOpacity
    } else {
      opacity = config.maxOpacity
    }

    elRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`
    elRef.current.style.opacity = opacity

    rafRef.current = requestAnimationFrame(animate)
  }, [id, config, onExit])

  useEffect(() => {
    startTimeRef.current = Date.now()
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  return (
    <div
      ref={elRef}
      className="absolute left-0 top-0 pointer-events-none will-change-transform"
      style={{
        width: config.size,
        height: config.size,
        opacity: 0,
      }}
      aria-hidden
    >
      <svg
        viewBox="0 0 24 24"
        className="w-full h-full"
        fill="currentColor"
        style={{ color: config.color }}
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  )
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([])
  const nextIdRef = useRef(0)
  const spawnTimeoutRef = useRef(null)

  const spawnOne = useCallback((initial = false) => {
    const size = 16 + Math.random() * 24
    const width = window.innerWidth
    const height = window.innerHeight

    const startX = Math.random() * width
    // 🔑 IMPORTANT CHANGE:
    // Initial hearts start INSIDE viewport
    const startY = initial
      ? Math.random() * height
      : height + 20

    const lifespan = 20 + Math.random() * 20
    const driftAmplitude = 15 + Math.random() * 25
    const rotationBase = (Math.random() - 0.5) * 20
    const maxOpacity = 0.5 + Math.random() * 0.3

    const colors = ['#ec4899', '#f472b6', '#fb7185', '#f43f5e', '#e11d48']
    const color = colors[Math.floor(Math.random() * colors.length)]

    const id = nextIdRef.current++

    setHearts((prev) => [
      ...prev,
      {
        id,
        config: {
          size: `${size}px`,
          startX,
          startY,
          lifespan,
          driftAmplitude,
          rotationBase,
          maxOpacity,
          color,
        },
      },
    ])
  }, [])

  const scheduleSpawn = useCallback(() => {
    spawnOne()
    const delay = 800 + Math.random() * 600
    spawnTimeoutRef.current = setTimeout(scheduleSpawn, delay)
  }, [spawnOne])

  useEffect(() => {
    // 🔑 Spawn a batch immediately on load
    for (let i = 0; i < 14; i++) {
      spawnOne(true)
    }

    scheduleSpawn()

    return () => {
      if (spawnTimeoutRef.current) clearTimeout(spawnTimeoutRef.current)
    }
  }, [scheduleSpawn, spawnOne])

  const removeHeart = useCallback((id) => {
    setHearts((prev) => prev.filter((h) => h.id !== id))
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      {hearts.map(({ id, config }) => (
        <Heart key={id} id={id} config={config} onExit={removeHeart} />
      ))}
    </div>
  )
}
