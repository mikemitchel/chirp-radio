// CrEventItem.tsx
import CrButton from './CrButton'
import { PiCalendarDots } from 'react-icons/pi'
import './CrEventItem.css'

interface CrEventItemProps {
  eventName?: string
  dateTime?: string
  description?: string
  location?: string
  eventDetails?: string
  onLocationClick?: () => void
  onAddToCalendarClick?: () => void
  onMoreInfoClick?: () => void
  isHighlighted?: boolean
  className?: string
}

export default function CrCalendarLineEvent({
  eventName, // Always required and displayed
  dateTime = 'Saturday, Month 23, 2025 - 8:00pm CT',
  description = 'Volunteer Meetup',
  location = 'Location Place',
  eventDetails = 'Join us for this exciting event. More details to be announced soon.', // Default event details
  onLocationClick,
  onAddToCalendarClick,
  onMoreInfoClick, // New: handler for "More Info" button
  isHighlighted = false,
  className = '',
}: CrEventItemProps) {
  const componentClasses = [
    'cr-calendar-line-event',
    isHighlighted ? 'cr-calendar-line-event--highlighted' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={componentClasses}>
      <div className="cr-calendar-line-event__header">
        <div className="cr-calendar-line-event__title-section">
          <div className="cr-calendar-line-event__name">{eventName}</div>
          <div className="cr-calendar-line-event__datetime">{dateTime}</div>
          <div className="cr-calendar-line-event__description">
            {description},{' '}
            <a
              href="#"
              className="cr-calendar-line-event__location"
              onClick={(e) => {
                e.preventDefault()
                if (onLocationClick) onLocationClick()
              }}
            >
              {location}
            </a>
          </div>
        </div>

        <CrButton
          size="small"
          variant="outline"
          color="default"
          rightIcon={<PiCalendarDots />}
          onClick={onAddToCalendarClick}
        >
          Add to Calendar
        </CrButton>
      </div>

      <div className="cr-calendar-line-event__footer">
        <p className="cr-calendar-line-event__details">{eventDetails}</p>

        {onMoreInfoClick && (
          <div className="cr-calendar-line-event__more-info">
            <CrButton size="small" variant="text" color="default" onClick={onMoreInfoClick}>
              More Info
            </CrButton>
          </div>
        )}
      </div>
    </div>
  )
}
