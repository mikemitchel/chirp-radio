// src/pages/OtherWaysToGivePage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import waysToGiveData from '../data/waysToGive.json'
import { useAnnouncements } from '../hooks/useData'

const OtherWaysToGivePage: React.FC = () => {
  const [section1, section2] = waysToGiveData.sections
  const { data: announcements } = useAnnouncements()

  return (
    <div className="ways-to-give-page">
      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="page"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="DONATE TO CHIRP"
            title="Other Ways to Give"
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showTicketButton={false}
            showShareButton={false}
            contentSummary={waysToGiveData.introText.join('\n\n')}
            backgroundImage={section1.image}
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
              {waysToGiveData.donationCards.map((card) => (
                <CrCard
                  key={card.id}
                  variant="article"
                  type="page"
                  imagePosition="none"
                  preheader=""
                  title={card.title}
                  bannerHeight="narrow"
                  textLayout="inline"
                  showTicketButton={false}
                  showShareButton={false}
                  content={card.content}
                  contentSummary={card.contentSummary}
                  backgroundImage={card.backgroundImage}
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
            title={waysToGiveData.vinylCircle.title}
            contentSummary={waysToGiveData.vinylCircle.contentSummary}
            backgroundImage={waysToGiveData.vinylCircle.backgroundImage}
            showTicketButton={false}
            showShareButton={false}
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
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>
    </div>
  )
}

export default OtherWaysToGivePage
