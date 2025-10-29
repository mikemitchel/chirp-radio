// src/pages/EventsPage.tsx
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPagination from '../stories/CrPagination'
import { useEvents, useAnnouncements, useSiteSettings } from '../hooks/useData'
import type { Event } from '../types/cms'

const ITEMS_PER_PAGE = 11

// Helper functions for type conversions
const getEventImageUrl = (event: Event): string | undefined => {
  if (typeof event.featuredImage === 'object' && event.featuredImage && 'url' in event.featuredImage) {
    return event.featuredImage.url
  }
  if (typeof event.featuredImage === 'string') {
    return event.featuredImage
  }
  return event.featuredImageUrl
}

const getEventCategoryName = (event: Event): string | undefined => {
  if (typeof event.category === 'object' && event.category && 'name' in event.category) {
    return event.category.name
  }
  return undefined
}

const getEventVenueName = (event: Event): string | undefined => {
  if (!event.venue) return event.location
  if (typeof event.venue === 'object' && 'name' in event.venue) {
    return event.venue.name
  }
  if (typeof event.venue === 'string') {
    return event.venue
  }
  return event.location
}

const getEventAgeRestriction = (event: Event): string | { age: string } | undefined => {
  if (!event.ageRestriction) return undefined
  if (typeof event.ageRestriction === 'object' && 'name' in event.ageRestriction) {
    return { age: event.ageRestriction.name || '' }
  }
  return undefined
}

const EventsPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: allEvents } = useEvents()
  const { data: announcements } = useAnnouncements()
  const { data: siteSettings } = useSiteSettings()

  // Get current page from URL, default to 0
  const currentPage = parseInt(searchParams.get('page') || '0', 10)

  const totalPages = allEvents ? Math.ceil(allEvents.length / ITEMS_PER_PAGE) : 0
  const startIndex = currentPage * ITEMS_PER_PAGE
  const events = allEvents?.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleEventClick = (event: any) => {
    navigate(`/events/${event.slug}`)
  }

  const handlePageChange = (page: number) => {
    if (page === 0) {
      setSearchParams({})
    } else {
      setSearchParams({ page: String(page) })
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get sidebar content from Site Settings
  const sidebarAnnouncementId =
    typeof siteSettings?.eventsSidebarAnnouncement === 'string'
      ? siteSettings.eventsSidebarAnnouncement
      : (siteSettings?.eventsSidebarAnnouncement as any)?.id

  const sidebarAnnouncement = sidebarAnnouncementId
    ? announcements?.find((a) => String(a.id) === String(sidebarAnnouncementId))
    : announcements?.[5] // fallback

  const sidebarAdvertisement = siteSettings?.eventsSidebarAdvertisement

  // Get full-width announcement from Site Settings
  const fullWidthAnnouncementId =
    typeof siteSettings?.eventsFullWidthAnnouncement === 'string'
      ? siteSettings.eventsFullWidthAnnouncement
      : (siteSettings?.eventsFullWidthAnnouncement as any)?.id

  const fullWidthAnnouncement = fullWidthAnnouncementId
    ? announcements?.find((a) => String(a.id) === String(fullWidthAnnouncementId))
    : announcements?.[4] // fallback

  return (
    <div className="events-page">
      <section className="page-container">
        <CrPageHeader title="Events" showEyebrow={false} showActionButton={false} />
      </section>

      {/* 2/3 + 1/3 Layout - Featured Event */}
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          {events && events[0] && (
            <CrCard
              variant="default"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getEventImageUrl(events[0])}
              preheader={getEventCategoryName(events[0])}
              title={events[0].title}
              dateTime={new Date(events[0].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[0])}
              ageRestriction={getEventAgeRestriction(events[0])}
              contentSummary={events[0].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[0])}
            />
          )}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {sidebarAnnouncement && (
            <CrAnnouncement
              variant={sidebarAnnouncement.variant}
              widthVariant="third"
              textureBackground={sidebarAnnouncement.textureBackground}
              headlineText={sidebarAnnouncement.headlineText}
              bodyText={typeof sidebarAnnouncement.bodyText === 'string' ? sidebarAnnouncement.bodyText : undefined}
              showLink={sidebarAnnouncement.showLink}
              linkText={sidebarAnnouncement.linkText}
              linkUrl={sidebarAnnouncement.linkUrl}
              buttonCount={sidebarAnnouncement.buttonCount}
              button1Text={sidebarAnnouncement.button1Text}
              button1Icon={sidebarAnnouncement.button1Icon}
              button2Text={sidebarAnnouncement.button2Text}
              button2Icon={sidebarAnnouncement.button2Icon}
              currentAmount={sidebarAnnouncement.currentAmount}
              targetAmount={sidebarAnnouncement.targetAmount}
            />
          )}
          {sidebarAdvertisement && (
            <>
              <CrAdSpace
                size={(sidebarAdvertisement as any).size || 'large-rectangle'}
                customWidth={(sidebarAdvertisement as any).customWidth}
                customHeight={(sidebarAdvertisement as any).customHeight}
                contentType={(sidebarAdvertisement as any).contentType}
                src={(sidebarAdvertisement as any).imageUrl || (sidebarAdvertisement as any).image?.url}
                alt={(sidebarAdvertisement as any).alt}
                htmlContent={(sidebarAdvertisement as any).htmlContent}
                videoSrc={(sidebarAdvertisement as any).videoUrl || (sidebarAdvertisement as any).video?.url}
                embedCode={(sidebarAdvertisement as any).embedCode}
                href={(sidebarAdvertisement as any).href}
                target={(sidebarAdvertisement as any).target}
                showLabel={(sidebarAdvertisement as any).showLabel}
              />
            </>
          )}
        </div>
      </div>

      {/* 50/50 Layout - 4 Events */}
      <section className="page-layout-2col">
        <div className="page-layout-2col__column">
          {events && events[1] && (
            <CrCard
              variant="wide"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={getEventImageUrl(events[1])}
              preheader={getEventCategoryName(events[1])}
              title={events[1].title}
              dateTime={new Date(events[1].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[1])}
              ageRestriction={getEventAgeRestriction(events[1])}
              contentSummary={events[1].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[1])}
            />
          )}
          {events && events[2] && (
            <CrCard
              variant="wide"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={getEventImageUrl(events[2])}
              preheader={getEventCategoryName(events[2])}
              title={events[2].title}
              dateTime={new Date(events[2].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[2])}
              ageRestriction={getEventAgeRestriction(events[2])}
              contentSummary={events[2].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[2])}
            />
          )}
        </div>
        <div className="page-layout-2col__column">
          {events && events[3] && (
            <CrCard
              variant="wide"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={getEventImageUrl(events[3])}
              preheader={getEventCategoryName(events[3])}
              title={events[3].title}
              dateTime={new Date(events[3].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[3])}
              ageRestriction={getEventAgeRestriction(events[3])}
              contentSummary={events[3].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[3])}
            />
          )}
          {events && events[4] && (
            <CrCard
              variant="wide"
              bannerHeight="tall"
              textLayout="stacked"
              imageAspectRatio="16:9"
              backgroundImage={getEventImageUrl(events[4])}
              preheader={getEventCategoryName(events[4])}
              title={events[4].title}
              dateTime={new Date(events[4].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[4])}
              ageRestriction={getEventAgeRestriction(events[4])}
              contentSummary={events[4].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[4])}
            />
          )}
        </div>
      </section>

      {/* Announcement */}
      <section className="page-section">
        <div className="page-container">
          {fullWidthAnnouncement && (
            <CrAnnouncement
              variant={fullWidthAnnouncement.variant}
              textureBackground={fullWidthAnnouncement.textureBackground}
              headlineText={fullWidthAnnouncement.headlineText}
              bodyText={typeof fullWidthAnnouncement.bodyText === 'string' ? fullWidthAnnouncement.bodyText : undefined}
              showLink={fullWidthAnnouncement.showLink}
              linkText={fullWidthAnnouncement.linkText}
              linkUrl={fullWidthAnnouncement.linkUrl}
              buttonCount={fullWidthAnnouncement.buttonCount}
              button1Text={fullWidthAnnouncement.button1Text}
              button1Icon={fullWidthAnnouncement.button1Icon}
              button2Text={fullWidthAnnouncement.button2Text}
              button2Icon={fullWidthAnnouncement.button2Icon}
              currentAmount={fullWidthAnnouncement.currentAmount}
              targetAmount={fullWidthAnnouncement.targetAmount}
            />
          )}
        </div>
      </section>

      {/* 1/3 + 1/3 + 1/3 Layout - 6 Events */}
      <section className="page-layout-3col">
        <div className="page-layout-3col__column">
          {events && events[5] && (
            <CrCard
              variant="narrow"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getEventImageUrl(events[5])}
              preheader={getEventCategoryName(events[5])}
              title={events[5].title}
              dateTime={new Date(events[5].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[5])}
              ageRestriction={getEventAgeRestriction(events[5])}
              contentSummary={events[5].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[5])}
            />
          )}
          {events && events[6] && (
            <CrCard
              variant="narrow"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getEventImageUrl(events[6])}
              preheader={getEventCategoryName(events[6])}
              title={events[6].title}
              dateTime={new Date(events[6].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[6])}
              ageRestriction={getEventAgeRestriction(events[6])}
              contentSummary={events[6].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[6])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {events && events[7] && (
            <CrCard
              variant="narrow"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getEventImageUrl(events[7])}
              preheader={getEventCategoryName(events[7])}
              title={events[7].title}
              dateTime={new Date(events[7].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[7])}
              ageRestriction={getEventAgeRestriction(events[7])}
              contentSummary={events[7].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[7])}
            />
          )}
          {events && events[8] && (
            <CrCard
              variant="narrow"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getEventImageUrl(events[8])}
              preheader={getEventCategoryName(events[8])}
              title={events[8]?.title}
              dateTime={new Date(events[8]?.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[8] ? getEventVenueName(events[8]) : undefined}
              ageRestriction={events[8] ? getEventAgeRestriction(events[8]) : undefined}
              contentSummary={events[8]?.excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[8])}
            />
          )}
        </div>
        <div className="page-layout-3col__column">
          {events && events[9] && (
            <CrCard
              variant="narrow"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getEventImageUrl(events[9])}
              preheader={getEventCategoryName(events[9])}
              title={events[9].title}
              dateTime={new Date(events[9].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[9])}
              ageRestriction={getEventAgeRestriction(events[9])}
              contentSummary={events[9].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[9])}
            />
          )}
          {events && events[10] && (
            <CrCard
              variant="narrow"
              bannerHeight="tall"
              textLayout="stacked"
              backgroundImage={getEventImageUrl(events[10])}
              preheader={getEventCategoryName(events[10])}
              title={events[10].title}
              dateTime={new Date(events[10].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(events[10])}
              ageRestriction={getEventAgeRestriction(events[10])}
              contentSummary={events[10].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[10])}
            />
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="page-section">
        <div className="page-container">
          <CrPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </section>
    </div>
  )
}

export default EventsPage
