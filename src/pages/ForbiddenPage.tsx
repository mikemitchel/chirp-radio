// src/pages/ForbiddenPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { PiSignIn, PiVinylRecord } from 'react-icons/pi'
import CrButton from '../stories/CrButton'
import { useAuth } from '../hooks/useAuth'
import chirpBirdLogo from '../assets/chirp-logos/CHIRP-bird.svg'

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="forbidden-page">
      <div className="page-layout-single">
        <div className="error-page-container">
          <div className="error-page-number">
            4<PiVinylRecord />3
          </div>

          <h1 className="error-page-title">Access Denied</h1>

          <p className="error-page-description">
            {user
              ? "Sorry, you don't have permission to access this page. This area is restricted to authorized users only."
              : 'You need to be logged in to access this page. Please sign in to continue.'}
          </p>

          <div className="error-page-actions">
            <CrButton
              size="large"
              variant="outline"
              color="default"
              leftIcon={<img src={chirpBirdLogo} alt="CHIRP" className="icon-md" />}
              onClick={() => navigate('/')}
            >
              Home
            </CrButton>
            {!user ? (
              <CrButton
                size="large"
                variant="solid"
                color="primary"
                leftIcon={<PiSignIn />}
                onClick={() => navigate('/profile')}
              >
                Sign In
              </CrButton>
            ) : (
              <CrButton size="large" variant="solid" color="primary" onClick={() => navigate(-1)}>
                Go Back
              </CrButton>
            )}
          </div>

          <div className="error-page-support-box">
            <p>
              {user
                ? 'If you believe you should have access to this page, please contact your administrator or reach out to us at support@chirpradio.org'
                : 'CHIRP Radio volunteers and DJs have access to additional resources and features.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForbiddenPage
