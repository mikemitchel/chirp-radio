// CrStreamingMusicPlayer.tsx
import { useState, useEffect, useRef } from 'react'
import { Capacitor } from '@capacitor/core'
import CrCurrentDj from './CrCurrentDj'
import CrTrackInfo from './CrTrackInfo'
import CrLogo from './CrLogo'
import { useAudioPlayer } from '../contexts/AudioPlayerContext'
import { useAuth } from '../hooks/useAuth'
import { usePlayerFallbackImages } from '../hooks/useData'
import LoginRequiredModal from '../components/LoginRequiredModal'
import { resolveAlbumArt } from '../utils/albumArtFallback'
import { createLogger } from '../utils/logger'
import { on } from '../utils/eventBus'
import './CrStreamingMusicPlayer.css'

const log = createLogger('CrStreamingMusicPlayer')

// PlayPause button component that exactly matches the Figma design
const PlayPauseButton = ({ isPlaying, onClick, size = 60 }: { isPlaying: any; onClick: any; size?: number }) => {
  const PlaySVG = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3524_68836)">
        <path
          d="M45.0028 29.9999L22.4986 45.0027V14.9972L45.0028 29.9999ZM30 0C13.4506 0 0 13.4506 0 30C0 46.5494 13.4506 60 30 60C46.5494 60 60 46.5494 60 30C60 13.4506 46.5494 0 30 0ZM30 3.73954C44.5224 3.73954 56.2605 15.4777 56.2605 30C56.2605 44.5223 44.5224 56.2604 30 56.2604C15.4776 56.2604 3.73954 44.5223 3.73954 30C3.73954 15.4777 15.4776 3.73954 30 3.73954Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3524_68836">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )

  const PauseSVG = () => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_3524_68834)">
        <path
          d="M33.7507 18.7479H41.2521V41.2521H33.7507V18.7479ZM18.7479 18.7479H26.2493V41.2521H18.7479V18.7479ZM30 0C13.4506 0 0 13.4506 0 30C0 46.5494 13.4506 60 30 60C46.5494 60 60 46.5494 60 30C60 13.4506 46.5494 0 30 0ZM30 3.73948C44.5224 3.73948 56.2605 15.4776 56.2605 30C56.2605 44.5223 44.5224 56.2604 30 56.2604C15.4776 56.2604 3.73953 44.5223 3.73953 30C3.73953 15.4776 15.4776 3.73948 30 3.73948Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3524_68834">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )

  return (
    <button
      className="cr-player__play-button"
      onClick={onClick}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? <PauseSVG /> : <PlaySVG />}
    </button>
  )
}

// Album Art component with two-stacked-images crossfade and fallback chain
const AlbumArt = ({
  src,
  artist,
  track,
  album,
  className,
  style,
  isLarge = false
}: {
  src: any
  artist?: string
  track?: string
  album?: string
  className: any
  style?: any
  isLarge?: boolean
}) => {
  const { data: fallbackImages, loading: fallbackLoading } = usePlayerFallbackImages()
  const [frontSrc, setFrontSrc] = useState('')
  const [backSrc, setBackSrc] = useState('')
  const [frontIsVisible, setFrontIsVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [hasLoadedFirstImage, setHasLoadedFirstImage] = useState(false)
  const [fallbackSrc, setFallbackSrc] = useState('')
  const [forceRefreshCounter, setForceRefreshCounter] = useState(0)
  const currentTrackId = useRef('')
  const lastFallbackIndex = useRef(-1)
  const isResolvingRef = useRef(false)
  const lastForceRefreshCounter = useRef(0)

  // Listen for force refresh events
  useEffect(() => {
    const unsubscribe = on('chirp-force-refresh', () => {
      log.log('Force refresh triggered for album art')
      setForceRefreshCounter(prev => prev + 1)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    // Wait for fallback images to load from CMS
    if (fallbackLoading) {
      log.log('Waiting for CMS fallback images to load...')
      return
    }

    // Create track ID from artist + track
    const trackId = `${artist || 'unknown'}|${track || 'unknown'}`

    // If same track and not force refreshing, don't reload
    if (trackId === currentTrackId.current && forceRefreshCounter === lastForceRefreshCounter.current) {
      return
    }

    currentTrackId.current = trackId
    lastForceRefreshCounter.current = forceRefreshCounter
    log.log('Track changed or forced refresh, resolving album art:', { artist, track, album })

    // Prevent concurrent resolutions
    if (isResolvingRef.current) {
      log.log('Already resolving, skipping...')
      return
    }

    isResolvingRef.current = true

    const resolveArt = async () => {
      try {
        // Get fallback image URLs from CMS
        const fallbackUrls = fallbackImages
          .filter((img) => img.url)
          .map((img) => img.sizes?.player?.url || img.url || '')
          .filter((url) => url)

        if (fallbackUrls.length === 0) {
          log.log('No fallback images available from CMS, will try API sources only')
        }

        // Detect if mobile platform
        const isMobile = Capacitor.isNativePlatform()

        // Resolve album art through fallback chain
        const result = await resolveAlbumArt(
          src,
          artist || '',
          album || '',
          fallbackUrls,
          lastFallbackIndex.current,
          isMobile
        )

        log.log('Album art resolved:', result.source)

        // Update lastFallbackIndex if we used a fallback
        if (result.source === 'fallback' && result.fallbackIndex !== undefined) {
          lastFallbackIndex.current = result.fallbackIndex
        }

        // Trigger crossfade
        if (!isTransitioning) {
          setIsTransitioning(true)

          if (frontIsVisible) {
            setBackSrc(result.url)
            // Wait for image to load, then crossfade
            const img = new Image()
            img.onload = () => {
              setHasLoadedFirstImage(true)
              setFrontIsVisible(false)
              setTimeout(() => setIsTransitioning(false), 500)
            }
            img.onerror = () => {
              // Use a random fallback image from CMS
              const fallbackUrls = fallbackImages
                .filter((img) => img.url)
                .map((img) => img.sizes?.player?.url || img.url || '')
                .filter((url) => url)

              if (fallbackUrls.length > 0) {
                const randomIndex = Math.floor(Math.random() * fallbackUrls.length)
                setFallbackSrc(fallbackUrls[randomIndex])
              }
              setIsTransitioning(false)
            }
            img.src = result.url
          } else {
            setFrontSrc(result.url)
            const img = new Image()
            img.onload = () => {
              setHasLoadedFirstImage(true)
              setFrontIsVisible(true)
              setTimeout(() => setIsTransitioning(false), 500)
            }
            img.onerror = () => {
              // Use a random fallback image from CMS
              const fallbackUrls = fallbackImages
                .filter((img) => img.url)
                .map((img) => img.sizes?.player?.url || img.url || '')
                .filter((url) => url)

              if (fallbackUrls.length > 0) {
                const randomIndex = Math.floor(Math.random() * fallbackUrls.length)
                setFallbackSrc(fallbackUrls[randomIndex])
              }
              setIsTransitioning(false)
            }
            img.src = result.url
          }

          setFallbackSrc('')
        }
      } catch (error) {
        log.log('Error resolving album art:', error)

        // Use a random fallback image from CMS
        const fallbackUrls = fallbackImages
          .filter((img) => img.url)
          .map((img) => img.sizes?.player?.url || img.url || '')
          .filter((url) => url)

        if (fallbackUrls.length > 0) {
          const randomIndex = Math.floor(Math.random() * fallbackUrls.length)
          setFallbackSrc(fallbackUrls[randomIndex])
        }
      } finally {
        isResolvingRef.current = false
      }
    }

    resolveArt()
  }, [src, artist, track, album, fallbackImages, fallbackLoading, frontIsVisible, isTransitioning, forceRefreshCounter])

  // Show random fallback image if all sources failed
  if (fallbackSrc) {
    return (
      <div className={`cr-player__album-art-container ${className}`} style={style}>
        <img
          src={fallbackSrc}
          alt="Album Art"
          className="cr-player__album-art-front"
          style={{ opacity: 1 }}
        />
      </div>
    )
  }

  // Show nothing while loading the first image
  if (!hasLoadedFirstImage && !frontSrc && !backSrc) {
    return <div className={`cr-player__album-art-container ${className}`} style={style} />
  }

  // Two-stacked-images crossfade
  return (
    <div className={`cr-player__album-art-container ${className}`} style={style}>
      {backSrc && (
        <img
          src={backSrc}
          alt="Album Art"
          className="cr-player__album-art-back"
          style={{ opacity: frontIsVisible ? 0 : 1 }}
        />
      )}
      {frontSrc && (
        <img
          src={frontSrc}
          alt="Album Art"
          className="cr-player__album-art-front"
          style={{ opacity: frontIsVisible ? 1 : 0 }}
        />
      )}
    </div>
  )
}

// Background component with two-stacked-divs crossfade
const BackgroundImage = ({
  src,
  artist,
  track,
  album,
  isLoading: _isLoading,
}: {
  src: any
  artist?: string
  track?: string
  album?: string
  isLoading?: any
}) => {
  const { data: fallbackImages, loading: fallbackLoading } = usePlayerFallbackImages()
  const [frontSrc, setFrontSrc] = useState('')
  const [backSrc, setBackSrc] = useState('')
  const [frontIsVisible, setFrontIsVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [forceRefreshCounter, setForceRefreshCounter] = useState(0)
  const currentTrackId = useRef('')
  const lastFallbackIndex = useRef(-1)
  const isResolvingRef = useRef(false)
  const lastForceRefreshCounter = useRef(0)

  // Listen for force refresh events
  useEffect(() => {
    const unsubscribe = on('chirp-force-refresh', () => {
      log.log('🎨 [BackgroundImage] Force refresh triggered')
      setForceRefreshCounter(prev => prev + 1)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    // Wait for fallback images to load from CMS
    if (fallbackLoading) {
      log.log('🎨 [BackgroundImage] Waiting for CMS fallback images to load...')
      return
    }

    // Use track ID to detect actual track changes
    const trackId = `${artist || 'unknown'}|${track || 'unknown'}`

    // If same track and not force refreshing, don't reload
    if (trackId === currentTrackId.current && forceRefreshCounter === lastForceRefreshCounter.current) {
      return
    }

    lastForceRefreshCounter.current = forceRefreshCounter

    // Update track ID
    currentTrackId.current = trackId

    // Don't start a new resolution if one is in progress
    if (isResolvingRef.current || isTransitioning) {
      return
    }

    log.log('🎨 [BackgroundImage] Track changed:', { artist, track, album, src })

    // Mark as resolving
    isResolvingRef.current = true

    // Get fallback URLs from CMS data
    const fallbackUrls = (fallbackImages || [])
      .filter((img) => img.url)
      .map((img) => img.url as string)

    // Detect if we're on mobile platform
    const isMobile = Capacitor.isNativePlatform()

    // Resolve album art with full fallback chain
    resolveAlbumArt(src, artist || '', album || '', fallbackUrls, lastFallbackIndex.current, isMobile)
      .then((result) => {
        log.log('🎨 [BackgroundImage] Resolved:', result)

        // Update last fallback index if fallback was used
        if (result.source === 'fallback' && result.fallbackIndex !== undefined) {
          lastFallbackIndex.current = result.fallbackIndex
        }

        // Don't transition if component unmounted or track changed during resolution
        const currentId = `${artist || 'unknown'}|${track || 'unknown'}`
        if (currentId !== currentTrackId.current) {
          isResolvingRef.current = false
          return
        }

        // Perform crossfade
        setIsTransitioning(true)

        // Determine which layer to update (alternate between front and back)
        if (frontIsVisible) {
          // Update back layer
          setBackSrc(result.url)

          // Preload image before transitioning
          const img = new Image()
          img.onload = () => {
            setFrontIsVisible(false)
            setTimeout(() => {
              setIsTransitioning(false)
              isResolvingRef.current = false
            }, 500) // Match CSS transition duration
          }
          img.onerror = () => {
            setIsTransitioning(false)
            isResolvingRef.current = false
          }
          img.src = result.url
        } else {
          // Update front layer
          setFrontSrc(result.url)

          const img = new Image()
          img.onload = () => {
            setFrontIsVisible(true)
            setTimeout(() => {
              setIsTransitioning(false)
              isResolvingRef.current = false
            }, 500)
          }
          img.onerror = () => {
            setIsTransitioning(false)
            isResolvingRef.current = false
          }
          img.src = result.url
        }
      })
      .catch((err) => {
        log.log('🎨 [BackgroundImage] Resolution error:', err)
        isResolvingRef.current = false
        setIsTransitioning(false)
      })
  }, [src, artist, track, album, fallbackImages, fallbackLoading, frontIsVisible, isTransitioning, forceRefreshCounter])

  // Two-stacked-divs with background-image
  return (
    <>
      <div
        className="cr-player__background cr-player__background-back"
        style={{
          backgroundImage: backSrc ? `url(${backSrc})` : 'none',
          opacity: frontIsVisible ? 0 : 1,
        }}
      />
      <div
        className="cr-player__background cr-player__background-front"
        style={{
          backgroundImage: frontSrc ? `url(${frontSrc})` : 'none',
          opacity: frontIsVisible ? 1 : 0,
        }}
      />
    </>
  )
}

interface CrStreamingMusicPlayerProps {
  variant?: 'full-player' | 'slim-player' | 'mini-player' | 'mobile-player' | 'android-auto'
  djName?: string
  showName?: string
  artistName?: string
  trackName?: string
  albumName?: string
  labelName?: string
  albumArt?: string
  streamUrl?: string
  autoFetch?: boolean
  apiUrl?: string
  onToggleAdd?: (isAdded: boolean) => void
  isTrackAdded?: boolean
  pageTitle?: string
  isLocal?: boolean
  onMenuClick?: () => void
  onLogoClick?: () => void
}

export default function CrStreamingMusicPlayer({
  variant = 'full-player', // match Figma variants: 'full-player', 'slim-player', 'mini-player', 'mobile-player'
  djName = 'DJ Current',
  showName = 'Current Show',
  artistName = 'Artist Name',
  trackName = 'Song Name',
  albumName = 'Album Name',
  labelName = 'Label Name',
  albumArt = 'https://assets.codepen.io/715673/album-art.jpg',
  autoFetch = false, // Default to no API fetching
  isLocal = false, // New prop to control LOCAL chip
}: CrStreamingMusicPlayerProps) {
  // Use the shared audio player context
  const {
    isPlaying,
    isLoading,
    currentData,
    isTrackAdded: contextIsTrackAdded,
    togglePlayPause,
    toggleAddTrack,
  } = useAudioPlayer()

  // Use auth hook to check login state
  const { isLoggedIn, login } = useAuth()

  // State for login required modal
  const [showLoginModal, setShowLoginModal] = useState(false)

  // State to track if there's a pending add action (only for login, not signup)
  const [hasPendingAdd, setHasPendingAdd] = useState(false)

  // Effect to handle pending add after login
  useEffect(() => {
    if (isLoggedIn && hasPendingAdd) {
      toggleAddTrack()
      setHasPendingAdd(false)
    }
  }, [isLoggedIn, hasPendingAdd, toggleAddTrack])

  // Determine which data to display: props or context
  const displayData = autoFetch
    ? currentData
    : {
        track: trackName,
        artist: artistName,
        album: albumName,
        label: labelName,
        albumArt: albumArt,
        isLocal: isLocal,
        dj: djName,
        show: showName,
      }

  // Play/pause handler using context
  const handlePlayPause = (event: any) => {
    event.stopPropagation()
    togglePlayPause()
  }

  // Handle add/remove track using context
  const handleToggleAdd = () => {
    if (!isLoggedIn) {
      setHasPendingAdd(true) // Mark that user wants to add this song
      setShowLoginModal(true)
      return
    }
    toggleAddTrack()
  }

  const handleLoginModalClose = () => {
    setShowLoginModal(false)
    setHasPendingAdd(false) // Clear pending add if modal is closed
  }

  const handleLogin = () => {
    // For demo purposes, simulate login with a demo account
    login('demo@chirpradio.org')
    // The useEffect will automatically add the song after login
    setShowLoginModal(false)
  }

  const handleSignUp = () => {
    console.log('Sign up clicked from player')
    // TODO: Implement actual signup flow
    // Clear pending add for signup (as per requirements)
    setHasPendingAdd(false)
    setShowLoginModal(false)
  }

  // Render full player variant
  const renderFullPlayer = () => {
    return (
      <div className="cr-player__full">
        <BackgroundImage
          src={displayData.albumArt}
          artist={displayData.artist}
          track={displayData.track}
          album={displayData.album}
          isLoading={isLoading}
        />
        <div className="cr-player__color-overlay" />
        <div className="cr-player__content">
          <div className="cr-player__album-container">
            <AlbumArt
              src={displayData.albumArt}
              artist={displayData.artist}
              track={displayData.track}
              album={displayData.album}
              className="cr-player__album-art"
              style={{}}
            />
          </div>
          <div className="cr-player__track-info-container">
            <CrTrackInfo
              trackName={displayData.track}
              artistName={displayData.artist}
              albumName={displayData.album}
              labelName={displayData.label}
              albumArt={displayData.albumArt}
              isLocal={displayData.isLocal}
              isAdded={contextIsTrackAdded}
              onToggleAdd={handleToggleAdd}
              className={isLoading ? 'cr-track-info--loading' : ''}
            />
          </div>
          <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause} />
        </div>
      </div>
    )
  }

  // Render slim player variant
  const renderSlimPlayer = () => {
    return (
      <div className="cr-player__slim">
        <BackgroundImage
          src={displayData.albumArt}
          artist={displayData.artist}
          track={displayData.track}
          album={displayData.album}
          isLoading={isLoading}
        />
        <div className="cr-player__color-overlay" />
        <div className="cr-player__content">
          <div className="cr-player__album-container">
            <AlbumArt
              src={displayData.albumArt}
              artist={displayData.artist}
              track={displayData.track}
              album={displayData.album}
              className="cr-player__album-art"
              style={{}}
            />
          </div>
          <div className="cr-player__track-info-container">
            <CrTrackInfo
              trackName={displayData.track}
              artistName={displayData.artist}
              albumArt={displayData.albumArt}
              variant="minimal" // Use minimal variant (just song + artist)
              isLocal={displayData.isLocal}
              isAdded={contextIsTrackAdded}
              onToggleAdd={handleToggleAdd}
              className={`${isLoading ? 'cr-track-info--loading' : ''}`}
            />
          </div>
          <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause} />
        </div>
      </div>
    )
  }

  // Render mini player variant
  const renderMiniPlayer = () => {
    return (
      <div className="cr-player__mini">
        <BackgroundImage
          src={displayData.albumArt}
          artist={displayData.artist}
          track={displayData.track}
          album={displayData.album}
          isLoading={isLoading}
        />
        <div className="cr-player__color-overlay" />
        <div className="cr-player__content">
          <div className="cr-player__album-container">
            <AlbumArt
              src={displayData.albumArt}
              artist={displayData.artist}
              track={displayData.track}
              album={displayData.album}
              className="cr-player__album-art"
              style={{}}
            />
          </div>
          <div className="cr-player__track-info-container">
            <CrTrackInfo
              trackName={displayData.track}
              artistName={displayData.artist}
              albumArt={displayData.albumArt}
              variant="minimal" // Use minimal variant (just song + artist)
              isLocal={displayData.isLocal}
              isAdded={contextIsTrackAdded}
              onToggleAdd={handleToggleAdd}
              className={`${isLoading ? 'cr-track-info--loading' : ''}`}
            />
          </div>
          <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause} size={40} />
        </div>
      </div>
    )
  }

  // Render mobile player variant
  const renderMobilePlayer = () => {
    return (
      <div className="cr-player__mobile">
        <BackgroundImage
          src={displayData.albumArt}
          artist={displayData.artist}
          track={displayData.track}
          album={displayData.album}
          isLoading={isLoading}
        />
        <div className="cr-player__color-overlay" />

        <div className="cr-player__mobile-content">
          <div className="cr-player__dj-info">
            <CrCurrentDj
              djName={displayData.dj}
              showName={displayData.show}
              isOnAir={true}
              statusText="On-Air"
            />
          </div>

          <div className="cr-player__album-large">
            <AlbumArt
              src={displayData.albumArt}
              artist={displayData.artist}
              track={displayData.track}
              album={displayData.album}
              className="cr-player__album-art-large"
              style={{}}
              isLarge={true}
            />
          </div>

          <div className="cr-player__track-info-container cr-player__track-info-container--left-aligned">
            <CrTrackInfo
              trackName={displayData.track}
              artistName={displayData.artist}
              albumName={displayData.album}
              labelName={displayData.label}
              albumArt={displayData.albumArt}
              variant="stacked"
              isLocal={displayData.isLocal}
              isAdded={contextIsTrackAdded}
              onToggleAdd={handleToggleAdd}
              className={isLoading ? 'cr-track-info--loading' : ''}
            />
          </div>

          <div className="cr-player__controls">
            <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause} size={100} />
          </div>
        </div>
      </div>
    )
  }

  // Render Android Auto variant
  const renderAndroidAuto = () => {
    return (
      <div className="cr-player__android-auto">
        <BackgroundImage
          src={displayData.albumArt}
          artist={displayData.artist}
          track={displayData.track}
          album={displayData.album}
          isLoading={isLoading}
        />
        <div className="cr-player__color-overlay" />

        <div className="cr-player__android-auto-content">
          {/* Row 1: Logo + DJ Info */}
          <div className="cr-player__android-auto-header">
            <div className="cr-player__android-auto-logo">
              <CrLogo variant="horizontal-reversed" />
            </div>
            <div className="cr-player__android-auto-dj">
              <CrCurrentDj
                djName={displayData.dj}
                showName={displayData.show}
                isOnAir={true}
                statusText="On-Air"
              />
            </div>
          </div>

          {/* Row 3: Album Art + Track Info */}
          <div className="cr-player__android-auto-media">
            <div className="cr-player__android-auto-album">
              <AlbumArt
                src={displayData.albumArt}
                artist={displayData.artist}
                track={displayData.track}
                album={displayData.album}
                className="cr-player__album-art"
                style={{}}
              />
            </div>
            <div className="cr-player__android-auto-track">
              <CrTrackInfo
                trackName={displayData.track}
                artistName={displayData.artist}
                albumName={displayData.album}
                labelName={displayData.label}
                albumArt={displayData.albumArt}
                variant="stacked"
                isLocal={displayData.isLocal}
                isAdded={contextIsTrackAdded}
                onToggleAdd={handleToggleAdd}
                className={isLoading ? 'cr-track-info--loading' : ''}
              />
            </div>
          </div>

          {/* Row 4: Play Button */}
          <div className="cr-player__android-auto-controls">
            <PlayPauseButton isPlaying={isPlaying} onClick={handlePlayPause} size={120} />
          </div>
        </div>
      </div>
    )
  }

  // Render different player variants based on the variant prop
  const renderVariant = () => {
    switch (variant) {
      case 'slim-player':
        return renderSlimPlayer()
      case 'mini-player':
        return renderMiniPlayer()
      case 'mobile-player':
        return renderMobilePlayer()
      case 'android-auto':
        return renderAndroidAuto()
      case 'full-player':
      default:
        return renderFullPlayer()
    }
  }

  return (
    <>
      <div
        className={`cr-player cr-player--${variant} ${isLoading ? 'cr-player--loading' : ''} ${autoFetch ? 'cr-player--auto-fetch' : ''}`}
      >
        {/* Always render content, let CSS handle the fade */}
        {renderVariant()}
        {/* Audio element is now managed in AudioPlayerContext */}
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </>
  )
}
