// src/pages/MakeRequest.tsx
import React, { useState } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrCurrentDj from '../stories/CrCurrentDj'
import CrSongRequestForm from '../stories/CrSongRequestForm'
import CrButton from '../stories/CrButton'
import { useAuth } from '../hooks/useAuth'
import { useAudioPlayer } from '../contexts/AudioPlayerContext'
import { useNotification } from '../contexts/NotificationContext'
import LoginRequiredModal from '../components/LoginRequiredModal'

interface MakeRequestProps {
  testDjName?: string
  testShowName?: string
}

export default function MakeRequest({ testDjName, testShowName }: MakeRequestProps = {}) {
  const { isLoggedIn, login, signup } = useAuth()
  const { currentData } = useAudioPlayer()
  const { showToast } = useNotification()
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

  if (!isLoggedIn) {
    return (
      <div className="page-container">
        <CrPageHeader
          eyebrowText="CHIRP Radio"
          title="Make a Song Request"
          showEyebrow={false}
          showActionButton={false}
          titleSize="lg"
        />

        <div>
          <p className="cr-profile-card__not-logged-in-description">
            You need to be logged in to make a song request. This helps us know who the request is
            coming from and ensures a better experience for everyone.
          </p>

          <div className="cr-profile-card__not-logged-in-actions">
            <CrButton variant="outline" color="default" size="medium" onClick={handleLoginClick}>
              log in
            </CrButton>
            <CrButton variant="solid" color="secondary" size="medium" onClick={handleSignUpClick}>
              sign up
            </CrButton>
          </div>

          <h3 className="cr-profile-card__benefits-title">Benefits of Creating an Account:</h3>
          <ul className="cr-profile-card__benefits-list">
            <li>Save your favorite songs from our live stream to your personal collection</li>
            <li>Make song requests directly to our DJs during their shows</li>
            <li>Access your saved tracks across web and mobile apps</li>
            <li>Save your information for store purchases and donations</li>
            <li>Sync your preferences and settings between devices</li>
            <li>Get personalized recommendations based on your listening history</li>
            <li>Receive updates about upcoming shows and events</li>
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
    <div>
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title="Make a Request"
        showEyebrow={false}
        showActionButton={false}
        titleSize="lg"
      />

      <div>
        <CrCurrentDj
          djName={testDjName || currentData.dj}
          showName={testShowName || currentData.show}
          isOnAir={true}
          statusText="On-Air"
        />
      </div>

      <CrSongRequestForm title="" onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  )
}
