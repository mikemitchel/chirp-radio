// src/pages/RecentlyPlayed.tsx
import { useState, useEffect, useMemo } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import { useNotification } from '../contexts/NotificationContext'
import { useAuth } from '../hooks/useAuth'
import { addToCollection, removeFromCollection, isInCollection } from '../utils/collectionDB'
import LoginRequiredModal from '../components/LoginRequiredModal'
import { useMobilePageByIdentifier, useTracks, useSiteSettings } from '../hooks/useData'

export default function RecentlyPlayed() {
  const { showToast } = useNotification()
  const { isLoggedIn, login, signup } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { data: pageContent } = useMobilePageByIdentifier('recently-played')
  const { data: tracks } = useTracks()
  const { data: siteSettings } = useSiteSettings()

  // Get page header content from CMS with fallbacks
  const pageTitle = pageContent?.pageTitle || 'Recently Played'
  const actionButtonText = pageContent?.actionButtonText || 'Complete Playlist'
  const completePlaylistUrl =
    siteSettings?.completePlaylistUrl || 'https://chirpradio.org/playlists'

  // Get the announcement from CMS (now populated and transformed with depth: 1)
  const selectedAnnouncement =
    typeof pageContent?.announcement === 'object' ? pageContent?.announcement : null

  // Format tracks with hour data for display (take only the 2 most recent hours)
  const playlistItems = useMemo(() => {
    if (!tracks) return []

    // Get unique hours in order (most recent first)
    const uniqueHours: string[] = []
    const tracksSorted = [...tracks].sort(
      (a, b) => new Date(b.playedAt || 0).getTime() - new Date(a.playedAt || 0).getTime()
    )

    tracksSorted.forEach((track) => {
      if (!uniqueHours.includes(track.hourKey)) {
        uniqueHours.push(track.hourKey)
      }
    })

    // Get tracks for the 2 most recent hours
    const recentHours = uniqueHours.slice(0, 2)
    const recentTracks = tracks.filter((track) => recentHours.includes(track.hourKey))

    return recentTracks.map((track) => {
      const playedDate = new Date(track.playedAt || 0)
      const timeString = playedDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })

      // Parse the hourKey to determine start/end times
      const hourMatch = track.hourKey?.match(/(\d+)(am|pm)/i)
      let startTime = '12:00am'
      let endTime = '1:00am'

      if (hourMatch) {
        const hour = parseInt(hourMatch[1])
        const period = hourMatch[2].toLowerCase()
        startTime = `${hour}:00${period}`

        // Calculate end time (next hour)
        if (hour === 12) {
          endTime = period === 'am' ? '1:00am' : '1:00pm'
        } else if (hour === 11) {
          endTime = period === 'am' ? '12:00pm' : '12:00am'
        } else {
          endTime = `${hour + 1}:00${period}`
        }
      }

      return {
        ...track,
        timeAgo: timeString,
        albumArtAlt: `${track.albumName} album cover`,
        hourData: {
          startTime,
          endTime,
          djName: track.djName || 'Unknown DJ',
          djProfileUrl: track.djImage,
          showName: track.showName || 'Unknown Show',
        },
        isAdded: isInCollection(track.artistName, track.trackName),
      }
    })
  }, [tracks])

  // Update isAdded status when collection changes
  useEffect(() => {
    // Force re-render when collection updates
    const handleCollectionUpdate = () => {
      // The useMemo above will recompute with updated isInCollection values
      window.dispatchEvent(new Event('chirp-collection-updated-internal'))
    }

    window.addEventListener('chirp-collection-updated', handleCollectionUpdate)
    return () => {
      window.removeEventListener('chirp-collection-updated', handleCollectionUpdate)
    }
  }, [])

  const handleItemAdd = (item: any, _index: number) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (item.isAdded) {
      // Remove from collection
      const removed = removeFromCollection(item.id)
      if (removed) {
        showToast({
          message: `Removed ${item.trackName} from your collection`,
          type: 'success',
          duration: 3000,
        })
      }
    } else {
      // Add to collection
      // Use CHIRP logo as fallback if no album art
      const albumArtUrl = item.albumArt || '/src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg'

      addToCollection({
        id: item.id,
        artistName: item.artistName,
        trackName: item.trackName,
        albumName: item.albumName,
        labelName: item.labelName,
        albumArt: albumArtUrl,
        albumArtAlt: item.albumArtAlt,
        isLocal: item.isLocal,
      })
      showToast({
        message: `Added ${item.trackName} to your collection`,
        type: 'success',
        duration: 3000,
      })
    }
  }

  const handleLogin = (email: string, _password: string) => {
    login(email, email.split('@')[0])
    setShowLoginModal(false)
    showToast({
      message: 'Successfully logged in!',
      type: 'success',
      duration: 3000,
    })
  }

  const handleSignUp = (email: string, _password: string) => {
    signup(email, email.split('@')[0])
    setShowLoginModal(false)
    showToast({
      message: 'Account created successfully!',
      type: 'success',
      duration: 3000,
    })
  }

  const handleCompletePlaylist = () => {
    window.open(completePlaylistUrl, '_blank')
  }

  return (
    <div className="page-container">
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title={pageTitle}
        showEyebrow={false}
        showActionButton={true}
        actionButtonText={actionButtonText}
        actionButtonSize="small"
        onActionClick={handleCompletePlaylist}
        titleSize="lg"
      />

      <CrPlaylistTable
        items={playlistItems}
        showHeader={true}
        groupByHour={true}
        onItemAddClick={handleItemAdd}
      />

      {selectedAnnouncement && (
        <CrAnnouncement
          variant={selectedAnnouncement.variant}
          textureBackground={selectedAnnouncement.textureBackground}
          headlineText={selectedAnnouncement.headlineText}
          bodyText={selectedAnnouncement.bodyText}
          showLink={selectedAnnouncement.showLink}
          linkText={selectedAnnouncement.linkText}
          linkUrl={selectedAnnouncement.linkUrl}
          buttonCount={selectedAnnouncement.buttonCount}
          button1Text={selectedAnnouncement.button1Text}
          button1Icon={selectedAnnouncement.button1Icon}
          button2Text={selectedAnnouncement.button2Text}
          button2Icon={selectedAnnouncement.button2Icon}
          currentAmount={selectedAnnouncement.currentAmount}
          targetAmount={selectedAnnouncement.targetAmount}
        />
      )}

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </div>
  )
}
