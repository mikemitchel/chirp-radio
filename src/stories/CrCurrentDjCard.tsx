// CrCurrentDjCard.tsx
import CrCurrentDj from './CrCurrentDj'
import CrButton from './CrButton'
import CrChip from './CrChip'
import { PiMusicNote, PiArrowRight } from 'react-icons/pi'
import './CrCurrentDjCard.css'

interface CrCurrentDjCardProps {
  djImage?: string
  djImageAlt?: string
  djName?: string
  showName?: string
  isOnAir?: boolean
  statusText?: string
  header?: string
  title?: string
  metaText?: string
  description?: string
  requestButtonText?: string
  moreButtonText?: string
  onRequestClick?: () => void
  onMoreClick?: () => void
  className?: string
  isFavorite?: boolean
}

export default function CrCurrentDjCard({
  // Image
  djImage = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  djImageAlt = 'DJ Current',

  // CrCurrentDj props
  djName = 'DJ Current',
  showName = 'The Current Show',
  isOnAir = true,
  statusText = 'On-Air',

  // Content
  header = 'THE CURRENT SHOW',
  title = 'DJ Current',
  metaText = '',
  description = 'DJ Current is lorem ipsum dolor sit amet, c...',

  // Button props
  requestButtonText = 'REQUEST',
  moreButtonText = 'MORE',
  onRequestClick,
  onMoreClick,

  className = '',
  isFavorite = false,
}: CrCurrentDjCardProps) {
  return (
    <div className={`cr-current-dj-card ${className}`}>
      <div className="cr-current-dj-card__top">
        <CrCurrentDj
          djName={djName}
          showName={showName}
          isOnAir={isOnAir}
          statusText={statusText}
        />
      </div>

      <div className="cr-current-dj-card__content">
        <div className="cr-current-dj-card__image-container">
          <img src={djImage} alt={djImageAlt} className="cr-current-dj-card__image" />
        </div>

        <div className="cr-current-dj-card__info">
          <div className="cr-current-dj-card__header">{header}</div>

          <h2 className="cr-current-dj-card__title">
            {title}
            {isFavorite && (
              <CrChip
                variant="secondary-light"
                size="small"
                squared
                style={{ marginLeft: 'var(--cr-space-1)' }}
              >
                FAVORITE
              </CrChip>
            )}
          </h2>

          {metaText && <div className="cr-current-dj-card__meta">{metaText}</div>}

          <p className="cr-current-dj-card__description">{description}</p>

          <div className="cr-current-dj-card__actions">
            <CrButton
              variant="outline"
              color="secondary"
              size="small"
              leftIcon={<PiMusicNote />}
              onClick={onRequestClick}
            >
              {requestButtonText}
            </CrButton>

            <CrButton
              variant="solid"
              color="default"
              size="small"
              rightIcon={<PiArrowRight />}
              onClick={onMoreClick}
            >
              {moreButtonText}
            </CrButton>
          </div>
        </div>
      </div>
    </div>
  )
}
