// src/pages/PageDetailPage.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import PageLayout from '../components/PageLayout'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import {
  usePageBySlug,
  useArticles,
  useEvents,
  usePodcasts,
  useAnnouncements,
} from '../hooks/useData'
import type { Article, Event, Podcast } from '../types/cms'

const PageDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { data: pageConfig, loading, error } = usePageBySlug(slug || '')
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()
  const { data: announcements } = useAnnouncements()

  if (loading) {
    return <div>Loading page...</div>
  }

  if (error || !pageConfig) {
    return <div>Page not found</div>
  }

  // Build sidebar content based on configuration
  const sidebarContent = (() => {
    const elements: React.ReactNode[] = []

    // Add announcement if configured
    if (pageConfig.sidebarAnnouncement) {
      const announcementId =
        typeof pageConfig.sidebarAnnouncement === 'string'
          ? pageConfig.sidebarAnnouncement
          : typeof pageConfig.sidebarAnnouncement === 'object' &&
              'id' in pageConfig.sidebarAnnouncement
            ? pageConfig.sidebarAnnouncement.id
            : undefined

      const announcement = announcementId
        ? announcements?.find((a) => String(a.id) === String(announcementId))
        : undefined

      if (announcement) {
        elements.push(
          <CrAnnouncement
            key="sidebar-announcement"
            variant={announcement.variant}
            widthVariant="third"
            textureBackground={announcement.textureBackground}
            headlineText={announcement.headlineText}
            bodyText={typeof announcement.bodyText === 'string' ? announcement.bodyText : undefined}
            showLink={announcement.showLink}
            linkText={announcement.linkText}
            linkUrl={announcement.linkUrl}
            buttonCount={announcement.buttonCount}
            button1Text={announcement.button1Text}
            button1Icon={announcement.button1Icon}
            button2Text={announcement.button2Text}
            button2Icon={announcement.button2Icon}
            currentAmount={announcement.currentAmount}
            targetAmount={announcement.targetAmount}
          />
        )
      }
    }

    // Add content cards based on sidebarContentType
    if (pageConfig.sidebarContentType && pageConfig.sidebarContentType !== 'none') {
      let items: (Article | Event | Podcast)[] = []
      const count = pageConfig.sidebarContentCount || 3

      if (pageConfig.sidebarContentType === 'articles' && articles) {
        items = articles.slice(0, count)
      } else if (pageConfig.sidebarContentType === 'events' && events) {
        items = events.slice(0, count)
      } else if (pageConfig.sidebarContentType === 'podcasts' && podcasts) {
        items = podcasts.slice(0, count)
      }

      items.forEach((item) => {
        const imageUrl =
          typeof item.featuredImage === 'object' &&
          item.featuredImage &&
          'url' in item.featuredImage
            ? item.featuredImage.url
            : typeof item.featuredImage === 'string'
              ? item.featuredImage
              : 'featuredImageUrl' in item
                ? item.featuredImageUrl
                : undefined

        elements.push(
          <CrCard
            key={`sidebar-${item.id}`}
            variant="small"
            type={pageConfig.sidebarContentType === 'events' ? 'event' : 'article'}
            bannerHeight="tall"
            textLayout="stacked"
            bannerBackgroundColor="none"
            backgroundImage={imageUrl}
            title={item.title}
            contentSummary={item.excerpt}
            showTicketButton={false}
            showShareButton={false}
            onClick={() => {
              if (pageConfig.sidebarContentType === 'articles') {
                navigate(`/articles/${item.slug}`)
              } else if (pageConfig.sidebarContentType === 'events') {
                navigate(`/events/${item.slug}`)
              } else if (pageConfig.sidebarContentType === 'podcasts') {
                navigate(`/podcasts/${item.slug}`)
              }
            }}
          />
        )
      })
    }

    // Add advertisement if configured
    if (pageConfig.sidebarAdvertisement && typeof pageConfig.sidebarAdvertisement === 'object') {
      const ad = pageConfig.sidebarAdvertisement
      elements.push(
        <CrAdSpace
          key="sidebar-ad"
          size={'size' in ad ? (ad.size as string) : 'large-rectangle'}
          customWidth={'customWidth' in ad ? (ad.customWidth as number) : undefined}
          customHeight={'customHeight' in ad ? (ad.customHeight as number) : undefined}
          contentType={'contentType' in ad ? (ad.contentType as string) : undefined}
          src={
            'imageUrl' in ad
              ? (ad.imageUrl as string)
              : 'image' in ad && typeof ad.image === 'object' && ad.image && 'url' in ad.image
                ? (ad.image.url as string)
                : undefined
          }
          alt={'alt' in ad ? (ad.alt as string) : undefined}
          htmlContent={'htmlContent' in ad ? (ad.htmlContent as string) : undefined}
          videoSrc={
            'videoUrl' in ad
              ? (ad.videoUrl as string)
              : 'video' in ad && typeof ad.video === 'object' && ad.video && 'url' in ad.video
                ? (ad.video.url as string)
                : undefined
          }
          embedCode={'embedCode' in ad ? (ad.embedCode as string) : undefined}
          href={'href' in ad ? (ad.href as string) : undefined}
          target={'target' in ad ? (ad.target as string) : undefined}
          showLabel={'showLabel' in ad ? (ad.showLabel as boolean) : undefined}
        />
      )
    }

    return elements.length > 0 ? <>{elements}</> : undefined
  })()

  return (
    <>
      <Helmet>
        <title>{pageConfig.title || 'CHIRP Radio'}</title>
        {pageConfig.excerpt && <meta name="description" content={pageConfig.excerpt} />}
      </Helmet>
      <div className="page-detail">
        <PageLayout
          layoutTemplate={pageConfig.layoutTemplate || 'default'}
          layoutBlocks={pageConfig.layout}
          sidebar={sidebarContent}
        />
      </div>
    </>
  )
}

export default PageDetailPage
