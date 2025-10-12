// src/pages/DonatePage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrDonateForm from '../stories/CrDonateForm'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrCard from '../stories/CrCard'
import CrPageHeader from '../stories/CrPageHeader'
import { useAnnouncements, useArticles, useEvents } from '../hooks/useData'

const DonatePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()

  const handleVinylCircleClick = () => {
    navigate('/vinyl-circle')
  }

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handleEventClick = (event: any) => {
    navigate(`/events/${event.id}`, { state: { event } })
  }

  return (
    <div className="donate-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Other Ways to Give', isClickable: true, onClick: () => navigate('/other-ways-to-give') },
            { label: 'Donate', isClickable: false }
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrDonateForm
            title="Make a Donation Today"
            onVinylCircleClick={handleVinylCircleClick}
          />
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

          {/* Events Section */}
          <div style={{ marginTop: 'var(--cr-space-6)' }}>
            <CrPageHeader
              title="Upcoming Event"
              titleTag="h3"
              titleSize="sm"
              showEyebrow={false}
              showActionButton={true}
              actionButtonText="All Events"
              actionButtonIcon={<PiCalendarDots />}
              actionButtonSize="small"
              onActionClick={() => navigate('/events')}
            />
            {events && events[0] && (
              <CrCard
                variant="small"
                bannerHeight="short"
                textLayout="stacked"
                bannerBackgroundColor="none"
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
                showTicketButton={false}
                onClick={() => handleEventClick(events[0])}
              />
            )}
          </div>

          <div style={{ marginTop: 'var(--cr-space-6)' }}>
            <CrAdSpace size="medium-rectangle" />
          </div>

          {/* Articles Section */}
          <div className="cr-bg-rice-d100" style={{ padding: 'var(--cr-space-6)', marginTop: 'var(--cr-space-6)' }}>
            <CrPageHeader
              title="Recent Article"
              titleTag="h3"
              titleSize="sm"
              showEyebrow={false}
              showActionButton={true}
              actionButtonText="All Articles"
              actionButtonIcon={<PiReadCvLogo />}
              actionButtonSize="small"
              onActionClick={() => navigate('/articles')}
            />
            {articles && articles[0] && (
              <CrCard
                variant="small"
                type="article"
                bannerHeight="short"
                textLayout="stacked"
                bannerBackgroundColor="none"
                backgroundImage={articles[0].featuredImage}
                preheader={articles[0].category}
                title={articles[0].title}
                authorBy={`by ${articles[0].author.name}`}
                eventDate={new Date(articles[0].publishedDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                showTicketButton={false}
                onClick={() => handleArticleClick(articles[0])}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonatePage
