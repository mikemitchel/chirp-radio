// CrCard.tsx
import React from 'react'
import CrCardBanner from './CrCardBanner'
import CrCardDetails from './CrCardDetails'
import CrChip from './CrChip'
import CrButton from './CrButton'
import { PiCalendarDots, PiMapTrifold, PiArrowSquareUp, PiArrowRight } from 'react-icons/pi'
import './CrCard.css'

interface CrCardProps {
  backgroundImage?: string
  imageCaption?: string
  dateTime?: string
  venue?: string
  ageRestriction?: string
  contentSummary?: string
  excerpt?: string
  content?: string
  metaContent?: string
  timeSlot?: string
  showMeta?: boolean
  showMetaTop?: boolean
  authorBy?: string
  eventDate?: string
  tags?: string[]
  eyebrow?: string
  preheader?: string
  title?: string
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  showName?: string
  scheduleInfo?: string
  bannerButtonText?: string
  shareButtonText?: string
  continueButtonText?: string
  bannerButtonVariant?: 'outline' | 'solid' | 'text'
  bannerButtonIcon?: React.ReactNode
  ticketUrl?: string
  shareUrl?: string
  onBannerTicketClick?: () => void
  onBannerShareClick?: () => void
  onVenueClick?: () => void
  onShareClick?: () => void
  onContinueClick?: () => void
  onClick?: () => void
  variant?: string
  imagePosition?: string
  imageSize?: string
  captionPosition?: string
  imageAspectRatio?: string
  articleImageAspectRatio?: string
  type?: string
  bannerHeight?: string
  textLayout?: string
  bannerBackgroundColor?: string
  showTicketButton?: boolean
  showShareButton?: boolean
  showCardDetails?: boolean
  showEyebrow?: boolean
  className?: string
  isFavorite?: boolean
}

export default function CrCard({
  // Image
  backgroundImage = 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
  imageCaption = 'Photo credit - John Dough',

  // Card Details props
  dateTime = 'September 30, 2025 @ 10:00pm',
  venue = 'Lincoln Hall',
  ageRestriction = '21+',

  // Content
  contentSummary = 'Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo.',
  excerpt,
  content,

  // Meta content for article layouts
  metaContent = 'This content is 30 characters.',
  timeSlot = 'Monday 12pm - 12pm',
  showMeta = false,
  showMetaTop = false,
  authorBy = 'by Sally Forth',
  eventDate = 'September 30, 2025',
  tags = [],

  // Banner props
  eyebrow,
  preheader = 'Intro Preheader Thing',
  title = 'Title of the Thing',
  titleTag = 'h2',
  titleSize = 'md',
  showName,
  scheduleInfo,
  bannerButtonText = 'Buy Tix',
  shareButtonText = 'Share',
  continueButtonText = 'Continue Reading',
  bannerButtonVariant = 'outline',
  bannerButtonIcon,
  ticketUrl,
  shareUrl,
  showShareButton = true,
  showTicketButton = true,
  showCardDetails = true,
  showEyebrow = true,

  // Event handlers
  onBannerTicketClick,
  onBannerShareClick,
  onVenueClick,
  onShareClick,
  onContinueClick,
  onClick,

  // Layout variant
  variant = 'default', // "default", "wide", "narrow", "small", "article"

  // Article layout props (only used when variant="article")
  imagePosition = 'none', // "left", "right", "full", "none"
  imageSize = 'large', // "small", "large"
  captionPosition = 'bottom', // "bottom", "overlay", "none"

  // Image aspect ratio
  imageAspectRatio = '16:9', // "16:9", "4:3", "1:1" (non-article variants)
  articleImageAspectRatio = '16:9', // "16:9", "4:3", "9:16", "1:1" (article variant only)

  // CrCardDetails type
  type = 'event', // "event" or "article"

  // CrCardBanner height
  bannerHeight = 'narrow', // "narrow" or "tall"

  // CrCardBanner text layout
  textLayout = 'inline', // "inline" or "stacked"

  // CrCardBanner background color
  bannerBackgroundColor = 'textured', // "textured" or "none"

  className = '',
  isFavorite = false,
}: CrCardProps) {
  // Determine active image aspect ratio based on variant
  const activeImageAspectRatio =
    variant === 'article' ? articleImageAspectRatio : variant === 'small' ? '1:1' : imageAspectRatio

  // Click handler
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }

  // Memoized class computation
  const componentClasses = React.useMemo(
    () =>
      [
        'cr-card',
        `cr-card--${variant}`,
        variant === 'article' && `cr-card--article-${imagePosition}`,
        variant === 'article' && `cr-card--article-${imageSize}`,
        `cr-card--${activeImageAspectRatio.replace(':', '-')}`,
        onClick && 'cr-card--clickable',
        className,
      ]
        .filter(Boolean)
        .join(' '),
    [variant, imagePosition, imageSize, activeImageAspectRatio, onClick, className]
  )

  // Shared components - memoized to prevent re-renders
  const ArticleHeader = React.useMemo(
    () => (
      <div className="cr-card__article-header">
        <CrCardBanner
          preheader={eyebrow || preheader}
          title={title}
          titleTag={titleTag}
          titleSize={titleSize}
          height={bannerHeight}
          textLayout={textLayout}
          backgroundColor={bannerBackgroundColor === 'none' ? 'none' : bannerBackgroundColor}
          showPreheader={showEyebrow}
          showTicketButton={showTicketButton}
          showShareButton={showShareButton}
          ticketButtonText={bannerButtonText}
          shareButtonText={shareButtonText}
          ticketButtonVariant={bannerButtonVariant}
          ticketButtonIcon={bannerButtonIcon}
          ticketUrl={ticketUrl}
          shareUrl={shareUrl}
          onTicketClick={onBannerTicketClick}
          onShareClick={onBannerShareClick}
          isFavorite={isFavorite}
        />
        {(showName || scheduleInfo) && (
          <div className="cr-card__dj-meta">
            {showName && <div className="cr-card__show-name">{showName}</div>}
            {scheduleInfo && <div className="cr-card__schedule-info">{scheduleInfo}</div>}
          </div>
        )}
      </div>
    ),
    [
      eyebrow,
      preheader,
      title,
      titleTag,
      titleSize,
      bannerHeight,
      textLayout,
      bannerBackgroundColor,
      showName,
      scheduleInfo,
      bannerButtonText,
      shareButtonText,
      bannerButtonVariant,
      bannerButtonIcon,
      ticketUrl,
      shareUrl,
      showTicketButton,
      showShareButton,
      showEyebrow,
      onBannerTicketClick,
      onBannerShareClick,
      isFavorite,
    ]
  )

  const MetaInfo = React.useMemo(
    () => (
      <div className="cr-card__meta-info">
        <div className="cr-card__meta-content">{metaContent}</div>
        <div className="cr-card__time-slot">{timeSlot}</div>
      </div>
    ),
    [metaContent, timeSlot]
  )

  const ImageWithCaption = React.useCallback(
    () => (
      <div className="cr-card__image-wrapper">
        <div className="cr-card__image" style={{ backgroundImage: `url(${backgroundImage})` }}>
          {captionPosition === 'overlay' && (
            <div className="cr-card__image-caption cr-card__image-caption--overlay">
              {imageCaption}
            </div>
          )}
        </div>
        {captionPosition === 'bottom' && (
          <div className="cr-card__image-caption">{imageCaption}</div>
        )}
      </div>
    ),
    [backgroundImage, captionPosition, imageCaption]
  )

  // Optimized render logic with early returns
  const renderContent = () => {
    switch (variant) {
      case 'article':
        return (
          <div
            className={componentClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-label={onClick ? `View ${title}` : undefined}
          >
            {ArticleHeader}

            {showCardDetails && type === 'article' && (
              <CrCardDetails
                type="article"
                authorBy={authorBy}
                eventDate={eventDate}
                tags={tags}
                showShareButton={false}
              />
            )}

            {showCardDetails && type === 'event' && (
              <CrCardDetails
                type="event"
                dateTime={dateTime}
                venue={venue}
                onVenueClick={onVenueClick}
                showShareButton={false}
              />
            )}

            {type !== 'dj' && showMeta && MetaInfo}

            <div className="cr-card__article-content">
              {imagePosition === 'full' && (
                <div className="cr-card__article-image-full">
                  <ImageWithCaption />
                </div>
              )}

              <div className="cr-card__article-text">
                {(imagePosition === 'left' || imagePosition === 'right') && (
                  <div
                    className={`cr-card__article-image cr-card__article-image--${imagePosition}`}
                  >
                    <ImageWithCaption />
                  </div>
                )}
                {excerpt && <p className="cr-card__content-excerpt">{excerpt}</p>}
                {content && (
                  <div
                    className="cr-card__content-text"
                    dangerouslySetInnerHTML={{
                      __html: (() => {
                        let html = content
                        // Convert **bold** to <strong>
                        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

                        // Split into blocks first
                        const blocks = html.split('\n\n')
                        const processedBlocks = blocks
                          .map((block) => {
                            // Check if block contains ordered list items
                            const lines = block.split('\n')
                            const isOrderedList =
                              lines.every((line) => line.trim() === '' || /^\d+\.\s/.test(line)) &&
                              lines.some((line) => /^\d+\.\s/.test(line))

                            if (isOrderedList) {
                              const listItems = lines
                                .filter((line) => /^\d+\.\s/.test(line))
                                .map((item) => `<li>${item.replace(/^\d+\.\s/, '')}</li>`)
                                .join('')
                              return `<ol>${listItems}</ol>`
                            }

                            // Otherwise wrap in paragraph
                            return block.trim() ? `<p>${block}</p>` : ''
                          })
                          .filter((block) => block !== '')

                        return processedBlocks.join('')
                      })(),
                    }}
                  />
                )}
                {!excerpt && !content && <p className="cr-card__content-text">{contentSummary}</p>}
              </div>
            </div>
          </div>
        )

      case 'small':
        return (
          <div
            className={componentClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-label={onClick ? `View ${title}` : undefined}
          >
            <div className="cr-card__small-banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                titleTag={titleTag}
                titleSize={titleSize}
                height={bannerHeight}
                textLayout={textLayout}
                backgroundColor={bannerBackgroundColor}
                showTicketButton={false}
                showShareButton={false}
                className="cr-card__small-banner-collapsed"
              />
            </div>

            <div className="cr-card__small-main">
              <div
                className={`cr-card__small-image cr-card__small-image--${activeImageAspectRatio.replace(':', '-')}`}
              >
                <div
                  className="cr-card__image"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
              </div>

              <div className="cr-card__small-content">
                <p className="cr-card__content-summary cr-card__content-summary--six-lines">
                  {contentSummary}
                </p>
              </div>
            </div>

            <div className="cr-card__small-continue">
              <CrButton
                size="xsmall"
                variant="text"
                color="secondary"
                rightIcon={<PiArrowRight />}
                onClick={onContinueClick}
              >
                {continueButtonText}
              </CrButton>
            </div>
          </div>
        )

      case 'narrow':
        return (
          <div
            className={componentClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-label={onClick ? `View ${title}` : undefined}
          >
            <div className="cr-card__narrow-banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                titleTag={titleTag}
                titleSize={titleSize}
                height={bannerHeight}
                textLayout={textLayout}
                backgroundColor={bannerBackgroundColor}
                showTicketButton={false}
                showShareButton={type === 'article' && !showMetaTop}
                shareButtonText={shareButtonText}
                onShareClick={onBannerShareClick}
              />
            </div>

            {type === 'article' && showMetaTop ? (
              <div className="cr-card__narrow-date-location">
                <div className="cr-card__narrow-date-location-content">
                  <div className="cr-card__narrow-datetime">
                    <span className="cr-card__narrow-text">{authorBy}</span>
                  </div>
                  <div className="cr-card__narrow-datetime">
                    <span className="cr-card__narrow-text">{eventDate}</span>
                  </div>
                </div>
              </div>
            ) : type !== 'article' ? (
              <div className="cr-card__narrow-date-location">
                <div className="cr-card__narrow-date-location-content">
                  <div className="cr-card__narrow-datetime">
                    <PiCalendarDots className="cr-card__narrow-icon" />
                    <span className="cr-card__narrow-text">{dateTime}</span>
                  </div>

                  <a
                    href="#"
                    className="cr-card__narrow-venue"
                    onClick={(e) => {
                      e.preventDefault()
                      onVenueClick?.()
                    }}
                  >
                    <PiMapTrifold className="cr-card__narrow-icon" />
                    <span className="cr-card__narrow-venue-text">{venue}</span>
                  </a>
                </div>
              </div>
            ) : null}

            <div
              className={`cr-card__narrow-image cr-card__narrow-image--${activeImageAspectRatio.replace(':', '-')}`}
            >
              <div
                className="cr-card__image"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              />
            </div>

            <div className="cr-card__narrow-content">
              <p className="cr-card__content-summary cr-card__content-summary--unclamped">
                {contentSummary}
              </p>
            </div>

            <div className="cr-card__narrow-age-share">
              <div className="cr-card__narrow-age-share-content">
                {type === 'article' ? (
                  <>
                    {!showMetaTop && (
                      <>
                        <div className="cr-card__narrow-datetime">
                          <span className="cr-card__narrow-text">{authorBy}</span>
                        </div>
                        <div className="cr-card__narrow-datetime">
                          <span className="cr-card__narrow-text">{eventDate}</span>
                        </div>
                      </>
                    )}
                    {tags && tags.length > 0 && (
                      <div style={{ display: 'flex', gap: 'var(--cr-space-2)', flexWrap: 'wrap' }}>
                        {tags.map((tag, index) => (
                          <CrChip key={index} variant="secondary" size="medium">
                            {tag}
                          </CrChip>
                        ))}
                      </div>
                    )}
                    {showMetaTop && (
                      <CrButton
                        size="small"
                        variant="outline"
                        color="secondary"
                        leftIcon={<PiArrowSquareUp />}
                        onClick={onShareClick}
                      >
                        {shareButtonText}
                      </CrButton>
                    )}
                  </>
                ) : (
                  <>
                    {ageRestriction && (
                      <CrChip variant="secondary" size="large">
                        {ageRestriction}
                      </CrChip>
                    )}

                    <CrButton
                      size="small"
                      variant="outline"
                      color="secondary"
                      leftIcon={<PiArrowSquareUp />}
                      onClick={onShareClick}
                    >
                      {shareButtonText}
                    </CrButton>
                  </>
                )}
              </div>
            </div>
          </div>
        )

      case 'wide':
        return (
          <div
            className={componentClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-label={onClick ? `View ${title}` : undefined}
          >
            <div className="cr-card__top-banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                titleTag={titleTag}
                titleSize={titleSize}
                height={bannerHeight}
                textLayout={textLayout}
                backgroundColor="none"
                showTicketButton={false}
                showShareButton={true}
                shareButtonText={shareButtonText}
                onShareClick={onBannerShareClick}
              />
            </div>

            <div className="cr-card__main-section">
              <div className="cr-card__wide-image-wrapper">
                <div
                  className={`cr-card__wide-image cr-card__wide-image--${activeImageAspectRatio.replace(':', '-')}`}
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
              </div>

              <div className="cr-card__content-area">
                <p className="cr-card__content-summary cr-card__content-summary--unclamped">
                  {contentSummary}
                </p>
              </div>
            </div>

            <div className="cr-card__bottom-details">
              <CrCardDetails
                type={type}
                device="desktop"
                dateTime={dateTime}
                venue={venue}
                ageRestriction={ageRestriction}
                authorBy={authorBy}
                eventDate={eventDate}
                tags={tags}
                showShareButton={showShareButton}
                onVenueClick={onVenueClick}
                onShareClick={onShareClick}
              />
            </div>
          </div>
        )

      default: // "default" variant
        return (
          <div
            className={componentClasses}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={onClick ? 0 : undefined}
            role={onClick ? 'button' : undefined}
            aria-label={onClick ? `View ${title}` : undefined}
          >
            <div className="cr-card__image-container">
              <div
                className="cr-card__image"
                style={{ backgroundImage: `url(${backgroundImage})` }}
              >
                <div className="cr-card__details-overlay">
                  <CrCardDetails
                    type={type}
                    device="desktop"
                    dateTime={dateTime}
                    venue={venue}
                    ageRestriction={ageRestriction}
                    authorBy={authorBy}
                    eventDate={eventDate}
                    tags={tags}
                    showShareButton={false}
                    onVenueClick={onVenueClick}
                    onShareClick={onShareClick}
                  />
                </div>

                <div className="cr-card__content-overlay">
                  <p className="cr-card__content-summary">{contentSummary}</p>
                </div>
              </div>
            </div>

            <div className="cr-card__banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                titleTag={titleTag}
                titleSize={titleSize}
                height={bannerHeight}
                textLayout={textLayout}
                backgroundColor="none"
                showTicketButton={showTicketButton}
                showShareButton={showShareButton}
                ticketButtonText={bannerButtonText}
                shareButtonText={shareButtonText}
                onTicketClick={onBannerTicketClick}
                onShareClick={onBannerShareClick}
              />
            </div>
          </div>
        )
    }
  }

  return renderContent()
}
