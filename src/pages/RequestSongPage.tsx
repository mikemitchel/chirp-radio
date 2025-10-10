// src/pages/RequestSongPage.tsx
import React from 'react'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrRequestForm from '../stories/CrRequestForm'
import type { RequestFormData } from '../stories/CrRequestForm'
import CrButton from '../stories/CrButton'
import { PiSignIn } from 'react-icons/pi'
import requestSongData from '../data/requestSong.json'
import { useAnnouncements, useCurrentUser } from '../hooks/useData'

const RequestSongPage: React.FC = () => {
  const { data: announcements } = useAnnouncements()
  const { data: currentUser } = useCurrentUser()

  const handleRequestSubmit = (data: RequestFormData) => {
    console.log('Song request submitted:', data)
    // In a real app, this would send the request to the backend
    alert(`Request submitted!\n\nSong: ${data.songTitle}\nArtist: ${data.artistName}\n\nThank you for your request!`)
  }

  const handleLoginClick = () => {
    // In a real app, this would open a login modal or redirect to login page
    console.log('Login clicked')
    alert('Login functionality would be implemented here')
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
          {currentUser ? (
            <div style={{ marginTop: 'var(--cr-space-4)' }}>
              <h2 style={{
                font: 'var(--cr-title-lg)',
                marginBottom: 'var(--cr-space-4)',
                color: 'var(--cr-ink)'
              }}>
                Submit Your Request
              </h2>
              <CrRequestForm onSubmit={handleRequestSubmit} />
            </div>
          ) : (
            <CrCard
              variant="article"
              type="page"
              imagePosition="none"
              preheader=""
              title="Login to Submit a Request"
              bannerHeight="narrow"
              textLayout="inline"
              showTicketButton={true}
              showShareButton={false}
              bannerButtonText="Login to Your Account"
              bannerButtonIcon={<PiSignIn />}
              onBannerTicketClick={handleLoginClick}
              contentSummary="To submit a song request through our online form, please log in to your CHIRP listener account. Don't have an account? You can still request songs via email, phone, or social media using the methods below!"
              backgroundImage="https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=800&h=600&fit=crop"
            />
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
