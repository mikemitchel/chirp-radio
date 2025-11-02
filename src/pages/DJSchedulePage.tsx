// src/pages/DJSchedulePage.tsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjSchedule from '../stories/CrDjSchedule'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrCard from '../stories/CrCard'
import { useRegularDJs, useDJs, useSiteSettings, useArticles, useEvents, usePodcasts } from '../hooks/useData'
import { downloadDJShowCalendar } from '../utils/calendar'
import { useAuth } from '../hooks/useAuth'

// Import mock schedule data from stories file
import { mockScheduleData } from '../stories/CrDjSchedule.stories'

const DJSchedulePage: React.FC = () => {
  const navigate = useNavigate()
  const { user: loggedInUser } = useAuth()
  const currentUser = loggedInUser
  const { data: regularDJs } = useRegularDJs()
  const { data: legacyDJs } = useDJs()
  const { data: siteSettings } = useSiteSettings()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()

  // Use Members data for DJs - NO MOCK DATA FALLBACK
  const djList = useMemo(() => {
    return regularDJs || []
  }, [regularDJs])

  // Get 8 random DJs
  const randomDJs = useMemo(() => {
    const shuffled = [...djList].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 8)
  }, [djList])

  return (
    <div className="dj-schedule-page">
      <section className="page-container">
        <CrPageHeader title="DJ Schedule" showEyebrow={false} showActionButton={false} />
      </section>

      <section className="page-container">
        <CrDjSchedule scheduleData={mockScheduleData} currentUser={loggedInUser} djsData={djList} />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrPageHeader
            title="Discover DJs"
            showEyebrow={false}
            showActionButton={false}
            titleTag="h2"
            titleSize="lg"
          />
          <div className="grid-2col-equal">
            {randomDJs.map((dj) => (
              <CrDjOverview
                key={dj.id}
                size="medium"
                djName={dj.djName}
                content={dj.showName}
                showTime={dj.showTime}
                description={dj.description}
                imageSrc={dj.imageSrc}
                isFavorite={currentUser?.favoriteDJs?.includes(dj.id)}
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
          {/* Announcement from CMS */}
          {siteSettings?.scheduleSidebarAnnouncement && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={('backgroundColor' in siteSettings.scheduleSidebarAnnouncement ? (siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).backgroundColor as string : undefined)}
              headlineText={('title' in siteSettings.scheduleSidebarAnnouncement ? (siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).title as string : (siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).headlineText as string)}
              bodyText={('message' in siteSettings.scheduleSidebarAnnouncement ? (siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).message as string : (siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).bodyText as string)}
              showLink={!!((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).ctaText)}
              linkText={('ctaText' in siteSettings.scheduleSidebarAnnouncement ? (siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).ctaText as string : undefined)}
              linkUrl={('ctaUrl' in siteSettings.scheduleSidebarAnnouncement ? (siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).ctaUrl as string : undefined)}
              buttonCount="none"
            />
          )}

          {/* Content Cards based on CMS settings */}
          {siteSettings?.scheduleSidebarContentType && siteSettings.scheduleSidebarContentType !== 'none' && (() => {
            const contentType = siteSettings.scheduleSidebarContentType
            const count = parseInt(siteSettings.scheduleSidebarContentCount || '3')
            let contentItems: any[] = []

            if (contentType === 'articles') {
              contentItems = articles?.slice(0, count) || []
            } else if (contentType === 'events') {
              contentItems = events?.slice(0, count) || []
            } else if (contentType === 'podcasts') {
              contentItems = podcasts?.slice(0, count) || []
            }

            return contentItems.map((item, index) => (
              <CrCard
                key={item.id || index}
                variant="article"
                cardSize="small"
                imagePosition="top"
                title={item.title}
                excerpt={item.excerpt}
                content={item.excerpt}
                backgroundImage={typeof item.image === 'string' ? item.image : item.image?.url}
                onClick={() => {
                  if (contentType === 'articles') navigate(`/articles/${item.slug || item.id}`)
                  else if (contentType === 'events') navigate(`/events/${item.slug || item.id}`)
                  else if (contentType === 'podcasts') navigate(`/podcasts/${item.slug || item.id}`)
                }}
              />
            ))
          })()}

          {/* Advertisement from CMS */}
          {siteSettings?.scheduleSidebarAdvertisement && (
            <CrAdSpace
              size="large-rectangle"
              adData={siteSettings.scheduleSidebarAdvertisement}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default DJSchedulePage
