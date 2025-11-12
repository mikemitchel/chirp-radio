// CrTrackInfo.tsx
import { useEffect, useRef, useState } from 'react'
import { PiPlusCircle } from 'react-icons/pi'
import CrButton from './CrButton'
import CrChip from './CrChip'
import './CrTrackInfo.css'
import { useLoginRequired } from '../hooks/useLoginRequired'
import LoginRequiredModal from '../components/LoginRequiredModal'
import { addToCollection, removeFromCollection, isInCollection } from '../utils/collectionDB'

interface CrTrackInfoProps {
  variant?: 'full' | 'minimal' | 'stacked'
  trackName?: string
  artistName?: string
  albumName?: string
  labelName?: string
  albumArt?: string
  isLocal?: boolean
  isAdded?: boolean
  onToggleAdd?: (isAdded: boolean) => void
  className?: string
}

export default function CrTrackInfo({
  variant = 'full', // "full", "minimal", "stacked"
  trackName = 'Track Name',
  artistName = 'Artist Name',
  albumName = '',
  labelName = '',
  albumArt = '',
  isLocal = false,
  isAdded: isAddedProp,
  onToggleAdd,
  className = '',
}: CrTrackInfoProps) {
  const { requireLogin, showLoginModal, handleLogin, handleSignUp, closeModal } = useLoginRequired()
  const [internalIsAdded, setInternalIsAdded] = useState(false)

  // Use prop if provided, otherwise use internal state
  const isAdded = isAddedProp !== undefined ? isAddedProp : internalIsAdded

  // Check if track is in collection (only if not controlled by parent)
  useEffect(() => {
    if (isAddedProp !== undefined) return // Skip if controlled by parent

    const checkCollection = () => {
      setInternalIsAdded(isInCollection(artistName, trackName))
    }
    checkCollection()

    // Listen for collection updates
    window.addEventListener('chirp-collection-updated', checkCollection)
    return () => {
      window.removeEventListener('chirp-collection-updated', checkCollection)
    }
  }, [artistName, trackName, isAddedProp])

  // Refs for scrolling elements
  const trackRef = useRef(null)
  const artistRef = useRef(null)
  const albumRef = useRef(null)
  const labelRef = useRef(null)
  const detailsRef = useRef(null)

  // Container refs for measuring
  const trackContainerRef = useRef(null)
  const artistContainerRef = useRef(null)
  const albumContainerRef = useRef(null)
  const labelContainerRef = useRef(null)
  const detailsContainerRef = useRef(null)

  // Check if text overflows and add scrolling class
  useEffect(() => {
    const checkOverflow = (element: HTMLElement | null, container: HTMLElement | null) => {
      if (element && container) {
        // Force a reflow to ensure accurate measurements
        void container.offsetWidth
        void element.offsetWidth

        // Add a small buffer to prevent unnecessary scrolling for minor differences
        const buffer = 5
        const isOverflowing = element.scrollWidth > container.clientWidth + buffer

        if (isOverflowing) {
          // Calculate how far to scroll to show the hidden text
          const scrollDistance = -(element.scrollWidth - container.clientWidth + 20)
          element.style.setProperty('--scroll-distance', `${scrollDistance}px`)

          // Calculate animation duration based on text length
          // Base duration of 12 seconds + 4 seconds per 100 pixels of overflow
          const overflowAmount = element.scrollWidth - container.clientWidth
          const duration = Math.max(12, 12 + (overflowAmount / 100) * 4)
          element.style.setProperty('--animation-duration', `${duration}s`)

          element.classList.add('has-overflow')
        } else {
          element.classList.remove('has-overflow')
          element.style.removeProperty('--scroll-distance')
          element.style.removeProperty('--animation-duration')
        }
      }
    }

    // Add a longer delay to ensure layout is completely settled
    const timeoutId = setTimeout(() => {
      checkOverflow(trackRef.current, trackContainerRef.current)
      checkOverflow(artistRef.current, artistContainerRef.current)
      checkOverflow(albumRef.current, albumContainerRef.current)
      checkOverflow(labelRef.current, labelContainerRef.current)
      checkOverflow(detailsRef.current, detailsContainerRef.current)
    }, 400)

    return () => clearTimeout(timeoutId)
  }, [trackName, artistName, albumName, labelName, variant, isLocal])

  const handleToggleAdd = () => {
    requireLogin(() => {
      // If parent provided a handler, use it
      if (onToggleAdd) {
        onToggleAdd(!isAdded)
        return
      }

      // Otherwise, handle add/remove internally
      const trackId = `${artistName}-${trackName}`.replace(/\s+/g, '-').toLowerCase()

      if (isAdded) {
        // Remove from collection
        const removed = removeFromCollection(trackId)
        if (removed) {
          window.dispatchEvent(
            new CustomEvent('chirp-show-toast', {
              detail: {
                message: `Removed ${trackName} from your collection`,
                type: 'success',
                duration: 3000,
              },
            })
          )
        }
      } else {
        // Add to collection
        const albumArtUrl = albumArt || '/src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg'

        addToCollection({
          id: trackId,
          artistName,
          trackName,
          albumName,
          labelName,
          albumArt: albumArtUrl,
          isLocal,
        })

        window.dispatchEvent(
          new CustomEvent('chirp-show-toast', {
            detail: {
              message: `Added ${trackName} to your collection`,
              type: 'success',
              duration: 3000,
            },
          })
        )
      }
    })
  }

  const renderFullVariant = () => (
    <div className="cr-track-info__text">
      {/* Title - full width */}
      <div className="cr-track-info__track-container" ref={trackContainerRef}>
        <div className="cr-track-info__track-scrolling" ref={trackRef}>
          {trackName}
        </div>
      </div>

      {/* Artist + LOCAL - full width with LOCAL floating behavior */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
        }}
      >
        <div
          className="cr-track-info__artist-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: 0,
            flex: 1,
          }}
        >
          <div className="cr-track-info__artist-scroll-container" ref={artistContainerRef}>
            <div className="cr-track-info__artist-scrolling" ref={artistRef}>
              {artistName}
            </div>
          </div>
          {isLocal && (
            <div
              style={{
                flexShrink: 0,
                marginLeft: '8px',
                display: 'flex',
                alignItems: 'center',
                height: '22px',
              }}
            >
              <CrChip variant="primary" size="small" squared>
                LOCAL
              </CrChip>
            </div>
          )}
        </div>
      </div>

      {/* Album/Label - accommodate REMOVE button width */}
      {(albumName || labelName) && (
        <div className="cr-track-info__details-container" ref={detailsContainerRef}>
          <div className="cr-track-info__details-scrolling" ref={detailsRef}>
            {albumName && <span className="cr-track-info__album">{albumName}</span>}
            {albumName && labelName && <span className="cr-track-info__separator"> </span>}
            {labelName && <span className="cr-track-info__label">{labelName}</span>}
          </div>
        </div>
      )}
    </div>
  )

  const renderMinimalVariant = () => (
    <div className="cr-track-info__text">
      {/* Title - full width */}
      <div className="cr-track-info__track-container" ref={trackContainerRef}>
        <div className="cr-track-info__track-scrolling" ref={trackRef}>
          {trackName}
        </div>
      </div>

      {/* Artist + LOCAL + ADD button - all inline */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
        }}
      >
        <div
          className="cr-track-info__artist-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: 0,
            flex: 1,
          }}
        >
          <div className="cr-track-info__artist-scroll-container" ref={artistContainerRef}>
            <div className="cr-track-info__artist-scrolling" ref={artistRef}>
              {artistName}
            </div>
          </div>
          {isLocal && (
            <div
              style={{
                flexShrink: 0,
                marginLeft: '8px',
                display: 'flex',
                alignItems: 'center',
                height: '22px',
              }}
            >
              <CrChip variant="primary" size="small" squared>
                LOCAL
              </CrChip>
            </div>
          )}
        </div>
        {/* ADD button inline with artist name - only show if onToggleAdd is defined */}
        {onToggleAdd !== undefined && (
          <div className="cr-track-info__actions-inline">
            <CrButton
              variant="text"
              size="xsmall"
              color="secondary"
              rightIcon={isAdded ? undefined : <PiPlusCircle className="w-4 h-4" />}
              onClick={handleToggleAdd}
            >
              {isAdded ? 'REMOVE' : 'ADD'}
            </CrButton>
          </div>
        )}
      </div>
    </div>
  )

  const renderStackedVariant = () => (
    <div className="cr-track-info__text">
      {/* Title - full width */}
      <div className="cr-track-info__track-container" ref={trackContainerRef}>
        <div className="cr-track-info__track-scrolling" ref={trackRef}>
          {trackName}
        </div>
      </div>

      {/* Artist + LOCAL - full width with LOCAL floating behavior */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          minWidth: 0,
        }}
      >
        <div
          className="cr-track-info__artist-container"
          style={{
            display: 'flex',
            alignItems: 'center',
            minWidth: 0,
            flex: 1,
          }}
        >
          <div className="cr-track-info__artist-scroll-container" ref={artistContainerRef}>
            <div className="cr-track-info__artist-scrolling" ref={artistRef}>
              {artistName}
            </div>
          </div>
          {isLocal && (
            <div
              style={{
                flexShrink: 0,
                marginLeft: '8px',
                display: 'flex',
                alignItems: 'center',
                height: '22px',
              }}
            >
              <CrChip variant="primary" size="small" squared>
                LOCAL
              </CrChip>
            </div>
          )}
        </div>
      </div>

      {/* Album - wider width */}
      {albumName && (
        <div className="cr-track-info__details-container" ref={albumContainerRef}>
          <div className="cr-track-info__details-scrolling" ref={albumRef}>
            <span className="cr-track-info__album">{albumName}</span>
          </div>
        </div>
      )}

      {/* Label - wider width */}
      {labelName && (
        <div className="cr-track-info__details-container" ref={labelContainerRef}>
          <div className="cr-track-info__details-scrolling" ref={labelRef}>
            <span className="cr-track-info__label">{labelName}</span>
          </div>
        </div>
      )}
    </div>
  )

  const renderContent = () => {
    switch (variant) {
      case 'minimal':
        return renderMinimalVariant()
      case 'stacked':
        return renderStackedVariant()
      case 'full':
      default:
        return renderFullVariant()
    }
  }

  return (
    <>
      <div className={`cr-track-info cr-track-info--${variant} ${className}`}>
        <div className="cr-track-info__content">
          {renderContent()}

          {/* Only render button here for full/stacked variants - minimal has it inline */}
          {/* Don't show button if onToggleAdd is explicitly undefined (e.g., Android Auto) */}
          {variant !== 'minimal' && onToggleAdd !== undefined && (
            <div className="cr-track-info__actions">
              <CrButton
                variant="text"
                size="xsmall"
                color="secondary"
                rightIcon={isAdded ? undefined : <PiPlusCircle className="w-4 h-4" />}
                onClick={handleToggleAdd}
              >
                {isAdded ? 'REMOVE' : 'ADD'}
              </CrButton>
            </div>
          )}
        </div>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={closeModal}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </>
  )
}
