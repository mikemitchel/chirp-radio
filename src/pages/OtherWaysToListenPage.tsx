// src/pages/OtherWaysToListenPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import { PiCalendarDots, PiReadCvLogo } from 'react-icons/pi'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import waysToListenData from '../data/waysToListen.json'
import { useAnnouncements, useArticles, useEvents } from '../hooks/useData'

const OtherWaysToListenPage: React.FC = () => {
  const navigate = useNavigate()
  const [section1, section2] = waysToListenData.sections
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
    <div className="ways-to-listen-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="LISTEN TO CHIRP"
            title="Other Ways to Listen"
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={waysToListenData.introText.join('\n\n')}
            backgroundImage={waysToListenData.heroImage}
          />

          <div className="grid-2col-equal">
            <div>
              <CrCard
                variant="article"
                type="page"
                imagePosition="none"
                preheader=""
                title={section1.title}
                bannerHeight="narrow"
                textLayout="inline"
                showTicketButton={false}
                showShareButton={false}
                contentSummary={`${section1.description}\n\n${section1.items.join('\n')}`}
                backgroundImage={section1.image}
              />
              <CrCard
                variant="article"
                type="page"
                imagePosition="none"
                preheader=""
                title={section2.title}
                bannerHeight="narrow"
                textLayout="inline"
                showTicketButton={false}
                showShareButton={false}
                contentSummary={`${section2.description}\n\n${section2.items.join('\n')}\n\n${section2.footer}`}
                backgroundImage={section2.image}
              />
            </div>
            <div>
              {waysToListenData.listeningOptions.map((option) => (
                <CrCard
                  key={option.id}
                  variant="article"
                  type="page"
                  imagePosition="none"
                  preheader=""
                  title={option.title}
                  bannerHeight="narrow"
                  textLayout="inline"
                  showTicketButton={false}
                  showShareButton={false}
                  content={option.content}
                  contentSummary={option.contentSummary}
                  backgroundImage={option.backgroundImage}
                />
              ))}
            </div>
          </div>
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader=""
            title={waysToListenData.podcast.title}
            contentSummary={waysToListenData.podcast.contentSummary}
            backgroundImage={waysToListenData.podcast.backgroundImage}
            showTicketButton={false}
            showShareButton={false}
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[3] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[3].backgroundColor}
              headlineText={announcements[3].title}
              bodyText={announcements[3].message}
              showLink={!!announcements[3].ctaText}
              linkText={announcements[3].ctaText}
              linkUrl={announcements[3].ctaUrl}
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

export default OtherWaysToListenPage
