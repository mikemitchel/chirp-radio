// src/pages/AccountSettings.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { PiPencilSimple, PiHandHeart, PiStorefront, PiDownloadSimple } from 'react-icons/pi'
import CrPageHeader from '../stories/CrPageHeader'
import CrProfileCard from '../stories/CrProfileCard'
import CrTable from '../stories/CrTable'
import CrButton from '../stories/CrButton'
import CrChip from '../stories/CrChip'
import CrModal from '../stories/CrModal'
import CrAppIconSelector from '../stories/CrAppIconSelector'
import { useAuth } from '../hooks/useAuth'
import { useNotification } from '../contexts/NotificationContext'
import { shouldShowIconSelector } from '../utils/deviceDetection'
import './AccountSettings.css'

export default function AccountSettings() {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    isLoggedIn,
    user,
    login,
    logout,
    switchProfile,
    verifyPassword,
    requestEmailChange,
    verifyEmailChange,
    cancelEmailChange,
  } = useAuth()
  const { showToast } = useNotification()

  // State for profile edit mode
  const [profileState, setProfileState] = useState<
    'view' | 'editProfile' | 'editVolunteer' | 'loggedOut'
  >('view')

  // Form data state for editing
  const [formData, setFormData] = useState<any>({})

  // Email change state
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [pendingNewEmail, setPendingNewEmail] = useState<string>('')
  const [emailChangeError, setEmailChangeError] = useState<string>('')

  // Initialize form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        location: user.location || 'Chicago, Illinois',
        email: user.email || '',
        avatarSrc: user.avatar || '',
        fullProfileImage: user.fullProfileImage || '',
        profileImageOrientation: user.profileImageOrientation || 'square',
        djName: user.djName || '',
        showName: user.showName || '',
        showTime: user.showTime || '',
        djExcerpt: user.djExcerpt || '',
        djBio: user.djBio || '',
        djDonationLink: user.djDonationLink || '',
        primaryPhoneType: user.primaryPhoneType || 'mobile',
        primaryPhone: user.primaryPhone || '',
        secondaryPhoneType: user.secondaryPhoneType || '',
        secondaryPhone: user.secondaryPhone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        socialLinks: user.socialLinks
          ? Object.entries(user.socialLinks).map(([platform, url]) => ({
              platform,
              url: url as string,
            }))
          : [],
      })
    }
  }, [user])

  // Get the appropriate storage based on login state
  const getStorage = () => (isLoggedIn ? localStorage : sessionStorage)

  // Load dark mode preference
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | 'device'>(() => {
    const storage = getStorage()
    const saved = storage.getItem('chirp-dark-mode')
    if (saved === 'light' || saved === 'dark' || saved === 'device') {
      return saved
    }
    return 'light' // Default to light mode
  })

  // Load streaming quality preference
  const [streamingQuality, setStreamingQuality] = useState(() => {
    const storage = getStorage()
    const saved = storage.getItem('chirp-streaming-quality')
    return saved || '128'
  })

  // App icon state (only relevant for mobile app)
  const [currentAppIcon, setCurrentAppIcon] = useState(() => {
    const storage = getStorage()
    const saved = storage.getItem('chirp-app-icon')
    return saved || 'icon1'
  })

  // Check if we're in /app routes and should show icon selector
  // In production, only show on iOS 10.3+ with Capacitor
  // In development/browser, always show in /app routes for testing
  const isInAppRoutes = location.pathname.startsWith('/app')
  const showIconSelector = isInAppRoutes

  // Load user's dark mode preference when user changes
  useEffect(() => {
    if (user && user.preferences && user.preferences.darkMode) {
      setDarkMode(user.preferences.darkMode)
      const storage = getStorage()
      storage.setItem('chirp-dark-mode', user.preferences.darkMode)
    }
  }, [user?.email]) // Only when user changes (by email as unique identifier)

  // When login state changes, migrate settings and update profile state
  useEffect(() => {
    if (isLoggedIn) {
      // User just logged in - migrate session settings to localStorage
      const sessionDarkMode = sessionStorage.getItem('chirp-dark-mode')
      const sessionQuality = sessionStorage.getItem('chirp-streaming-quality')

      if (sessionDarkMode !== null) {
        localStorage.setItem('chirp-dark-mode', sessionDarkMode)
        sessionStorage.removeItem('chirp-dark-mode')
      }

      if (sessionQuality !== null) {
        localStorage.setItem('chirp-streaming-quality', sessionQuality)
        sessionStorage.removeItem('chirp-streaming-quality')
      }

      // Reload settings from localStorage
      const savedDarkMode = localStorage.getItem('chirp-dark-mode')
      if (savedDarkMode === 'light' || savedDarkMode === 'dark' || savedDarkMode === 'device') {
        setDarkMode(savedDarkMode)
      } else {
        setDarkMode('light')
      }
      setStreamingQuality(localStorage.getItem('chirp-streaming-quality') || '128')

      // Set profile to view mode
      setProfileState('view')
    } else {
      // User logged out - load from sessionStorage (or defaults if not set)
      const savedDarkMode = sessionStorage.getItem('chirp-dark-mode')
      if (savedDarkMode === 'light' || savedDarkMode === 'dark' || savedDarkMode === 'device') {
        setDarkMode(savedDarkMode)
      } else {
        setDarkMode('light')
      }
      setStreamingQuality(sessionStorage.getItem('chirp-streaming-quality') || '128')

      // Set profile to logged out state
      setProfileState('loggedOut')
    }
  }, [isLoggedIn])

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    const applyTheme = () => {
      if (darkMode === 'device') {
        // Follow system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        if (prefersDark) {
          document.documentElement.setAttribute('data-theme', 'dark')
        } else {
          document.documentElement.removeAttribute('data-theme')
        }
      } else if (darkMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark')
      } else {
        document.documentElement.removeAttribute('data-theme')
      }
    }

    applyTheme()

    // Listen for system preference changes (only if mode is 'device')
    if (darkMode === 'device') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      const handleChange = () => applyTheme()
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    }
  }, [darkMode])

  const handleDarkModeChange = (mode: 'light' | 'dark' | 'device') => {
    setDarkMode(mode)
    const storage = getStorage()
    storage.setItem('chirp-dark-mode', mode)

    // Update user preferences if logged in
    if (user) {
      const updatedUser = {
        ...user,
        preferences: {
          ...user.preferences,
          darkMode: mode,
        },
      }
      localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
    }
  }

  const handleStreamingQualityChange = (quality: string) => {
    setStreamingQuality(quality)
    const storage = getStorage()
    storage.setItem('chirp-streaming-quality', quality)

    // Dispatch custom event for same-window updates
    window.dispatchEvent(new CustomEvent('chirp-quality-change', { detail: quality }))
  }

  const handlePushNotificationsChange = (checked: boolean) => {
    // TODO: Save notification preference
  }

  const handleIconChange = (iconId: string) => {
    // Update local state immediately for preview
    setCurrentAppIcon(iconId)
  }

  const handleApplyIcon = async (iconId: string) => {
    try {
      // In a real Capacitor app, you would use the Capacitor API to change the icon
      // For now, we'll just save the preference
      const storage = getStorage()
      storage.setItem('chirp-app-icon', iconId)

      // Update user preferences if logged in
      if (user) {
        const updatedUser = {
          ...user,
          preferences: {
            ...user.preferences,
            appIcon: iconId,
          },
        }
        localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
      }

      showToast({
        message: 'App icon updated successfully',
        type: 'success',
        duration: 3000,
      })

      // In production with Capacitor, you would call:
      // const { Plugins } = await import('@capacitor/core');
      // await Plugins.App.setIcon({ name: iconId });
    } catch (error) {
      console.error('Error changing app icon:', error)
      showToast({
        message: 'Failed to change app icon',
        type: 'error',
        duration: 3000,
      })
      throw error
    }
  }

  const handleLogin = () => {
    // For demo purposes, simulate login with a demo account
    switchProfile('listener')
    showToast({
      message: 'Successfully logged in',
      type: 'success',
      duration: 5000,
    })
  }

  const handleLogout = () => {
    logout()
    // Store toast flag for after redirect
    sessionStorage.setItem('chirp-show-logout-toast', 'true')
    // Redirect to appropriate landing page based on current route
    const isInAppRoutes = location.pathname.startsWith('/app')
    navigate(isInAppRoutes ? '/app' : '/')
  }

  const handleSignUp = () => {
    // TODO: Navigate to sign up flow
  }

  const handleForgotPassword = () => {
    // TODO: Navigate to password recovery
  }

  const handleShareApp = () => {
    // TODO: Open share dialog
  }

  const handleLikeAppStore = () => {
    // TODO: Open app store link
  }

  const handleAppSupport = () => {
    // TODO: Navigate to support page
  }

  const handleTermsPrivacy = () => {
    // TODO: Navigate to terms and privacy page
  }

  const handleViewDJProfile = () => {
    // Generate slug from DJ name
    const slug = user?.djName
      ? user.djName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : 'dj-001'

    // Check if we're in mobile app routes
    const isInAppRoutes = location.pathname.startsWith('/app')

    if (isInAppRoutes) {
      // Open in browser for mobile app
      window.open(`https://chirpradio.org/djs/${slug}`, '_blank')
    } else {
      // Navigate in-app for web
      navigate(`/djs/${slug}`)
    }
  }

  const handleEditProfile = () => {
    setProfileState('editProfile')
  }

  const handleCancelEdit = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        firstName: user.firstName || user.name?.split(' ')[0] || '',
        lastName: user.lastName || user.name?.split(' ')[1] || '',
        location: user.location || 'Chicago, Illinois',
        email: user.email || '',
        avatarSrc: user.avatar || '',
        fullProfileImage: user.fullProfileImage || '',
        profileImageOrientation: user.profileImageOrientation || 'square',
        djName: user.djName || '',
        showName: user.showName || '',
        showTime: user.showTime || '',
        djExcerpt: user.djExcerpt || '',
        djBio: user.djBio || '',
        djDonationLink: user.djDonationLink || '',
        primaryPhoneType: user.primaryPhoneType || 'mobile',
        primaryPhone: user.primaryPhone || '',
        secondaryPhoneType: user.secondaryPhoneType || '',
        secondaryPhone: user.secondaryPhone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        socialLinks: user.socialLinks
          ? Object.entries(user.socialLinks).map(([platform, url]) => ({
              platform,
              url: url as string,
            }))
          : [],
      })
    }
    setProfileState('view')
  }

  const handleSaveProfile = async () => {
    // Check if email has changed
    const emailChanged = formData.email !== user?.email

    if (emailChanged) {
      // Trigger password confirmation flow
      setPendingNewEmail(formData.email)
      setShowPasswordModal(true)
      setEmailChangeError('')
      return
    }

    // If email hasn't changed, proceed with normal save
    try {
      const currentUser = JSON.parse(localStorage.getItem('chirp-user') || '{}')

      // Convert social links array back to object
      const socialLinksObj: any = {}
      if (formData.socialLinks && Array.isArray(formData.socialLinks)) {
        formData.socialLinks.forEach((link: any) => {
          if (link.platform && link.url) {
            socialLinksObj[link.platform] = link.url
          }
        })
      }

      const updatedUser = {
        ...currentUser,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        location: formData.location,
        avatar: formData.avatarSrc,
        fullProfileImage: formData.fullProfileImage,
        profileImageOrientation: formData.profileImageOrientation,
        djName: formData.djName,
        showName: formData.showName,
        showTime: formData.showTime,
        djExcerpt: formData.djExcerpt,
        djBio: formData.djBio,
        djDonationLink: formData.djDonationLink,
        primaryPhoneType: formData.primaryPhoneType,
        primaryPhone: formData.primaryPhone,
        secondaryPhoneType: formData.secondaryPhoneType,
        secondaryPhone: formData.secondaryPhone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        socialLinks: socialLinksObj,
      }

      localStorage.setItem('chirp-user', JSON.stringify(updatedUser))

      showToast({
        message: 'Profile updated successfully',
        type: 'success',
        duration: 3000,
      })

      setTimeout(() => {
        window.location.reload()
      }, 1000)

      setProfileState('view')
    } catch (error) {
      console.error('Error saving profile:', error)
      showToast({
        message: 'Failed to save profile',
        type: 'error',
        duration: 3000,
      })
    }
  }

  const handleProfileChange = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordConfirm = async () => {
    if (!verifyPassword(passwordInput)) {
      setEmailChangeError('Incorrect password. Please try again.')
      return
    }

    // Password verified, now save profile and initiate email change
    try {
      const currentUser = JSON.parse(localStorage.getItem('chirp-user') || '{}')

      // Convert social links array back to object
      const socialLinksObj: any = {}
      if (formData.socialLinks && Array.isArray(formData.socialLinks)) {
        formData.socialLinks.forEach((link: any) => {
          if (link.platform && link.url) {
            socialLinksObj[link.platform] = link.url
          }
        })
      }

      const updatedUser = {
        ...currentUser,
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        location: formData.location,
        avatar: formData.avatarSrc,
        fullProfileImage: formData.fullProfileImage,
        profileImageOrientation: formData.profileImageOrientation,
        djName: formData.djName,
        showName: formData.showName,
        showTime: formData.showTime,
        djExcerpt: formData.djExcerpt,
        djBio: formData.djBio,
        djDonationLink: formData.djDonationLink,
        primaryPhoneType: formData.primaryPhoneType,
        primaryPhone: formData.primaryPhone,
        secondaryPhoneType: formData.secondaryPhoneType,
        secondaryPhone: formData.secondaryPhone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        socialLinks: socialLinksObj,
      }

      localStorage.setItem('chirp-user', JSON.stringify(updatedUser))

      // Generate verification token (in real app, this would be done server-side)
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36)

      // Request email change
      requestEmailChange(pendingNewEmail, token)

      // Close modal and reset
      setShowPasswordModal(false)
      setPasswordInput('')
      setEmailChangeError('')
      setProfileState('view')

      // Show verification message
      showToast({
        message: 'Profile updated. Verification email sent to ' + pendingNewEmail,
        type: 'info',
        duration: 8000,
      })

      // Also show notification to old email (simulated)
      setTimeout(() => {
        showToast({
          message: `Security notice sent to ${user?.email}`,
          type: 'info',
          duration: 5000,
        })
      }, 1000)

      // For demo purposes, show verification button
      setTimeout(() => {
        showToast({
          message: 'Demo: Click "Verify Email Change" button in the banner to complete',
          type: 'warning',
          duration: 10000,
        })
      }, 2000)

      // Reload to show updated profile
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      console.error('Error saving profile:', error)
      setEmailChangeError('Failed to save profile. Please try again.')
    }
  }

  const handleCancelPasswordModal = () => {
    setShowPasswordModal(false)
    setPasswordInput('')
    setEmailChangeError('')
    setPendingNewEmail('')

    // Reset email in form data to original
    if (user?.email) {
      setFormData((prev: any) => ({
        ...prev,
        email: user.email,
      }))
    }
  }

  const handleVerifyEmailChange = () => {
    if (!user?.pendingEmailToken) return

    const success = verifyEmailChange(user.pendingEmailToken)

    if (success) {
      showToast({
        message: 'Email successfully updated!',
        type: 'success',
        duration: 5000,
      })

      // Update form data
      setFormData((prev: any) => ({
        ...prev,
        email: user.pendingEmail,
      }))

      // Reload to pick up changes
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } else {
      showToast({
        message: 'Verification failed or expired',
        type: 'error',
        duration: 5000,
      })
    }
  }

  const handleCancelEmailChange = () => {
    cancelEmailChange()

    // Reset email in form data to original
    if (user?.email) {
      setFormData((prev: any) => ({
        ...prev,
        email: user.email,
      }))
    }

    showToast({
      message: 'Email change cancelled',
      type: 'info',
      duration: 3000,
    })
  }

  const handleProfileStateChange = (state: string) => {
    setProfileState(state as 'view' | 'editProfile' | 'editVolunteer' | 'loggedOut')
  }

  const handleMakeDonation = () => {
    navigate('/donate')
  }

  const handleVisitStore = () => {
    navigate('/shop')
  }

  // Donation history table configuration
  const donationColumns = [
    { key: 'date', title: 'Date', sortable: true, width: 'medium' },
    { key: 'type', title: 'Type', sortable: true, width: 'medium' },
    {
      key: 'amount',
      title: 'Amount',
      sortable: true,
      width: 'narrow',
      align: 'right' as const,
      render: (value: number) => `$${value}`,
    },
    {
      key: 'receipt',
      title: 'Receipt',
      sortable: false,
      width: 'narrow',
      align: 'center' as const,
      render: (value: any, row: any) => (
        <CrButton
          variant="text"
          size="xsmall"
          color="default"
          leftIcon={<PiDownloadSimple />}
          onClick={() => console.log(`Downloading receipt for donation ${row.id}`)}
          aria-label={`Download receipt for ${row.amount} donation on ${row.date}`}
        >
          Receipt
        </CrButton>
      ),
    },
  ]

  // Purchase history table configuration
  const purchaseColumns = [
    { key: 'date', title: 'Date', sortable: true, width: 'medium' },
    { key: 'item', title: 'Item', sortable: true, width: 'wide' },
    {
      key: 'amount',
      title: 'Price',
      sortable: true,
      width: 'medium',
      align: 'right' as const,
      render: (value: number) => (typeof value === 'number' ? `$${value}` : value),
    },
  ]

  // Convert user social links to CrProfileCard format
  const socialLinksArray = user?.socialLinks
    ? Object.entries(user.socialLinks).map(([platform, url]) => ({
        platform,
        url: url as string,
      }))
    : []

  // Format member since date to "Month Day, Year" format
  const formatMemberSince = (dateString?: string) => {
    if (!dateString) return undefined
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="account-settings-page">
      {/* Password Confirmation Modal */}
      <CrModal
        isOpen={showPasswordModal}
        title="Confirm Password"
        size="small"
        onClose={handleCancelPasswordModal}
        scrimOnClick={handleCancelPasswordModal}
      >
        <div className="cr-modal__body">
          <div className="cr-modal-form">
            <p className="cr-modal-form__description">
              To change your email address, please confirm your password.
            </p>

            <div className="email-change-info">
              <div className="email-change-info__row">
                <strong>Current:</strong> {user?.email}
              </div>
              <div className="email-change-info__row">
                <strong>New:</strong> {pendingNewEmail}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password-input" className="form-label">
                Password
              </label>
              <input
                id="password-input"
                type="password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handlePasswordConfirm()
                  } else if (e.key === 'Escape') {
                    handleCancelPasswordModal()
                  }
                }}
                placeholder="Enter your password"
                className="form-input"
                autoFocus
              />
              {emailChangeError && <p className="form-error">{emailChangeError}</p>}
            </div>

            <div className="cr-modal__actions cr-modal__actions--space-between cr-modal__actions--gap">
              <CrButton variant="text" color="default" onClick={handleCancelPasswordModal}>
                Cancel
              </CrButton>
              <CrButton variant="filled" color="primary" onClick={handlePasswordConfirm}>
                Confirm
              </CrButton>
            </div>
          </div>
        </div>
      </CrModal>

      {/* Email Verification Pending Banner */}
      {user?.pendingEmail && (
        <div className="email-verification-banner">
          <div className="email-verification-banner__content">
            <p>
              <strong>Email verification pending:</strong> We've sent a verification link to{' '}
              <strong>{user.pendingEmail}</strong>. Your email won't change until you verify.
            </p>
            <div className="email-verification-banner__actions">
              <CrButton
                variant="filled"
                color="primary"
                size="small"
                onClick={handleVerifyEmailChange}
              >
                Verify Email Change (Demo)
              </CrButton>
              <CrButton
                variant="text"
                color="default"
                size="small"
                onClick={handleCancelEmailChange}
              >
                Cancel Change
              </CrButton>
            </div>
          </div>
        </div>
      )}

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrProfileCard
            state={profileState}
            eyebrowText="YOUR ACCOUNT"
            title="Your Profile"
            showEditButton={isLoggedIn}
            onEditClick={handleEditProfile}
            firstName={formData.firstName || user?.firstName || user?.name?.split(' ')[0] || 'John'}
            lastName={formData.lastName || user?.lastName || user?.name?.split(' ')[1] || 'Dough'}
            location={formData.location || user?.location || 'Chicago, Illinois'}
            email={formData.email || user?.email || 'account@gmail.com'}
            memberSince={formatMemberSince(user?.memberSince)}
            avatarSrc={formData.avatarSrc || user?.avatar}
            fullProfileImage={formData.fullProfileImage || user?.fullProfileImage}
            socialLinks={formData.socialLinks || socialLinksArray}
            permissions={user?.permissions || []}
            showPermissions={!!(user?.permissions && user.permissions.length > 0)}
            isVolunteer={user?.role === 'volunteer' || user?.role === 'dj'}
            isDJ={user?.role === 'dj'}
            djName={user?.djName}
            showName={user?.showName}
            showTime={user?.showTime}
            onStateChange={handleProfileStateChange}
            onSave={handleSaveProfile}
            onCancel={handleCancelEdit}
            onChange={handleProfileChange}
            formData={formData}
            streamingQuality={streamingQuality}
            onStreamingQualityChange={handleStreamingQualityChange}
            pushNotifications={false}
            onPushNotificationsChange={handlePushNotificationsChange}
            darkMode={darkMode}
            onDarkModeChange={handleDarkModeChange}
            onLogin={handleLogin}
            onLogout={handleLogout}
            onSignUp={handleSignUp}
            onForgotPassword={handleForgotPassword}
            onShareApp={handleShareApp}
            onLikeAppStore={handleLikeAppStore}
            onAppSupport={handleAppSupport}
            onTermsPrivacy={handleTermsPrivacy}
            onViewDJProfile={handleViewDJProfile}
          />

          {/* App Icon Selector - Only shown in /app routes on iOS 10.3+ */}
          {showIconSelector && (
            <CrAppIconSelector
              currentIcon={currentAppIcon}
              onIconChange={handleIconChange}
              onApply={handleApplyIcon}
            />
          )}
        </div>

        <div className="page-layout-main-sidebar__sidebar account-settings-page__sidebar">
          <CrTable
            tableTitle="Donation History"
            columns={donationColumns}
            data={user?.donationHistory || []}
            sortable={true}
            variant="compact"
            tableTitleLevel={2}
            tableTitleSize="lg"
            showActionButton={true}
            actionButtonText="Make a Donation"
            actionButtonIcon={<PiHandHeart />}
            actionButtonSize="medium"
            onActionClick={handleMakeDonation}
          />

          <CrTable
            tableTitle="Purchase History"
            columns={purchaseColumns}
            data={user?.purchaseHistory || []}
            sortable={true}
            variant="compact"
            tableTitleLevel={2}
            tableTitleSize="lg"
            showActionButton={true}
            actionButtonText="Visit Store"
            actionButtonIcon={<PiStorefront />}
            actionButtonSize="medium"
            onActionClick={handleVisitStore}
          />
        </div>
      </div>
    </div>
  )
}
