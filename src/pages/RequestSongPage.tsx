// src/pages/RequestSongPage.tsx
import React, { useState, useEffect } from 'react'
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
import CrModal from '../stories/CrModal'
import { useAuth } from '../hooks/useAuth'
import {
  usePageBySlug,
  useAnnouncements,
  useArticles,
  useEvents,
  usePodcasts,
  useCurrentShow,
} from '../hooks/useData'
import { getAdvertisementProps } from '../utils/categoryHelpers'
import requestSongData from '../data/requestSong.json'

const COOLDOWN_STORAGE_KEY = 'chirp-song-request-last-submitted'

const RequestSongPage: React.FC = () => {
  const navigate = useNavigate()
  const { isLoggedIn, login } = useAuth()
  const { data: pageConfig } = usePageBySlug('request-song')
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()
  const { data: currentShow } = useCurrentShow()
  const [cooldownMinutesRemaining, setCooldownMinutesRemaining] = useState<number>(0)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [submittedRequest, setSubmittedRequest] = useState<{
    artist: string
    songTitle: string
    message?: string
  } | null>(null)

  // Get cooldown settings from page config (default to 5 minutes if not set)
  const cooldownMinutes = pageConfig?.songRequestCooldownMinutes ?? 5
  const cooldownMessage =
    pageConfig?.songRequestCooldownMessage || 'You can submit another request in {minutes} minutes.'

  // Check cooldown status on mount and set up timer
  useEffect(() => {
    const checkCooldown = () => {
      const lastSubmitted = localStorage.getItem(COOLDOWN_STORAGE_KEY)
      if (!lastSubmitted || cooldownMinutes === 0) {
        setCooldownMinutesRemaining(0)
        return
      }

      const lastSubmittedTime = parseInt(lastSubmitted, 10)
      const now = Date.now()
      const elapsedMinutes = (now - lastSubmittedTime) / 1000 / 60
      const remainingMinutes = Math.ceil(cooldownMinutes - elapsedMinutes)

      if (remainingMinutes > 0) {
        setCooldownMinutesRemaining(remainingMinutes)
      } else {
        setCooldownMinutesRemaining(0)
      }
    }

    checkCooldown()

    // Check every minute to update countdown
    const interval = setInterval(checkCooldown, 60000)
    return () => clearInterval(interval)
  }, [cooldownMinutes])

  const handleSubmit = (data: any) => {
    console.log('Song request submitted:', data)

    // Store submission timestamp
    localStorage.setItem(COOLDOWN_STORAGE_KEY, Date.now().toString())
    setCooldownMinutesRemaining(cooldownMinutes)

    // Store request data and show success modal
    setSubmittedRequest({ artist: data.artist, songTitle: data.songTitle, message: data.message })
    setShowSuccessModal(true)

    // TODO: Send request to API
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
  const selectedAnnouncement =
    typeof pageConfig?.sidebarAnnouncement === 'object'
      ? pageConfig.sidebarAnnouncement
      : typeof pageConfig?.sidebarAnnouncement === 'string' ||
          typeof pageConfig?.sidebarAnnouncement === 'number'
        ? announcements?.find((a) => String(a.id) === String(pageConfig.sidebarAnnouncement))
        : announcements?.[2]

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
              backgroundImage={
                (pageConfig?.layout?.[0]?.backgroundImageUrl as string) || requestSongData.heroImage
              }
              bannerBackgroundColor="textured"
              title={(pageConfig?.layout?.[0]?.title as string) || 'Request a Song'}
              titleTag="h1"
              titleSize="xl"
              textLayout="stacked"
              bannerHeight="tall"
              content={pageConfig?.layout?.[0]?.content}
              contentSummary={
                !pageConfig?.layout?.[0]?.content
                  ? requestSongData.introText.join('\n\n')
                  : undefined
              }
              showTicketButton={false}
              showShareButton={false}
            />

            {/* Request Form or Login Gate */}
            {isLoggedIn ? (
              <>
                <div className="mt-4">
                  <h2 className="section-title">Submit Your Request</h2>
                  {currentShow?.djName && (
                    <CrCurrentDj
                      djName={currentShow.djName}
                      showName={currentShow.showName}
                      isOnAir={true}
                      statusText="On-Air"
                    />
                  )}
                </div>
                <CrSongRequestForm
                  title=""
                  onSubmit={handleSubmit}
                  onCancel={handleCancel}
                  cooldownMinutesRemaining={cooldownMinutesRemaining}
                  cooldownMessage={cooldownMessage.replace(
                    '{minutes}',
                    cooldownMinutesRemaining.toString()
                  )}
                />
              </>
            ) : (
              <div className="info-box mt-4">
                <h2 className="section-title">Login to Submit a Request</h2>
                <p className="section-text">
                  To submit a song request through our online form, please log in to your CHIRP
                  listener account. Don't have an account? You can still request songs via email,
                  phone, or social media using the methods below!
                </p>

                <div className="button-group">
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
            <div className="page-layout-2col mt-8">
              {requestSongData.requestMethods.map((method) => (
                <CrCard
                  key={method.id}
                  variant="article"
                  type="page"
                  imagePosition="none"
                  title={method.title}
                  bannerHeight="tall"
                  textLayout="stacked"
                  bannerBackgroundColor="textured"
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
                imagePosition={(pageConfig.layout[5].imagePosition as string) || 'none'}
                backgroundImage={pageConfig.layout[5].backgroundImageUrl as string}
                bannerBackgroundColor="textured"
                title={pageConfig.layout[5].title as string}
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
                contentSummary={`${requestSongData.tips.description}\n\n${requestSongData.tips.items.map((item) => `• ${item}`).join('\n')}`}
                showTicketButton={false}
                showShareButton={false}
              />
            )}

            {/* Note Section */}
            {pageConfig?.layout?.[6] ? (
              <CrCard
                variant="article"
                type="page"
                imagePosition={(pageConfig.layout[6].imagePosition as string) || 'right'}
                backgroundImage={pageConfig.layout[6].backgroundImageUrl as string}
                bannerBackgroundColor="textured"
                title={pageConfig.layout[6].title as string}
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
                bannerBackgroundColor="textured"
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
                textureBackground={
                  'backgroundColor' in selectedAnnouncement
                    ? ((selectedAnnouncement as Record<string, unknown>).backgroundColor as string)
                    : undefined
                }
                headlineText={
                  'title' in selectedAnnouncement
                    ? ((selectedAnnouncement as Record<string, unknown>).title as string)
                    : selectedAnnouncement.headlineText
                }
                bodyText={
                  'message' in selectedAnnouncement
                    ? ((selectedAnnouncement as Record<string, unknown>).message as string)
                    : typeof selectedAnnouncement.bodyText === 'string'
                      ? selectedAnnouncement.bodyText
                      : undefined
                }
                showLink={
                  'ctaText' in selectedAnnouncement &&
                  !!(selectedAnnouncement as Record<string, unknown>).ctaText
                }
                linkText={
                  'ctaText' in selectedAnnouncement
                    ? ((selectedAnnouncement as Record<string, unknown>).ctaText as string)
                    : undefined
                }
                linkUrl={
                  'ctaUrl' in selectedAnnouncement
                    ? ((selectedAnnouncement as Record<string, unknown>).ctaUrl as string)
                    : undefined
                }
                buttonCount="none"
              />
            )}

            {/* Dynamic Content Section */}
            {sidebarContentType !== 'none' && sidebarContent.length > 0 && (
              <div className="mt-6">
                <CrPageHeader
                  title={sidebarTitle}
                  titleTag="h3"
                  titleSize="sm"
                  showEyebrow={false}
                  showActionButton={true}
                  actionButtonText={sidebarActionText}
                  actionButtonIcon={
                    sidebarContentType === 'events' ? <PiCalendarDots /> : <PiReadCvLogo />
                  }
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
                      bannerBackgroundColor="textured"
                      backgroundImage={item.featuredImage || item.featuredImageUrl || item.coverArt}
                      preheader={
                        typeof item.category === 'string' ? item.category : item.category?.name
                      }
                      title={item.title}
                      contentSummary={item.excerpt}
                      dateTime={
                        isEvent
                          ? new Date(item.date).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                            })
                          : undefined
                      }
                      venue={isEvent ? item.venue?.name : undefined}
                      authorBy={isArticle ? `by ${item.author}` : undefined}
                      eventDate={
                        isArticle
                          ? new Date(item.publishedDate).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })
                          : isPodcast && item.createdAt
                            ? new Date(item.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : undefined
                      }
                      showTicketButton={false}
                      onClick={() => handleSidebarClick?.(item)}
                    />
                  )
                })}
              </div>
            )}

            {adProps && (
              <div className="mt-6">
                <CrAdSpace {...adProps} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <CrModal
        isOpen={showSuccessModal}
        title="Request Submitted!"
        size="small"
        onClose={() => setShowSuccessModal(false)}
        scrimOnClick={() => setShowSuccessModal(false)}
      >
        <div className="cr-modal__success-content">
          <p className="cr-modal__text cr-modal__text--large">Thank you for your song request!</p>
          {submittedRequest && (
            <div className="cr-modal__request-details">
              <p>
                <strong>Song:</strong> {submittedRequest.songTitle}
              </p>
              <p>
                <strong>Artist:</strong> {submittedRequest.artist}
              </p>
              {submittedRequest.message && (
                <p>
                  <strong>Message:</strong> {submittedRequest.message}
                </p>
              )}
            </div>
          )}
          <p className="cr-modal__text cr-modal__text--light">
            The DJ will consider your request for their show.
          </p>
        </div>
      </CrModal>
    </>
  )
}

export default RequestSongPage
