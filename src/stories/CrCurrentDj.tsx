// CrCurrentDj.tsx
import { useEffect, useRef } from 'react'
import CrChip from './CrChip'
import { parseDjAndShowName } from '../utils/djNameParser'
import './CrCurrentDj.css'

interface CrCurrentDjProps {
  djName?: string
  showName?: string
  isOnAir?: boolean
  statusText?: string
}

export default function CrCurrentDj({
  djName: djNameProp = '',
  showName: showNameProp = '',
  isOnAir = true,
  statusText = 'On-Air',
}: CrCurrentDjProps) {
  // Parse DJ and show name (handles "DJ Name: Show Name" format)
  const parsed = parseDjAndShowName(djNameProp, showNameProp)
  const djName = parsed.djName
  const showName = parsed.showName

  // Refs for scrolling elements
  const djNameRef = useRef<HTMLDivElement>(null)
  const showNameRef = useRef<HTMLDivElement>(null)

  // Container refs for measuring
  const djNameContainerRef = useRef<HTMLDivElement>(null)
  const showNameContainerRef = useRef<HTMLDivElement>(null)

  // Calculate optimal widths and check overflow
  useEffect(() => {
    const calculateWidths = () => {
      const djNameElement = djNameRef.current
      const djContainer = djNameContainerRef.current
      const infoContainer = djContainer?.parentElement
      const mainContainer = infoContainer?.parentElement

      if (!djNameElement || !djContainer || !infoContainer || !mainContainer) {
        return
      }

      // Check if show name exists
      const showNameElement = showNameRef.current
      const showContainer = showNameContainerRef.current
      const hasShowName = showName && showName.trim() !== ''

      // Get natural widths of content by temporarily removing constraints
      djContainer.style.width = 'auto'
      if (showContainer) showContainer.style.width = 'auto'

      const djNaturalWidth = djNameElement.scrollWidth
      const showNaturalWidth = hasShowName && showNameElement ? showNameElement.scrollWidth : 0

      // Calculate available space more accurately
      // Total container width minus all gaps and the On-Air chip
      const computedStyle = window.getComputedStyle(mainContainer)
      const mainGap = parseInt(computedStyle.gap) || 12

      const statusElement = mainContainer.querySelector('.cr-current-dj__status') as HTMLElement
      const chipWidth = statusElement ? statusElement.offsetWidth : 60

      const infoComputedStyle = window.getComputedStyle(infoContainer)
      const infoGap = hasShowName ? parseInt(infoComputedStyle.gap) || 12 : 0

      const availableWidth = mainContainer.clientWidth - chipWidth - mainGap

      let djWidth: number
      let showWidth: number

      if (!hasShowName) {
        // No show name - give DJ all available space
        djWidth = Math.min(djNaturalWidth, availableWidth)
        showWidth = 0
      } else {
        const totalNaturalWidth = djNaturalWidth + showNaturalWidth + infoGap

        if (totalNaturalWidth <= availableWidth) {
          // Both fit naturally - use natural widths
          djWidth = djNaturalWidth
          showWidth = showNaturalWidth
        } else {
          // Need to constrain
          const halfSpace = (availableWidth - infoGap) / 2

          if (djNaturalWidth <= halfSpace && showNaturalWidth > halfSpace) {
            // DJ fits in half, show needs more - give DJ natural width, rest to show
            djWidth = djNaturalWidth
            showWidth = availableWidth - djNaturalWidth - infoGap
          } else if (showNaturalWidth <= halfSpace && djNaturalWidth > halfSpace) {
            // Show fits in half, DJ needs more - give show natural width, rest to DJ
            showWidth = showNaturalWidth
            djWidth = availableWidth - showNaturalWidth - infoGap
          } else {
            // Both overflow half - split evenly
            djWidth = halfSpace
            showWidth = halfSpace
          }
        }
      }

      // Apply calculated widths
      djContainer.style.width = `${djWidth}px`
      if (showContainer) showContainer.style.width = `${showWidth}px`

      // Check for overflow and apply scrolling animation
      checkOverflow(djNameElement, djContainer)
      if (hasShowName && showNameElement && showContainer) {
        checkOverflow(showNameElement, showContainer)
      }
    }

    const checkOverflow = (element: HTMLDivElement, container: HTMLDivElement) => {
      const buffer = 10
      const isOverflowing = element.scrollWidth > container.clientWidth + buffer

      if (isOverflowing) {
        const scrollDistance = -(element.scrollWidth - container.clientWidth + 20)
        element.style.setProperty('--scroll-distance', `${scrollDistance}px`)

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

    const timeoutId = setTimeout(calculateWidths, 200)

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
          <CrChip
            variant="primary"
            aria-hidden={true}
            style={{ textShadow: '0px 0px 1px rgba(0,0,0,0.5)' }}
          >
            {statusText}
          </CrChip>
        </div>
      )}
    </div>
  )
}
