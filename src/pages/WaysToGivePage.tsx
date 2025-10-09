// src/pages/WaysToGivePage.tsx
import React from 'react'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrDonateForm from '../stories/CrDonateForm'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import waysToGiveData from '../data/waysToGive.json'

const WaysToGivePage: React.FC = () => {
  const [section1, section2] = waysToGiveData.sections

  return (
    <div className="ways-to-give-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'Donate', isClickable: true },
            { label: 'Ways to Give', isClickable: false }
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            preheader="DONATE TO CHIRP"
            title="Ways to Give"
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
                  imagePosition="none"
                  preheader=""
                  title={card.title}
                  bannerHeight="narrow"
                  textLayout="inline"
                  showTicketButton={false}
                  showShareButton={false}
                  contentSummary={card.contentSummary}
                  backgroundImage={card.backgroundImage}
                />
              ))}
            </div>
          </div>
          <CrCard
            variant="article"
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
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrPlaylistTable showHeader={true} groupByHour={true} />
        </div>
      </div>
    </div>
  )
}

export default WaysToGivePage
