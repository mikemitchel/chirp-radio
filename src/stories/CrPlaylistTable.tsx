// CrPlaylistTable.tsx
import React, { useState, useRef, useEffect } from 'react';
import CrPlaylistTableHeader from './CrPlaylistTableHeader';
import CrPlaylistItem from './CrPlaylistItem';
import CrPlaylistHourBreak from './CrPlaylistHourBreak';
import './CrPlaylistTable.css';

interface CrPlaylistTableProps {
  items?: any[];
  showHeader?: boolean;
  onItemAddClick?: (item: any, index: number) => void;
  groupByHour?: boolean;
  className?: string;
}

export default function CrPlaylistTable({
  items = [],
  showHeader = true,
  onItemAddClick,
  groupByHour = false,
  className = ""
}: CrPlaylistTableProps) {
  const [collapsedHours, setCollapsedHours] = useState({});
  const contentRefs = useRef({});

  const toggleHour = (hourKey) => {
    setCollapsedHours(prev => ({
      ...prev,
      [hourKey]: !prev[hourKey]
    }));
  };

  // Group items by hour if groupByHour is true
  const groupedItems = groupByHour ? items.reduce((acc, item) => {
    const hourKey = item.hourKey || 'unknown';
    if (!acc[hourKey]) {
      acc[hourKey] = {
        hourData: item.hourData || {},
        items: []
      };
    }
    acc[hourKey].items.push(item);
    return acc;
  }, {}) : null;

  if (groupByHour && groupedItems) {
    return (
      <div className={`cr-playlist-table ${className}`}>
        {showHeader && <CrPlaylistTableHeader />}
        
        <div className="cr-playlist-table__items">
          {Object.entries(groupedItems).map(([hourKey, hourGroup]) => {
            const isCollapsed = collapsedHours[hourKey];
            const { hourData, items: hourItems } = hourGroup;
            
            return (
              <div key={hourKey} className="cr-playlist-table__hour-group">
                <div 
                  className="cr-playlist-table__hour-break-wrapper"
                  onClick={() => toggleHour(hourKey)}
                  role="button"
                  aria-expanded={!isCollapsed}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleHour(hourKey);
                    }
                  }}
                >
                  <CrPlaylistHourBreak
                    startTime={hourData.startTime}
                    endTime={hourData.endTime}
                    djName={hourData.djName}
                    djProfileUrl={hourData.djProfileUrl}
                    showName={hourData.showName}
                    isCollapsed={isCollapsed}
                  />
                </div>
                
                <div 
                  className={`cr-playlist-table__hour-items ${isCollapsed ? 'cr-playlist-table__hour-items--collapsed' : ''}`}
                  style={{
                    maxHeight: isCollapsed ? '0px' : contentRefs.current[hourKey]?.scrollHeight + 'px' || '5000px'
                  }}
                >
                  <div 
                    ref={el => contentRefs.current[hourKey] = el}
                    className="cr-playlist-table__hour-items-inner"
                  >
                    {hourItems.map((item, index) => (
                      <CrPlaylistItem
                        key={item.id || `${hourKey}-${index}`}
                        variant="table"
                        albumArt={item.albumArt}
                        albumArtAlt={item.albumArtAlt}
                        artistName={item.artistName}
                        trackName={item.trackName}
                        albumName={item.albumName}
                        labelName={item.labelName}
                        timeAgo={item.timeAgo}
                        showTime={item.showTime !== false}
                        isAdded={item.isAdded}
                        isLocal={item.isLocal}
                        onToggleAdd={() => onItemAddClick && onItemAddClick(item, index)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Original non-grouped rendering
  return (
    <div className={`cr-playlist-table ${className}`}>
      {showHeader && <CrPlaylistTableHeader />}
      
      <div className="cr-playlist-table__items">
        {items.map((item, index) => (
          <CrPlaylistItem
            key={item.id || index}
            variant="table"
            albumArt={item.albumArt}
            albumArtAlt={item.albumArtAlt}
            artistName={item.artistName}
            trackName={item.trackName}
            albumName={item.albumName}
            labelName={item.labelName}
            timeAgo={item.timeAgo}
            showTime={item.showTime !== false}
            isAdded={item.isAdded}
            isLocal={item.isLocal}
            onToggleAdd={() => onItemAddClick && onItemAddClick(item, index)}
          />
        ))}
      </div>
    </div>
  );
}