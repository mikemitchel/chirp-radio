// src/pages/EventDetailPage.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrChip from '../stories/CrChip'
import CrButton from '../stories/CrButton'
import { PiCalendarPlus, PiMapPinLine } from 'react-icons/pi'
import { useEvents, useAnnouncements } from '../hooks/useData'
import { useLivePreview } from '../hooks/useLivePreview'
import type { Event } from '../types/cms'
import './EventDetailPage.css'

// Import helper functions
import {
  getEventImageUrl,
  getEventCategoryName,
  getEventVenueName,
  getEventVenueAddress,
  getEventVenueCity,
  getEventVenueState,
  getEventVenuePhone,
  getEventAgeRestriction,
} from '../utils/typeHelpers'
import { downloadEventCalendar } from '../utils/calendar'

const EventDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()

  const { data: allEvents, loading: isLoading } = useEvents()
  const { data: announcements } = useAnnouncements()

  // Find event by slug from URL
  const initialEvent = allEvents?.find((e) => e.slug === slug)

  // Use live preview with fallback to initial event
  const liveEvent = useLivePreview<Event>({ initialData: initialEvent as Event })
  const event = liveEvent || initialEvent
  const eventTitle = event?.title || 'Event Details'

  // Get 3 most recent events excluding the current one
  const recentEvents = allEvents?.filter((e) => e.id !== event?.id).slice(0, 3) || []

  const handleEventClick = (clickedEvent: Event) => {
    navigate(`/events/${clickedEvent.slug}`)
  }

  if (isLoading) {
    return (
      <div className="event-detail-page">
        <section className="page-container">
          <p>Loading...</p>
        </section>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="event-detail-page">
        <section className="page-container">
          <p>Event not found</p>
        </section>
      </div>
    )
  }

  return (
    <div className="event-detail-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Events', isClickable: true, onClick: () => navigate('/events') },
            { label: eventTitle, isClickable: false },
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="event"
            bannerHeight="tall"
            textLayout="stacked"
            bannerBackgroundColor="textured"
            titleTag="h1"
            titleSize="xl"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
            backgroundImage={getEventImageUrl(event)}
            showPhotoCredit={event.showPhotoCredit || false}
            photographerName={event.photographerName}
            preheader={getEventCategoryName(event)}
            title={event.title}
            dateTime={new Date(event.date).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
            venue={getEventVenueName(event)}
            ageRestriction={getEventAgeRestriction(event)}
            excerpt={event.excerpt}
            content={typeof event.content === 'string' ? event.content : undefined}
            showTicketButton={false}
            showShareButton={true}
            shareUrl={`${window.location.origin}${window.location.pathname}#/events/${event.slug}`}
          />

          {/* Event Details Section */}
          <div className="event-detail-page__details">
            <div className="event-detail-page__details-header">
              <h2 className="event-detail-page__details-title">Event Details</h2>
              <CrButton
                size="small"
                variant="outline"
                color="default"
                leftIcon={<PiCalendarPlus />}
                onClick={() => {
                  downloadEventCalendar({
                    title: event.title,
                    date: event.date,
                    venue: getEventVenueName(event),
                    venueAddress: getEventVenueAddress(event),
                    description: event.excerpt || event.title,
                  })
                }}
              >
                Add to Calendar
              </CrButton>
            </div>

            <div className="event-detail-page__details-grid">
              {/* Left Column - Date & Time */}
              <div>
                <div className="event-detail-page__details-label">Date & Time</div>
                <div className="event-detail-page__details-datetime-row">
                  <div className="event-detail-page__details-value--spaced">
                    {new Date(event.date).toLocaleString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </div>
                  <CrButton
                    size="small"
                    variant="ghost"
                    color="secondary"
                    leftIcon={<PiCalendarPlus />}
                    onClick={() => {
                      downloadEventCalendar({
                        title: event.title,
                        date: event.date,
                        venue: getEventVenueName(event),
                        venueAddress: getEventVenueAddress(event),
                        description: event.excerpt || event.title,
                      })
                    }}
                  >
                    Add
                  </CrButton>
                </div>

                {/* Age Restriction Chip */}
                {event.ageRestriction && (
                  <CrChip variant="secondary">{getEventAgeRestriction(event)}</CrChip>
                )}
              </div>

              {/* Right Column - Venue */}
              <div>
                <div className="event-detail-page__details-label">Venue</div>
                <div className="event-detail-page__details-venue-row">
                  <div className="event-detail-page__details-value">{getEventVenueName(event)}</div>
                  {getEventVenueAddress(event) && (
                    <CrButton
                      size="small"
                      variant="ghost"
                      color="secondary"
                      leftIcon={<PiMapPinLine />}
                      onClick={() => {
                        const address = `${getEventVenueName(event)}, ${getEventVenueAddress(event)}, ${getEventVenueCity(event)}, ${getEventVenueState(event)}`
                        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
                        window.open(googleMapsUrl, '_blank')
                      }}
                    >
                      Map
                    </CrButton>
                  )}
                </div>

                {/* Address (no label) */}
                {getEventVenueAddress(event) && (
                  <div className="event-detail-page__details-address">
                    {getEventVenueAddress(event)}
                    {getEventVenueCity(event) && getEventVenueState(event) && (
                      <>
                        <br />
                        {getEventVenueCity(event)}, {getEventVenueState(event)}{' '}
                        {typeof event.venue === 'object' && event.venue && 'zipCode' in event.venue
                          ? (event.venue.zipCode as string)
                          : ''}
                      </>
                    )}
                  </div>
                )}

                {/* Phone (no label) */}
                {getEventVenuePhone(event) && (
                  <div className="event-detail-page__details-phone">
                    <a
                      href={`tel:${getEventVenuePhone(event)}`}
                      className="event-detail-page__details-phone-link"
                    >
                      {getEventVenuePhone(event)}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader
            title="Upcoming Events"
            titleTag="h2"
            showEyebrow={false}
            showActionButton={true}
            actionButtonText="View All Events"
            onActionClick={() => navigate('/events')}
          />
          {recentEvents.map((recentEvent) => (
            <CrCard
              key={recentEvent.id}
              variant="small"
              bannerHeight="tall"
              textLayout="stacked"
              bannerBackgroundColor="textured"
              titleTag="h3"
              titleSize="sm"
              backgroundImage={getEventImageUrl(recentEvent)}
              preheader={getEventCategoryName(recentEvent)}
              title={recentEvent.title}
              dateTime={new Date(recentEvent.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(recentEvent)}
              contentSummary={recentEvent.excerpt}
              onClick={() => handleEventClick(recentEvent)}
            />
          ))}
          {announcements && announcements[0] && (
            <CrAnnouncement
              variant={announcements[0].variant}
              widthVariant="third"
              textureBackground={announcements[0].textureBackground}
              headlineText={announcements[0].headlineText}
              bodyText={
                typeof announcements[0].bodyText === 'string'
                  ? announcements[0].bodyText
                  : undefined
              }
              showLink={announcements[0].showLink}
              linkText={announcements[0].linkText}
              linkUrl={announcements[0].linkUrl}
              buttonCount={announcements[0].buttonCount}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
