// CrCurrentDj.tsx
import React, { useEffect, useRef } from 'react'
import CrChip from './CrChip'
import './CrCurrentDj.css'

interface CrCurrentDjProps {
  djName?: string
  showName?: string
  isOnAir?: boolean
  statusText?: string
}

export default function CrCurrentDj({
  djName = 'DJ Current',
  showName = 'Current Show',
  isOnAir = true,
  statusText = 'On-Air',
}: CrCurrentDjProps) {
  // Refs for scrolling elements
  const djNameRef = useRef<HTMLDivElement>(null)
  const showNameRef = useRef<HTMLDivElement>(null)

  // Container refs for measuring
  const djNameContainerRef = useRef<HTMLDivElement>(null)
  const showNameContainerRef = useRef<HTMLDivElement>(null)

  // Check if text overflows and add scrolling class
  useEffect(() => {
    const checkOverflow = (element: HTMLDivElement | null, container: HTMLDivElement | null) => {
      if (element && container) {
        // Force a reflow to ensure accurate measurements
        container.offsetWidth
        element.offsetWidth

        // Add a small buffer to prevent unnecessary scrolling for minor differences
        const buffer = 5
        const isOverflowing = element.scrollWidth > container.clientWidth + buffer

        if (isOverflowing) {
          // Calculate how far to scroll to show the hidden text
          const scrollDistance = -(element.scrollWidth - container.clientWidth + 20)
          element.style.setProperty('--scroll-distance', `${scrollDistance}px`)

          // Calculate animation duration based on text length
          // Base duration of 12 seconds + 4 seconds per 100 pixels of overflow
          const overflowAmount = element.scrollWidth - container.clientWidth
          const duration = Math.max(12, 12 + (overflowAmount / 100) * 4)
          element.style.setProperty('--animation-duration', `${duration}s`)

          element.classList.add('has-overflow')
        } else {
          element.classList.remove('has-overflow')
          element.style.removeProperty('--scroll-distance')
          element.style.removeProperty('--animation-duration')
        }
      }
    }

    // Add a delay to ensure layout is completely settled
    const timeoutId = setTimeout(() => {
      checkOverflow(djNameRef.current, djNameContainerRef.current)
      checkOverflow(showNameRef.current, showNameContainerRef.current)
    }, 200)

    return () => clearTimeout(timeoutId)
  }, [djName, showName])

  return (
    <div className="cr-current-dj">
      <div className="cr-current-dj__info">
        <div className="cr-current-dj__name-container" ref={djNameContainerRef}>
          <div className="cr-current-dj__name" ref={djNameRef}>
            {djName}
          </div>
        </div>
        {showName && (
          <div className="cr-current-dj__show-container" ref={showNameContainerRef}>
            <div className="cr-current-dj__show" ref={showNameRef}>
              {showName}
            </div>
          </div>
        )}
      </div>

      {isOnAir && (
        <div className="cr-current-dj__status">
          <CrChip variant="primary">{statusText}</CrChip>
        </div>
      )}
    </div>
  )
}
