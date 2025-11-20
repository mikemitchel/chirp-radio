// src/pages/ServerErrorPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { PiArrowClockwise, PiVinylRecord } from 'react-icons/pi'
import CrButton from '../stories/CrButton'
import chirpBirdLogo from '../assets/chirp-logos/CHIRP-bird.svg'

const ServerErrorPage: React.FC = () => {
  const navigate = useNavigate()

  const handleRefresh = () => {
    window.location.reload()
  }

  return (
    <div className="server-error-page">
      <div className="page-layout-single">
        <div className="error-page-container">
          <div className="error-page-number">
            5<PiVinylRecord />
            <PiVinylRecord />
          </div>

          <h1 className="error-page-title">Internal Server Error</h1>

          <p className="error-page-description">
            Oops! Something went wrong on our end. We're working to fix the issue. Please try
            refreshing the page or come back later.
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
            <CrButton
              size="large"
              variant="solid"
              color="primary"
              leftIcon={<PiArrowClockwise />}
              onClick={handleRefresh}
            >
              Refresh Page
            </CrButton>
          </div>

          <div className="error-page-support-box">
            <p>
              If this problem persists, please contact us at{' '}
              <a href="mailto:support@chirpradio.org" className="email-link">
                support@chirpradio.org
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServerErrorPage
