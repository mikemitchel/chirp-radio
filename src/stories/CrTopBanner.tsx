// CrTopBanner.tsx
import React, { useState, useEffect } from 'react';
import CrAccount from './CrAccount';
import CrCurrentDj from './CrCurrentDj';
import './CrTopBanner.css';

interface CrTopBannerProps {
  isLoggedIn?: boolean;
  isVolunteer?: boolean;
  userName?: string;
  userAvatar?: string;
  showTags?: boolean;
  tags?: string[];
  onLoginClick?: () => void;
  onVolunteerDropdown?: () => void;
  djName?: string;
  showName?: string;
  isOnAir?: boolean;
  statusText?: string;
  autoFetch?: boolean;
  apiUrl?: string;
}

export default function CrTopBanner({
  // Account props
  isLoggedIn = true,
  isVolunteer = true,
  userName = "Johanna Dough",
  userAvatar = "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  showTags = false, // Typically false in the banner to save space
  tags = ["Jazz", "Blues", "Rock"],
  onLoginClick,
  onVolunteerDropdown,
  
  // DJ/Show props
  djName = "DJ Current",
  showName = "The Current Show",
  isOnAir = true,
  statusText = "On-Air",
  
  // API props
  autoFetch = false,
  apiUrl = 'https://chirpradio.appspot.com/api/current_playlist'
}: CrTopBannerProps) {
  const [apiData, setApiData] = useState({
    dj: djName,
    show: showName
  });

  // Fetch API data
  const fetchApiData = async () => {
    if (!autoFetch) return;
    
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}&t=${Date.now()}`;
    try {
      const response = await fetch(proxyUrl);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      const parsedData = JSON.parse(data.contents);

      if (parsedData?.now_playing) {
        const nowPlaying = parsedData.now_playing;
        const dj = nowPlaying.dj?.trim() || djName;
        const show = nowPlaying.show?.trim() || '';

        setApiData({
          dj,
          show
        });
      }
    } catch (error) {
      console.error('Error fetching API data:', error);
    }
  };

  // Auto-fetch effect
  useEffect(() => {
    if (autoFetch) {
      fetchApiData();
      const interval = setInterval(fetchApiData, 15000);
      return () => clearInterval(interval);
    }
  }, [autoFetch, apiUrl]);

  // Update state when props change (for non-API usage)
  useEffect(() => {
    if (!autoFetch) {
      setApiData({
        dj: djName,
        show: showName
      });
    }
  }, [djName, showName, autoFetch]);

  return (
    <div className="cr-top-banner">
      <div className="cr-top-banner__left">
        <CrAccount
          isLoggedIn={isLoggedIn}
          isVolunteer={isVolunteer}
          userName={userName}
          userAvatar={userAvatar}
          showTags={showTags}
          tags={tags}
          onLoginClick={onLoginClick}
          onVolunteerDropdown={onVolunteerDropdown}
        />
      </div>
      
      <div className="cr-top-banner__right">
        <CrCurrentDj
          djName={apiData.dj}
          showName={apiData.show}
          isOnAir={isOnAir}
          statusText={statusText}
        />
      </div>
    </div>
  );
}