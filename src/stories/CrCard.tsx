// CrCard.tsx
import React from 'react';
import CrCardBanner from './CrCardBanner';
import CrCardDetails from './CrCardDetails';
import CrChip from './CrChip';
import CrButton from './CrButton';
import { PiCalendarDots, PiMapTrifold, PiArrowSquareUp, PiArrowRight } from 'react-icons/pi';
import './CrCard.css';

interface CrCardProps {
  backgroundImage?: string;
  imageCaption?: string;
  dateTime?: string;
  venue?: string;
  ageRestriction?: string;
  contentSummary?: string;
  metaContent?: string;
  timeSlot?: string;
  showMeta?: boolean;
  preheader?: string;
  title?: string;
  bannerButtonText?: string;
  shareButtonText?: string;
  continueButtonText?: string;
  onBannerTicketClick?: () => void;
  onBannerShareClick?: () => void;
  onVenueClick?: () => void;
  onShareClick?: () => void;
  onContinueClick?: () => void;
  variant?: string;
  imagePosition?: string;
  imageSize?: string;
  captionPosition?: string;
  imageAspectRatio?: string;
  articleImageAspectRatio?: string;
  type?: string;
  bannerHeight?: string;
  className?: string;
}

export default function CrCard({
  // Image
  backgroundImage = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
  imageCaption = "Photo credit - John Dough",
  
  // Card Details props
  dateTime = "September 30, 2025 @ 10:00pm",
  venue = "Lincoln Hall", 
  ageRestriction = "21+",
  
  // Content
  contentSummary = "Vestibulum id ligula porta felis euismod semper. Sed posuere consectetur est at lobortis. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Nullam quis risus eget urna mollis ornare vel eu leo.",
  
  // Meta content for article layouts
  metaContent = "This content is 30 characters.",
  timeSlot = "Monday 12pm - 12pm",
  showMeta = false,
  
  // Banner props
  preheader = "Intro Preheader Thing",
  title = "Title of the Thing",
  bannerButtonText = "Buy Tix",
  shareButtonText = "Share",
  continueButtonText = "Continue Reading",
  
  // Event handlers
  onBannerTicketClick,
  onBannerShareClick,
  onVenueClick,
  onShareClick,
  onContinueClick,
  
  // Layout variant
  variant = "default", // "default", "wide", "narrow", "small", "article"

  // Article layout props (only used when variant="article")
  imagePosition = "none", // "left", "right", "full", "none"
  imageSize = "large", // "small", "large"
  captionPosition = "bottom", // "bottom", "overlay", "none"

  // Image aspect ratio
  imageAspectRatio = "16:9", // "16:9", "4:3", "1:1" (non-article variants)
  articleImageAspectRatio = "16:9", // "16:9", "4:3", "9:16", "1:1" (article variant only)

  // CrCardDetails type
  type = "event", // "event" or "article"

  // CrCardBanner height
  bannerHeight = "narrow", // "narrow" or "tall"

  className = ""
}: CrCardProps) {

  // Use articleImageAspectRatio when variant is 'article'
  const activeImageAspectRatio = variant === 'article' ? articleImageAspectRatio : imageAspectRatio;
  
  // Memoized class computation
  const componentClasses = React.useMemo(() => [
    'cr-card',
    `cr-card--${variant}`,
    variant === 'article' && `cr-card--article-${imagePosition}`,
    variant === 'article' && `cr-card--article-${imageSize}`,
    `cr-card--${activeImageAspectRatio.replace(':', '-')}`,
    className
  ].filter(Boolean).join(' '), [variant, imagePosition, imageSize, activeImageAspectRatio, className]);

  // Shared components - memoized to prevent re-renders
  const ArticleHeader = React.useMemo(() => (
    <div className="cr-card__article-header">
      <CrCardBanner
        preheader={preheader}
        title={title}
        height={bannerHeight}
        textLayout="inline"
        backgroundColor="none"
        showTicketButton={true}
        showShareButton={true}
        ticketButtonText={bannerButtonText}
        shareButtonText={shareButtonText}
        onTicketClick={onBannerTicketClick}
        onShareClick={onBannerShareClick}
      />
    </div>
  ), [preheader, title, bannerHeight, bannerButtonText, shareButtonText, onBannerTicketClick, onBannerShareClick]);

  const MetaInfo = React.useMemo(() => (
    <div className="cr-card__meta-info">
      <div className="cr-card__meta-content">{metaContent}</div>
      <div className="cr-card__time-slot">{timeSlot}</div>
    </div>
  ), [metaContent, timeSlot]);

  const ImageWithCaption = React.useCallback(() => (
    <div className="cr-card__image-wrapper">
      <div 
        className="cr-card__image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {captionPosition === "overlay" && (
          <div className="cr-card__image-caption cr-card__image-caption--overlay">
            {imageCaption}
          </div>
        )}
      </div>
      {captionPosition === "bottom" && (
        <div className="cr-card__image-caption">
          {imageCaption}
        </div>
      )}
    </div>
  ), [backgroundImage, captionPosition, imageCaption]);

  // Optimized render logic with early returns
  const renderContent = () => {
    switch (variant) {
      case "article":
        return (
          <div className={componentClasses}>
            {ArticleHeader}
            {showMeta && MetaInfo}
            
            <div className="cr-card__article-content">
              {imagePosition === "full" && (
                <div className="cr-card__article-image-full">
                  <ImageWithCaption />
                </div>
              )}
              
              <div className="cr-card__article-text">
                {(imagePosition === "left" || imagePosition === "right") && (
                  <div className={`cr-card__article-image cr-card__article-image--${imagePosition}`}>
                    <ImageWithCaption />
                  </div>
                )}
                <p className="cr-card__content-text">{contentSummary}</p>
              </div>
            </div>
          </div>
        );

      case "small":
        return (
          <div className={componentClasses}>
            <div className="cr-card__small-banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                height={bannerHeight}
                textLayout="stacked"
                backgroundColor="none"
                showTicketButton={false}
                showShareButton={false}
                className="cr-card__small-banner-collapsed"
              />
            </div>
            
            <div className="cr-card__small-main">
              <div className={`cr-card__small-image cr-card__small-image--${activeImageAspectRatio.replace(':', '-')}`}>
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
        );

      case "narrow":
        return (
          <div className={componentClasses}>
            <div className="cr-card__narrow-banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                height={bannerHeight}
                textLayout="stacked"
                backgroundColor="none"
                showTicketButton={false}
                showShareButton={false}
              />
            </div>
            
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
                    e.preventDefault();
                    onVenueClick?.();
                  }}
                >
                  <PiMapTrifold className="cr-card__narrow-icon" />
                  <span className="cr-card__narrow-venue-text">{venue}</span>
                </a>
              </div>
            </div>
            
            <div className={`cr-card__narrow-image cr-card__narrow-image--${activeImageAspectRatio.replace(':', '-')}`}>
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
              </div>
            </div>
          </div>
        );

      case "wide":
        return (
          <div className={componentClasses}>
            <div className="cr-card__top-banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                height={bannerHeight}
                textLayout="inline"
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
                onVenueClick={onVenueClick}
                onShareClick={onShareClick}
              />
            </div>
          </div>
        );

      default: // "default" variant
        return (
          <div className={componentClasses}>
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
                    onVenueClick={onVenueClick}
                    onShareClick={onShareClick}
                  />
                </div>
                
                <div className="cr-card__content-overlay">
                  <p className="cr-card__content-summary">
                    {contentSummary}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="cr-card__banner">
              <CrCardBanner
                preheader={preheader}
                title={title}
                height={bannerHeight}
                textLayout="inline"
                backgroundColor="none"
                showTicketButton={true}
                showShareButton={true}
                ticketButtonText={bannerButtonText}
                shareButtonText={shareButtonText}
                onTicketClick={onBannerTicketClick}
                onShareClick={onBannerShareClick}
              />
            </div>
          </div>
        );
    }
  };

  return renderContent();
}