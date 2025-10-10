// src/pages/ContactPage.tsx
import React from 'react'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import contactData from '../data/contact.json'
import { useAnnouncements } from '../hooks/useData'

const ContactPage: React.FC = () => {
  const { data: announcements } = useAnnouncements()

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
              contentSummary={`${contactData.socialMedia.description}\n\n${contactData.socialMedia.platforms.map(p => `${p.name}: ${p.handle}`).join('\n')}`}
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
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
