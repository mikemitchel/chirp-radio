// src/pages/BecomeVolunteerPage.tsx
import React from 'react'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrButton from '../stories/CrButton'
import { PiArrowRight } from 'react-icons/pi'
import volunteerData from '../data/volunteer.json'
import { useAnnouncements } from '../hooks/useData'

const BecomeVolunteerPage: React.FC = () => {
  const { data: announcements } = useAnnouncements()

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
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default BecomeVolunteerPage
