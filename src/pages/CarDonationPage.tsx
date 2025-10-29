// src/pages/CarDonationPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPageHeader from '../stories/CrPageHeader'
import { useAnnouncements, useArticles, useEvents, usePodcasts, usePageBySlug } from '../hooks/useData'
import { getAdvertisementProps } from '../utils/categoryHelpers'
import { getAnnouncementProps } from '../utils/typeHelpers'

const CarDonationPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: pageConfig } = usePageBySlug('car-donation')
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

  // Get the announcement specified in CMS or fallback to index 5
  const selectedAnnouncement = pageConfig?.sidebarAnnouncement || announcements?.[5]

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
        <title>{pageConfig?.title || 'Car Donation | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="car-donation-page">
        <section className="page-container">
          <CrBreadcrumb
            items={[
              {
                label: 'Other Ways to Give',
                isClickable: true,
                onClick: () => navigate('/other-ways-to-give'),
              },
              { label: 'Car Donation', isClickable: false },
            ]}
          />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          {!pageConfig && <div>Loading page...</div>}
          {pageConfig && !pageConfig.layout && <div>No layout blocks found</div>}
          {pageConfig?.layout && pageConfig.layout.length === 0 && <div>Layout is empty</div>}
          {pageConfig?.layout?.map((block: any, index: number) => {
            if (block.blockType === 'contentCard') {
              return (
                <CrCard
                  key={block.id || index}
                  variant="article"
                  type="page"
                  imagePosition={block.imagePosition || 'none'}
                  articleImageAspectRatio="16:9"
                  backgroundImage={block.backgroundImage || block.backgroundImageUrl}
                  bannerBackgroundColor="none"
                  preheader={block.preheader || ''}
                  title={block.title}
                  titleTag={block.titleTag || 'h2'}
                  titleSize={index === 0 ? 'xl' : undefined}
                  textLayout="stacked"
                  bannerHeight={index === 0 ? 'tall' : 'narrow'}
                  content={block.content}
                  showTicketButton={false}
                  showShareButton={false}
                />
              )
            }
            return null
          })}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {selectedAnnouncement && getAnnouncementProps(selectedAnnouncement as any) && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              {...getAnnouncementProps(selectedAnnouncement as any)}
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

export default CarDonationPage
