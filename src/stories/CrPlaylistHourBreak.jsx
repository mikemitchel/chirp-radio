// CrPlaylistHourBreak.tsx
import React from 'react';
import { PiCaretDown } from 'react-icons/pi';
import './CrPlaylistHourBreak.css';

export default function CrPlaylistHourBreak({
  startTime = "1:00pm",
  endTime = "2:00pm",
  djName = "DJ Current",
  djProfileUrl = "#",
  showName = "",
  isCollapsed = false,
  className = ""
}) {
  return (
    <div className={`cr-playlist-hour-break ${className}`}>
      <div className={`cr-playlist-hour-break__chevron ${isCollapsed ? 'cr-playlist-hour-break__chevron--collapsed' : ''}`}>
        <PiCaretDown />
      </div>
      <span className="cr-playlist-hour-break__time">
        {startTime} - {endTime}
      </span>
      <span className="cr-playlist-hour-break__separator">–</span>
      <a 
        href={djProfileUrl} 
        className="cr-playlist-hour-break__dj-link"
        onClick={(e) => e.stopPropagation()}
      >
        {djName}
      </a>
      {showName && (
        <>
          <span className="cr-playlist-hour-break__show-name">
            {showName}
          </span>
        </>
      )}
      <div className="cr-playlist-hour-break__line"></div>
    </div>
  );
}