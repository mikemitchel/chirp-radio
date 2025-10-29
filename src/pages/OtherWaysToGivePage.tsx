// src/pages/OtherWaysToGivePage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import { PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import waysToGiveData from '../data/waysToGive.json'
import { useAnnouncements, useArticles, useEvents, usePodcasts, usePageBySlug } from '../hooks/useData'
import { getAdvertisementProps } from '../utils/categoryHelpers'
import { getAnnouncementProps } from '../utils/typeHelpers'

const OtherWaysToGivePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: pageConfig } = usePageBySlug('other-ways-to-give')
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()

  // Use CMS content if available, fallback to static data
  const contentBlocks = pageConfig?.layout || []
  const [section1, section2] = waysToGiveData.sections

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
        <title>{pageConfig?.title || 'Other Ways to Give | CHIRP Radio'}</title>
        {pageConfig?.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="ways-to-give-page">
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

              {/* Remaining blocks in grid layout */}
              <div className="grid-2col-equal">
                <div>
                  {/* Blocks 1-2 (Support When You Shop, Wishlist) */}
                  {contentBlocks.slice(1, 3).map((block: any, index: number) => (
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
                <div>
                  {/* Blocks 3-5 (Donation cards) */}
                  {contentBlocks.slice(3, 6).map((block: any, index: number) => (
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
              </div>

              {/* Block 6 (Vinyl Circle) */}
              {contentBlocks[6] && (
                <CrCard
                  variant="article"
                  type="page"
                  imagePosition={contentBlocks[6].imagePosition || 'right'}
                  articleImageAspectRatio="16:9"
                  preheader={contentBlocks[6].preheader}
                  title={contentBlocks[6].title}
                  titleTag={contentBlocks[6].titleTag || 'h2'}
                  bannerBackgroundColor="none"
                  content={contentBlocks[6].content}
                  backgroundImage={contentBlocks[6].backgroundImageUrl || contentBlocks[6].backgroundImage}
                  showTicketButton={false}
                  showShareButton={false}
                />
              )}
            </>
          ) : (
            <>
              {/* Fallback to static content */}
              <CrCard
                variant="article"
                type="page"
                imagePosition="right"
                articleImageAspectRatio="16:9"
                preheader="DONATE TO CHIRP"
                title="Other Ways to Give"
                titleTag="h1"
                titleSize="xl"
                bannerHeight="tall"
                textLayout="stacked"
                bannerBackgroundColor="none"
                showTicketButton={false}
                showShareButton={false}
                contentSummary={waysToGiveData.introText.join('\n\n')}
                backgroundImage={section1.image}
              />

              <div className="grid-2col-equal">
                <div>
                  <CrCard
                    variant="article"
                    type="page"
                    imagePosition="none"
                    preheader=""
                    title={section1.title}
                    bannerHeight="narrow"
                    textLayout="inline"
                    bannerBackgroundColor="none"
                    showTicketButton={false}
                    showShareButton={false}
                    contentSummary={`${section1.description}\n\n${section1.items.join('\n')}`}
                    backgroundImage={section1.image}
                  />
                  <CrCard
                    variant="article"
                    type="page"
                    imagePosition="none"
                    preheader=""
                    title={section2.title}
                    bannerHeight="narrow"
                    textLayout="inline"
                    bannerBackgroundColor="none"
                    showTicketButton={false}
                    showShareButton={false}
                    contentSummary={`${section2.description}\n\n${section2.items.join('\n')}\n\n${section2.footer}`}
                    backgroundImage={section2.image}
                  />
                </div>
                <div>
                  {waysToGiveData.donationCards.map((card) => (
                    <CrCard
                      key={card.id}
                      variant="article"
                      type="page"
                      imagePosition="none"
                      preheader=""
                      title={card.title}
                      bannerHeight="narrow"
                      textLayout="inline"
                      bannerBackgroundColor="none"
                      showTicketButton={false}
                      showShareButton={false}
                      content={card.content}
                      contentSummary={card.contentSummary}
                      backgroundImage={card.backgroundImage}
                    />
                  ))}
                </div>
              </div>
              <CrCard
                variant="article"
                type="page"
                imagePosition="right"
                articleImageAspectRatio="16:9"
                preheader=""
                title={waysToGiveData.vinylCircle.title}
                bannerBackgroundColor="none"
                contentSummary={waysToGiveData.vinylCircle.contentSummary}
                backgroundImage={waysToGiveData.vinylCircle.backgroundImage}
                showTicketButton={false}
                showShareButton={false}
              />
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

export default OtherWaysToGivePage
