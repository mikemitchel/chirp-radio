// src/pages/RequestSongPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import CrCard from '../stories/CrCard'
import CrPageHeader from '../stories/CrPageHeader'
import CrCurrentDj from '../stories/CrCurrentDj'
import CrSongRequestForm from '../stories/CrSongRequestForm'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrButton from '../stories/CrButton'
import { useAuth } from '../hooks/useAuth'
import { usePageBySlug, useAnnouncements, useArticles, useEvents, usePodcasts, useCurrentShow } from '../hooks/useData'
import { getAdvertisementProps } from '../utils/categoryHelpers'
import requestSongData from '../data/requestSong.json'

const RequestSongPage: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn, login } = useAuth()
  const { data: pageConfig } = usePageBySlug('request-song')
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()
  const { data: currentShow } = useCurrentShow()

  const handleSubmit = (data: any) => {
    console.log('Song request submitted:', data)
    // TODO: Send request to API
    alert(
      `Request submitted!\n\nSong: ${data.songTitle}\nArtist: ${data.artistName}\n\nThank you for your request!`
    )
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

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handleEventClick = (event: any) => {
    navigate(`/events/${event.slug}`)
  }

  const handlePodcastClick = (podcast: any) => {
    navigate(`/podcasts/${podcast.slug}`)
  }

  // Get the announcement specified in CMS or fallback to index 2
  const selectedAnnouncement = pageConfig?.sidebarAnnouncement || announcements?.[2]

  // Get the content type specified in CMS or fallback to 'events'
  const sidebarContentType = pageConfig?.sidebarContentType || 'events'

  // Get the advertisement props from CMS
  const adProps = getAdvertisementProps(pageConfig?.sidebarAdvertisement)

  // Determine which content to display in sidebar
  let sidebarContent: any[] = []
  let sidebarTitle = ''
  let sidebarActionText = ''
  let sidebarActionPath = ''
  let handleSidebarClick: ((item: any) => void) | undefined

  if (sidebarContentType === 'articles') {
    sidebarContent = articles?.slice(0, 3) || []
    sidebarTitle = 'Recent Articles'
    sidebarActionText = 'All Articles'
    sidebarActionPath = '/articles'
    handleSidebarClick = handleArticleClick
  } else if (sidebarContentType === 'podcasts') {
    sidebarContent = podcasts?.slice(0, 3) || []
    sidebarTitle = 'Recent Podcasts'
    sidebarActionText = 'All Podcasts'
    sidebarActionPath = '/podcasts'
    handleSidebarClick = handlePodcastClick
  } else if (sidebarContentType === 'events') {
    sidebarContent = events?.slice(0, 3) || []
    sidebarTitle = 'Upcoming Events'
    sidebarActionText = 'All Events'
    sidebarActionPath = '/events'
    handleSidebarClick = handleEventClick
  }

  return (
    <>
      <Helmet>
        <title>{pageConfig?.title || 'Request a Song | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="request-song-page">
        <div className="page-layout-main-sidebar">
          <div className="page-layout-main-sidebar__main">
            {/* Hero/Intro Section - from CMS or fallback to JSON */}
            <CrCard
              variant="article"
              type="page"
              imagePosition="none"
              backgroundImage={pageConfig?.layout?.[0]?.backgroundImageUrl as any || requestSongData.heroImage}
              bannerBackgroundColor="none"
              title={pageConfig?.layout?.[0]?.title as any || 'Request a Song'}
              titleTag="h1"
              titleSize="xl"
              textLayout="stacked"
              bannerHeight="tall"
              content={pageConfig?.layout?.[0]?.content}
              contentSummary={!pageConfig?.layout?.[0]?.content ? requestSongData.introText.join('\n\n') : undefined}
              showTicketButton={false}
              showShareButton={false}
            />

            {/* Request Form or Login Gate */}
            {isLoggedIn ? (
              <>
                <div style={{ marginTop: 'var(--cr-space-4)' }}>
                  <h2
                    style={{
                      font: 'var(--cr-title-lg)',
                      marginBottom: 'var(--cr-space-4)',
                      color: 'var(--cr-ink)',
                    }}
                  >
                    Submit Your Request
                  </h2>
                  <CrCurrentDj
                    djName={currentShow?.djName || 'Current DJ'}
                    showName={currentShow?.showName || 'Current Show'}
                    isOnAir={true}
                    statusText="On-Air"
                  />
                </div>
                <CrSongRequestForm title="" onSubmit={handleSubmit} onCancel={handleCancel} />
              </>
            ) : (
              <div
                style={{
                  padding: 'var(--cr-space-6)',
                  backgroundColor: 'var(--cr-paper)',
                  border: '1px solid var(--cr-default-300)',
                  borderRadius: 'var(--cr-space-2)',
                  marginTop: 'var(--cr-space-4)',
                }}
              >
                <h2
                  style={{
                    font: 'var(--cr-title-lg)',
                    marginBottom: 'var(--cr-space-4)',
                    color: 'var(--cr-ink)',
                  }}
                >
                  Login to Submit a Request
                </h2>
                <p
                  style={{
                    marginBottom: 'var(--cr-space-4)',
                    font: 'var(--cr-body-lg)',
                    color: 'var(--cr-ink)',
                  }}
                >
                  To submit a song request through our online form, please log in to your CHIRP
                  listener account. Don't have an account? You can still request songs via email,
                  phone, or social media using the methods below!
                </p>

                <div style={{ display: 'flex', gap: 'var(--cr-space-3)' }}>
                  <CrButton variant="outline" color="default" size="medium" onClick={handleLogin}>
                    log in
                  </CrButton>
                  <CrButton variant="solid" color="secondary" size="medium" onClick={handleSignUp}>
                    sign up
                  </CrButton>
                </div>
              </div>
            )}

            {/* 2-Column Grid: Request Methods */}
            <div className="page-layout-2col" style={{ marginTop: 'var(--cr-space-8)' }}>
              {requestSongData.requestMethods.map((method) => (
                <CrCard
                  key={method.id}
                  variant="article"
                  type="page"
                  imagePosition="none"
                  title={method.title}
                  bannerHeight="tall"
                  textLayout="stacked"
                  bannerBackgroundColor="none"
                  showTicketButton={false}
                  showShareButton={false}
                  content={method.content}
                  contentSummary={method.contentSummary}
                  backgroundImage={method.backgroundImage}
                />
              ))}
            </div>

            {/* Tips Section */}
            {pageConfig?.layout?.[5] ? (
              <CrCard
                variant="article"
                type="page"
                imagePosition={pageConfig.layout[5].imagePosition as any || 'none'}
                backgroundImage={pageConfig.layout[5].backgroundImageUrl as any}
                bannerBackgroundColor="none"
                title={pageConfig.layout[5].title as any}
                titleTag="h2"
                textLayout="stacked"
                bannerHeight="tall"
                content={pageConfig.layout[5].content}
                showTicketButton={false}
                showShareButton={false}
              />
            ) : (
              <CrCard
                variant="article"
                type="page"
                imagePosition="none"
                title={requestSongData.tips.title}
                titleTag="h2"
                textLayout="stacked"
                bannerHeight="tall"
                contentSummary={`${requestSongData.tips.description}\n\n${requestSongData.tips.items.map(item => `• ${item}`).join('\n')}`}
                showTicketButton={false}
                showShareButton={false}
              />
            )}

            {/* Note Section */}
            {pageConfig?.layout?.[6] ? (
              <CrCard
                variant="article"
                type="page"
                imagePosition={pageConfig.layout[6].imagePosition as any || 'right'}
                backgroundImage={pageConfig.layout[6].backgroundImageUrl as any}
                bannerBackgroundColor="none"
                title={pageConfig.layout[6].title as any}
                titleTag="h2"
                textLayout="stacked"
                bannerHeight="tall"
                content={pageConfig.layout[6].content}
                showTicketButton={false}
                showShareButton={false}
              />
            ) : (
              <CrCard
                variant="article"
                type="page"
                imagePosition="right"
                backgroundImage={requestSongData.note.image}
                bannerBackgroundColor="none"
                title={requestSongData.note.title}
                titleTag="h2"
                textLayout="stacked"
                bannerHeight="tall"
                contentSummary={requestSongData.note.content}
                showTicketButton={false}
                showShareButton={false}
              />
            )}
          </div>

          <div className="page-layout-main-sidebar__sidebar">
            {selectedAnnouncement && (
              <CrAnnouncement
                variant="motivation"
                widthVariant="third"
                textureBackground={(selectedAnnouncement as any).backgroundColor}
                headlineText={(selectedAnnouncement as any).title}
                bodyText={(selectedAnnouncement as any).message}
                showLink={!!(selectedAnnouncement as any).ctaText}
                linkText={(selectedAnnouncement as any).ctaText}
                linkUrl={(selectedAnnouncement as any).ctaUrl}
                buttonCount="none"
              />
            )}

            {/* Dynamic Content Section */}
            {sidebarContentType !== 'none' && sidebarContent.length > 0 && (
              <div style={{ marginTop: 'var(--cr-space-6)' }}>
                <CrPageHeader
                  title={sidebarTitle}
                  titleTag="h3"
                  titleSize="sm"
                  showEyebrow={false}
                  showActionButton={true}
                  actionButtonText={sidebarActionText}
                  actionButtonIcon={sidebarContentType === 'events' ? <PiCalendarDots /> : <PiReadCvLogo />}
                  actionButtonSize="small"
                  onActionClick={() => navigate(sidebarActionPath)}
                />
                {sidebarContent.slice(0, 3).map((item: any) => {
                  const isEvent = sidebarContentType === 'events'
                  const isArticle = sidebarContentType === 'articles'
                  const isPodcast = sidebarContentType === 'podcasts'

                  return (
                    <CrCard
                      key={item.id}
                      variant="small"
                      type={isArticle ? 'article' : isPodcast ? 'podcast' : undefined}
                      bannerHeight="short"
                      textLayout="stacked"
                      bannerBackgroundColor="none"
                      backgroundImage={item.featuredImage || item.featuredImageUrl || item.coverArt}
                      preheader={typeof item.category === 'string' ? item.category : item.category?.name}
                      title={item.title}
                      contentSummary={item.excerpt}
                      dateTime={isEvent ? new Date(item.date).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      }) : undefined}
                      venue={isEvent ? item.venue?.name : undefined}
                      authorBy={isArticle ? `by ${item.author}` : undefined}
                      eventDate={isArticle ? new Date(item.publishedDate).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }) : isPodcast && item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      }) : undefined}
                      showTicketButton={false}
                      onClick={() => handleSidebarClick?.(item)}
                    />
                  )
                })}
              </div>
            )}

            {adProps && (
              <div style={{ marginTop: 'var(--cr-space-6)' }}>
                <CrAdSpace {...adProps} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default RequestSongPage
