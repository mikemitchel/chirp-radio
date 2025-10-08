// CrCurrentDj.tsx
import { useEffect, useRef, useState } from 'react'
import CrChip from './CrChip'
import './CrCurrentDj.css'

interface CrCurrentDjProps {
  djName?: string
  showName?: string
  isOnAir?: boolean
  statusText?: string
}

export default function CrCurrentDj({
  djName: djNameProp,
  showName: showNameProp,
  isOnAir = true,
  statusText = 'On-Air',
}: CrCurrentDjProps) {
  const [djName, setDjName] = useState(djNameProp || 'DJ Extraordinaire McGillicuddy')
  const [showName, setShowName] = useState(showNameProp || 'The Very Long Show Name That Goes On Forever')
  // Refs for scrolling elements
  const djNameRef = useRef<HTMLDivElement>(null)
  const showNameRef = useRef<HTMLDivElement>(null)

  // Container refs for measuring
  const djNameContainerRef = useRef<HTMLDivElement>(null)
  const showNameContainerRef = useRef<HTMLDivElement>(null)

  // Fetch current DJ data
  useEffect(() => {
    // TEMPORARILY DISABLED FOR TESTING
    return

    let previousDjName = ''
    let retryCount = 0
    const timeouts: NodeJS.Timeout[] = []

    const fetchCurrentDj = async (isHourChange = false) => {
      try {
        const response = await fetch('/api/current_playlist')
        const data = await response.json()

        if (data.now_playing && data.now_playing.dj) {
          const newDjName = data.now_playing.dj
          setDjName(newDjName)
          setShowName(data.now_playing.show || '')

          // If this is an hour change check and DJ name hasn't changed, retry
          if (isHourChange && previousDjName && newDjName === previousDjName && retryCount < 2) {
            retryCount++
            const retryTimeout = setTimeout(() => {
              fetchCurrentDj(true)
            }, 2 * 60 * 1000) // Retry in 2 minutes
            timeouts.push(retryTimeout)
          } else {
            // DJ changed or we've exhausted retries
            previousDjName = newDjName
            retryCount = 0
          }
        }
      } catch (error) {
        console.error('Error fetching current DJ:', error)
      }
    }

    // Fetch on mount
    fetchCurrentDj()

    const scheduleNextFetch = () => {
      // Calculate milliseconds until next hour
      const now = new Date()
      const msUntilNextHour = (60 - now.getMinutes()) * 60 * 1000 - now.getSeconds() * 1000 - now.getMilliseconds()

      // Set timeout to fetch at the top of the next hour
      const hourTimeout = setTimeout(() => {
        fetchCurrentDj(true)
        // Schedule the next hour
        scheduleNextFetch()
      }, msUntilNextHour)

      timeouts.push(hourTimeout)
    }

    scheduleNextFetch()

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout))
    }
  }, [])

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
          <CrChip variant="primary">{statusText}</CrChip>
        </div>
      )}
    </div>
  )
}
