// src/pages/RequestSongPage.tsx
import React from 'react'
import CrCard from '../stories/CrCard'
import CrPageHeader from '../stories/CrPageHeader'
import CrCurrentDj from '../stories/CrCurrentDj'
import CrSongRequestForm from '../stories/CrSongRequestForm'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrButton from '../stories/CrButton'
import { useAuth } from '../hooks/useAuth'
import requestSongData from '../data/requestSong.json'
import { useAnnouncements, useCurrentShow } from '../hooks/useData'

const RequestSongPage: React.FC = () => {
  const { isLoggedIn, login } = useAuth()
  const { data: announcements } = useAnnouncements()
  const { data: currentShow } = useCurrentShow()

  const handleSubmit = (data: any) => {
    console.log('Song request submitted:', data)
    // TODO: Send request to API
    alert(`Request submitted!\n\nSong: ${data.songTitle}\nArtist: ${data.artistName}\n\nThank you for your request!`)
  }

  const handleCancel = () => {
    console.log('Song request cancelled')
    // TODO: Handle cancel action (e.g., navigate back)
  }

  const handleLogin = () => {
    // For demo purposes, simulate login with a demo account
    login('demo@chirpradio.org')
  }

  const handleSignUp = () => {
    console.log('Sign up clicked from make request')
    // TODO: Open signup modal or navigate to signup
  }

  return (
    <div className="request-song-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="MAKE A REQUEST"
            title="Request a Song"
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={requestSongData.introText.join('\n\n')}
            backgroundImage={requestSongData.heroImage}
          />

          {/* Request Form or Login Gate */}
          {isLoggedIn ? (
            <>
              <div style={{ marginTop: 'var(--cr-space-4)' }}>
                <h2 style={{
                  font: 'var(--cr-title-lg)',
                  marginBottom: 'var(--cr-space-4)',
                  color: 'var(--cr-ink)'
                }}>
                  Submit Your Request
                </h2>
                <CrCurrentDj
                  djName={currentShow?.djName || 'Current DJ'}
                  showName={currentShow?.showName || 'Current Show'}
                  isOnAir={true}
                  statusText="On-Air"
                />
              </div>
              <CrSongRequestForm
                title=""
                onSubmit={handleSubmit}
                onCancel={handleCancel}
              />
            </>
          ) : (
            <div style={{
              padding: 'var(--cr-space-6)',
              backgroundColor: 'var(--cr-paper)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
              marginTop: 'var(--cr-space-4)'
            }}>
              <h2 style={{
                font: 'var(--cr-title-lg)',
                marginBottom: 'var(--cr-space-4)',
                color: 'var(--cr-ink)'
              }}>
                Login to Submit a Request
              </h2>
              <p style={{
                marginBottom: 'var(--cr-space-4)',
                font: 'var(--cr-body-lg)',
                color: 'var(--cr-ink)'
              }}>
                To submit a song request through our online form, please log in to your CHIRP listener account. Don't have an account? You can still request songs via email, phone, or social media using the methods below!
              </p>

              <div style={{ display: 'flex', gap: 'var(--cr-space-3)' }}>
                <CrButton
                  variant="solid"
                  color="secondary"
                  size="medium"
                  onClick={handleSignUp}
                >
                  sign up
                </CrButton>
                <CrButton
                  variant="outline"
                  color="default"
                  size="medium"
                  onClick={handleLogin}
                >
                  log in
                </CrButton>
              </div>
            </div>
          )}

          {/* Request Methods */}
          <div className="grid-2col-equal">
            {requestSongData.requestMethods.map((method) => (
              <CrCard
                key={method.id}
                variant="article"
                type="page"
                imagePosition="none"
                preheader=""
                title={method.title}
                bannerHeight="narrow"
                textLayout="inline"
                showTicketButton={false}
                showShareButton={false}
                content={method.content}
                contentSummary={method.contentSummary}
                backgroundImage={method.backgroundImage}
              />
            ))}
          </div>

          {/* Tips Section */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title={requestSongData.tips.title}
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={`${requestSongData.tips.description}\n\n${requestSongData.tips.items.map(item => `• ${item}`).join('\n')}`}
            backgroundImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop"
          />

          {/* Note Section */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader=""
            title={requestSongData.note.title}
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={requestSongData.note.content}
            backgroundImage={requestSongData.note.image}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[2] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[2].backgroundColor}
              headlineText={announcements[2].title}
              bodyText={announcements[2].message}
              showLink={!!announcements[2].ctaText}
              linkText={announcements[2].ctaText}
              linkUrl={announcements[2].ctaUrl}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default RequestSongPage
