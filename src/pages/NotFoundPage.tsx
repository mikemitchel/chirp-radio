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
        <div className="error-page-container">
          <div className="error-page-number">
            4<PiVinylRecord />4
          </div>

          <h1 className="error-page-title">Page Not Found</h1>

          <p className="error-page-description">
            Sorry, we couldn't find the page you're looking for. It may have been moved, deleted, or
            never existed in the first place.
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
            <CrButton size="large" variant="solid" color="primary" onClick={() => navigate(-1)}>
              Go Back
            </CrButton>
          </div>

          <div className="mt-12">
            <h2 className="error-page-subtitle">Try These Instead</h2>

            <CrButtonGroup
              options={[
                {
                  label: 'Home',
                  value: 'home',
                  rightIcon: <img src={chirpBirdLogo} alt="" className="icon-sm" />,
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
                const routes: Record<string, string> = {
                  home: '/',
                  listen: '/listen',
                  events: '/events',
                  articles: '/articles',
                  store: '/shop',
                  donate: '/donate',
                }
                const route = routes[value] || '/'
                navigate(route)
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
