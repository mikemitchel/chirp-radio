// src/pages/MakeRequest.tsx
import { useState } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrCurrentDj from '../stories/CrCurrentDj'
import CrSongRequestForm from '../stories/CrSongRequestForm'
import CrButton from '../stories/CrButton'
import { useAuth } from '../hooks/useAuth'
import { useAudioPlayer } from '../contexts/AudioPlayerContext'
import { useNotification } from '../contexts/NotificationContext'
import { useMobilePageByIdentifier, useMobileAppSettings } from '../hooks/useData'
import LoginRequiredModal from '../components/LoginRequiredModal'

interface MakeRequestProps {
  testDjName?: string
  testShowName?: string
}

export default function MakeRequest({ testDjName, testShowName }: MakeRequestProps = {}) {
  const { isLoggedIn, login, signup } = useAuth()
  const { currentData } = useAudioPlayer()
  const { showToast } = useNotification()
  const { data: pageContent } = useMobilePageByIdentifier('make-request')
  const { data: appSettings } = useMobileAppSettings()
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [loginModalMode, setLoginModalMode] = useState<'login' | 'signup'>('login')

  const handleSubmit = (data: any) => {
    console.log('Song request submitted:', data)
    // TODO: Send request to API
  }

  const handleCancel = () => {
    console.log('Song request cancelled')
    // TODO: Handle cancel action (e.g., navigate back)
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

  // Derived values from CMS
  const pageTitle = pageContent?.pageTitle || 'Make a Song Request'
  const pageSubtitle = pageContent?.pageSubtitle || undefined
  const formHintText = pageContent?.formHintText || 'Keep it friendly and respectful'
  const notLoggedInMessage =
    pageContent?.customNotLoggedInMessage ||
    appSettings?.notLoggedInMessage?.message ||
    'You need to be logged in to make a song request. This helps us know who the request is coming from and ensures a better experience for everyone.'
  const loginButtonText = appSettings?.notLoggedInMessage?.loginButtonText || 'log in'
  const signupButtonText = appSettings?.notLoggedInMessage?.signupButtonText || 'sign up'
  const benefitsTitle = appSettings?.accountBenefitsTitle || 'Benefits of Creating an Account:'
  const benefitsContent = appSettings?.accountBenefitsContent || `
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

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <CrPageHeader
          eyebrowText="CHIRP Radio"
          title={pageTitle}
          showEyebrow={false}
          showActionButton={false}
          titleSize="lg"
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
    <div>
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title={pageTitle}
        showEyebrow={false}
        showActionButton={false}
        titleSize="lg"
      />

      {pageContent?.introContent && (
        <div
          className="page-intro-content"
          dangerouslySetInnerHTML={{ __html: pageContent.introContent }}
        />
      )}

      <div>
        <CrCurrentDj
          djName={testDjName || currentData.dj}
          showName={testShowName || currentData.show}
          isOnAir={true}
          statusText="On-Air"
        />
      </div>

      <CrSongRequestForm
        title=""
        bodyContent={pageSubtitle}
        hintText={formHintText}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  )
}
