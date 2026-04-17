import { useEffect, useState } from 'react'
import './LaunchAnimation.css'

interface LaunchAnimationProps {
  active: boolean
  onComplete: () => void
}

export function LaunchAnimation({ active, onComplete }: LaunchAnimationProps) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!active) {
      setPhase(0)
      return
    }

    setPhase(1)
    const t1 = setTimeout(() => setPhase(2), 400)
    const t2 = setTimeout(() => setPhase(3), 900)
    const t3 = setTimeout(() => {
      setPhase(4)
      onComplete()
    }, 1400)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [active])

  if (!active) return null

  return (
    <div className="launch-overlay">
      {phase >= 1 && (
        <>
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="launch-star"
              style={{
                '--star-angle': `${(i * 18)}deg`,
                '--star-delay': `${(i * 0.05)}s`,
              } as React.CSSProperties}
            >✦</div>
          ))}
        </>
      )}

      {phase >= 2 && (
        <div className="launch-text">
          <div className="launch-text-main">LAUNCHING...</div>
          <div className="launch-text-sub">Review launched into space</div>
        </div>
      )}

      {phase >= 3 && (
        <div className="launch-fade"></div>
      )}
    </div>
  )
}
