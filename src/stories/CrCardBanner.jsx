// CrCardBanner.tsx
import React from 'react';
import { PiTicket, PiArrowSquareUp, PiMusicNotes, PiArrowCircleRight } from 'react-icons/pi';
import CrButton from './CrButton';
import './CrCardBanner.css';

export default function CrCardBanner({
  preheader = "Intro Preheader Thing",
  title = "Title of the Thing",
  showPreheader = true,
  textLayout = "stacked", // "stacked" or "inline"
  height = "tall", // "narrow" (60px) or "tall" (84px)
  backgroundColor = "textured", // "textured" or "none"
  showTicketButton = true,
  showShareButton = true,
  ticketButtonText = "Buy Tix",
  shareButtonText = "Share",
  onTicketClick,
  onShareClick,
  className = ""
}) {

  // Force inline layout for narrow height
  const actualTextLayout = height === "narrow" ? "inline" : textLayout;
  
  // Build component classes
  const componentClasses = [
    'cr-card-title-banner',
    `cr-card-title-banner--${height}`,
    `cr-card-title-banner--${actualTextLayout}`,
    backgroundColor === "textured" ? 'cr-bg-textured cr-bg-natural-light' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={componentClasses}>
      <div className="cr-card-title-banner__container">
        
        {/* Left Content */}
        <div className="cr-card-title-banner__content">
          {showPreheader && preheader && (
            <div className="cr-card-title-banner__preheader">
              {preheader}
            </div>
          )}
          <h2 className="cr-card-title-banner__title">
            {title}
          </h2>
        </div>

        {/* Right Action Buttons */}
        <div className="cr-card-title-banner__actions">
          {showTicketButton && (
            <CrButton
              size="small"
              variant="outline"
              color="secondary"
              rightIcon={<PiTicket />}
              onClick={onTicketClick}
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
              onClick={onShareClick}
            >
              {shareButtonText}
            </CrButton>
          )}
        </div>
        
      </div>
    </div>
  );
}