// src/pages/ContactPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPageHeader from '../stories/CrPageHeader'
import contactData from '../data/contact.json'
import { useAnnouncements, useArticles, useEvents, usePodcasts, usePageBySlug } from '../hooks/useData'
import { getAdvertisementProps } from '../utils/categoryHelpers'
import { getAnnouncementProps } from '../utils/typeHelpers'

const ContactPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: pageConfig } = usePageBySlug('contact')
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()

  // Use CMS content if available, fallback to static data
  const contentBlocks = pageConfig?.layout || []

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handleEventClick = (event: any) => {
    navigate(`/events/${event.slug}`)
  }

  const handlePodcastClick = (podcast: any) => {
    navigate(`/podcasts/${podcast.slug}`)
  }

  // Get the announcement specified in CMS or fallback to index 1
  const selectedAnnouncement = pageConfig?.sidebarAnnouncement || announcements?.[1]

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
        <title>{pageConfig?.title || 'Contact | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="contact-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          {/* Render CMS content if available, otherwise show static content */}
          {contentBlocks.length > 0 ? (
            <>
              {/* First block (header) */}
              {contentBlocks[0] && (
                <CrCard
                  variant="article"
                  type="page"
                  imagePosition={(contentBlocks[0].imagePosition as string) || 'right'}
                  articleImageAspectRatio="16:9"
                  preheader={contentBlocks[0].preheader as string | undefined}
                  title={contentBlocks[0].title as string}
                  titleTag={contentBlocks[0].titleTag as any}
                  titleSize="xl"
                  bannerHeight="tall"
                  textLayout="stacked"
                  bannerBackgroundColor="none"
                  showTicketButton={false}
                  showShareButton={false}
                  content={contentBlocks[0].content as string | undefined}
                  backgroundImage={(contentBlocks[0].backgroundImageUrl || contentBlocks[0].backgroundImage) as string | undefined}
                />
              )}

              {/* Remaining blocks in masonry grid */}
              <div className="grid-masonry">
                {contentBlocks.slice(1).map((block: any, index: number) => (
                  <CrCard
                    key={index}
                    variant="article"
                    type="page"
                    imagePosition={block.imagePosition || 'none'}
                    preheader={block.preheader}
                    title={block.title}
                    titleTag={block.titleTag || 'h2'}
                    bannerHeight="narrow"
                    textLayout="inline"
                    bannerBackgroundColor="none"
                    showTicketButton={false}
                    showShareButton={false}
                    content={block.content}
                    backgroundImage={block.backgroundImageUrl || block.backgroundImage}
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              {/* Fallback to static content */}
              <CrCard
                variant="article"
                type="page"
                imagePosition="right"
                articleImageAspectRatio="16:9"
                preheader="GET IN TOUCH"
                title="Contact CHIRP Radio"
                titleTag="h1"
                titleSize="xl"
                bannerHeight="tall"
                textLayout="stacked"
                bannerBackgroundColor="none"
                showTicketButton={false}
                showShareButton={false}
                contentSummary={contactData.introText.join('\n\n')}
                backgroundImage={contactData.heroImage}
              />

              <div className="grid-masonry">
                {contactData.contactMethods.map((method) => (
                  <CrCard
                    key={method.id}
                    variant="article"
                    type="page"
                    imagePosition="none"
                    preheader=""
                    title={method.title}
                    bannerHeight="narrow"
                    textLayout="inline"
                    bannerBackgroundColor="none"
                    showTicketButton={false}
                    showShareButton={false}
                    content={method.content}
                    contentSummary={method.contentSummary}
                    backgroundImage={method.backgroundImage}
                  />
                ))}

                <CrCard
                  variant="article"
                  type="page"
                  imagePosition="none"
                  preheader=""
                  title={contactData.studioAddress.title}
                  bannerHeight="narrow"
                  textLayout="inline"
                  bannerBackgroundColor="none"
                  showTicketButton={false}
                  showShareButton={false}
                  contentSummary={`${contactData.studioAddress.address}\n\n${contactData.studioAddress.note}`}
                  backgroundImage={contactData.studioAddress.image}
                />

                <CrCard
                  variant="article"
                  type="page"
                  imagePosition="none"
                  preheader=""
                  title={contactData.socialMedia.title}
                  bannerHeight="narrow"
                  textLayout="inline"
                  bannerBackgroundColor="none"
                  showTicketButton={false}
                  showShareButton={false}
                  contentSummary={`${contactData.socialMedia.description}\n\n${contactData.socialMedia.platforms.map((p) => `${p.name}: ${p.handle}`).join('\n')}`}
                  backgroundImage="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
                />
              </div>
            </>
          )}
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

export default ContactPage
