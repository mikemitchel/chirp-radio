// src/pages/RecentlyPlayed.tsx
import React, { useState, useEffect } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import { useNotification } from '../contexts/NotificationContext'
import { useAuth } from '../hooks/useAuth'
import { addToCollection, removeFromCollection, isInCollection } from '../utils/collectionDB'
import { getRecentlyPlayed, groupByHour } from '../utils/recentlyPlayedDB'
import LoginRequiredModal from '../components/LoginRequiredModal'

// Sample data - will be replaced with API call
const samplePlaylistItems = [
  // 2pm hour
  {
    id: 'recently-played-1',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show',
    },
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    artistName: 'Thelonious Monk',
    trackName: 'Round Midnight',
    albumName: 'Brilliant Corners',
    labelName: 'Riverside Records',
    timeAgo: '2:45pm',
    isLocal: false,
    isAdded: false,
  },
  {
    id: 'recently-played-2',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show',
    },
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    artistName: 'Bill Evans',
    trackName: 'Waltz for Debby',
    albumName: 'Waltz for Debby',
    labelName: 'Riverside Records',
    timeAgo: '2:30pm',
    isLocal: true,
    isAdded: false,
  },
  {
    id: 'recently-played-3',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show',
    },
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    artistName: 'Art Blakey',
    trackName: 'Moanin',
    albumName: 'Moanin',
    labelName: 'Blue Note Records',
    timeAgo: '2:15pm',
    isLocal: false,
    isAdded: false,
  },
  // 1pm hour
  {
    id: 'recently-played-4',
    hourKey: '1pm',
    hourData: {
      startTime: '1:00pm',
      endTime: '2:00pm',
      djName: 'DJ Afternoon',
      djProfileUrl: '#',
      showName: 'Afternoon Vibes',
    },
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    artistName: 'Cannonball Adderley',
    trackName: 'Mercy, Mercy, Mercy',
    albumName: 'Mercy, Mercy, Mercy!',
    labelName: 'Capitol Records',
    timeAgo: '1:45pm',
    isLocal: false,
    isAdded: false,
  },
  {
    id: 'recently-played-5',
    hourKey: '1pm',
    hourData: {
      startTime: '1:00pm',
      endTime: '2:00pm',
      djName: 'DJ Afternoon',
      djProfileUrl: '#',
      showName: 'Afternoon Vibes',
    },
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    artistName: 'Wes Montgomery',
    trackName: 'Four on Six',
    albumName: 'The Incredible Jazz Guitar',
    labelName: 'Riverside Records',
    timeAgo: '1:15pm',
    isLocal: true,
    isAdded: false,
  },
]

export default function RecentlyPlayed() {
  const { showToast } = useNotification()
  const { isLoggedIn, login, signup } = useAuth()
  const [playlistItems, setPlaylistItems] = useState<any[]>([])
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Load recently played tracks and convert to playlist format
  const loadRecentlyPlayed = () => {
    const recentTracks = getRecentlyPlayed()
    const grouped = groupByHour(recentTracks)

    // Get the 2 most recent hour blocks
    const hourKeys = Object.keys(grouped).sort((a, b) => {
      // Convert hourKey to comparable time (assumes format like "14:00")
      const timeA = new Date(`1970-01-01T${a}:00`).getTime()
      const timeB = new Date(`1970-01-01T${b}:00`).getTime()
      return timeB - timeA // Sort descending (most recent first)
    })

    // Take only the first 2 hours
    const recentHourKeys = hourKeys.slice(0, 2)

    const items: any[] = []
    recentHourKeys.forEach((hourKey) => {
      const data = grouped[hourKey]
      data.tracks.forEach((track: any) => {
        const playedDate = new Date(track.playedAt)
        const timeString = playedDate.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        })

        items.push({
          id: track.id,
          hourKey,
          hourData: data.hourData,
          albumArt: track.albumArt,
          albumArtAlt: `${track.albumName} album cover`,
          artistName: track.artistName,
          trackName: track.trackName,
          albumName: track.albumName,
          labelName: track.labelName,
          timeAgo: timeString,
          isLocal: track.isLocal,
          isAdded: isInCollection(track.artistName, track.trackName),
        })
      })
    })

    setPlaylistItems(items)
  }

  // Load on mount
  useEffect(() => {
    loadRecentlyPlayed()
  }, [])

  // Update isAdded status when collection changes
  useEffect(() => {
    const updateAddedStatus = () => {
      setPlaylistItems((items) =>
        items.map((item) => ({
          ...item,
          isAdded: isInCollection(item.artistName, item.trackName),
        }))
      )
    }

    // Listen for collection updates
    window.addEventListener('chirp-collection-updated', updateAddedStatus)
    return () => {
      window.removeEventListener('chirp-collection-updated', updateAddedStatus)
    }
  }, [])

  // Update when new tracks are played
  useEffect(() => {
    const handleRecentlyPlayedUpdate = () => {
      loadRecentlyPlayed()
    }

    window.addEventListener('chirp-recently-played-updated', handleRecentlyPlayedUpdate)
    return () => {
      window.removeEventListener('chirp-recently-played-updated', handleRecentlyPlayedUpdate)
    }
  }, [])

  const handleItemAdd = (item: any, index: number) => {
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
    window.open('https://chirpradio.org/playlists', '_blank')
  }

  return (
    <div>
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title="Recently Played"
        showEyebrow={false}
        showActionButton={true}
        actionButtonText="Complete Playlist"
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

      <CrAnnouncement
        variant="motivation"
        textureBackground="cr-bg-natural-d900"
        headlineText="Love what you're hearing?"
        bodyText="Save your favorite tracks and create custom playlists!"
        showLink={false}
        buttonCount="one"
        button1Text="EXPLORE YOUR COLLECTION"
        button1Icon="mobile"
        button1OnClick={() => console.log('Navigate to collection')}
      />

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </div>
  )
}
