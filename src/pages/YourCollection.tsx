// src/pages/YourCollection.tsx
import { useState, useEffect } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrButton from '../stories/CrButton'
import { useAuth } from '../hooks/useAuth'
import { useNotification } from '../contexts/NotificationContext'
import { useMobileAppSettings, useMobilePageByIdentifier, useSiteSettings } from '../hooks/useData'
import { PiShare } from 'react-icons/pi'
import { tracksToCSV } from '../utils/csvExport'
import { Share } from '@capacitor/share'
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem'
import { Capacitor } from '@capacitor/core'
import LoginRequiredModal from '../components/LoginRequiredModal'
import { getCollection, removeFromCollection, type CollectionTrack } from '../utils/collectionDB'
import { lexicalToHtml } from '../utils/lexicalSerializer'
import './YourCollection.css'

export default function YourCollection() {
  const { isLoggedIn, login, signup } = useAuth()
  const { showModal, showToast } = useNotification()
  const { data: appSettings } = useMobileAppSettings()
  const { data: pageContent } = useMobilePageByIdentifier('my-collection')
  const { data: siteSettings } = useSiteSettings()
  const [collection, setCollection] = useState<CollectionTrack[]>([])
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'signup'>('login')

  // Derived values from CMS
  const pageTitle = pageContent?.pageTitle || 'Your Collection'
  const notLoggedInDescription =
    pageContent?.customNotLoggedInMessage ||
    'A profile allows you to interact with the site in all sorts of helpful ways. Create your profile today, and start getting the maximum benefit from CHIRPradio.org!'
  const collectionPageContent = siteSettings?.collectionPageContent
    ? lexicalToHtml(siteSettings.collectionPageContent)
    : null
  const isNativePlatform = Capacitor.isNativePlatform()
  const hasCollectionItems = collection.length > 0
  const actionButtonText =
    (pageContent && 'actionButtonText' in pageContent
      ? ((pageContent as Record<string, unknown>).actionButtonText as string)
      : undefined) || 'Share Collection'
  const loginButtonText =
    (pageContent && 'loginButtonText' in pageContent
      ? ((pageContent as Record<string, unknown>).loginButtonText as string)
      : undefined) || 'Log In'
  const signupButtonText =
    (pageContent && 'signupButtonText' in pageContent
      ? ((pageContent as Record<string, unknown>).signupButtonText as string)
      : undefined) || 'Sign Up'

  const benefitsTitle =
    (appSettings && 'accountBenefitsTitle' in appSettings
      ? ((appSettings as Record<string, unknown>).accountBenefitsTitle as string)
      : undefined) || 'Benefits of Creating an Account:'
  const benefitsContent =
    (appSettings && 'accountBenefitsContent' in appSettings
      ? ((appSettings as Record<string, unknown>).accountBenefitsContent as string)
      : undefined) ||
    `
    <ul>
      <li>Save your favorite songs from our live stream to your personal collection</li>
      <li>Make song requests directly to our DJs during their shows</li>
      <li>Access your saved tracks across web and mobile apps</li>
      <li>Save your information for store purchases and donations</li>
      <li>Sync your preferences and settings between devices</li>
      <li>Get personalized recommendations based on your listening history</li>
      <li>Receive updates about upcoming shows and events</li>
    </ul>
  `

  // Get the announcement from CMS (now populated and transformed with depth: 1)
  const announcementValue =
    pageContent && 'announcement' in pageContent
      ? (pageContent as Record<string, unknown>).announcement
      : undefined
  const selectedAnnouncement =
    typeof announcementValue === 'object' && announcementValue !== null ? announcementValue : null

  // Load collection on mount and when logged in
  useEffect(() => {
    if (isLoggedIn) {
      // Load user's collection (already loaded by AuthContext on login/profile switch)
      setCollection(getCollection())
    }
  }, [isLoggedIn])

  // Add reset function to window for testing (only in development)
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      ;(window as unknown as Record<string, unknown>).resetCollection = () => {
        localStorage.removeItem('chirp-collection')
        setCollection([])
        console.log('Collection cleared')
      }
    }
    return () => {
      if (process.env.NODE_ENV === 'development') {
        delete (window as unknown as Record<string, unknown>).resetCollection
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

  const handleItemRemove = (item: any, _index: number) => {
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
          <p
            className="cr-profile-card__not-logged-in-description"
            dangerouslySetInnerHTML={{ __html: notLoggedInDescription }}
          />

          <div className="cr-profile-card__not-logged-in-actions">
            <CrButton variant="text" color="default" size="medium" onClick={handleLoginClick}>
              {loginButtonText}
            </CrButton>
            <CrButton variant="solid" color="secondary" size="medium" onClick={handleSignUpClick}>
              {signupButtonText}
            </CrButton>
          </div>

          <h3 className="cr-profile-card__benefits-title">{benefitsTitle as React.ReactNode}</h3>
          <div
            className="cr-profile-card__benefits-content"
            dangerouslySetInnerHTML={{ __html: benefitsContent as string }}
          />
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
        title={pageTitle}
        showEyebrow={false}
        showActionButton={true}
        actionButtonText={actionButtonText}
        actionButtonSize="small"
        actionButtonIcon={<PiShare />}
        onActionClick={handleSendEmail}
        titleSize="xl"
        titleTag="h1"
      />

      {/* Collection Page Content - Show based on platform and collection state */}
      {collectionPageContent &&
        (!isNativePlatform || (isNativePlatform && !hasCollectionItems)) && (
          <div
            className="collection-page-content"
            dangerouslySetInnerHTML={{ __html: collectionPageContent }}
          />
        )}

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

      {selectedAnnouncement && (
        <CrAnnouncement
          variant={(selectedAnnouncement as Record<string, unknown>).variant as string}
          textureBackground={
            (selectedAnnouncement as Record<string, unknown>).textureBackground as string
          }
          headlineText={(selectedAnnouncement as Record<string, unknown>).headlineText as string}
          bodyText={(selectedAnnouncement as Record<string, unknown>).bodyText as string}
          showLink={(selectedAnnouncement as Record<string, unknown>).showLink as boolean}
          linkText={(selectedAnnouncement as Record<string, unknown>).linkText as string}
          linkUrl={(selectedAnnouncement as Record<string, unknown>).linkUrl as string}
          buttonCount={(selectedAnnouncement as Record<string, unknown>).buttonCount as string}
          button1Text={(selectedAnnouncement as Record<string, unknown>).button1Text as string}
          button1Icon={(selectedAnnouncement as Record<string, unknown>).button1Icon as string}
          button2Text={(selectedAnnouncement as Record<string, unknown>).button2Text as string}
          button2Icon={(selectedAnnouncement as Record<string, unknown>).button2Icon as string}
          currentAmount={(selectedAnnouncement as Record<string, unknown>).currentAmount as number}
          targetAmount={(selectedAnnouncement as Record<string, unknown>).targetAmount as number}
        />
      )}
    </div>
  )
}
