// src/pages/AboutPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrDjOverview from '../stories/CrDjOverview'
import CrImageRow from '../stories/CrImageRow'

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <section className="about-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="about-content">
        <div className="about-left">
          <CrPageHeader showEyebrow={false} showButton={false} />
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
          <CrCard
            variant="article"
            imagePosition="left"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
          <CrImageRow />
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
          <CrCard
            variant="article"
            imagePosition="none"
          />
        </div>

        <div className="about-right">
          <CrPageHeader showEyebrow={false} showButton={false} />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
          <CrDjOverview large />
        </div>
      </div>
    </div>
  )
}

export default AboutPage
