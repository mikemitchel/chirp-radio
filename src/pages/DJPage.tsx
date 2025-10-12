// src/pages/DJPage.tsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import { useAnnouncements, useScheduledDJs, useSubstituteDJs, useCurrentUser } from '../hooks/useData'

const DJPage: React.FC = () => {
  const { data: announcements } = useAnnouncements()
  const { data: scheduledDJs } = useScheduledDJs()
  const { data: substituteDJs } = useSubstituteDJs()
  const { data: currentUser } = useCurrentUser()
  const navigate = useNavigate()

  // Sort DJs alphabetically by name
  const sortedDJs = useMemo(() => {
    if (!scheduledDJs) return []
    return [...scheduledDJs].sort((a, b) => a.djName.localeCompare(b.djName))
  }, [scheduledDJs])


  return (
    <div className="dj-page">
      <section className="page-container">
        <CrPageHeader title="DJs" showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <div className="grid-2col-equal">
            {sortedDJs.map((dj) => (
              <CrDjOverview
                key={dj.id}
                size="medium"
                djName={dj.djName}
                content={dj.showName}
                showTime={dj.showTime}
                description={dj.description}
                imageSrc={dj.imageSrc}
                isFavorite={currentUser?.favoriteDJs?.includes(dj.id)}
                onMoreClick={() => navigate(`/djs/${dj.id}`)}
              />
            ))}
          </div>
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[0] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={announcements[0].backgroundColor}
              headlineText={announcements[0].title}
              bodyText={announcements[0].message}
              showLink={!!announcements[0].ctaText}
              linkText={announcements[0].ctaText}
              linkUrl={announcements[0].ctaUrl}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>

      <section className="page-container" style={{ marginTop: 'var(--cr-space-8)' }}>
        <CrPageHeader title="Substitute DJs" showEyebrow={false} showActionButton={false} />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 'var(--cr-space-4)',
          marginTop: 'var(--cr-space-4)'
        }}>
          {substituteDJs && substituteDJs.map((dj) => (
            <div key={dj.id} onClick={() => navigate(`/djs/${dj.id}`)} style={{ cursor: 'pointer' }}>
              <CrDjOverview
                size="small"
                djName={dj.djName}
                imageSrc={dj.imageSrc}
                isFavorite={currentUser?.favoriteDJs?.includes(dj.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DJPage
