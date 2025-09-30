// CrList.tsx
import React from 'react';
import CrCardBanner from './CrCardBanner';
import CrListItem from './CrListItem';
import './CrList.css';

export default function CrList({
  // Banner props
  preheader = "Intro Preheader Thing",
  title = "Title of the Thing", 
  bannerButtonText = "Listen on Bandcamp",
  onBannerButtonClick,
  
  // List props
  items = [],
  onItemAddClick,
  
  className = ""
}) {

  const componentClasses = [
    'cr-rating-card',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={componentClasses}>
      <CrCardBanner
        preheader={preheader}
        title={title}
        height="tall"
        textLayout="stacked"
        backgroundColor="textured"
        showTicketButton={true}
        showShareButton={false}
        ticketButtonText={bannerButtonText}
        onTicketClick={onBannerButtonClick}
      />
      
      <div className="cr-rating-card__list">
        {items.map((item, index) => (
          <CrListItem
            key={index}
            ranking={item.ranking || index + 1}
            songName={item.songName}
            artistName={item.artistName}
            recordCompany={item.recordCompany}
            showAddButton={item.showAddButton !== false}
            onAddClick={() => onItemAddClick && onItemAddClick(item, index)}
          />
        ))}
      </div>
    </div>
  );
}