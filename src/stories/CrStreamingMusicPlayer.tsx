// CrStreamingMusicPlayer.tsx
import React, { useState, useEffect, useRef } from 'react';
import { PiPlayFill, PiPauseFill } from 'react-icons/pi';
import CrCurrentDj from './CrCurrentDj';
import CrTrackInfo from './CrTrackInfo';
import CrLogo from './CrLogo';
import CrButton from './CrButton';
import CrChip from './CrChip';
import CrMobileHeader from './CrMobileHeader';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';
import { useAuth } from '../hooks/useAuth';
import LoginRequiredModal from '../components/LoginRequiredModal';
import './CrStreamingMusicPlayer.css';

// PlayPause button component that exactly matches the Figma design
const PlayPauseButton = ({ isPlaying, onClick, size = 60 }) => {
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

// Album Art component with CHIRP logo fallback and crossfade
const AlbumArt = ({ src, className, style, isLarge = false, isLoading = false }) => {
  // Check if we have a valid image URL
  const isValidImageUrl = (url) => {
    return (
      url &&
      url.trim() !== '' &&
      url !== 'null' &&
      url !== 'undefined' &&
      !url.includes('null') &&
      url.startsWith('http')
    )
  }

  // Initialize with valid src or empty string for fallback
  const [displaySrc, setDisplaySrc] = useState(isValidImageUrl(src) ? src : '')
  const [imageError, setImageError] = useState(false)
  const [waitingForRetry, setWaitingForRetry] = useState(false)
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Preload new image before swapping
  useEffect(() => {
    if (!isValidImageUrl(src)) {
      // No valid URL - might be waiting for retry
      // If we already have an image displayed, wait a bit before showing fallback
      // This gives the retry mechanism time to find album art
      if (displaySrc !== '' && !waitingForRetry) {
        // Wait 1 second before showing fallback
        // This allows API retries to potentially find album art
        setWaitingForRetry(true)
        fallbackTimeoutRef.current = setTimeout(() => {
          setDisplaySrc('')
          setWaitingForRetry(false)
        }, 1000) // Wait 1 second for potential retry success
      } else if (displaySrc === '' && !waitingForRetry) {
        // No image currently shown and none coming - show fallback immediately
        setDisplaySrc('')
      }
      setImageError(false)
      return
    }

    // Valid URL arrived - clear any pending fallback timeout
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }
    setWaitingForRetry(false)

    // If this is the same as current display, do nothing
    if (src === displaySrc) {
      return
    }

    // New URL - preload it before swapping
    setImageError(false)

    const img = new Image()
    img.onload = () => {
      // Image loaded - swap immediately
      setDisplaySrc(src)
    }
    img.onerror = () => {
      // Failed to load - show fallback
      setDisplaySrc('')
      setImageError(true)
    }
    img.src = src
  }, [src, displaySrc, waitingForRetry])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current)
      }
    }
  }, [])

  // If loading initial data and no src yet, show invisible placeholder
  if (isLoading && !displaySrc) {
    return <div className={`cr-player__album-fallback ${className}`} style={{ ...style, opacity: 0 }} />
  }

  // If no valid URL or image failed to load, show CHIRP logo
  if (!displaySrc || imageError) {
    return (
      <div className={`cr-player__album-fallback ${className}`} style={style}>
        <CrLogo variant="record" className={isLarge ? 'cr-logo--large' : ''} />
      </div>
    )
  }

  // Show the image
  return (
    <img
      src={displaySrc}
      alt="Album Art"
      className={className}
      style={{ ...style, width: '100%', height: '100%', objectFit: 'cover' }}
    />
  )
}

// Background component - simplified
const BackgroundImage = ({ src, isLoading }) => {
  const isValidImageUrl = (url) => {
    return (
      url &&
      url.trim() !== '' &&
      url !== 'null' &&
      url !== 'undefined' &&
      !url.includes('null') &&
      url.startsWith('http')
    )
  }

  // Initialize with valid src or empty string for fallback
  const [displaySrc, setDisplaySrc] = useState(isValidImageUrl(src) ? src : '')
  const [waitingForRetry, setWaitingForRetry] = useState(false)
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Preload new background image before swapping
  useEffect(() => {
    if (!isValidImageUrl(src)) {
      // No valid URL - might be waiting for retry
      if (isValidImageUrl(displaySrc) && !waitingForRetry) {
        // Wait 1 second before showing fallback
        setWaitingForRetry(true)
        fallbackTimeoutRef.current = setTimeout(() => {
          setDisplaySrc('')
          setWaitingForRetry(false)
        }, 1000)
      } else if (!isValidImageUrl(displaySrc) && !waitingForRetry) {
        // Already showing fallback
        setDisplaySrc('')
      }
      return
    }

    // Valid URL arrived - clear any pending fallback timeout
    if (fallbackTimeoutRef.current) {
      clearTimeout(fallbackTimeoutRef.current)
      fallbackTimeoutRef.current = null
    }
    setWaitingForRetry(false)

    // If this is the same as current display, do nothing
    if (src === displaySrc) {
      return
    }

    // New URL - preload it before swapping
    const img = new Image()
    img.onload = () => {
      // Image loaded - swap immediately
      setDisplaySrc(src)
    }
    img.onerror = () => {
      // Failed to load - show fallback
      setDisplaySrc('')
    }
    img.src = src
  }, [src, displaySrc, waitingForRetry])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current) {
        clearTimeout(fallbackTimeoutRef.current)
      }
    }
  }, [])

  const getFallbackUrl = () => '/images/chirp-logos/CHIRP_Logo_FM%20URL_record.svg'

  return (
    <div
      className="cr-player__background"
      style={{
        backgroundImage: displaySrc ? `url(${displaySrc})` : `url(${getFallbackUrl()})`,
        opacity: 0.75,
      }}
    />
  )
}

interface CrStreamingMusicPlayerProps {
  variant?: 'full-player' | 'slim-player' | 'mobile-player'
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
  variant = 'full-player', // match Figma variants: 'full-player', 'slim-player', 'mobile-player'
  djName = 'DJ Current',
  showName = 'Current Show',
  artistName = 'Artist Name',
  trackName = 'Song Name',
  albumName = 'Album Name',
  labelName = 'Label Name',
  albumArt = 'https://assets.codepen.io/715673/album-art.jpg',
  streamUrl = 'https://peridot.streamguys1.com:5185/live',
  autoFetch = false, // Default to no API fetching
  apiUrl = 'https://chirpradio.appspot.com/api/current_playlist',
  onToggleAdd = () => {},
  isTrackAdded = false,
  pageTitle = 'Page Title', // Keep for potential future use
  isLocal = false, // New prop to control LOCAL chip
  onMenuClick = () => {}, // Keep for potential future use
  onLogoClick = () => {}, // Keep for potential future use
}: CrStreamingMusicPlayerProps) {
  // Use the shared audio player context
  const {
    isPlaying,
    isLoading,
    currentData,
    isTrackAdded: contextIsTrackAdded,
    togglePlayPause,
    toggleAddTrack
  } = useAudioPlayer();

  // Use auth hook to check login state
  const { isLoggedIn, login } = useAuth();

  // State for login required modal
  const [showLoginModal, setShowLoginModal] = useState(false);

  // State to track if there's a pending add action (only for login, not signup)
  const [hasPendingAdd, setHasPendingAdd] = useState(false);

  // Effect to handle pending add after login
  useEffect(() => {
    if (isLoggedIn && hasPendingAdd) {
      toggleAddTrack();
      setHasPendingAdd(false);
    }
  }, [isLoggedIn, hasPendingAdd]);

  // Helper function to check if album art should use fallback
  const shouldUseFallback = (albumArtUrl) => {
    return !albumArtUrl ||
           albumArtUrl.trim() === '' ||
           albumArtUrl === 'null' ||
           albumArtUrl === 'undefined' ||
           albumArtUrl.includes('null') ||
           !albumArtUrl.startsWith('http') ||
           // Treat placeholder URLs as fallback cases when autoFetch is true
           (autoFetch && (
             albumArtUrl.includes('codepen.io') ||
             albumArtUrl.includes('picsum.photos') ||
             albumArtUrl.includes('unsplash.com')
           ));
  };

  // Play/pause handler using context
  const handlePlayPause = (event) => {
    event.stopPropagation();
    togglePlayPause();
  };

  // Handle add/remove track using context
  const handleToggleAdd = () => {
    if (!isLoggedIn) {
      setHasPendingAdd(true); // Mark that user wants to add this song
      setShowLoginModal(true);
      return;
    }
    toggleAddTrack();
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    setHasPendingAdd(false); // Clear pending add if modal is closed
  };

  const handleLogin = () => {
    // For demo purposes, simulate login with a demo account
    login('demo@chirpradio.org');
    // The useEffect will automatically add the song after login
    setShowLoginModal(false);
  };

  const handleSignUp = () => {
    console.log('Sign up clicked from player');
    // TODO: Implement actual signup flow
    // Clear pending add for signup (as per requirements)
    setHasPendingAdd(false);
    setShowLoginModal(false);
  };

  // Render full player variant
  const renderFullPlayer = () => {
    return (
      <div className="cr-player__full">
        <BackgroundImage src={currentData.albumArt} isLoading={isLoading} />
        <div className="cr-player__color-overlay" />
        <div className="cr-player__content">
          <div className="cr-player__album-container">
            <AlbumArt src={currentData.albumArt} className="cr-player__album-art" isLoading={isLoading} />
          </div>
          <div className="cr-player__track-info-container">
            <CrTrackInfo
              trackName={currentData.track}
              artistName={currentData.artist}
              albumName={currentData.album}
              labelName={currentData.label}
              isLocal={currentData.isLocal}
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
        <BackgroundImage src={currentData.albumArt} isLoading={isLoading} />
        <div className="cr-player__color-overlay" />
        <div className="cr-player__content">
          <div className="cr-player__album-container">
            <AlbumArt src={currentData.albumArt} className="cr-player__album-art" isLoading={isLoading} />
          </div>
          <div className="cr-player__track-info-container">
            <CrTrackInfo
              trackName={currentData.track}
              artistName={currentData.artist}
              variant="minimal" // Use minimal variant (just song + artist)
              isLocal={currentData.isLocal}
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

  // Render mobile player variant
  const renderMobilePlayer = () => {
    return (
      <div className="cr-player__mobile">
        <BackgroundImage src={currentData.albumArt} isLoading={isLoading} />
        <div className="cr-player__color-overlay" />

        <div className="cr-player__mobile-content">
          <div className="cr-player__dj-info">
            <CrCurrentDj
              djName={currentData.dj}
              showName={currentData.show}
              isOnAir={true}
              statusText="On-Air"
            />
          </div>

          <div className="cr-player__album-large">
            <AlbumArt
              src={currentData.albumArt}
              className="cr-player__album-art-large"
              isLarge={true}
              isLoading={isLoading}
            />
          </div>

          <div className="cr-player__track-info-container cr-player__track-info-container--left-aligned">
            <CrTrackInfo
              trackName={currentData.track}
              artistName={currentData.artist}
              albumName={currentData.album}
              labelName={currentData.label}
              variant="stacked"
              isLocal={currentData.isLocal}
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

  // Render different player variants based on the variant prop
  const renderVariant = () => {
    switch (variant) {
      case 'slim-player':
        return renderSlimPlayer()
      case 'mobile-player':
        return renderMobilePlayer()
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
