import { useState, useCallback } from 'react'
import FloatingHearts from './components/FloatingHearts'
import ArcHeading from './components/ArcHeading'
import ActionButtons from './components/ActionButtons'
import SparkleOverlay from './components/SparkleOverlay'
import Celebration from './components/Celebration'
import { useSound } from './hooks/useSound'

const STATES = {
  INITIAL: 'initial',
  FIRST_YES: 'first_yes',
  FIRST_NO: 'first_no',
  CELEBRATION: 'celebration',
}

export default function App() {
  const [state, setState] = useState(STATES.INITIAL)
  const [showSparkle, setShowSparkle] = useState(false)
  const [contentVisible, setContentVisible] = useState(true)
  const { onFirstInteraction, playChime, playPop, playSuccess } = useSound()

  const handleFirstYes = useCallback(() => {
    onFirstInteraction()
    playPop()
    setShowSparkle(true)
    setContentVisible(false)
    setTimeout(() => {
      setState(STATES.FIRST_YES)
      setShowSparkle(false)
      setContentVisible(true)
    }, 600)
  }, [onFirstInteraction, playPop])

  const handleFirstNo = useCallback(() => {
    onFirstInteraction()
    playPop()
    setShowSparkle(true)
    setContentVisible(false)
    setTimeout(() => {
      setState(STATES.FIRST_NO)
      setShowSparkle(false)
      setContentVisible(true)
    }, 600)
  }, [onFirstInteraction, playPop])

  const handleFinalYes = useCallback(() => {
    onFirstInteraction()
    playChime()
    playPop()
    playSuccess()
    setShowSparkle(true)
    setContentVisible(false)
    setTimeout(() => {
      setState(STATES.CELEBRATION)
      setShowSparkle(false)
      setContentVisible(true)
    }, 800)
  }, [onFirstInteraction, playChime, playPop, playSuccess])

  const handleFinalNo = useCallback(() => {
    playPop()
  }, [playPop])

  const isFinalQuestion =
    state === STATES.FIRST_YES || state === STATES.FIRST_NO

  return (
    <div
      className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-rose-950/95 via-pink-900/90 to-rose-950/95"
      role="main"
      aria-label="Valentine's Day proposal"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/valentine-bg.png)' }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-rose-950/75 via-pink-900/60 to-rose-950/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-rose-950/40 via-transparent to-rose-950/40" />

      {/* Animated hearts */}
      <FloatingHearts />

      {/* Sparkle transition */}
      <SparkleOverlay active={showSparkle} />

      {/* Main hero section */}
      <section
        className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-2xl mx-auto px-6 py-8 text-center"
        aria-live="polite"
      >
        {state === STATES.CELEBRATION ? (
          <div
            className="relative w-full flex flex-col items-center justify-center"
            style={{
              opacity: contentVisible ? 1 : 0,
              transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Celebration />
          </div>
        ) : (
          <>
            {/* Arc heading only on initial */}
            {state === STATES.INITIAL && (
              <div
                className="mb-6"
                style={{
                  opacity: contentVisible ? 1 : 0,
                  transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <ArcHeading
                  text="Heyyy! Beautiful!!"
                  visible={contentVisible}
                />
              </div>
            )}

            {/* Question text */}
            <div
              className="font-soft font-medium text-pink-100 text-lg sm:text-xl md:text-2xl max-w-md mx-auto leading-relaxed"
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {state === STATES.INITIAL && (
                <p>I have something to ask you, may I?</p>
              )}

              {(state === STATES.FIRST_YES ||
                state === STATES.FIRST_NO) && (
                <>
                  {state === STATES.FIRST_NO && (
                    <p className="mb-4 text-pink-200/90 italic font-soft">
                      Anyways, I'll ask…
                    </p>
                  )}
                  <p className="font-romantic font-bold text-2xl sm:text-3xl text-pink-100">
                    Will you be my Valentine?
                  </p>
                </>
              )}
            </div>

            {/* Buttons */}
            <div
              className="mt-8"
              style={{
                opacity: contentVisible ? 1 : 0,
                transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {state === STATES.INITIAL ? (
                <ActionButtons
                  onYes={handleFirstYes}
                  onNo={handleFirstNo}
                  noDodges={false}
                  yesLabel="YES"
                  noLabel="NO"
                />
              ) : (
                <ActionButtons
                  onYes={handleFinalYes}
                  onNo={handleFinalNo}
                  noDodges={isFinalQuestion}
                  yesLabel="YES"
                  noLabel="NO"
                />
              )}
            </div>
          </>
        )}
      </section>
    </div>
  )
}
