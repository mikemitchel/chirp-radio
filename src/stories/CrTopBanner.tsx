// CrTopBanner.tsx
import { useState, useEffect, useCallback } from 'react'
import CrAccount from './CrAccount'
import CrCurrentDj from './CrCurrentDj'
import './CrTopBanner.css'

interface CrTopBannerProps {
  isLoggedIn?: boolean
  isVolunteer?: boolean
  userName?: string
  userAvatar?: string
  showTags?: boolean
  tags?: string[]
  onLoginClick?: () => void
  onSignUpClick?: () => void
  onVolunteerDropdown?: () => void
  onProfileClick?: () => void
  onFavoritesClick?: () => void
  onPurchasesClick?: () => void
  onSignOutClick?: () => void
  onVolunteerDirectoryClick?: () => void
  onLeadershipDirectoryClick?: () => void
  onVolunteerCalendarClick?: () => void
  onWebsitesClick?: () => void
  onDownloadsClick?: () => void
  djName?: string
  showName?: string
  isOnAir?: boolean
  statusText?: string
  autoFetch?: boolean
  apiUrl?: string
}

export default function CrTopBanner({
  // Account props
  isLoggedIn = true,
  isVolunteer = true,
  userName = 'Johanna Dough',
  userAvatar = 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
  showTags = false, // Typically false in the banner to save space
  tags = ['Jazz', 'Blues', 'Rock'],
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

  // DJ/Show props
  djName = 'DJ Current',
  showName = 'The Current Show',
  isOnAir = true,
  statusText = 'On-Air',

  // API props
  autoFetch = false,
  apiUrl = 'https://chirpradio.appspot.com/api/current_playlist',
}: CrTopBannerProps) {
  const [apiData, setApiData] = useState({
    dj: djName,
    show: showName,
  })

  // Fetch API data
  const fetchApiData = useCallback(async () => {
    if (!autoFetch) return

    try {
      // Use the /api/current_playlist proxy path
      const fetchUrl = `/api/current_playlist?t=${Date.now()}`
      const response = await fetch(fetchUrl, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
      })

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)

      const parsedData = await response.json()

      if (parsedData?.now_playing) {
        const nowPlaying = parsedData.now_playing
        const dj = nowPlaying.dj?.trim() || djName
        const show = nowPlaying.show?.trim() || ''

        setApiData({
          dj,
          show,
        })
      }
    } catch (error) {
      console.error('Error fetching API data:', error)
      // Silently fail and use default values
    }
  }, [autoFetch, djName])

  // Auto-fetch effect
  useEffect(() => {
    if (autoFetch) {
      fetchApiData()
      const interval = setInterval(fetchApiData, 300000) // Poll every 5 minutes
      return () => clearInterval(interval)
    }
  }, [autoFetch, apiUrl, fetchApiData])

  // Update state when props change (for non-API usage)
  useEffect(() => {
    if (!autoFetch) {
      setApiData({
        dj: djName,
        show: showName,
      })
    }
  }, [djName, showName, autoFetch])

  return (
    <div className="cr-top-banner">
      <div className="cr-top-banner__container">
        <div className="cr-top-banner__left">
          <CrAccount
            isLoggedIn={isLoggedIn}
            isVolunteer={isVolunteer}
            userName={userName}
            userAvatar={userAvatar}
            showTags={showTags}
            tags={tags}
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
    </div>
  )
}
