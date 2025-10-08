// CrRecentlyPlayed.tsx
import React, { useRef, useEffect, useState } from 'react'
import CrPlaylistItem from '../stories/CrPlaylistItem'
import CrPlaylistHourBreak from '../stories/CrPlaylistHourBreak'
import CrButton from '../stories/CrButton'
import { PiPlaylist } from 'react-icons/pi'
import './CrRecentlyPlayed.css'

interface Track {
  albumArt?: string
  albumArtAlt?: string
  artistName?: string
  trackName?: string
  albumName?: string
  labelName?: string
  isAdded?: boolean
  isLocal?: boolean
  timeAgo?: string
}

interface DjInfo {
  djName: string
  showName: string
  startTime: string
  endTime: string
  djProfileUrl?: string
}

interface CrRecentlyPlayedProps {
  tracks?: Track[]
  showViewPlaylistButton?: boolean
  onViewPlaylist?: () => void
  maxItems?: number
}

export default function CrRecentlyPlayed({
  tracks = [],
  showViewPlaylistButton = true,
  onViewPlaylist,
  maxItems = 6,
}: CrRecentlyPlayedProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showGradient, setShowGradient] = useState(true)
  const [djInfo, setDjInfo] = useState<DjInfo | null>(null)

  // Fetch DJ info from API
  useEffect(() => {
    const fetchDjInfo = async () => {
      try {
        const response = await fetch('/api/current_playlist')
        const data = await response.json()

        console.log('API Response:', data.now_playing)

        if (data.now_playing && data.now_playing.dj) {
          // Format times from the API data
          const formatTime = (dateStr: string) => {
            const date = new Date(dateStr)
            const hours = date.getHours()
            const minutes = date.getMinutes()
            const ampm = hours >= 12 ? 'pm' : 'am'
            const displayHours = hours % 12 || 12
            const displayMinutes = minutes.toString().padStart(2, '0')
            return `${displayHours}:${displayMinutes}${ampm}`
          }

          const playedAt = new Date(data.now_playing.played_at_gmt)
          const startOfHour = new Date(playedAt)
          startOfHour.setMinutes(0, 0, 0)

          const endOfHour = new Date(startOfHour)
          endOfHour.setHours(startOfHour.getHours() + 1)

          const djData = {
            djName: data.now_playing.dj,
            showName: '', // No show name in API
            startTime: formatTime(startOfHour.toISOString()),
            endTime: formatTime(endOfHour.toISOString()),
            djProfileUrl: '#',
          }

          console.log('Setting DJ Info:', djData)
          setDjInfo(djData)
        } else {
          console.log('No DJ info in API response')
        }
      } catch (error) {
        console.error('Error fetching DJ info:', error)
      }
    }

    fetchDjInfo()
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 50
      setShowGradient(!isNearEnd)
    }

    // Initial check
    handleScroll()

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => scrollContainer.removeEventListener('scroll', handleScroll)
  }, [])

  const displayedTracks = tracks.slice(0, maxItems)

  console.log('CrRecentlyPlayed render - djInfo:', djInfo)

  return (
    <div className="cr-recently-played cr-bg-textured cr-bg-dust-d300">
      <div className="cr-recently-played__container">
        <div className="cr-recently-played__header">
          <h2 className="cr-recently-played__title">Recently Played</h2>
          {showViewPlaylistButton && (
            <CrButton
              variant="outline"
              size="medium"
              color="secondary"
              rightIcon={<PiPlaylist />}
              onClick={onViewPlaylist}
            >
              View Playlist
            </CrButton>
          )}
        </div>

        {djInfo && (
          <CrPlaylistHourBreak
            startTime={djInfo.startTime}
            endTime={djInfo.endTime}
            djName={djInfo.djName}
            showName={djInfo.showName}
            djProfileUrl={djInfo.djProfileUrl}
            isCollapsed={false}
            showChevron={false}
          />
        )}

        <div className={`cr-recently-played__scroll-wrapper ${showGradient ? 'cr-recently-played__scroll-wrapper--gradient' : ''}`}>
          <div className="cr-recently-played__scroll-container" ref={scrollRef}>
            <div className="cr-recently-played__track-list">
              {displayedTracks.map((track, index) => (
                <CrPlaylistItem
                  key={index}
                  variant="card"
                  albumArt={track.albumArt}
                  albumArtAlt={track.albumArtAlt}
                  artistName={track.artistName}
                  trackName={track.trackName}
                  albumName={track.albumName}
                  labelName={track.labelName}
                  isAdded={track.isAdded}
                  isLocal={track.isLocal}
                  timeAgo={track.timeAgo}
                  showTime={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
