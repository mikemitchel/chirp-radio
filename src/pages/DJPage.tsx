// src/pages/DJPage.tsx
import React from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import {
  useAnnouncements,
  useRegularDJs,
  useSubstituteDJs,
} from '../hooks/useData'
import { useAuth } from '../hooks/useAuth'
import { downloadDJShowCalendar } from '../utils/calendar'

const DJPage: React.FC = () => {
  const { data: announcements } = useAnnouncements()
  const { data: regularDJs, loading: regularDJsLoading } = useRegularDJs()
  const { data: substituteDJs, loading: substituteDJsLoading } = useSubstituteDJs()
  const { user: loggedInUser } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="dj-page">
      <section className="page-container">
        <CrPageHeader title="DJs" showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          {regularDJsLoading && <div style={{ padding: '2rem', textAlign: 'center' }}>Loading DJs from CMS...</div>}
          {!regularDJsLoading && (!regularDJs || regularDJs.length === 0) && (
            <div style={{ padding: '2rem', textAlign: 'center' }}>No Regular DJs found in CMS</div>
          )}
          <div className="grid-2col-equal">
            {regularDJs?.map((dj) => (
              <CrDjOverview
                key={dj.id}
                size="medium"
                djName={dj.djName}
                content={dj.showName}
                showTime={dj.showTime}
                description={dj.excerpt}
                imageSrc={dj.imageSrc}
                isFavorite={loggedInUser?.favoriteDJs?.includes(dj.id)}
                onMoreClick={() => navigate(`/djs/${dj.slug}`)}
                onAddToCalendarClick={() =>
                  downloadDJShowCalendar({
                    djName: dj.djName,
                    showName: dj.showName,
                    showTime: dj.showTime,
                  })
                }
              />
            ))}
          </div>
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {announcements && announcements[0] && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={('backgroundColor' in announcements[0] ? (announcements[0] as Record<string, unknown>).backgroundColor as string : undefined)}
              headlineText={('title' in announcements[0] ? (announcements[0] as Record<string, unknown>).title as string : announcements[0].headlineText)}
              bodyText={('message' in announcements[0] ? (announcements[0] as Record<string, unknown>).message as string : typeof announcements[0].bodyText === 'string' ? announcements[0].bodyText : undefined)}
              showLink={!!announcements[0].ctaText}
              linkText={('ctaText' in announcements[0] ? (announcements[0] as Record<string, unknown>).ctaText as string : undefined)}
              linkUrl={('ctaUrl' in announcements[0] ? (announcements[0] as Record<string, unknown>).ctaUrl as string : undefined)}
              buttonCount="none"
            />
          )}
          <CrAdSpace size="large-rectangle" />
        </div>
      </div>

      <section className="page-container" style={{ marginTop: 'var(--cr-space-8)' }}>
        <CrPageHeader title="Substitute DJs" showEyebrow={false} showActionButton={false} />
        {substituteDJsLoading && <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Substitute DJs from CMS...</div>}
        {!substituteDJsLoading && (!substituteDJs || substituteDJs.length === 0) && (
          <div style={{ padding: '2rem', textAlign: 'center' }}>No Substitute DJs found in CMS</div>
        )}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 'var(--cr-space-4)',
            marginTop: 'var(--cr-space-4)',
          }}
        >
          {substituteDJs?.map((dj) => (
            <div
              key={dj.id}
              onClick={() => navigate(`/djs/${dj.slug}`)}
              style={{ cursor: 'pointer' }}
            >
              <CrDjOverview
                size="small"
                djName={dj.djName}
                imageSrc={dj.imageSrc}
                isFavorite={loggedInUser?.favoriteDJs?.includes(dj.id)}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DJPage
