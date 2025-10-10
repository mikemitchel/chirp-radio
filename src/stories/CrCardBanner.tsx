// CrCardBanner.tsx
import { PiTicket, PiArrowSquareUp } from 'react-icons/pi'
import CrButton from './CrButton'
import CrChip from './CrChip'
import './CrCardBanner.css'

interface CrCardBannerProps {
  preheader?: string
  title?: string
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  showPreheader?: boolean
  textLayout?: string
  height?: string
  backgroundColor?: string
  showTicketButton?: boolean
  showShareButton?: boolean
  ticketButtonText?: string
  shareButtonText?: string
  ticketButtonVariant?: 'outline' | 'solid' | 'text'
  ticketButtonIcon?: React.ReactNode
  ticketUrl?: string
  shareUrl?: string
  onTicketClick?: () => void
  onShareClick?: () => void
  className?: string
  isFavorite?: boolean
}

export default function CrCardBanner({
  preheader = 'Intro Preheader Thing',
  title = 'Title of the Thing',
  titleTag = 'h2',
  titleSize = 'md',
  showPreheader = true,
  textLayout = 'stacked', // "stacked" or "inline"
  height = 'tall', // "narrow" (60px) or "tall" (84px)
  backgroundColor = 'textured', // "textured" or "none"
  showTicketButton = true,
  showShareButton = true,
  ticketButtonText = 'Buy Tix',
  shareButtonText = 'Share',
  ticketButtonVariant = 'outline',
  ticketButtonIcon,
  ticketUrl,
  shareUrl,
  onTicketClick,
  onShareClick,
  className = '',
  isFavorite = false,
}: CrCardBannerProps) {
  // Force inline layout for narrow height
  const actualTextLayout = height === 'narrow' ? 'inline' : textLayout

  // Click handlers that use URL or callback
  const handleTicketClick = () => {
    if (onTicketClick) {
      onTicketClick()
    } else if (ticketUrl) {
      window.open(ticketUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleShareClick = () => {
    if (onShareClick) {
      onShareClick()
    } else if (shareUrl) {
      // Copy URL to clipboard and optionally open share dialog
      if (navigator.share) {
        navigator.share({
          title: title,
          url: shareUrl,
        }).catch(() => {
          // If share fails, copy to clipboard
          navigator.clipboard.writeText(shareUrl)
        })
      } else {
        navigator.clipboard.writeText(shareUrl)
      }
    }
  }

  // Build component classes
  const componentClasses = [
    'cr-card-title-banner',
    `cr-card-title-banner--${height}`,
    `cr-card-title-banner--${actualTextLayout}`,
    backgroundColor === 'textured' ? 'cr-bg-textured cr-bg-natural-light' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  // Dynamic title element
  const TitleTag = titleTag
  const titleClasses = `cr-card-title-banner__title cr-card-title-banner__title--${titleSize}`

  return (
    <div className={componentClasses}>
      <div className="cr-card-title-banner__container">
        {/* Left Content */}
        <div className="cr-card-title-banner__content">
          {showPreheader && preheader && (
            <div className="cr-card-title-banner__preheader">{preheader}</div>
          )}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--cr-space-1)' }}>
            <TitleTag className={titleClasses}>{title}</TitleTag>
            {isFavorite && (
              <CrChip variant="secondary-light" size="small" squared>
                FAVORITE
              </CrChip>
            )}
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="cr-card-title-banner__actions">
          {showTicketButton && (
            <CrButton
              size="small"
              variant={ticketButtonVariant}
              color="secondary"
              rightIcon={ticketButtonIcon || <PiTicket />}
              onClick={handleTicketClick}
            >
              {ticketButtonText}
            </CrButton>
          )}

          {showShareButton && (
            <CrButton
              size="small"
              variant="outline"
              color="secondary"
              rightIcon={<PiArrowSquareUp />}
              onClick={handleShareClick}
            >
              {shareButtonText}
            </CrButton>
          )}
        </div>
      </div>
    </div>
  )
}
