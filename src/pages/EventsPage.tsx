// src/pages/EventsPage.tsx
import React from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPagination from '../stories/CrPagination'
import { useEvents, useAnnouncements } from '../hooks/useData'

const ITEMS_PER_PAGE = 11

const EventsPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: allEvents } = useEvents()
  const { data: announcements } = useAnnouncements()

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
              backgroundImage={events[0].featuredImage}
              preheader={typeof events[0].category === "string" ? events[0].category : events[0].category?.name}
              title={events[0].title}
              dateTime={new Date(events[0].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[0].venue.name}
              ageRestriction={events[0].ageRestriction}
              contentSummary={events[0].excerpt}
              showTicketButton={false}
              onClick={() => handleEventClick(events[0])}
            />
          )}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[5] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[5].backgroundColor}
              headlineText={announcements[5].title}
              bodyText={announcements[5].message}
              showLink={!!announcements[5].ctaText}
              linkText={announcements[5].ctaText}
              linkUrl={announcements[5].ctaUrl}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
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
              backgroundImage={events[1].featuredImage}
              preheader={typeof events[1].category === "string" ? events[1].category : events[1].category?.name}
              title={events[1].title}
              dateTime={new Date(events[1].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[1].venue.name}
              ageRestriction={events[1].ageRestriction}
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
              backgroundImage={events[2].featuredImage}
              preheader={typeof events[2].category === "string" ? events[2].category : events[2].category?.name}
              title={events[2].title}
              dateTime={new Date(events[2].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[2].venue.name}
              ageRestriction={events[2].ageRestriction}
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
              backgroundImage={events[3].featuredImage}
              preheader={typeof events[3].category === "string" ? events[3].category : events[3].category?.name}
              title={events[3].title}
              dateTime={new Date(events[3].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[3].venue.name}
              ageRestriction={events[3].ageRestriction}
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
              backgroundImage={events[4].featuredImage}
              preheader={typeof events[4].category === "string" ? events[4].category : events[4].category?.name}
              title={events[4].title}
              dateTime={new Date(events[4].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[4].venue.name}
              ageRestriction={events[4].ageRestriction}
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
          {announcements && announcements[4] && (
            <CrAnnouncement
              variant="motivation"
              textureBackground={announcements[4].backgroundColor}
              headlineText={announcements[4].title}
              bodyText={announcements[4].message}
              showLink={!!announcements[4].ctaText}
              linkText={announcements[4].ctaText}
              linkUrl={announcements[4].ctaUrl}
              buttonCount="none"
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
              backgroundImage={events[5].featuredImage}
              preheader={typeof events[5].category === "string" ? events[5].category : events[5].category?.name}
              title={events[5].title}
              dateTime={new Date(events[5].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[5].venue.name}
              ageRestriction={events[5].ageRestriction}
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
              backgroundImage={events[6].featuredImage}
              preheader={typeof events[6].category === "string" ? events[6].category : events[6].category?.name}
              title={events[6].title}
              dateTime={new Date(events[6].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[6].venue.name}
              ageRestriction={events[6].ageRestriction}
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
              backgroundImage={events[7].featuredImage}
              preheader={typeof events[7].category === "string" ? events[7].category : events[7].category?.name}
              title={events[7].title}
              dateTime={new Date(events[7].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[7].venue.name}
              ageRestriction={events[7].ageRestriction}
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
              backgroundImage={events[8]?.featuredImage}
              preheader={typeof events[8]?.category === "string" ? events[8]?.category : events[8]?.category?.name}
              title={events[8]?.title}
              dateTime={new Date(events[8]?.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[8]?.venue.name}
              ageRestriction={events[8]?.ageRestriction}
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
              backgroundImage={events[9].featuredImage}
              preheader={typeof events[9].category === "string" ? events[9].category : events[9].category?.name}
              title={events[9].title}
              dateTime={new Date(events[9].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[9].venue.name}
              ageRestriction={events[9].ageRestriction}
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
              backgroundImage={events[10].featuredImage}
              preheader={typeof events[10].category === "string" ? events[10].category : events[10].category?.name}
              title={events[10].title}
              dateTime={new Date(events[10].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={events[10].venue.name}
              ageRestriction={events[10].ageRestriction}
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
