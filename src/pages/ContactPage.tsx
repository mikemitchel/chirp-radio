// src/pages/ContactPage.tsx
import React from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import CrAnnouncement from '../stories/CrAnnouncement'

const ContactPage: React.FC = () => {
  return (
    <div className="contact-page">
      <section className="contact-header">
        <CrPageHeader showEyebrow={false} showActionButton={false} />
      </section>

      <div className="contact-content">
        <div className="contact-left">
          <CrCard
            variant="article"
            imagePosition="right"
            articleImageAspectRatio="16:9"
            captionPosition="bottom"
          />
          <div className="contact-general-content">
            <p>General content</p>
          </div>
          <div className="contact-form">
            <p>Contact form</p>
          </div>
          <div className="contact-info-grid">
            <div className="contact-info-item">
              <p>General content</p>
            </div>
            <div className="contact-info-item">
              <p>General content</p>
            </div>
          </div>
          <div className="contact-info-grid-3col">
            <div className="contact-info-item">
              <p>General content</p>
            </div>
            <div className="contact-info-item">
              <p>General content</p>
            </div>
            <div className="contact-info-item">
              <p>General content</p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
          />
          <CrPageHeader showEyebrow={false} />
          <CrCard variant="small" />
          <CrCard variant="small" />
          <CrCard variant="small" />
        </div>
      </div>
    </div>
  )
}

export default ContactPage
