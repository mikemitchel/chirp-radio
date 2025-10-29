// CrAppHeader.tsx
import CrTopBanner from './CrTopBanner'
import CrBrandBanner from './CrBrandBanner'
import CrMainNav from './CrMainNav'
import './CrAppHeader.css'

interface CrAppHeaderProps {
  isLoggedIn?: boolean
  isVolunteer?: boolean
  userName?: string
  userAvatar?: string
  djName?: string
  showName?: string
  isOnAir?: boolean
  statusText?: string
  autoFetch?: boolean
  apiUrl?: string
  streamingPlayerProps?: any
  storeBadgeCount?: number
  showStoreBadge?: boolean
  onMenuClick?: () => void
  onListenClick?: () => void
  onEventsClick?: () => void
  onArticlesClick?: () => void
  onSearchClick?: () => void
  onStoreClick?: () => void
  onWaysToGiveClick?: () => void
  onDonateClick?: () => void
  onLoginClick?: () => void
  onSignUpClick?: () => void
  onVolunteerDropdown?: () => void
  onProfileClick?: () => void
  onFavoritesClick?: () => void
  onDonationsClick?: () => void
  onPurchasesClick?: () => void
  onSignOutClick?: () => void
  onVolunteerDirectoryClick?: () => void
  onLeadershipDirectoryClick?: () => void
  onVolunteerCalendarClick?: () => void
  onWebsitesClick?: () => void
  onDownloadsClick?: () => void
}

export default function CrAppHeader({
  // TopBanner props
  isLoggedIn = true,
  isVolunteer = true,
  userName = 'Johanna Dough',
  userAvatar = 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
  djName = 'DJ Current',
  showName = 'The Current Show',
  isOnAir = true,
  statusText = 'On-Air',

  // API props for TopBanner
  autoFetch = false,
  apiUrl = 'https://chirpradio.appspot.com/api/current_playlist',

  // LogoBanner props (formerly SiteHeader props)
  streamingPlayerProps = {
    variant: 'slim-player',
    artistName: 'Dave Brubeck Quartet',
    trackName: 'Take Five',
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
  onSignUpClick,
  onVolunteerDropdown,
  onProfileClick,
  onFavoritesClick,
  onSignOutClick,
  onVolunteerDirectoryClick,
  onLeadershipDirectoryClick,
  onVolunteerCalendarClick,
  onWebsitesClick,
  onDownloadsClick,
}: CrAppHeaderProps) {
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
        onSignUpClick={onSignUpClick}
        onVolunteerDropdown={onVolunteerDropdown}
        onProfileClick={onProfileClick}
        onFavoritesClick={onFavoritesClick}
        onSignOutClick={onSignOutClick}
        onVolunteerDirectoryClick={onVolunteerDirectoryClick}
        onLeadershipDirectoryClick={onLeadershipDirectoryClick}
        onVolunteerCalendarClick={onVolunteerCalendarClick}
        onWebsitesClick={onWebsitesClick}
        onDownloadsClick={onDownloadsClick}
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
  )
}
