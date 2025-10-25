// src/pages/BecomeVolunteerPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrButton from '../stories/CrButton'
import CrPageHeader from '../stories/CrPageHeader'
import { PiArrowRight, PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import volunteerData from '../data/volunteer.json'
import { useAnnouncements, useArticles, useEvents, usePodcasts, usePageBySlug } from '../hooks/useData'
import { getAdvertisementProps } from '../utils/categoryHelpers'

const BecomeVolunteerPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: pageConfig } = usePageBySlug('volunteer')
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handleEventClick = (event: any) => {
    navigate(`/events/${event.slug}`)
  }

  const handlePodcastClick = (podcast: any) => {
    navigate(`/podcasts/${podcast.slug}`)
  }

  // Get the announcement specified in CMS or fallback to index 4
  const selectedAnnouncement = pageConfig?.sidebarAnnouncement || announcements?.[4]

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
        <title>{pageConfig?.title || 'Become a Volunteer | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="become-volunteer-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="JOIN OUR TEAM"
            title="Become a CHIRP Volunteer"
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            bannerBackgroundColor="none"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={volunteerData.introText.join('\n\n')}
            backgroundImage={volunteerData.heroImage}
          />

          {/* Call to Action */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title={volunteerData.callToAction.title}
            bannerHeight="narrow"
            textLayout="inline"
            bannerBackgroundColor="none"
            showTicketButton={true}
            showShareButton={false}
            bannerButtonText={volunteerData.callToAction.buttonText}
            bannerButtonIcon={<PiArrowRight />}
            onBannerTicketClick={() => window.open(volunteerData.callToAction.buttonUrl, '_blank')}
            contentSummary={`${volunteerData.callToAction.description}\n\n${volunteerData.callToAction.note}`}
            backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
          />

          {/* Departments Grid */}
          <div className="grid-masonry">
            {volunteerData.departments.map((dept) => (
              <CrCard
                key={dept.id}
                variant="article"
                type="page"
                imagePosition="none"
                preheader=""
                title={dept.title}
                bannerHeight="narrow"
                textLayout="inline"
                bannerBackgroundColor="none"
                showTicketButton={false}
                showShareButton={false}
                content={dept.content}
                contentSummary={dept.contentSummary}
                backgroundImage={dept.backgroundImage}
              />
            ))}
          </div>

          {/* Benefits Section */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title={volunteerData.benefits.title}
            bannerHeight="narrow"
            textLayout="inline"
            bannerBackgroundColor="none"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={`${volunteerData.benefits.description}\n\n${volunteerData.benefits.items.map((item) => `• ${item}`).join('\n')}`}
            backgroundImage="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop"
          />

          {/* Commitment Section */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader=""
            title={volunteerData.commitment.title}
            bannerHeight="narrow"
            textLayout="inline"
            bannerBackgroundColor="none"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={volunteerData.commitment.content}
            backgroundImage={volunteerData.commitment.image}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {selectedAnnouncement && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={selectedAnnouncement.backgroundColor}
              headlineText={selectedAnnouncement.title}
              bodyText={selectedAnnouncement.message}
              showLink={!!selectedAnnouncement.ctaText}
              linkText={selectedAnnouncement.ctaText}
              linkUrl={selectedAnnouncement.ctaUrl}
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
              {sidebarContent.slice(0, 1).map((item: any) => {
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

export default BecomeVolunteerPage
