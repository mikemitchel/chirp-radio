// src/pages/BecomeVolunteerPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrButton from '../stories/CrButton'
import CrPageHeader from '../stories/CrPageHeader'
import { PiArrowRight, PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import volunteerData from '../data/volunteer.json'
import { useAnnouncements, useArticles, useEvents } from '../hooks/useData'

const BecomeVolunteerPage: React.FC = () => {
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
    <div className="become-volunteer-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="JOIN OUR TEAM"
            title="Become a CHIRP Volunteer"
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={volunteerData.introText.join('\n\n')}
            backgroundImage={volunteerData.heroImage}
          />

          {/* Call to Action */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title={volunteerData.callToAction.title}
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={true}
            showShareButton={false}
            bannerButtonText={volunteerData.callToAction.buttonText}
            bannerButtonIcon={<PiArrowRight />}
            onBannerTicketClick={() => window.open(volunteerData.callToAction.buttonUrl, '_blank')}
            contentSummary={`${volunteerData.callToAction.description}\n\n${volunteerData.callToAction.note}`}
            backgroundImage="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop"
          />

          {/* Departments Grid */}
          <div className="grid-masonry">
            {volunteerData.departments.map((dept) => (
              <CrCard
                key={dept.id}
                variant="article"
                type="page"
                imagePosition="none"
                preheader=""
                title={dept.title}
                bannerHeight="narrow"
                textLayout="inline"
                showTicketButton={false}
                showShareButton={false}
                content={dept.content}
                contentSummary={dept.contentSummary}
                backgroundImage={dept.backgroundImage}
              />
            ))}
          </div>

          {/* Benefits Section */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="none"
            preheader=""
            title={volunteerData.benefits.title}
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={`${volunteerData.benefits.description}\n\n${volunteerData.benefits.items.map(item => `• ${item}`).join('\n')}`}
            backgroundImage="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop"
          />

          {/* Commitment Section */}
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader=""
            title={volunteerData.commitment.title}
            bannerHeight="narrow"
            textLayout="inline"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={volunteerData.commitment.content}
            backgroundImage={volunteerData.commitment.image}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[4] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[4].backgroundColor}
              headlineText={announcements[4].title}
              bodyText={announcements[4].message}
              showLink={!!announcements[4].ctaText}
              linkText={announcements[4].ctaText}
              linkUrl={announcements[4].ctaUrl}
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

export default BecomeVolunteerPage
