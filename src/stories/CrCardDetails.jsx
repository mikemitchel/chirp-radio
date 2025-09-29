// CrCardDetails.jsx
import React from 'react';
import { PiCalendarDots, PiMapTrifold, PiArrowSquareUp } from 'react-icons/pi';
import CrChip from './CrChip';
import CrButton from './CrButton';
import './CrCardDetails.css';

export default function CrCardDetails({
  dateTime = "September 30, 2025 @ 10:00pm",
  venue = "Lincoln Hall",
  ageRestriction = "21+",
  authorBy = "by Sally Forth",
  eventDate = "September 30, 2025",
  tags = ["Hello World", "Hello World", "Hello World"],
  device = "desktop",
  type = "event",
  onVenueClick,
  onShareClick
}) {

  const componentClasses = [
    'cr-card-details',
    `cr-card-details--${device}`,
    `cr-card-details--${type}`
  ].filter(Boolean).join(' ');

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
                e.preventDefault();
                onVenueClick && onVenueClick();
              }}
            >
              <PiMapTrifold className="cr-card-details__icon cr-card-details__icon--map" />
              <span className="cr-card-details__venue-text">{venue}</span>
            </a>
            
            {ageRestriction && (
              <CrChip variant="secondary" size="large">
                {ageRestriction}
              </CrChip>
            )}
          </div>

          <div className="cr-card-details__article-row">
            <div className="cr-card-details__author-date">
              <span className="cr-card-details__author">{authorBy}</span>
              <span className="cr-card-details__date">{eventDate}</span>
            </div>
            
            <div className="cr-card-details__tags">
              {tags.map((tag, index) => (
                <CrChip key={index} variant="secondary" size="medium">
                  {tag}
                </CrChip>
              ))}
            </div>
          </div>
          
        </div>

        <div className="cr-card-details__actions">
          <CrButton
            size="small"
            variant="outline"
            color="secondary"
            leftIcon={<PiArrowSquareUp />}
            onClick={onShareClick}
          >
            Share
          </CrButton>
        </div>
        
      </div>
    </div>
  );
}