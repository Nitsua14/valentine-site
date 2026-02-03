import { useRef, useCallback } from 'react'

/**
 * Sound: soft chime on first interaction (Web Audio), optional pop/success via files.
 * Chime is generated with Web Audio API so it works without external files.
 */
export function playChime() {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const now = audioContext.currentTime
    const osc = audioContext.createOscillator()
    const gain = audioContext.createGain()
    osc.connect(gain)
    gain.connect(audioContext.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(523.25, now)
    osc.frequency.setValueAtTime(659.25, now + 0.15)
    osc.frequency.setValueAtTime(783.99, now + 0.3)
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05)
    gain.gain.linearRampToValueAtTime(0, now + 0.5)
    osc.start(now)
    osc.stop(now + 0.5)
  } catch (_) {}
}

/**
 * Romantic melody (Web Audio) — plays when she says YES.
 * Simple, sweet sequence of notes.
 */
function playRomanticMelody() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const now = ctx.currentTime
    const notes = [
      { f: 523.25, start: 0, dur: 0.2 },
      { f: 659.25, start: 0.22, dur: 0.2 },
      { f: 783.99, start: 0.44, dur: 0.25 },
      { f: 659.25, start: 0.72, dur: 0.2 },
      { f: 783.99, start: 0.95, dur: 0.35 },
      { f: 1046.5, start: 1.35, dur: 0.4 },
      { f: 783.99, start: 1.8, dur: 0.3 },
      { f: 659.25, start: 2.15, dur: 0.35 },
      { f: 523.25, start: 2.55, dur: 0.5 },
    ]
    const gainNode = ctx.createGain()
    gainNode.connect(ctx.destination)
    gainNode.gain.setValueAtTime(0.14, now)
    notes.forEach(({ f, start, dur }) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.connect(g)
      g.connect(gainNode)
      osc.type = 'sine'
      osc.frequency.setValueAtTime(f, now + start)
      g.gain.setValueAtTime(0, now + start)
      g.gain.linearRampToValueAtTime(1, now + start + 0.02)
      g.gain.linearRampToValueAtTime(0.6, now + start + dur * 0.5)
      g.gain.linearRampToValueAtTime(0, now + start + dur)
      osc.start(now + start)
      osc.stop(now + start + dur)
    })
  } catch (_) {}
}

const SOUND_FILES = {
  pop: null,
  success: null,
}

export function useSound() {
  const hasInteracted = useRef(false)
  const audioRef = useRef({})

  const play = useCallback((key) => {
    const src = SOUND_FILES[key]
    if (!src) return
    try {
      if (!audioRef.current[key]) {
        const a = new Audio(src)
        a.volume = 0.25
        audioRef.current[key] = a
      }
      audioRef.current[key].currentTime = 0
      audioRef.current[key].play().catch(() => {})
    } catch (_) {}
  }, [])

  const onFirstInteraction = useCallback(() => {
    if (hasInteracted.current) return
    hasInteracted.current = true
    playChime()
  }, [])

  const playPop = useCallback(() => play('pop'), [play])
  const playSuccess = useCallback(() => {
    playRomanticMelody()
    play('success')
  }, [play])

  return { onFirstInteraction, playChime, playPop, playSuccess }
}
