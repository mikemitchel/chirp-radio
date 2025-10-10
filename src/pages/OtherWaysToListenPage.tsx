// src/pages/OtherWaysToListenPage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import waysToListenData from '../data/waysToListen.json'
import { useAnnouncements } from '../hooks/useData'

const OtherWaysToListenPage: React.FC = () => {
  const [section1, section2] = waysToListenData.sections
  const { data: announcements } = useAnnouncements()

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
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default OtherWaysToListenPage
