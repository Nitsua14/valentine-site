import { useEffect, useState } from "react"

const PARTICLE_COUNT = 55

function playRomanticMelody() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const gain = ctx.createGain()
  gain.gain.value = 0.14
  gain.connect(ctx.destination)

  const notes = [261.6, 329.6, 392.0, 523.3, 392.0, 329.6]
  let time = ctx.currentTime

  notes.forEach(freq => {
    const osc = ctx.createOscillator()
    osc.type = "sine"
    osc.frequency.value = freq
    osc.connect(gain)
    osc.start(time)
    osc.stop(time + 0.45)
    time += 0.5
  })
}

export default function Celebration() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    playRomanticMelody()

    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 600) // text appears faster

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      
      {/* RADIAL BURST — FULL SCREEN */}
      {!showMessage && (
        <div className="absolute inset-0">
          {[...Array(PARTICLE_COUNT)].map((_, i) => {
            const angle = (360 / PARTICLE_COUNT) * i
            const duration = 3.2 + Math.random() * 0.6 // slower burst
            const delay = Math.random() * 0.5

            return (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 text-2xl sm:text-3xl"
                style={{
                  "--r": `${angle}deg`,
                  animation: `burst ${duration}s cubic-bezier(0.2, 0.8, 0.2, 1) forwards`,
                  animationDelay: `${delay}s`,
                }}
              >
                {Math.random() > 0.5 ? "❤️" : "🌹"}
              </span>
            )
          })}
        </div>
      )}

      {/* FINAL MESSAGE */}
      {showMessage && (
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            className="romantic-glow text-center font-romantic text-pink-700 text-3xl sm:text-4xl md:text-5xl tracking-wide"
            style={{
              animation: "reveal 1.1s cubic-bezier(0.4,0,0.2,1) forwards",
            }}
          >
            OHHH MYYY GODDD!!!! <br />
            SHE SAID YES!!!!!!!!!!
          </h1>
        </div>
      )}
    </div>
  )
}
