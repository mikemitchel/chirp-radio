// src/pages/EventDetailPage.tsx
import React from 'react'
import { useParams, useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrChip from '../stories/CrChip'
import CrButton from '../stories/CrButton'
import { PiCalendarPlus } from 'react-icons/pi'
import { useEvents, useAnnouncements } from '../hooks/useData'
import { useLivePreview } from '../hooks/useLivePreview'
import type { Event } from '../types/cms'

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

const EventDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()

  const { data: allEvents, loading: isLoading } = useEvents()
  const { data: announcements } = useAnnouncements()

  // Find event by slug from URL
  const initialEvent = allEvents?.find((e) => e.slug === slug)

  // Use live preview with fallback to initial event
  const liveEvent = useLivePreview<Event | undefined>({ initialData: initialEvent })
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
      <style>{`
        @media (max-width: 520px) {
          .event-details-grid {
            grid-template-columns: 1fr !important;
            gap: var(--cr-space-4) !important;
          }
        }
      `}</style>
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
          <div
            style={{
              marginTop: 'var(--cr-space-8)',
              maxWidth: '1000px',
              padding: 'var(--cr-space-6)',
              backgroundColor: 'var(--cr-paper)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              <h2
                style={{
                  font: 'var(--cr-title-sm)',
                  color: 'var(--cr-ink)',
                  margin: 0,
                }}
              >
                Event Details
              </h2>
              <CrButton
                size="small"
                variant="outline"
                color="default"
                leftIcon={<PiCalendarPlus />}
                onClick={() => {
                  // Add to calendar functionality
                  console.log('Add to calendar clicked')
                }}
              >
                Add to Calendar
              </CrButton>
            </div>

            <div
              className="event-details-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 'var(--cr-space-6)',
              }}
            >
              {/* Left Column - Date & Time */}
              <div>
                <div
                  style={{
                    font: 'var(--cr-body-xs)',
                    color: 'var(--cr-default-700)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 'var(--cr-space-1)',
                  }}
                >
                  Date & Time
                </div>
                <div
                  style={{
                    font: 'var(--cr-body-reg)',
                    color: 'var(--cr-ink)',
                    marginBottom: 'var(--cr-space-3)',
                  }}
                >
                  {new Date(event.date).toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </div>

                {/* Age Restriction Chip */}
                {event.ageRestriction && (
                  <CrChip variant="secondary">{getEventAgeRestriction(event)}</CrChip>
                )}
              </div>

              {/* Right Column - Venue */}
              <div>
                <div
                  style={{
                    font: 'var(--cr-body-xs)',
                    color: 'var(--cr-default-700)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: 'var(--cr-space-1)',
                  }}
                >
                  Venue
                </div>
                <div
                  style={{
                    font: 'var(--cr-body-reg)',
                    color: 'var(--cr-ink)',
                  }}
                >
                  {getEventVenueName(event)}
                </div>

                {/* Address (no label) */}
                {getEventVenueAddress(event) && (
                  <div
                    style={{
                      font: 'var(--cr-body-reg)',
                      color: 'var(--cr-ink)',
                      marginTop: 'var(--cr-space-2)',
                    }}
                  >
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
                  <div
                    style={{
                      font: 'var(--cr-body-reg)',
                      marginTop: 'var(--cr-space-2)',
                    }}
                  >
                    <a
                      href={`tel:${getEventVenuePhone(event)}`}
                      style={{
                        color: 'var(--cr-secondary-700)',
                        textDecoration: 'none',
                      }}
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
