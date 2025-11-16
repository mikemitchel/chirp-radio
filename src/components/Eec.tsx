// src/components/Eec.tsx
import { useEffect } from 'react'
import { PiHeartFill, PiStar } from 'react-icons/pi'
import './Eec.css'

interface EecProps {
  isOpen: boolean
  onClose: () => void
}

const Eec = ({ isOpen, onClose }: EecProps) => {
  // Play achievement sound and prevent body scroll when modal opens
  useEffect(() => {
    if (isOpen) {
      playAchievementSound()
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    } else {
      // Restore body scroll
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const playAchievementSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Play a series of ascending tones (achievement sound)
      const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6

      notes.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.type = 'square'
        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime + index * 0.1)

        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime + index * 0.1)
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + index * 0.1 + 0.2
        )

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.start(audioContext.currentTime + index * 0.1)
        oscillator.stop(audioContext.currentTime + index * 0.1 + 0.2)
      })
    } catch {
      // Audio context not supported, fail silently
      console.log('Audio context not available')
    }
  }

  if (!isOpen) return null

  return (
    <div className="easter-egg-overlay" onClick={onClose}>
      <div className="easter-egg-modal" onClick={(e) => e.stopPropagation()}>
        <div className="easter-egg-header">
          <div className="easter-egg-title">★ Achievement Unlocked ★</div>
        </div>
        <div className="easter-egg-content">
          <div className="easter-egg-pixel-art">
            <PiHeartFill className="easter-egg-pixel-heart" />
          </div>

          <div className="easter-egg-credits">
            <div>Created with Love for CHIRP Radio by</div>
            <div className="easter-egg-name">Ryan Wilson</div>
            <div className="easter-egg-year">Built 2024 — 2025</div>
          </div>

          <div className="easter-egg-achievement">
            <PiStar className="easter-egg-achievement-star" />
            <div className="easter-egg-achievement-content">
              <div className="easter-egg-achievement-title">Solo Developer</div>
              <div className="easter-egg-achievement-desc">
                Somehow made all the platforms work together
              </div>
            </div>
            <PiStar className="easter-egg-achievement-star" />
          </div>

          <div className="easter-egg-stats-grid">
            <div className="easter-egg-stat-box">
              <div className="easter-egg-stat-value">62K+</div>
              <div className="easter-egg-stat-label">LINES OF CODE</div>
            </div>
            <div className="easter-egg-stat-box">
              <div className="easter-egg-stat-value">6</div>
              <div className="easter-egg-stat-label">PLATFORMS</div>
            </div>
            <div className="easter-egg-stat-box">
              <div className="easter-egg-stat-value">∞</div>
              <div className="easter-egg-stat-label">CUPS OF COFFEE</div>
            </div>
            <div className="easter-egg-stat-box">
              <div className="easter-egg-stat-value">100%</div>
              <div className="easter-egg-stat-label">DEDICATION</div>
            </div>
          </div>

          <div className="easter-egg-close-hint">[ CLICK OUTSIDE TO CONTINUE ]</div>
        </div>
      </div>
    </div>
  )
}

export default Eec
