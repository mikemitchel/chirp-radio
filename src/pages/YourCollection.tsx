// src/pages/YourCollection.tsx
import React, { useState, useEffect } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrButton from '../stories/CrButton'
import { useAuth } from '../hooks/useAuth'
import { useNotification } from '../contexts/NotificationContext'
import { useMobilePageByIdentifier, useMobileAppSettings } from '../hooks/useData'
import { PiShare } from 'react-icons/pi'
import { tracksToCSV } from '../utils/csvExport'
import { Share } from '@capacitor/share'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Capacitor } from '@capacitor/core'
import LoginRequiredModal from '../components/LoginRequiredModal'
import {
  getCollection,
  removeFromCollection,
  initializeSampleCollection,
  type CollectionTrack,
} from '../utils/collectionDB'
import './YourCollection.css'

// Sample data - all items marked as added (isAdded: true) to show "remove" button
const sampleCollectionItems = [
  {
    id: '1',
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    albumArtAlt: 'Kind of Blue album cover',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:45pm',
    isLocal: false,
    isAdded: true,
  },
  {
    id: '2',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    albumArtAlt: 'Giant Steps album cover',
    artistName: 'John Coltrane',
    trackName: 'Giant Steps',
    albumName: 'Giant Steps',
    labelName: 'Atlantic Records',
    timeAgo: '2:30pm',
    isLocal: true,
    isAdded: true,
  },
  {
    id: '3',
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    albumArtAlt: 'Time Out album cover',
    artistName: 'Dave Brubeck',
    trackName: 'Take Five',
    albumName: 'Time Out',
    labelName: 'Columbia Records',
    timeAgo: '2:15pm',
    isLocal: false,
    isAdded: true,
  },
  {
    id: '4',
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    albumArtAlt: "Takin' Off album cover",
    artistName: 'Herbie Hancock',
    trackName: 'Watermelon Man',
    albumName: "Takin' Off",
    labelName: 'Blue Note Records',
    timeAgo: '1:45pm',
    isLocal: false,
    isAdded: true,
  },
  {
    id: '5',
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    albumArtAlt: 'A Love Supreme album cover',
    artistName: 'John Coltrane',
    trackName: 'Acknowledgement',
    albumName: 'A Love Supreme',
    labelName: 'Impulse! Records',
    timeAgo: '1:15pm',
    isLocal: false,
    isAdded: true,
  },
]

export default function YourCollection() {
  const { isLoggedIn, login, signup, user } = useAuth()
  const { showModal, showToast } = useNotification()
  const { data: pageContent } = useMobilePageByIdentifier('my-collection')
  const { data: appSettings } = useMobileAppSettings()
  const [collection, setCollection] = useState<CollectionTrack[]>([])
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'signup'>('login')

  // Derived values from CMS
  const pageTitle = pageContent?.pageTitle || 'Your Collection'
  const notLoggedInMessage =
    pageContent?.customNotLoggedInMessage ||
    appSettings?.notLoggedInMessage?.message ||
    'A profile allows you to interact with the site in all sorts of helpful ways. Create your profile today, and start getting the maximum benefit from CHIRPradio.org!'
  const loginButtonText = appSettings?.notLoggedInMessage?.loginButtonText || 'log in'
  const signupButtonText = appSettings?.notLoggedInMessage?.signupButtonText || 'sign up'
  const benefitsTitle = appSettings?.accountBenefits?.title || 'Benefits of Creating an Account:'
  const benefits = appSettings?.accountBenefits?.benefits || [
    { benefit: 'Save your favorite songs from our live stream to your personal collection' },
    { benefit: 'Make song requests directly to our DJs during their shows' },
    { benefit: 'Access your saved tracks across web and mobile apps' },
    { benefit: 'Save your information for store purchases and donations' },
    { benefit: 'Sync your preferences and settings between devices' },
    { benefit: 'Get personalized recommendations based on your listening history' },
    { benefit: 'Receive updates about upcoming shows and events' },
  ]

  // Load collection on mount and when logged in
  useEffect(() => {
    if (isLoggedIn) {
      // Initialize sample data if needed (for testing)
      initializeSampleCollection()
      setCollection(getCollection())
    }
  }, [isLoggedIn])

  // Add reset function to window for testing (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      ;(window as any).resetCollection = () => {
        localStorage.removeItem('chirp-collection')
        initializeSampleCollection()
        setCollection(getCollection())
        console.log('Collection reset with new sample data')
      }
    }
    return () => {
      if (process.env.NODE_ENV === 'development') {
        delete (window as any).resetCollection
      }
    }
  }, [])

  // Listen for collection updates
  useEffect(() => {
    const handleCollectionUpdate = () => {
      setCollection(getCollection())
    }

    window.addEventListener('chirp-collection-updated', handleCollectionUpdate)
    return () => {
      window.removeEventListener('chirp-collection-updated', handleCollectionUpdate)
    }
  }, [])

  const handleItemRemove = (item: any, index: number) => {
    showModal({
      title: 'Remove from Collection',
      message: `Are you sure you want to remove ${item.trackName} by ${item.artistName} from your collection?`,
      confirmText: 'Yes, Remove',
      cancelText: 'No',
      onConfirm: () => {
        const removed = removeFromCollection(item.id)
        if (removed) {
          showToast({
            message: `Removed ${item.trackName} by ${item.artistName} from your collection`,
            type: 'success',
            duration: 5000,
          })
        }
      },
    })
  }

  const handleLoginClick = () => {
    setLoginModalMode('login')
    setShowLoginModal(true)
  }

  const handleSignUpClick = () => {
    setLoginModalMode('signup')
    setShowLoginModal(true)
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

  const handleSendEmail = async () => {
    try {
      // Get current date for filename
      const today = new Date().toISOString().split('T')[0] // YYYY-MM-DD format
      const filename = `chirp-radio-my-collection-${today}.csv`

      // Generate CSV content
      const csvContent = tracksToCSV(collection)

      if (!csvContent) {
        showToast({
          message: 'No tracks to share',
          type: 'error',
          duration: 3000,
        })
        return
      }

      // On native platforms, use Share API with file attachment
      if (Capacitor.isNativePlatform()) {
        // Write CSV to temporary file
        const result = await Filesystem.writeFile({
          path: filename,
          data: csvContent,
          directory: Directory.Cache,
          encoding: Encoding.UTF8,
        })

        // Share the file
        await Share.share({
          title: `CHIRP Radio - My Collection - ${today}`,
          text: `My CHIRP Radio collection from ${today}`,
          url: result.uri,
          dialogTitle: 'Share Your Collection',
        })

        showToast({
          message: 'Opening share menu...',
          type: 'info',
          duration: 3000,
        })
      } else {
        // Fallback for web: download the file
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)

        showToast({
          message: 'Your collection has been downloaded',
          type: 'success',
          duration: 3000,
        })
      }
    } catch (error) {
      console.error('Error sharing collection:', error)
      showToast({
        message: 'Failed to share collection',
        type: 'error',
        duration: 3000,
      })
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <CrPageHeader
          eyebrowText="CHIRP Radio"
          title={pageTitle}
          showEyebrow={false}
          showActionButton={false}
          titleSize="xl"
          titleTag="h1"
        />

        <div>
          <div
            className="cr-profile-card__not-logged-in-description"
            dangerouslySetInnerHTML={{ __html: notLoggedInMessage }}
          />

          <div className="cr-profile-card__not-logged-in-actions">
            <CrButton variant="outline" color="default" size="medium" onClick={handleLoginClick}>
              {loginButtonText}
            </CrButton>
            <CrButton variant="solid" color="secondary" size="medium" onClick={handleSignUpClick}>
              {signupButtonText}
            </CrButton>
          </div>

          <h3 className="cr-profile-card__benefits-title">{benefitsTitle}</h3>
          <ul className="cr-profile-card__benefits-list">
            {benefits.map((item, index) => (
              <li key={index}>{item.benefit}</li>
            ))}
          </ul>
        </div>

        <LoginRequiredModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSignUp={handleSignUp}
          initialMode={loginModalMode}
        />
      </div>
    )
  }

  return (
    <div className="page-container">
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title="Your Collection"
        showEyebrow={false}
        showActionButton={true}
        actionButtonText="Share Collection"
        actionButtonSize="small"
        actionButtonIcon={<PiShare />}
        onActionClick={handleSendEmail}
        titleSize="xl"
        titleTag="h1"
      />

      <CrPlaylistTable
        items={collection.map((track) => ({
          ...track,
          isAdded: true,
          timeAgo: `Added on ${new Date(track.dateAdded).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}`,
        }))}
        showHeader={true}
        groupByHour={false}
        onItemAddClick={handleItemRemove}
      />

      <CrAnnouncement
        variant="motivation"
        textureBackground="cr-bg-natural-s900"
        headlineText="Build your perfect playlist"
        bodyText="Add tracks as you discover them and create your own radio experience!"
        showLink={false}
        buttonCount="one"
        button1Text="DISCOVER MORE MUSIC"
        button1Icon="mobile"
        button1OnClick={() => console.log('Navigate to recently played')}
      />
    </div>
  )
}
