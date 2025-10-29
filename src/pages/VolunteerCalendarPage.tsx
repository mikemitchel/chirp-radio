// src/pages/VolunteerCalendarPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrCalendarEvent from '../stories/CrCalendarEvent'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import { useEvents, useVolunteerCalendar, useAnnouncements, useArticles, usePodcasts, usePageBySlug } from '../hooks/useData'
import { getAdvertisementProps } from '../utils/categoryHelpers'

const VolunteerCalendarPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: pageConfig } = usePageBySlug('volunteer-calendar')
  const { data: cmsVolunteerCalendar } = useVolunteerCalendar()
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()

  // Use CMS events only (no static fallback)
  const displayEvents = cmsVolunteerCalendar || []

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event)
  }

  const handleLocationClick = (event: any) => {
    console.log('Location clicked:', event)
  }

  const handleAddToCalendarClick = (event: any) => {
    console.log('Add to calendar clicked:', event)
  }

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handleChirpEventClick = (event: any) => {
    navigate(`/events/${event.slug}`)
  }

  const handlePodcastClick = (podcast: any) => {
    navigate(`/podcasts/${podcast.slug}`)
  }

  // Get the announcement specified in CMS or fallback to index 0
  const selectedAnnouncement = pageConfig?.sidebarAnnouncement || announcements?.[0]

  // Get the content type specified in CMS or fallback to 'events'
  const sidebarContentType = pageConfig?.sidebarContentType || 'events'

  // Get the advertisement props from CMS
  const adProps = getAdvertisementProps(pageConfig?.sidebarAdvertisement)

  // Determine which content to display in sidebar
  let sidebarContent: any[] = []
  let sidebarTitle = ''
  let handleSidebarClick: ((item: any) => void) | undefined

  if (sidebarContentType === 'articles') {
    sidebarContent = articles?.slice(0, 3) || []
    sidebarTitle = 'Recent Articles'
    handleSidebarClick = handleArticleClick
  } else if (sidebarContentType === 'podcasts') {
    sidebarContent = podcasts?.slice(0, 3) || []
    sidebarTitle = 'Recent Podcasts'
    handleSidebarClick = handlePodcastClick
  } else if (sidebarContentType === 'events') {
    sidebarContent = events?.slice(0, 3) || []
    sidebarTitle = 'Upcoming Events'
    handleSidebarClick = handleChirpEventClick
  }

  return (
    <>
      <Helmet>
        <title>{pageConfig?.title || 'Volunteer Calendar | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="volunteer-calendar-page">
        <div className="page-layout-main-sidebar volunteer-calendar-page__layout">
          <div className="page-layout-main-sidebar__main">
            <CrPageHeader
              eyebrowText="FOR VOLUNTEERS"
              title="Volunteer Calendar"
              titleTag="h1"
              titleSize="xl"
              showEyebrow={true}
              showActionButton={false}
            />
            {displayEvents.length > 0 ? (
              <CrCalendarEvent
                events={displayEvents}
                onEventClick={handleEventClick}
                onLocationClick={handleLocationClick}
                onAddToCalendarClick={handleAddToCalendarClick}
              />
            ) : (
              <div style={{ padding: 'var(--cr-space-6)', textAlign: 'center' }}>
                <p style={{ fontSize: 'var(--cr-font-size-lg)', color: 'var(--cr-color-text-secondary)' }}>
                  No upcoming volunteer events at this time. Check back soon!
                </p>
              </div>
            )}
          </div>

          <div className="page-layout-main-sidebar__sidebar">
            {selectedAnnouncement && (
              <CrAnnouncement
                title={selectedAnnouncement.title}
                description={selectedAnnouncement.description}
                actionText={selectedAnnouncement.actionText}
                actionUrl={selectedAnnouncement.actionUrl}
                icon={selectedAnnouncement.icon}
              />
            )}

            <CrPageHeader
              title={sidebarTitle}
              titleSize="large"
              titleTag="h2"
              showEyebrow={false}
              showActionButton={false}
            />
            {sidebarContent.map((item) => (
              <CrCard
                key={item.id}
                variant="small"
                bannerHeight="tall"
                textLayout="stacked"
                textureBackground="cr-bg-natural-d100"
                backgroundImage={item.featuredImage || item.coverArt}
                preheader={
                  typeof item.category === 'string'
                    ? item.category
                    : item.category?.name || item.genre
                }
                title={item.title}
                dateTime={
                  item.date
                    ? new Date(item.date).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : item.publishDate
                }
                venue={item.venue?.name}
                contentSummary={item.excerpt || item.description}
                onClick={() => handleSidebarClick?.(item)}
              />
            ))}

            {adProps && (
              <CrAdSpace
                size={adProps.size}
                format={adProps.format}
                content={adProps.content}
                externalUrl={adProps.externalUrl}
                htmlCode={adProps.htmlCode}
                embedCode={adProps.embedCode}
                videoUrl={adProps.videoUrl}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default VolunteerCalendarPage
