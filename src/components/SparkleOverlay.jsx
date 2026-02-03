import { useEffect, useState } from 'react'

/**
 * SparkleOverlay: Gentle glitter / sparkle overlay for transition moments.
 * Short burst of sparkles, then fades out.
 */
export default function SparkleOverlay({ active = false }) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return
    const count = 40
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 0.4,
      size: 4 + Math.random() * 6,
      duration: 0.8 + Math.random() * 0.4,
    }))
    setParticles(newParticles)
    const t = setTimeout(() => setParticles([]), 1500)
    return () => clearTimeout(t)
  }, [active])

  if (!active && particles.length === 0) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden
      style={{
        opacity: active ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-pink-200"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            boxShadow: '0 0 8px rgba(255,182,193,0.8)',
            animation: `sparkleFade 0.8s ease-out ${p.delay}s both`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkleFade {
          0% { opacity: 0; transform: scale(0); }
          30% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.5); }
        }
      `}</style>
    </div>
  )
}
