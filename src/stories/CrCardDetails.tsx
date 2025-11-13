// CrCardDetails.tsx
import { PiCalendarDots, PiMapTrifold, PiArrowSquareUp } from 'react-icons/pi'
import CrChip from './CrChip'
import CrButton from './CrButton'
import './CrCardDetails.css'

interface CrCardDetailsProps {
  dateTime?: string
  venue?: string
  ageRestriction?: string | { age: string }
  authorBy?: string
  eventDate?: string
  tags?: string[]
  device?: string
  type?: string
  showShareButton?: boolean
  onVenueClick?: () => void
  onShareClick?: () => void
}

export default function CrCardDetails({
  dateTime = 'September 30, 2025 @ 10:00pm',
  venue = 'Lincoln Hall',
  ageRestriction = '21+',
  authorBy = 'by Sally Forth',
  eventDate = 'September 30, 2025',
  tags = ['Hello World', 'Hello World', 'Hello World'],
  device = 'desktop',
  type = 'event',
  showShareButton = true,
  onVenueClick,
  onShareClick,
}: CrCardDetailsProps) {
  const componentClasses = [
    'cr-card-details',
    `cr-card-details--${device}`,
    `cr-card-details--${type}`,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={componentClasses}>
      <div className="cr-card-details__container">
        <div className="cr-card-details__content">
          <div className="cr-card-details__event-row">
            <div className="cr-card-details__datetime">
              <PiCalendarDots className="cr-card-details__icon cr-card-details__icon--calendar" />
              <span className="cr-card-details__datetime-text">{dateTime}</span>
            </div>

            <a
              href="#"
              className="cr-card-details__venue"
              onClick={(e) => {
                e.preventDefault()
                if (onVenueClick) onVenueClick()
              }}
            >
              <PiMapTrifold className="cr-card-details__icon cr-card-details__icon--map" />
              <span className="cr-card-details__venue-text">{venue}</span>
            </a>

            {ageRestriction && (
              <CrChip variant="secondary" size="large">
                {typeof ageRestriction === 'string' ? ageRestriction : ageRestriction.age}
              </CrChip>
            )}
          </div>

          <div className="cr-card-details__article-row">
            <div className="cr-card-details__author-date">
              <span className="cr-card-details__author">{authorBy}</span>
              <span className="cr-card-details__date">{eventDate}</span>
            </div>

            {tags && tags.length > 0 && (
              <div
                className="cr-card-details__tags-wrapper"
                onClick={(e) => e.stopPropagation()}
                ref={(el) => {
                  if (el) {
                    const scrollContainer = el.querySelector(
                      '.cr-card-details__tags'
                    ) as HTMLElement
                    if (!scrollContainer) return

                    const checkOverflow = () => {
                      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
                      const hasOverflow = scrollWidth > clientWidth
                      const isAtStart = scrollLeft <= 5
                      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5

                      // Show right gradient if has overflow and not at end
                      el.setAttribute('data-overflow-right', String(hasOverflow && !isAtEnd))
                      // Show left gradient if has overflow and not at start
                      el.setAttribute('data-overflow-left', String(hasOverflow && !isAtStart))
                    }

                    // Check immediately and after layout
                    checkOverflow()
                    setTimeout(checkOverflow, 0)

                    // Listen to scroll events
                    scrollContainer.addEventListener('scroll', checkOverflow)

                    // Observe size changes
                    const observer = new ResizeObserver(checkOverflow)
                    observer.observe(el)
                  }
                }}
              >
                <div className="cr-card-details__tags">
                  {tags.map((tag, index) => (
                    <CrChip key={index} variant="secondary" size="medium">
                      {typeof tag === 'string' ? tag : (tag as { tag: string }).tag}
                    </CrChip>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {showShareButton && (
          <div className="cr-card-details__actions">
            <CrButton
              size="small"
              variant="outline"
              color="secondary"
              leftIcon={<PiArrowSquareUp />}
              onClick={(e) => {
                e.stopPropagation()
                onShareClick?.(e)
              }}
            >
              Share
            </CrButton>
          </div>
        )}
      </div>
    </div>
  )
}
