// src/pages/EventsPage.tsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrButton from '../stories/CrButton'
import { useEvents, useAnnouncements } from '../hooks/useData'

const ITEMS_PER_PAGE = 11

const EventsPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: allEvents } = useEvents()
  const { data: announcements } = useAnnouncements()
  const [currentPage, setCurrentPage] = useState(0)

  const totalPages = allEvents ? Math.ceil(allEvents.length / ITEMS_PER_PAGE) : 0
  const startIndex = currentPage * ITEMS_PER_PAGE
  const events = allEvents?.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleEventClick = (event: any) => {
    navigate(`/events/${event.id}`, { state: { event } })
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
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
              preheader={events[0].category}
              title={events[0].title}
              dateTime={new Date(events[0].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[0].venue.name}
              ageRestriction={events[0].ageRestriction}
              contentSummary={events[0].description}
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
              preheader={events[1].category}
              title={events[1].title}
              dateTime={new Date(events[1].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[1].venue.name}
              ageRestriction={events[1].ageRestriction}
              contentSummary={events[1].description}
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
              preheader={events[2].category}
              title={events[2].title}
              dateTime={new Date(events[2].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[2].venue.name}
              ageRestriction={events[2].ageRestriction}
              contentSummary={events[2].description}
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
              preheader={events[3].category}
              title={events[3].title}
              dateTime={new Date(events[3].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[3].venue.name}
              ageRestriction={events[3].ageRestriction}
              contentSummary={events[3].description}
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
              preheader={events[4].category}
              title={events[4].title}
              dateTime={new Date(events[4].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[4].venue.name}
              ageRestriction={events[4].ageRestriction}
              contentSummary={events[4].description}
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
              preheader={events[5].category}
              title={events[5].title}
              dateTime={new Date(events[5].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[5].venue.name}
              ageRestriction={events[5].ageRestriction}
              contentSummary={events[5].description}
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
              preheader={events[6].category}
              title={events[6].title}
              dateTime={new Date(events[6].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[6].venue.name}
              ageRestriction={events[6].ageRestriction}
              contentSummary={events[6].description}
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
              preheader={events[7].category}
              title={events[7].title}
              dateTime={new Date(events[7].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[7].venue.name}
              ageRestriction={events[7].ageRestriction}
              contentSummary={events[7].description}
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
              preheader={events[8]?.category}
              title={events[8]?.title}
              dateTime={new Date(events[8]?.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[8]?.venue.name}
              ageRestriction={events[8]?.ageRestriction}
              contentSummary={events[8]?.description}
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
              preheader={events[9].category}
              title={events[9].title}
              dateTime={new Date(events[9].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[9].venue.name}
              ageRestriction={events[9].ageRestriction}
              contentSummary={events[9].description}
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
              preheader={events[10].category}
              title={events[10].title}
              dateTime={new Date(events[10].date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={events[10].venue.name}
              ageRestriction={events[10].ageRestriction}
              contentSummary={events[10].description}
              showTicketButton={false}
              onClick={() => handleEventClick(events[10])}
            />
          )}
        </div>
      </section>

      {/* Pagination */}
      <section className="page-section">
        <div className="page-container">
          <div className="events-pagination">
            <CrButton
              leftIcon={<PiCaretLeft />}
              size="small"
              variant="text"
              onClick={handlePrevious}
              disabled={currentPage === 0}
            >
              Previous
            </CrButton>
            <CrButton
              rightIcon={<PiCaretRight />}
              size="small"
              variant="text"
              onClick={handleNext}
              disabled={currentPage >= totalPages - 1}
            >
              Next
            </CrButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventsPage
