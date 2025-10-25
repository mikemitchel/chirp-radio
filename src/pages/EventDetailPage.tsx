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

const EventDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { slug } = useParams()

  const { data: allEvents, isLoading } = useEvents()
  const { data: announcements } = useAnnouncements()

  // Find event by slug from URL
  const event = allEvents?.find((e) => e.slug === slug)
  const eventTitle = event?.title || 'Event Details'

  // Get 3 most recent events excluding the current one
  const recentEvents = allEvents?.filter((e) => e.id !== event?.id).slice(0, 3) || []

  const handleEventClick = (clickedEvent: any) => {
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
            backgroundImage={event.featuredImage || event.featuredImageUrl}
            showPhotoCredit={event.showPhotoCredit || false}
            photographerName={event.photographerName}
            preheader={typeof event.category === 'string' ? event.category : event.category?.name}
            title={event.title}
            dateTime={new Date(event.date).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
            venue={event.venue.name}
            ageRestriction={typeof event.ageRestriction === 'string' ? event.ageRestriction : event.ageRestriction?.age}
            excerpt={event.excerpt}
            content={event.content}
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
                  <CrChip variant="secondary">
                    {typeof event.ageRestriction === 'string' ? event.ageRestriction : event.ageRestriction.age}
                  </CrChip>
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
                  {event.venue.name}
                </div>

                {/* Address (no label) */}
                {event.venue.address && (
                  <div
                    style={{
                      font: 'var(--cr-body-reg)',
                      color: 'var(--cr-ink)',
                      marginTop: 'var(--cr-space-2)',
                    }}
                  >
                    {event.venue.address}
                    {event.venue.city && event.venue.state && (
                      <>
                        <br />
                        {event.venue.city}, {event.venue.state} {event.venue.zip}
                      </>
                    )}
                  </div>
                )}

                {/* Phone (no label) */}
                {event.venue.phone && (
                  <div
                    style={{
                      font: 'var(--cr-body-reg)',
                      marginTop: 'var(--cr-space-2)',
                    }}
                  >
                    <a
                      href={`tel:${event.venue.phone}`}
                      style={{
                        color: 'var(--cr-secondary-700)',
                        textDecoration: 'none',
                      }}
                    >
                      {event.venue.phone}
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
            titleSize="md"
            showEyebrow={false}
            showActionButton={true}
            actionButtonText="View All Events"
            actionButtonSize="small"
            onActionButtonClick={() => navigate('/events')}
          />
          {recentEvents.map((recentEvent) => (
            <CrCard
              key={recentEvent.id}
              variant="small"
              bannerHeight="tall"
              textLayout="stacked"
              titleTag="h3"
              titleSize="sm"
              backgroundImage={recentEvent.featuredImage}
              preheader={typeof recentEvent.category === "string" ? recentEvent.category : recentEvent.category?.name}
              title={recentEvent.title}
              dateTime={new Date(recentEvent.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={recentEvent.venue.name}
              contentSummary={recentEvent.excerpt}
              onClick={() => handleEventClick(recentEvent)}
            />
          ))}
          {announcements && announcements[0] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[0].backgroundColor}
              headlineText={announcements[0].title}
              bodyText={announcements[0].message}
              showLink={!!announcements[0].ctaText}
              linkText={announcements[0].ctaText}
              linkUrl={announcements[0].ctaUrl}
              buttonCount="none"
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
