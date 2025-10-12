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
  const [isMobile, setIsMobile] = useState(false)

  // DJ info should come from CrCurrentDj component, not fetched here
  // Using default placeholder values for hour break display
  const djInfo: DjInfo = {
    djName: 'Current DJ',
    showName: 'Current Show',
    startTime: '12:00pm',
    endTime: '1:00pm',
    djProfileUrl: '#',
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Initial check
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer
      // Only show gradient if content is wider than container AND not scrolled to the end
      const hasOverflow = scrollWidth > clientWidth
      const isNearEnd = scrollLeft + clientWidth >= scrollWidth - 50
      setShowGradient(hasOverflow && !isNearEnd)
    }

    // Initial check
    handleScroll()

    // Also check on window resize
    const handleResize = () => handleScroll()
    window.addEventListener('resize', handleResize)

    scrollContainer.addEventListener('scroll', handleScroll)
    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
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
              size="large"
              color="secondary"
              rightIcon={<PiPlaylist />}
              onClick={onViewPlaylist}
            >
              View Playlist
            </CrButton>
          )}
        </div>

        <CrPlaylistHourBreak
          startTime={djInfo.startTime}
          endTime={djInfo.endTime}
          djName={djInfo.djName}
          showName={djInfo.showName}
          djProfileUrl={djInfo.djProfileUrl}
          isCollapsed={false}
          showChevron={false}
        />

        <div className={`cr-recently-played__scroll-wrapper ${showGradient ? 'cr-recently-played__scroll-wrapper--gradient' : ''}`}>
          <div className="cr-recently-played__scroll-container" ref={scrollRef}>
            <div className="cr-recently-played__track-list">
              {displayedTracks.map((track, index) => (
                <CrPlaylistItem
                  key={index}
                  variant={isMobile ? 'table' : 'card'}
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
                  currentlyPlaying={index === 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
