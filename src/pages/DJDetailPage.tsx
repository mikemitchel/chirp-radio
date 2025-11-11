// src/pages/DJDetailPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { PiHeart, PiHeartFill, PiCalendarPlus } from 'react-icons/pi'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrCard from '../stories/CrCard'
import CrPreviousShows from '../stories/CrPreviousShows'
import CrDjDonation from '../stories/CrDjDonation'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrAdSpace from '../stories/CrAdSpace'
import {
  useRegularDJs,
  useSubstituteDJs,
  useSiteSettings,
  useArticles,
  useEvents,
  usePodcasts,
  useShowSchedules,
} from '../hooks/useData'
import { useLoginRequired } from '../hooks/useLoginRequired'
import { useAuth } from '../hooks/useAuth'
import { useNotification } from '../contexts/NotificationContext'
import { downloadDJShowCalendar } from '../utils/calendar'
import LoginRequiredModal from '../components/LoginRequiredModal'
import { useMemo } from 'react'
import type { Member } from '../types/cms'

const DJDetailPage: React.FC = () => {
  const navigate = useNavigate()
  const { id: slugOrId } = useParams()
  const { data: regularDJs } = useRegularDJs()
  const { data: substituteDJs } = useSubstituteDJs()
  const allDJs = useMemo(() => {
    return [...(regularDJs || []), ...(substituteDJs || [])]
  }, [regularDJs, substituteDJs])
  const { data: siteSettings } = useSiteSettings()
  const { data: articles } = useArticles()
  const { data: events } = useEvents()
  const { data: podcasts } = usePodcasts()
  const { data: showSchedules } = useShowSchedules()
  const { user: loggedInUser, updateFavoriteDJs } = useAuth()
  const { requireLogin, showLoginModal, handleLogin, handleSignUp, closeModal } = useLoginRequired()
  const { showToast } = useNotification()

  // Helper to convert ISO timestamp to "HH:MM AM/PM" format
  const convertISOToTimeString = (isoString: string): string => {
    try {
      const date = new Date(isoString)
      let hours = date.getHours()
      const minutes = date.getMinutes()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      hours = hours % 12 || 12 // Convert to 12-hour format
      const minutesStr = minutes.toString().padStart(2, '0')
      return `${hours}:${minutesStr} ${ampm}`
    } catch (error) {
      console.error('Error converting ISO to time string:', error)
      return isoString
    }
  }

  // Helper to format time compactly (e.g., "12:00 PM" -> "12n", "6:00 AM" -> "6am")
  const formatTime = (timeStr: string): string => {
    const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
    if (!match) return timeStr

    const hours = parseInt(match[1])
    const minutes = match[2]
    const period = match[3].toUpperCase()

    // Special cases for noon and midnight
    if (hours === 12 && minutes === '00') {
      return period === 'PM' ? '12n' : '12m'
    }

    // Format: "6am", "6:30am", "11pm", etc.
    const hourDisplay = hours === 12 ? 12 : hours
    const minuteDisplay = minutes === '00' ? '' : `:${minutes}`
    const ampm = period === 'AM' ? 'am' : 'pm'

    return `${hourDisplay}${minuteDisplay}${ampm}`
  }

  // Find the DJ by slug (or fall back to ID for backwards compatibility)
  let dj = allDJs?.find((d) => d.slug === slugOrId || d.id === slugOrId)

  // Get this DJ's schedule from CMS - returns array of schedule objects
  const djSchedules = useMemo(() => {
    if (!dj || !showSchedules || showSchedules.length === 0) {
      return []
    }

    // Find all schedules for this DJ
    const schedules = showSchedules.filter((schedule) => {
      if (!schedule.isActive) return false
      const scheduleDj = schedule.dj as Member
      return scheduleDj && scheduleDj.id?.toString() === dj.id
    })

    return schedules
  }, [dj, showSchedules])

  // Format schedule info for display
  const _djScheduleInfo = useMemo(() => {
    if (!dj) return ''

    if (djSchedules.length === 0) {
      // Fallback to DJ's showTime field if no schedules found
      // Parse and format if it's in "Day HH:MM AM/PM - HH:MM AM/PM" format
      const showTime = dj.showTime || ''
      if (!showTime) return ''

      // Try to parse and reformat legacy format like "Wed 12:00 PM - 2:00 PM"
      const match = showTime.match(
        /(\w{3,})\s+(\d{1,2}):?(\d{2})?\s*(AM|PM)\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)/i
      )
      if (match) {
        const day = match[1].substring(0, 3) // Take first 3 chars for abbreviation
        const startTime = formatTime(`${match[2]}:${match[3] || '00'} ${match[4]}`)
        const endTime = formatTime(`${match[5]}:${match[6] || '00'} ${match[7]}`)
        return `${day} ${startTime} - ${endTime}`
      }

      return showTime
    }

    // Format schedule times from CMS
    const dayNames: Record<string, string> = {
      monday: 'Mon',
      tuesday: 'Tue',
      wednesday: 'Wed',
      thursday: 'Thu',
      friday: 'Fri',
      saturday: 'Sat',
      sunday: 'Sun',
    }

    const scheduleStrings = djSchedules.map((schedule) => {
      const day = dayNames[schedule.dayOfWeek] || schedule.dayOfWeek
      // Convert ISO timestamps to "HH:MM AM/PM" format if needed
      const startTimeStr = schedule.startTime.includes('T')
        ? convertISOToTimeString(schedule.startTime)
        : schedule.startTime
      const endTimeStr = schedule.endTime.includes('T')
        ? convertISOToTimeString(schedule.endTime)
        : schedule.endTime
      const startTime = formatTime(startTimeStr)
      const endTime = formatTime(endTimeStr)
      return `${day} ${startTime} - ${endTime}`
    })

    return scheduleStrings.join(', ')
  }, [dj, djSchedules])

  // If viewing the logged-in user's DJ profile, use their current data from localStorage
  if (loggedInUser && loggedInUser.role === 'dj' && dj && dj.id === loggedInUser.id) {
    // Create slug from logged-in user's DJ name
    const userSlug = loggedInUser.djName
      ? loggedInUser.djName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '')
      : dj.slug

    dj = {
      ...dj,
      slug: userSlug,
      djName: loggedInUser.djName || dj.djName,
      showName: loggedInUser.showName || dj.showName,
      showTime: loggedInUser.showTime || dj.showTime,
      excerpt: loggedInUser.djExcerpt || dj.excerpt,
      description: loggedInUser.djBio || dj.description,
      donationLink: loggedInUser.djDonationLink || dj.donationLink,
      imageSrc: loggedInUser.avatar || dj.imageSrc,
      fullProfileImage: loggedInUser.fullProfileImage || loggedInUser.avatar || dj.fullProfileImage,
      profileImageOrientation: loggedInUser.profileImageOrientation || 'square',
    }
  }

  // Map orientation to aspect ratio for CrCard
  const getAspectRatio = (orientation: string | undefined): string => {
    switch (orientation) {
      case 'landscape':
        return '16:9'
      case 'portrait':
        return '9:16'
      case 'square':
      default:
        return '1:1'
    }
  }

  const imageAspectRatio = getAspectRatio(dj?.profileImageOrientation)

  // Track if this DJ is favorited
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    if (loggedInUser && dj) {
      setIsFavorite(loggedInUser.favoriteDJs?.includes(dj.id) || false)
    }
  }, [loggedInUser, dj])

  const handleFavoriteClick = () => {
    if (!dj) return

    requireLogin(() => {
      // Toggle favorite status
      const newFavoriteStatus = !isFavorite
      console.log(
        '[DJDetailPage] handleFavoriteClick - DJ:',
        dj.djName,
        'ID:',
        dj.id,
        'newFavoriteStatus:',
        newFavoriteStatus
      )
      setIsFavorite(newFavoriteStatus)

      // Update the user's favoriteDJs array
      updateFavoriteDJs(dj.id, newFavoriteStatus)

      console.log(`${newFavoriteStatus ? 'Favorited' : 'Unfavorited'} DJ:`, dj.djName)
    })
  }

  const handleShareClick = () => {
    const url = window.location.href
    if (navigator.share) {
      navigator
        .share({
          title: `${dj?.djName} - CHIRP Radio`,
          url: url,
        })
        .catch(() => {
          navigator.clipboard.writeText(url)
        })
    } else {
      navigator.clipboard.writeText(url)
    }
  }

  const handleDonateClick = () => {
    // In a real app, this would open a donation modal or redirect to donation page
    console.log(`Donating to DJ: ${dj?.djName}`)
  }

  const handleAddToCalendar = (showTime: string) => {
    if (!dj) return

    try {
      downloadDJShowCalendar({
        djName: dj.djName,
        showName: dj.showName,
        showTime: showTime,
      })
    } catch (_error) {
      showToast({
        message: 'Unable to create calendar event. Please check the show time format.',
        type: 'error',
        duration: 5000,
      })
    }
  }

  if (!dj) {
    return (
      <div className="dj-detail-page">
        <section className="page-container">
          <CrBreadcrumb
            items={[
              { label: 'DJs', isClickable: true, onClick: () => navigate('/djs') },
              { label: 'Not Found', isClickable: false },
            ]}
          />
          <p>DJ not found.</p>
        </section>
      </div>
    )
  }

  return (
    <div className="dj-detail-page">
      <section className="page-container">
        <CrBreadcrumb
          items={[
            { label: 'DJs', isClickable: true, onClick: () => navigate('/djs') },
            { label: dj.djName, isClickable: false },
          ]}
        />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrCard
            variant="article"
            type="dj"
            imagePosition="left"
            imageSize="large"
            backgroundImage={dj.fullProfileImage || dj.imageSrc}
            articleImageAspectRatio={imageAspectRatio}
            captionPosition="none"
            preheader="DJ Profile"
            title={dj.djName}
            titleTag="h1"
            titleSize="xl"
            bannerHeight="tall"
            textLayout="stacked"
            showName={dj.showName}
            scheduleInfo={
              (djSchedules.length > 0 || dj.showTime) && (
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}
                >
                  {djSchedules.length > 0
                    ? djSchedules.map((schedule, index) => {
                        const dayNames: Record<string, string> = {
                          monday: 'Mon',
                          tuesday: 'Tue',
                          wednesday: 'Wed',
                          thursday: 'Thu',
                          friday: 'Fri',
                          saturday: 'Sat',
                          sunday: 'Sun',
                        }
                        const day = dayNames[schedule.dayOfWeek] || schedule.dayOfWeek
                        // Convert ISO timestamps to "HH:MM AM/PM" format if needed
                        const startTimeStr = schedule.startTime.includes('T')
                          ? convertISOToTimeString(schedule.startTime)
                          : schedule.startTime
                        const endTimeStr = schedule.endTime.includes('T')
                          ? convertISOToTimeString(schedule.endTime)
                          : schedule.endTime
                        const startTime = formatTime(startTimeStr)
                        const endTime = formatTime(endTimeStr)
                        const showTimeFormatted = `${day} ${startTime} - ${endTime}`
                        const originalFormat = `${day} ${startTimeStr} - ${endTimeStr}`

                        return (
                          <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <span style={{ fontSize: '1rem', fontWeight: '500' }}>
                              {showTimeFormatted}
                            </span>
                            <button
                              onClick={() => handleAddToCalendar(originalFormat)}
                              aria-label={`Add ${showTimeFormatted} to calendar`}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1.25rem',
                                color: 'var(--cr-color-primary)',
                              }}
                            >
                              <PiCalendarPlus />
                            </button>
                          </div>
                        )
                      })
                    : // Handle legacy format with multiple shows from users.json
                      dj.showTime?.split(',').map((time, index) => {
                        const trimmedTime = time.trim()
                        const match = trimmedTime.match(
                          /(\w{3,})\s+(\d{1,2}):?(\d{2})?\s*(AM|PM)\s*-\s*(\d{1,2}):?(\d{2})?\s*(AM|PM)/i
                        )

                        if (!match) return null

                        const day = match[1].substring(0, 3)
                        const startTime = formatTime(`${match[2]}:${match[3] || '00'} ${match[4]}`)
                        const endTime = formatTime(`${match[5]}:${match[6] || '00'} ${match[7]}`)
                        const showTimeFormatted = `${day} ${startTime} - ${endTime}`

                        return (
                          <div
                            key={index}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                          >
                            <span style={{ fontSize: '1rem', fontWeight: '500' }}>
                              {showTimeFormatted}
                            </span>
                            <button
                              onClick={() => handleAddToCalendar(trimmedTime)}
                              aria-label={`Add ${showTimeFormatted} to calendar`}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                fontSize: '1.25rem',
                                color: 'var(--cr-color-primary)',
                              }}
                            >
                              <PiCalendarPlus />
                            </button>
                          </div>
                        )
                      })}
                </div>
              )
            }
            content={dj.description}
            excerpt={dj.excerpt || dj.description}
            showTicketButton={true}
            showShareButton={true}
            bannerButtonText="Favorite DJ"
            shareButtonText="Share"
            bannerButtonVariant={isFavorite ? 'solid' : 'outline'}
            bannerButtonIcon={isFavorite ? <PiHeartFill /> : <PiHeart />}
            onBannerTicketClick={handleFavoriteClick}
            onBannerShareClick={handleShareClick}
            isFavorite={isFavorite}
          />
          <CrDjDonation
            djName={dj.djName}
            donationLink={dj.donationLink}
            onDonateClick={handleDonateClick}
          />
          {!dj.isSubstitute && <CrPreviousShows />}
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {/* Announcement from CMS */}
          {siteSettings?.djDetailSidebarAnnouncement && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={
                'backgroundColor' in siteSettings.djDetailSidebarAnnouncement
                  ? ((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>)
                      .backgroundColor as string)
                  : undefined
              }
              headlineText={
                'title' in siteSettings.djDetailSidebarAnnouncement
                  ? ((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>)
                      .title as string)
                  : ((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>)
                      .headlineText as string)
              }
              bodyText={
                'message' in siteSettings.djDetailSidebarAnnouncement
                  ? ((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>)
                      .message as string)
                  : ((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>)
                      .bodyText as string)
              }
              showLink={
                !!(siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>).ctaText
              }
              linkText={
                'ctaText' in siteSettings.djDetailSidebarAnnouncement
                  ? ((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>)
                      .ctaText as string)
                  : undefined
              }
              linkUrl={
                'ctaUrl' in siteSettings.djDetailSidebarAnnouncement
                  ? ((siteSettings.djDetailSidebarAnnouncement as Record<string, unknown>)
                      .ctaUrl as string)
                  : undefined
              }
              buttonCount="none"
            />
          )}

          {/* Content Cards based on CMS settings */}
          {siteSettings?.djDetailSidebarContentType &&
            siteSettings.djDetailSidebarContentType !== 'none' &&
            (() => {
              const contentType = siteSettings.djDetailSidebarContentType
              const count = parseInt(siteSettings.djDetailSidebarContentCount || '3')
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
                  variant="small"
                  bannerHeight="tall"
                  textLayout="stacked"
                  bannerBackgroundColor="none"
                  title={item.title}
                  contentSummary={item.excerpt}
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
          {siteSettings?.djDetailSidebarAdvertisement && (
            <CrAdSpace size="large-rectangle" adData={siteSettings.djDetailSidebarAdvertisement} />
          )}
        </div>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={closeModal}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
      />
    </div>
  )
}

export default DJDetailPage
