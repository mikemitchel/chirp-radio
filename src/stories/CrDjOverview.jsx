// CrDjOverview.tsx
import React from 'react';
import CrButton from './CrButton';
import { PiCaretRight, PiHeadphones } from 'react-icons/pi';
import { PiMusicNotes, PiChatCircleText } from 'react-icons/pi';
import './CrDjOverview.css';

export default function CrDjOverview({
  size = 'large', // 'large', 'medium', 'small', 'xsmall-1col', 'xsmall-2col', 'schedule'
  role = 'dj',
  useOn = 'light',
  title, // Optional title for large variant
  djName = 'DJ Reallylong Namerson',
  content = 'This content is 30 characters.',
  description = 'Aenean lacinia bibendum nulla sed consectetur. Maecenas faucibus mollis interdum. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.',
  showTime = 'Monday 12pm - 12pm',
  imageSrc, // Optional image source
  onRequestClick,
  onMoreClick,
  onDjDetailsClick,
  // Schedule variant specific props
  isCHIRP = false,
  showTitle
}) {
  
  // Render different layouts based on size variant
  const renderLarge = () => (
    <div className={`cr-dj-overview cr-dj-overview--large cr-dj-overview--${useOn}`}>
      <div className="cr-dj-overview__image" style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}}>
        {/* SVG Placeholder */}
      </div>
      <div className="cr-dj-overview__content">
        {title && <div className="cr-dj-overview__title">{title}</div>}
        <div className="cr-dj-overview__dj-name">{djName}</div>
        <div className="cr-dj-overview__content-text">{content}</div>
        <div className="cr-dj-overview__description">{description}</div>
        <div className="cr-dj-overview__show-time">{showTime}</div>
        <div className="cr-dj-overview__actions">
          <CrButton 
            size="small" 
            variant="outline" 
            color="secondary"
            leftIcon={<PiMusicNotes />}
            rightIcon={<PiChatCircleText />}
            onClick={onRequestClick}
          >
            Request
          </CrButton>
          <CrButton 
            size="small" 
            variant="solid" 
            color="default"
            rightIcon={<PiCaretRight />}
            onClick={onMoreClick}
          >
            More
          </CrButton>
        </div>
      </div>
    </div>
  );

  const renderMedium = () => (
    <div className={`cr-dj-overview cr-dj-overview--medium cr-dj-overview--${useOn}`}>
      <div className="cr-dj-overview__image cr-dj-overview__image--circular" style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}}>
        {/* SVG Placeholder */}
      </div>
      <div className="cr-dj-overview__content">
        <div className="cr-dj-overview__dj-name">{djName}</div>
        <div className="cr-dj-overview__content-text">{content}</div>
        <div className="cr-dj-overview__show-time">{showTime}</div>
        <CrButton 
          size="small" 
          variant="outline" 
          color="default"
          rightIcon={<PiCaretRight />}
          onClick={onMoreClick}
        >
          More
        </CrButton>
      </div>
    </div>
  );

  const renderXSmall1Col = () => (
    <div className={`cr-dj-overview cr-dj-overview--xsmall-1col cr-dj-overview--${useOn}`}>
      <div className="cr-dj-overview__dj-name">{djName}</div>
      <div className="cr-dj-overview__content-text">{content}</div>
      <div className="cr-dj-overview__show-time">{showTime}</div>
    </div>
  );

  const renderXSmall2Col = () => (
    <div className={`cr-dj-overview cr-dj-overview--xsmall-2col cr-dj-overview--${useOn}`}>
      <div className="cr-dj-overview__show-time cr-dj-overview__show-time--left">{showTime}</div>
      <div className="cr-dj-overview__content">
        <div className="cr-dj-overview__dj-name">{djName}</div>
        <div className="cr-dj-overview__content-text">{content}</div>
        <CrButton 
          size="small" 
          variant="outline" 
          color="default"
          rightIcon={<PiCaretRight />}
          onClick={onMoreClick}
        >
          More
        </CrButton>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className={`cr-dj-overview cr-dj-overview--schedule cr-dj-overview--${useOn}`}>
      <div className="cr-dj-overview__show-time">{showTime}</div>
      
      <div className="cr-dj-overview__body">
        {/* Only render img tag if imageSrc exists, otherwise use div with background placeholder */}
        {imageSrc ? (
          <img 
            className="cr-dj-overview__image cr-dj-overview__image--schedule" 
            src={imageSrc} 
            alt={`${djName} avatar`}
          />
        ) : (
          <div className="cr-dj-overview__image cr-dj-overview__image--schedule">
            {/* SVG Placeholder */}
          </div>
        )}
        
        <div className="cr-dj-overview__meta">
          <div className="cr-dj-overview__dj-name">{djName}</div>
          
          {showTitle && (
            <div className="cr-dj-overview__show-title">{showTitle}</div>
          )}
          
          {!isCHIRP && (
            <div className="cr-dj-overview__button-wrapper">
              <CrButton
                size="xsmall"
                variant="text"
                color="default"
                rightIcon={<PiHeadphones />}
                onClick={onDjDetailsClick}
              >
                DJ DETAILS
              </CrButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSmall = () => (
    <div className={`cr-dj-overview cr-dj-overview--small cr-dj-overview--${useOn}`}>
      <div className="cr-dj-overview__image cr-dj-overview__image--circular cr-dj-overview__image--small" style={imageSrc ? { backgroundImage: `url(${imageSrc})` } : {}}>
        {/* SVG Placeholder */}
      </div>
      <div className="cr-dj-overview__content">
        <div className="cr-dj-overview__dj-name">{djName}</div>
      </div>
    </div>
  );

  // Render the appropriate variant
  switch (size) {
    case 'large':
      return renderLarge();
    case 'medium':
      return renderMedium();
    case 'small':
      return renderSmall();
    case 'xsmall-1col':
      return renderXSmall1Col();
    case 'xsmall-2col':
      return renderXSmall2Col();
    case 'schedule':
      return renderSchedule();
    default:
      return renderLarge();
  }
}