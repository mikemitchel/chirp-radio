// src/components/VersionNumber.tsx
import { useState, useRef, useEffect } from 'react'
import Eec from './Eec'
import './VersionNumber.css'

interface VersionNumberProps {
  version: string
  className?: string
}

const VersionNumber = ({ version, className = '' }: VersionNumberProps) => {
  const [tapCount, setTapCount] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const tapTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleTap = () => {
    const newCount = tapCount + 1
    setTapCount(newCount)

    // Clear existing timeout
    if (tapTimeout.current) {
      clearTimeout(tapTimeout.current)
    }

    // Show easter egg at 7 taps
    if (newCount === 7) {
      setShowEasterEgg(true)
      // Reset immediately
      setTapCount(0)
      return
    }

    // Reset after 2 seconds of inactivity
    tapTimeout.current = setTimeout(() => {
      setTapCount(0)
    }, 2000)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (tapTimeout.current) {
        clearTimeout(tapTimeout.current)
      }
    }
  }, [])

  return (
    <>
      <div className={`version-number ${className}`}>
        <button className="version-number__button" onClick={handleTap} aria-label="Version number">
          <span className="version-number__text">v{version}</span>
          {tapCount >= 3 && (
            <span className="version-number__counter" aria-live="polite">
              {tapCount}
            </span>
          )}
        </button>
      </div>

      <Eec isOpen={showEasterEgg} onClose={() => setShowEasterEgg(false)} />
    </>
  )
}

export default VersionNumber
