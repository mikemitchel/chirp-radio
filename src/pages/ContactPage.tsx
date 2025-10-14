// src/pages/ContactPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrPageHeader from '../stories/CrPageHeader'
import contactData from '../data/contact.json'
import { useAnnouncements, useArticles, useEvents } from '../hooks/useData'

const ContactPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: announcements } = useAnnouncements()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()

  const handleArticleClick = (article: any) => {
    navigate(`/articles/${article.id}`, { state: { article } })
  }

  const handleEventClick = (event: any) => {
    navigate(`/events/${event.id}`, { state: { event } })
  }

  return (
    <div className="contact-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="GET IN TOUCH"
            title="Contact CHIRP Radio"
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={contactData.introText.join('\n\n')}
            backgroundImage={contactData.heroImage}
          />

          <div className="grid-masonry">
            {contactData.contactMethods.map((method) => (
              <CrCard
                key={method.id}
                variant="article"
                type="page"
                imagePosition="none"
                preheader=""
                title={method.title}
                bannerHeight="narrow"
                textLayout="inline"
                showTicketButton={false}
                showShareButton={false}
                content={method.content}
                contentSummary={method.contentSummary}
                backgroundImage={method.backgroundImage}
              />
            ))}

            <CrCard
              variant="article"
              type="page"
              imagePosition="none"
              preheader=""
              title={contactData.studioAddress.title}
              bannerHeight="narrow"
              textLayout="inline"
              showTicketButton={false}
              showShareButton={false}
              contentSummary={`${contactData.studioAddress.address}\n\n${contactData.studioAddress.note}`}
              backgroundImage={contactData.studioAddress.image}
            />

            <CrCard
              variant="article"
              type="page"
              imagePosition="none"
              preheader=""
              title={contactData.socialMedia.title}
              bannerHeight="narrow"
              textLayout="inline"
              showTicketButton={false}
              showShareButton={false}
              contentSummary={`${contactData.socialMedia.description}\n\n${contactData.socialMedia.platforms.map((p) => `${p.name}: ${p.handle}`).join('\n')}`}
              backgroundImage="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop"
            />
          </div>
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[1] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[1].backgroundColor}
              headlineText={announcements[1].title}
              bodyText={announcements[1].message}
              showLink={!!announcements[1].ctaText}
              linkText={announcements[1].ctaText}
              linkUrl={announcements[1].ctaUrl}
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
                  minute: '2-digit',
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
          <div
            className="cr-bg-rice-d100"
            style={{ padding: 'var(--cr-space-6)', marginTop: 'var(--cr-space-6)' }}
          >
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
                  year: 'numeric',
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

export default ContactPage
