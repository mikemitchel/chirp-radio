// src/pages/PageDetailPage.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router'
import { Helmet } from 'react-helmet-async'
import PageLayout from '../components/PageLayout'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import NotFoundPage from './NotFoundPage'
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
  const { data: pageConfig, isLoading, error } = usePageBySlug(slug || '')
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()
  const { data: announcements } = useAnnouncements()

  if (isLoading) {
    return <div>Loading page...</div>
  }

  if (error || !pageConfig) {
    return <NotFoundPage />
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
        const imageUrl = (
          typeof item.featuredImage === 'object' &&
          item.featuredImage &&
          'url' in item.featuredImage
            ? item.featuredImage.url
            : typeof item.featuredImage === 'string'
              ? item.featuredImage
              : 'featuredImageUrl' in item
                ? item.featuredImageUrl
                : undefined
        ) as string | undefined

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
      elements.push(<CrAdSpace key="sidebar-ad" size="large-rectangle" />)
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
