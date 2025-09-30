// CrAppHeader.tsx
import React from "react";
import CrTopBanner from "./CrTopBanner";
import CrBrandBanner from "./CrBrandBanner";
import CrMainNav from "./CrMainNav";
import "./CrAppHeader.css";

export default function CrAppHeader({
  // TopBanner props
  isLoggedIn = true,
  isVolunteer = true,
  userName = "Johanna Dough",
  userAvatar = "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  djName = "DJ Current",
  showName = "The Current Show",
  isOnAir = true,
  statusText = "On-Air",

  // API props for TopBanner
  autoFetch = false,
  apiUrl = "https://chirpradio.appspot.com/api/current_playlist",

  // LogoBanner props (formerly SiteHeader props)
  streamingPlayerProps = {
    variant: "slim-player",
    artistName: "Dave Brubeck Quartet",
    trackName: "Take Five",
    isTrackAdded: false,
    autoFetch: false,
  },

  // MainNav props
  storeBadgeCount = 5,
  showStoreBadge = true,

  // Event handlers
  onMenuClick,
  onListenClick,
  onEventsClick,
  onArticlesClick,
  onSearchClick,
  onStoreClick,
  onWaysToGiveClick,
  onDonateClick,
  onLoginClick,
  onVolunteerDropdown,
}) {
  return (
    <div className="cr-app-header">
      <CrTopBanner
        isLoggedIn={isLoggedIn}
        isVolunteer={isVolunteer}
        userName={userName}
        userAvatar={userAvatar}
        showTags={false}
        djName={djName}
        showName={showName}
        isOnAir={isOnAir}
        statusText={statusText}
        autoFetch={autoFetch}
        apiUrl={apiUrl}
        onLoginClick={onLoginClick}
        onVolunteerDropdown={onVolunteerDropdown}
      />

      <CrBrandBanner streamingPlayerProps={streamingPlayerProps} />

      <CrMainNav
        onMenuClick={onMenuClick}
        onListenClick={onListenClick}
        onEventsClick={onEventsClick}
        onArticlesClick={onArticlesClick}
        onSearchClick={onSearchClick}
        onStoreClick={onStoreClick}
        storeBadgeCount={storeBadgeCount}
        onWaysToGiveClick={onWaysToGiveClick}
        onDonateClick={onDonateClick}
        showStoreBadge={showStoreBadge}
      />
    </div>
  );
}
