// AudioCollectionContext.tsx
// Handles collection add/remove operations and login requirements
// Separated from playback/metadata concerns for better organization

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { addToCollection, removeFromCollection, isInCollection } from '../utils/collectionDB'
import { useAuth } from '../hooks/useAuth'
import { emit, on } from '../utils/eventBus'
import LoginRequiredModal from '../components/LoginRequiredModal'

export interface Track {
  artist: string
  track: string
  album: string
  label: string
  albumArt: string
  isLocal: boolean
}

interface AudioCollectionContextType {
  isTrackAdded: boolean
  toggleAddTrack: (track: Track) => void
  checkIfTrackAdded: (artist: string, trackName: string) => boolean
}

const AudioCollectionContext = createContext<AudioCollectionContextType | undefined>(undefined)

interface AudioCollectionProviderProps {
  children: ReactNode
  currentTrack?: Track
}

export function AudioCollectionProvider({ children, currentTrack }: AudioCollectionProviderProps) {
  const [isTrackAdded, setIsTrackAdded] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const { isLoggedIn, login, signup } = useAuth()

  // Toggle add/remove track from collection
  const toggleAddTrack = (track: Track) => {
    // Check if user is logged in
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    const trackId = `${track.artist}-${track.track}`.replace(/\s+/g, '-').toLowerCase()

    if (isTrackAdded) {
      // Remove from collection
      const removed = removeFromCollection(trackId)
      if (removed) {
        emit('chirp-show-toast', {
          message: `Removed ${track.track} from your collection`,
          type: 'success',
          duration: 3000,
        })
      }
    } else {
      // Add to collection
      // Use CHIRP logo as fallback if no album art
      const albumArtUrl = track.albumArt || '/src/assets/chirp-logos/CHIRP_Logo_FM URL_record.svg'

      addToCollection({
        id: trackId,
        artistName: track.artist,
        trackName: track.track,
        albumName: track.album,
        labelName: track.label,
        albumArt: albumArtUrl,
        isLocal: track.isLocal,
      })

      emit('chirp-show-toast', {
        message: `Added ${track.track} to your collection`,
        type: 'success',
        duration: 3000,
      })
    }
  }

  // Check if a specific track is in the collection
  const checkIfTrackAdded = (artist: string, trackName: string): boolean => {
    return isInCollection(artist, trackName)
  }

   
  const handleLogin = (email: string, _password: string) => {
    // TODO: Validate credentials with API
    login(email, email.split('@')[0]) // For demo, use email prefix as name
    setShowLoginModal(false)

    emit('chirp-show-toast', {
      message: 'Successfully logged in!',
      type: 'success',
      duration: 3000,
    })
  }

   
  const handleSignUp = (email: string, _password: string) => {
    // TODO: Create account with API
    signup(email, email.split('@')[0]) // For demo, use email prefix as name
    setShowLoginModal(false)

    emit('chirp-show-toast', {
      message: 'Account created successfully!',
      type: 'success',
      duration: 3000,
    })
  }

  // Sync isTrackAdded with collection state when current track changes
  useEffect(() => {
    if (!currentTrack) return

    const updateAddedStatus = () => {
      const inCollection = isInCollection(currentTrack.artist, currentTrack.track)
      setIsTrackAdded(inCollection)
    }

    // Initial check
    updateAddedStatus()

    // Listen for collection updates using typed event bus
    const unsubscribe = on('chirp-collection-updated', updateAddedStatus)

    return () => {
      unsubscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack?.artist, currentTrack?.track])

  const value: AudioCollectionContextType = {
    isTrackAdded,
    toggleAddTrack,
    checkIfTrackAdded,
  }

  return (
    <AudioCollectionContext.Provider value={value}>
      {children}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </AudioCollectionContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAudioCollection(): AudioCollectionContextType {
  const context = useContext(AudioCollectionContext)
  if (context === undefined) {
    throw new Error('useAudioCollection must be used within an AudioCollectionProvider')
  }
  return context
}
