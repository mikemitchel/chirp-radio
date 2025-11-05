// src/pages/DJSchedulePage.tsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import CrPageHeader from '../stories/CrPageHeader'
import CrDjSchedule from '../stories/CrDjSchedule'
import CrDjOverview from '../stories/CrDjOverview'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import CrCard from '../stories/CrCard'
import {
  useRegularDJs,
  useSiteSettings,
  useArticles,
  useEvents,
  usePodcasts,
  useShowSchedules,
} from '../hooks/useData'
import { downloadDJShowCalendar } from '../utils/calendar'
import { formatShowTime, prepareShowTimes } from '../utils/formatShowTime'
import { useAuth } from '../hooks/useAuth'
import { useNotification } from '../contexts/NotificationContext'
import type { Member } from '../types/cms'

const DJSchedulePage: React.FC = () => {
  const navigate = useNavigate()
  const { user: loggedInUser } = useAuth()
  const { showToast } = useNotification()
  const currentUser = loggedInUser
  const { data: regularDJs } = useRegularDJs()
  const { data: siteSettings } = useSiteSettings()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()
  const { data: showSchedules } = useShowSchedules()

  // Use Members data for DJs - NO MOCK DATA FALLBACK
  const djList = useMemo(() => {
    return regularDJs || []
  }, [regularDJs])

  // Transform CMS schedule data to component format
  const scheduleData = useMemo(() => {
    if (!showSchedules || showSchedules.length === 0) {
      return {}
    }

    // Helper to convert time to "06:00" format (handles both ISO dates and "6:00 AM" format)
    const convertTo24Hour = (timeStr: string): string => {
      // Try to parse as ISO date first
      const date = new Date(timeStr)
      if (!isNaN(date.getTime())) {
        const hours = date.getHours()
        const minutes = date.getMinutes()
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
      }

      // Fall back to parsing "6:00 AM" format
      const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
      if (!match) return timeStr

      let hours = parseInt(match[1])
      const minutes = match[2]
      const period = match[3].toUpperCase()

      if (period === 'PM' && hours !== 12) hours += 12
      if (period === 'AM' && hours === 12) hours = 0

      return `${hours.toString().padStart(2, '0')}:${minutes}`
    }

    // Helper to determine time of day
    const getTimeOfDay = (time24: string): string => {
      const hour = parseInt(time24.split(':')[0])
      if (hour < 9) return 'Early'
      if (hour < 17) return 'Daytime'
      return 'Evening'
    }

    // Helper to create slug
    const createSlug = (text: string): string => {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    }

    // Group by day (starting with Sunday)
    const grouped: Record<string, any[]> = {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    }

    showSchedules
      .filter((schedule) => schedule.isActive !== false)
      .forEach((schedule) => {
        const dayName = schedule.dayOfWeek.charAt(0).toUpperCase() + schedule.dayOfWeek.slice(1)
        const start24 = convertTo24Hour(schedule.startTime)
        const end24 = convertTo24Hour(schedule.endTime)

        // Handle Music Mix slots differently
        let djName: string
        let showName: string | null

        if (schedule.isMusicMix) {
          // Music Mix slot - no DJ, show CHIRP
          djName = 'CHIRP'
          showName = 'Music Mix'
        } else {
          // Regular DJ slot - get show name from DJ relationship
          const dj = schedule.dj as Member
          djName =
            typeof dj === 'object' && dj !== null ? dj.djName || dj.firstName || 'CHIRP' : 'CHIRP'

          showName = typeof dj === 'object' && dj !== null ? dj.showName : null
        }

        grouped[dayName].push({
          slug: createSlug(showName || djName || 'show'),
          dj: [djName],
          title: showName || null,
          start: start24,
          end: end24,
          timeOfDay: getTimeOfDay(start24),
        })
      })

    // Sort each day by start time
    Object.keys(grouped).forEach((day) => {
      grouped[day].sort((a, b) => a.start.localeCompare(b.start))
    })

    return grouped
  }, [showSchedules])

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
        <CrDjSchedule scheduleData={scheduleData} currentUser={loggedInUser} djsData={djList} />
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
                showTime={formatShowTime(dj.showTime)}
                showTimes={prepareShowTimes(dj.showTime, dj.djName, dj.showName, () => {
                  showToast({
                    message: 'Unable to create calendar event. Please check the show time format.',
                    type: 'error',
                    duration: 5000,
                  })
                })}
                description={dj.description}
                imageSrc={dj.imageSrc}
                isFavorite={currentUser?.favoriteDJs?.includes(dj.id)}
                onAddToCalendarClick={() => {
                  try {
                    downloadDJShowCalendar({
                      djName: dj.djName,
                      showName: dj.showName,
                      showTime: dj.showTime,
                    })
                  } catch {
                    showToast({
                      message:
                        'Unable to create calendar event. Please check the show time format.',
                      type: 'error',
                      duration: 5000,
                    })
                  }
                }}
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
              textureBackground={
                'backgroundColor' in siteSettings.scheduleSidebarAnnouncement
                  ? ((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>)
                      .backgroundColor as string)
                  : undefined
              }
              headlineText={
                'title' in siteSettings.scheduleSidebarAnnouncement
                  ? ((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>)
                      .title as string)
                  : ((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>)
                      .headlineText as string)
              }
              bodyText={
                'message' in siteSettings.scheduleSidebarAnnouncement
                  ? ((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>)
                      .message as string)
                  : ((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>)
                      .bodyText as string)
              }
              showLink={
                !!(siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>).ctaText
              }
              linkText={
                'ctaText' in siteSettings.scheduleSidebarAnnouncement
                  ? ((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>)
                      .ctaText as string)
                  : undefined
              }
              linkUrl={
                'ctaUrl' in siteSettings.scheduleSidebarAnnouncement
                  ? ((siteSettings.scheduleSidebarAnnouncement as Record<string, unknown>)
                      .ctaUrl as string)
                  : undefined
              }
              buttonCount="none"
            />
          )}

          {/* Content Cards based on CMS settings */}
          {siteSettings?.scheduleSidebarContentType &&
            siteSettings.scheduleSidebarContentType !== 'none' &&
            (() => {
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
                    else if (contentType === 'podcasts')
                      navigate(`/podcasts/${item.slug || item.id}`)
                  }}
                />
              ))
            })()}

          {/* Advertisement from CMS */}
          {siteSettings?.scheduleSidebarAdvertisement && (
            <CrAdSpace size="large-rectangle" adData={siteSettings.scheduleSidebarAdvertisement} />
          )}
        </div>
      </div>
    </div>
  )
}

export default DJSchedulePage
