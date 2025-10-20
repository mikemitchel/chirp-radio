// src/pages/DJPage.tsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import {
  useAnnouncements,
  useScheduledDJs,
  useSubstituteDJs,
  useCurrentUser,
} from '../hooks/useData'
import { useAuth } from '../hooks/useAuth'
import { downloadDJShowCalendar } from '../utils/calendar'

const DJPage: React.FC = () => {
  const { data: announcements } = useAnnouncements()
  const { data: scheduledDJs } = useScheduledDJs()
  const { data: substituteDJs } = useSubstituteDJs()
  const { data: currentUser } = useCurrentUser()
  const { user: loggedInUser } = useAuth()
  const navigate = useNavigate()

  // Sort DJs alphabetically by name, and update logged-in user's data if they're viewing their own profile
  const sortedDJs = useMemo(() => {
    if (!scheduledDJs) return []

    // Map DJs and overlay logged-in user's data if applicable
    const updatedDJs = scheduledDJs.map((dj) => {
      if (loggedInUser && loggedInUser.role === 'dj' && dj.id === 'dj-001') {
        const djName = loggedInUser.djName || dj.djName
        const userSlug = djName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')

        return {
          ...dj,
          slug: userSlug,
          djName,
          showName: loggedInUser.showName || dj.showName,
          showTime: loggedInUser.showTime || dj.showTime,
          description: loggedInUser.djExcerpt || dj.description,
          imageSrc: loggedInUser.avatar || dj.imageSrc,
          fullProfileImage:
            loggedInUser.fullProfileImage || loggedInUser.avatar || dj.fullProfileImage,
          profileImageOrientation: loggedInUser.profileImageOrientation || 'square',
        }
      }
      return dj
    })

    return [...updatedDJs].sort((a, b) => a.djName.localeCompare(b.djName))
  }, [scheduledDJs, loggedInUser])

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
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 'var(--cr-space-4)',
            marginTop: 'var(--cr-space-4)',
          }}
        >
          {substituteDJs &&
            substituteDJs.map((dj) => {
              // Update substitute DJ data if it's the logged-in user
              let displayDJ = dj
              if (loggedInUser && loggedInUser.role === 'dj' && dj.id === 'dj-001') {
                const djName = loggedInUser.djName || dj.djName
                const userSlug = djName
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, '-')
                  .replace(/^-+|-+$/g, '')

                displayDJ = {
                  ...dj,
                  slug: userSlug,
                  djName,
                  imageSrc: loggedInUser.avatar || dj.imageSrc,
                }
              }

              return (
                <div
                  key={dj.id}
                  onClick={() => navigate(`/djs/${displayDJ.slug}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <CrDjOverview
                    size="small"
                    djName={displayDJ.djName}
                    imageSrc={displayDJ.imageSrc}
                    isFavorite={currentUser?.favoriteDJs?.includes(dj.id)}
                  />
                </div>
              )
            })}
        </div>
      </section>
    </div>
  )
}

export default DJPage
