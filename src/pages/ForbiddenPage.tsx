// src/pages/ForbiddenPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { PiSignIn, PiVinylRecord } from 'react-icons/pi'
import CrButton from '../stories/CrButton'
import CrPageHeader from '../stories/CrPageHeader'
import { useAuth } from '../hooks/useAuth'
import chirpBirdLogo from '../assets/chirp-logos/CHIRP-bird.svg'

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  return (
    <div className="forbidden-page">
      <div className="page-layout-single">
        <div style={{ textAlign: 'center', padding: 'var(--cr-space-12) 0' }}>
          <div className="error-page-number">
            4<PiVinylRecord />3
          </div>

          <h1
            style={{
              font: 'var(--cr-title-xl)',
              color: 'var(--cr-ink)',
              marginBottom: 'var(--cr-space-4)',
            }}
          >
            Access Denied
          </h1>

          <p
            style={{
              fontSize: 'var(--cr-body-lg)',
              color: 'var(--cr-default-700)',
              marginTop: 'var(--cr-space-6)',
              marginBottom: 'var(--cr-space-8)',
              maxWidth: '600px',
              margin: '0 auto',
              padding: 'var(--cr-space-6) 0',
            }}
          >
            {user
              ? "Sorry, you don't have permission to access this page. This area is restricted to authorized users only."
              : 'You need to be logged in to access this page. Please sign in to continue.'}
          </p>

          <div
            style={{
              display: 'flex',
              gap: 'var(--cr-space-12)',
              justifyContent: 'center',
              marginBottom: 'var(--cr-space-12)',
            }}
          >
            <CrButton
              size="large"
              variant="outline"
              color="default"
              leftIcon={
                <img src={chirpBirdLogo} alt="CHIRP" style={{ width: '24px', height: '24px' }} />
              }
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

          <div
            style={{
              marginTop: 'var(--cr-space-12)',
              padding: 'var(--cr-space-6)',
              backgroundColor: 'var(--cr-default-100)',
              borderRadius: 'var(--cr-radius-md)',
              maxWidth: '600px',
              margin: 'var(--cr-space-12) auto 0',
            }}
          >
            <p
              style={{
                fontSize: 'var(--cr-body-sm)',
                color: 'var(--cr-default-700)',
                margin: 0,
              }}
            >
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
