// src/pages/NotFoundPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import {
  PiMusicNotes,
  PiCalendarDots,
  PiReadCvLogo,
  PiVinylRecord,
  PiShoppingBag,
  PiHeart,
} from 'react-icons/pi'
import CrButton from '../stories/CrButton'
import CrButtonGroup from '../stories/CrButtonGroup'
import chirpBirdLogo from '../assets/chirp-logos/CHIRP-bird.svg'

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="page-layout-single">
        <div style={{ textAlign: 'center', padding: 'var(--cr-space-12) 0' }}>
          <div className="error-page-number">
            4<PiVinylRecord />4
          </div>

          <h1
            style={{
              font: 'var(--cr-title-xl)',
              color: 'var(--cr-ink)',
              marginBottom: 'var(--cr-space-4)',
            }}
          >
            Page Not Found
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
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or
            never existed in the first place.
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
            <CrButton size="large" variant="solid" color="primary" onClick={() => navigate(-1)}>
              Go Back
            </CrButton>
          </div>

          <div style={{ marginTop: 'var(--cr-space-12)' }}>
            <h2
              style={{
                fontSize: 'var(--cr-title-md)',
                marginBottom: 'var(--cr-space-6)',
                color: 'var(--cr-ink)',
              }}
            >
              Try These Instead
            </h2>

            <CrButtonGroup
              options={[
                {
                  label: 'Home',
                  value: 'home',
                  rightIcon: (
                    <img src={chirpBirdLogo} alt="" style={{ width: '20px', height: '20px' }} />
                  ),
                },
                {
                  label: 'Listen',
                  value: 'listen',
                  rightIcon: <PiMusicNotes />,
                },
                {
                  label: 'Events',
                  value: 'events',
                  rightIcon: <PiCalendarDots />,
                },
                {
                  label: 'Articles',
                  value: 'articles',
                  rightIcon: <PiReadCvLogo />,
                },
                {
                  label: 'Store',
                  value: 'store',
                  rightIcon: <PiShoppingBag />,
                },
                {
                  label: 'Donate',
                  value: 'donate',
                  rightIcon: <PiHeart />,
                },
              ]}
              onSelectionChange={(value) => {
                const routes = {
                  home: '/',
                  listen: '/listen',
                  events: '/events',
                  articles: '/articles',
                  store: '/shop',
                  donate: '/donate',
                }
                navigate(routes[value])
              }}
              layout="horizontal"
              variant="navigation"
              size="medium"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage
