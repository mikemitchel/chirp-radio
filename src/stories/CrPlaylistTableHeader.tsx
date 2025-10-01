// CrPlaylistTableHeader.tsx
import React from 'react';
import './CrPlaylistTableHeader.css';

interface CrPlaylistTableHeaderProps {
  className?: string;
}

export default function CrPlaylistTableHeader({
  className = ""
}: CrPlaylistTableHeaderProps) {
  return (
    <div className={`cr-playlist-table-header ${className}`}>
      <div className="cr-playlist-table-header__art"></div>
      
      <div className="cr-playlist-table-header__grid">
        <div className="cr-playlist-table-header__left">
          <div className="cr-playlist-table-header__track">Title</div>
          <div className="cr-playlist-table-header__artist">Artist Name</div>
        </div>
        
        <div className="cr-playlist-table-header__right">
          <div className="cr-playlist-table-header__album">Album</div>
          <div className="cr-playlist-table-header__label">Label</div>
        </div>
      </div>
      
      <div className="cr-playlist-table-header__time">
        <div className="cr-playlist-table-header__time-label">Time</div>
        <div className="cr-playlist-table-header__played-label">Played</div>
      </div>
      
      <div className="cr-playlist-table-header__action">
        <div className="cr-playlist-table-header__add-label">Add to</div>
        <div className="cr-playlist-table-header__collection-label">Collection</div>
      </div>
    </div>
  );
}