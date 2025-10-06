// src/pages/LandingPage.tsx
import React from 'react'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCard from '../stories/CrCard'
import CrCurrentDjCard from '../stories/CrCurrentDjCard'
import CrAdSpace from '../stories/CrAdSpace'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import '../styles/landing-page.css'

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Top Announcement */}
      <section className="landing-announcement-top">
        <CrAnnouncement
          variant="donation"
          textureBackground="cr-br-natural-a500"
        />
      </section>

      {/* Main Content Area */}
      <section className="landing-main-content">
        <div className="landing-main-left">
          <CrCard
            variant="default"
            backgroundImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
            imageCaption="Photo credit - John Dough"
            preheader="Featured Event"
            title="Live Music Tonight"
            dateTime="Oct 6, 2025 @ 9:00pm"
            venue="Lincoln Hall"
            ageRestriction="21+"
            contentSummary="Join us for an unforgettable night of live music featuring local bands and special guests. Doors open at 8pm."
            bannerButtonText="Buy Tickets"
            shareButtonText="Share"
          />
        </div>

        <div className="landing-main-right">
          <CrCurrentDjCard />

          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-br-natural-a100"
          />

          <CrAdSpace
            size="custom"
            customHeight="50px"
          />
        </div>
      </section>

      {/* TBD Section */}
      <section className="landing-tbd">
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          backgroundColor: '#f0f0f0'
        }}>
          <h2>TBD</h2>
        </div>
      </section>

      {/* Grid Section */}
      <section className="landing-grid">
        <div className="landing-grid-left">
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="narrow" backgroundImage="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=300&fit=crop" />
          <CrCard variant="narrow" backgroundImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop" />
          <CrCard variant="narrow" backgroundImage="https://images.unsplash.com/photo-1501612780327-45045538702b?w=400&h=300&fit=crop" />
        </div>

        <div className="landing-grid-middle">
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" backgroundImage="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop" />
          <CrCard variant="small" backgroundImage="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop" />
          <CrCard variant="small" backgroundImage="https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop" />
          <CrCard variant="small" backgroundImage="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&h=300&fit=crop" />
        </div>

        <div className="landing-grid-right">
          <CrPageHeader showEyebrow={false} />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
          <CrDjOverview medium />
        </div>
      </section>

      {/* Bottom Announcement */}
      <section className="landing-announcement-bottom">
        <CrAnnouncement
          variant="motivation"
          textureBackground="cr-br-natural-a100"
        />
      </section>
    </div>
  )
}

export default LandingPage
