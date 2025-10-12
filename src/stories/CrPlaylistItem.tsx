// CrPlaylistItem.tsx
import { PiPlusCircle } from 'react-icons/pi'
import CrButton from './CrButton'
import CrChip from './CrChip'
import './CrPlaylistItem.css'
import CrTrackInfo from './CrTrackInfo'

interface CrPlaylistItemProps {
  albumArt?: string
  albumArtAlt?: string
  artistName?: string
  trackName?: string
  albumName?: string
  labelName?: string
  isAdded?: boolean
  isLocal?: boolean
  onToggleAdd?: () => void
  timeAgo?: string
  showTime?: boolean
  variant?: 'default' | 'table' | 'card'
  currentlyPlaying?: boolean
  className?: string
}

export default function CrPlaylistItem({
  // Album art
  albumArt = 'https://via.placeholder.com/80',
  albumArtAlt = 'Album cover',

  // Track info props
  artistName = 'Artist Name',
  trackName = 'Track Name',
  albumName = 'Album Name',
  labelName = 'Label Name',
  isAdded = false,
  isLocal = false,
  onToggleAdd,

  // Time display
  timeAgo = '2:01pm',
  showTime = true,

  // Variant
  variant = 'default', // "default" or "table"

  // Currently playing state
  currentlyPlaying = false,

  className = '',
}: CrPlaylistItemProps) {
  if (variant === 'table') {
    return (
      <div className={`cr-playlist-item cr-playlist-item--table ${currentlyPlaying ? 'cr-playlist-item--currently-playing' : ''} ${className}`}>
        <div className="cr-playlist-item__table-album-art">
          <img src={albumArt} alt={albumArtAlt} className="cr-playlist-item__image" />
        </div>

        <div className="cr-playlist-item__table-grid">
          <div className="cr-playlist-item__table-left">
            <div className="cr-playlist-item__table-artist">
              {artistName}
              {isLocal && (
                <CrChip variant="primary" size="small" squared>
                  LOCAL
                </CrChip>
              )}
            </div>
            <div className="cr-playlist-item__table-track">{trackName}</div>
          </div>

          <div className="cr-playlist-item__table-right">
            <div className="cr-playlist-item__table-album">{albumName}</div>
            <div className="cr-playlist-item__table-label">{labelName}</div>
          </div>
        </div>

        <div className="cr-playlist-item__table-time">{showTime && timeAgo}</div>

        <div className="cr-playlist-item__table-action">
          <CrButton
            variant="text"
            size="xsmall"
            color="secondary"
            rightIcon={isAdded ? undefined : <PiPlusCircle />}
            onClick={onToggleAdd}
          >
            {isAdded ? 'REMOVE' : 'ADD'}
          </CrButton>
        </div>

        {/* Mobile fallback - uses default CrTrackInfo layout */}
        <div className="cr-playlist-item__mobile-fallback">
          <CrTrackInfo
            variant="full"
            trackName={trackName}
            artistName={artistName}
            albumName={albumName}
            labelName={labelName}
            isAdded={isAdded}
            isLocal={isLocal}
            onToggleAdd={onToggleAdd}
          />
          {showTime && timeAgo && <div className="cr-playlist-item__time">{timeAgo}</div>}
        </div>
      </div>
    )
  }

  // Card variant
  if (variant === 'card') {
    return (
      <div className={`cr-playlist-item cr-playlist-item--card ${currentlyPlaying ? 'cr-playlist-item--currently-playing' : ''} ${className}`}>
        {/* Blurred background */}
        <div
          className="cr-playlist-item__card-background"
          style={{ backgroundImage: `url(${albumArt})` }}
        />
        {/* Color overlay */}
        <div className="cr-playlist-item__card-overlay" />

        <div className="cr-playlist-item__card-album-art">
          <img src={albumArt} alt={albumArtAlt} className="cr-playlist-item__image" />
          {isLocal && (
            <div className="cr-playlist-item__card-local-badge">
              <CrChip variant="primary" size="small" squared>
                LOCAL
              </CrChip>
            </div>
          )}
        </div>

        <div className="cr-playlist-item__card-content">
          <div className="cr-playlist-item__card-track">{trackName}</div>
          <div className="cr-playlist-item__card-artist">{artistName}</div>
          <div className="cr-playlist-item__card-album">{albumName}</div>
          <div className="cr-playlist-item__card-label">({labelName})</div>

          <div className="cr-playlist-item__card-footer">
            {showTime && timeAgo && <div className="cr-playlist-item__card-time">{timeAgo}</div>}

            <div className="cr-playlist-item__card-action">
              <CrButton
                variant="text"
                size="xsmall"
                color="secondary"
                rightIcon={isAdded ? undefined : <PiPlusCircle />}
                onClick={onToggleAdd}
              >
                {isAdded ? 'REMOVE' : 'ADD'}
              </CrButton>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Default variant
  return (
    <div className={`cr-playlist-item ${className}`}>
      <div className="cr-playlist-item__album-art">
        <img src={albumArt} alt={albumArtAlt} className="cr-playlist-item__image" />
      </div>

      <div className="cr-playlist-item__content">
        <CrTrackInfo
          variant="full"
          trackName={trackName}
          artistName={artistName}
          albumName={albumName}
          labelName={labelName}
          isAdded={isAdded}
          isLocal={isLocal}
          onToggleAdd={onToggleAdd}
        />

        {showTime && timeAgo && <div className="cr-playlist-item__time">{timeAgo}</div>}
      </div>
    </div>
  )
}
