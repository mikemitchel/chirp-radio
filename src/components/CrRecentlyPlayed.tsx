// CrRecentlyPlayed.tsx
import React, { useRef, useEffect, useState } from 'react'
import CrPlaylistItem from '../stories/CrPlaylistItem'
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
