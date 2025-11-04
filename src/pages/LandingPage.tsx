// src/pages/LandingPage.tsx
import React, { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { PiCalendarDots, PiReadCvLogo, PiVinylRecord } from 'react-icons/pi'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCurrentDjCard from '../stories/CrCurrentDjCard'
import CrAdSpace from '../stories/CrAdSpace'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import HeroCarousel from '../components/HeroCarousel'
import CrRecentlyPlayed from '../components/CrRecentlyPlayed'
import {
  useFeaturedAnnouncement,
  useAnnouncements,
  useEvents,
  useArticles,
  useTracks,
  useCurrentShow,
  useRegularDJs,
  useSiteSettings,
  useMembers,
  useShowSchedules,
} from '../hooks/useData'
import { useNowPlaying } from '../contexts/NowPlayingContext'
import { getEventImageUrl, getEventCategoryName, getEventVenueName, getEventAgeRestriction } from '../utils/typeHelpers'
import { useAuth } from '../hooks/useAuth'
import { downloadDJShowCalendar } from '../utils/calendar'
import { formatShowTime, prepareShowTimes } from '../utils/formatShowTime'
import { useNotification } from '../contexts/NotificationContext'

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: siteSettings } = useSiteSettings()
  const { data: featuredAnnouncement } = useFeaturedAnnouncement()
  const { data: announcements } = useAnnouncements()
  const { data: events } = useEvents()
  const { data: articles } = useArticles()
  const { data: tracks } = useTracks()
  const { data: currentShow } = useCurrentShow()
  const { data: allRegularDJs } = useRegularDJs()
  const { user: loggedInUser } = useAuth()
  const { showToast } = useNotification()
  const { data: members } = useMembers()
  const { data: showSchedules } = useShowSchedules()
  const { currentData: nowPlayingData } = useNowPlaying()

  // Find currently scheduled DJ based on day/time
  const scheduledDJ = useMemo(() => {
    if (!showSchedules || showSchedules.length === 0) return null

    const now = new Date()
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
    const currentDay = dayNames[now.getDay()]
    const currentTime = now.getHours() * 60 + now.getMinutes()

    // Find schedule for current day and time
    const currentSchedule = showSchedules.find((schedule) => {
      if (schedule.dayOfWeek.toLowerCase() !== currentDay) return false

      // Parse start and end times (format: "6:00 AM" or "6:00 PM")
      const parseTime = (timeStr: string): number => {
        const match = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
        if (!match) return 0

        let hours = parseInt(match[1])
        const minutes = parseInt(match[2])
        const period = match[3].toUpperCase()

        if (period === 'PM' && hours !== 12) hours += 12
        if (period === 'AM' && hours === 12) hours = 0

        return hours * 60 + minutes
      }

      const scheduleStart = parseTime(schedule.startTime)
      const scheduleEnd = parseTime(schedule.endTime)

      // Handle overnight shows (end time < start time)
      if (scheduleEnd < scheduleStart) {
        return currentTime >= scheduleStart || currentTime < scheduleEnd
      }

      return currentTime >= scheduleStart && currentTime < scheduleEnd
    })

    if (!currentSchedule) return null

    // Return the DJ object if it's populated, otherwise null
    return typeof currentSchedule.dj === 'object' ? currentSchedule.dj as Member : null
  }, [showSchedules])

  // Find current DJ member data by matching DJ name from now playing API
  const currentDJMember = useMemo(() => {
    if (!nowPlayingData?.dj || !members) return scheduledDJ

    const djName = nowPlayingData.dj

    // Look for exact match first
    const exactMatch = members.find(
      (member) => member.djName?.toLowerCase().trim() === djName.toLowerCase().trim()
    )
    if (exactMatch) return exactMatch

    // Try partial match (DJ name might be part of a longer name)
    const partialMatch = members.find((member) =>
      member.djName?.toLowerCase().includes(djName.toLowerCase().trim()) ||
      djName.toLowerCase().includes(member.djName?.toLowerCase().trim() || '')
    )

    // Fall back to scheduled DJ if no match found
    return partialMatch || scheduledDJ
  }, [nowPlayingData?.dj, members, scheduledDJ])

  // Get 10 random Regular DJs (without repeating)
  const randomDJs = useMemo(() => {
    if (!allRegularDJs || allRegularDJs.length === 0) return []

    const shuffled = [...allRegularDJs].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 10)
  }, [allRegularDJs])

  // Add landing-page class to body on mount, remove on unmount
  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => {
      document.body.classList.remove('landing-page')
    }
  }, [])

  // Get configured announcements and advertisement from Site Settings
  const topAnnouncementId =
    typeof siteSettings?.topAnnouncement === 'string'
      ? siteSettings.topAnnouncement
      : typeof siteSettings?.topAnnouncement === 'object' && siteSettings.topAnnouncement !== null && 'id' in siteSettings.topAnnouncement
      ? siteSettings.topAnnouncement.id
      : undefined
  const sidebarAnnouncementId =
    typeof siteSettings?.sidebarAnnouncement === 'string'
      ? siteSettings.sidebarAnnouncement
      : typeof siteSettings?.sidebarAnnouncement === 'object' && siteSettings.sidebarAnnouncement !== null && 'id' in siteSettings.sidebarAnnouncement
      ? siteSettings.sidebarAnnouncement.id
      : undefined

  // Get announcements by ID or fallback to first active
  const displayTopAnnouncement =
    (siteSettings?.showTopAnnouncement !== false &&
      (topAnnouncementId
        ? announcements?.find((a) => a.id === topAnnouncementId)
        : featuredAnnouncement)) ||
    null

  const displaySidebarAnnouncement = sidebarAnnouncementId
    ? announcements?.find((a) => a.id === sidebarAnnouncementId)
    : announcements?.find((a) => a.isActive && !a.featuredOnLanding)

  const sidebarAdvertisement = siteSettings?.sidebarAdvertisement
  // Transform events data for hero carousel (take first 3 featured events)
  const heroSlides =
    events
      ?.filter((e) => e.featured)
      .slice(0, 3)
      .map((event) => ({
        backgroundImage: getEventImageUrl(event) || '',
        imageCaption: '',
        preheader: getEventCategoryName(event),
        title: event.title,
        dateTime: new Date(event.date).toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        }),
        venue: getEventVenueName(event),
        ageRestriction: getEventAgeRestriction(event),
        contentSummary: event.excerpt,
        bannerButtonText: event.isFree ? 'Learn More' : 'Get Tickets',
        shareButtonText: 'Share',
        slug: event.slug,
      })) || []

  // Transform tracks data for recently played (take first 6 from last 2 hours)
  const recentlyPlayedTracks = useMemo(
    () =>
      tracks?.slice(0, 6).map((track) => ({
        albumArt: track.albumArt,
        artistName: track.artistName,
        trackName: track.trackName,
        albumName: track.albumName,
        labelName: track.labelName,
        isLocal: track.isLocal,
        timeAgo: new Date(track.playedAt).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
        }),
      })) || [],
    [tracks]
  )

  return (
    <div className="landing-page">
      {/* Top Announcement */}
      {displayTopAnnouncement && (
        <section className="page-section">
          <div className="page-container">
            <CrAnnouncement
              variant={displayTopAnnouncement.variant}
              textureBackground={displayTopAnnouncement.textureBackground}
              headlineText={displayTopAnnouncement.headlineText}
              bodyText={typeof displayTopAnnouncement.bodyText === 'string' ? displayTopAnnouncement.bodyText : undefined}
              showLink={displayTopAnnouncement.showLink}
              linkText={displayTopAnnouncement.linkText}
              linkUrl={displayTopAnnouncement.linkUrl}
              buttonCount={displayTopAnnouncement.buttonCount}
              button1Text={displayTopAnnouncement.button1Text}
              button1Icon={displayTopAnnouncement.button1Icon}
              button2Text={displayTopAnnouncement.button2Text}
              button2Icon={displayTopAnnouncement.button2Icon}
              currentAmount={displayTopAnnouncement.currentAmount}
              targetAmount={displayTopAnnouncement.targetAmount}
            />
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <HeroCarousel slides={heroSlides} />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {currentShow && nowPlayingData && (
            <CrCurrentDjCard
              djName={nowPlayingData.dj || currentShow.djName}
              showName={nowPlayingData.show || currentShow.showName}
              statusText="On-Air"
              isOnAir={true}
              header={nowPlayingData.show || currentShow.showName}
              title={nowPlayingData.dj || currentShow.djName}
              djImage={currentDJMember?.profileImage || currentDJMember?.fullProfileImage || currentShow.djImage}
              description={currentDJMember?.djExcerpt || currentDJMember?.djBio || currentShow.description}
              onRequestClick={() => navigate('/request-song')}
              onMoreClick={currentDJMember?.slug ? () => navigate(`/members/${currentDJMember.slug}`) : undefined}
              isFavorite={currentDJMember?.id ? loggedInUser?.favoriteDJs?.includes(String(currentDJMember.id)) : false}
            />
          )}

          {displaySidebarAnnouncement && (
            <CrAnnouncement
              variant={displaySidebarAnnouncement.variant}
              widthVariant="third"
              textureBackground={displaySidebarAnnouncement.textureBackground}
              headlineText={displaySidebarAnnouncement.headlineText}
              bodyText={typeof displaySidebarAnnouncement.bodyText === 'string' ? displaySidebarAnnouncement.bodyText : undefined}
              showLink={displaySidebarAnnouncement.showLink}
              linkText={displaySidebarAnnouncement.linkText}
              linkUrl={displaySidebarAnnouncement.linkUrl}
              buttonCount={displaySidebarAnnouncement.buttonCount}
              button1Text={displaySidebarAnnouncement.button1Text}
              button1Icon={displaySidebarAnnouncement.button1Icon}
              button2Text={displaySidebarAnnouncement.button2Text}
              button2Icon={displaySidebarAnnouncement.button2Icon}
              currentAmount={displaySidebarAnnouncement.currentAmount}
              targetAmount={displaySidebarAnnouncement.targetAmount}
            />
          )}

          {sidebarAdvertisement && (
            <CrAdSpace
                size={sidebarAdvertisement.size || 'mobile-banner'}
                customWidth={sidebarAdvertisement.customWidth}
                customHeight={sidebarAdvertisement.customHeight}
                contentType={sidebarAdvertisement.contentType}
                src={sidebarAdvertisement.imageUrl || sidebarAdvertisement.image?.url}
                alt={sidebarAdvertisement.alt}
                htmlContent={sidebarAdvertisement.htmlContent}
                videoSrc={sidebarAdvertisement.videoUrl || sidebarAdvertisement.video?.url}
                embedCode={sidebarAdvertisement.embedCode}
                href={sidebarAdvertisement.href}
                target={sidebarAdvertisement.target}
                showLabel={sidebarAdvertisement.showLabel}
              />
          )}
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="page-section">
        <CrRecentlyPlayed
          tracks={recentlyPlayedTracks}
          djName={currentShow?.djName}
          showName={currentShow?.showName}
          startTime={currentShow?.startTime}
          endTime={currentShow?.endTime}
          djProfileUrl={currentShow?.djProfileUrl}
          onViewPlaylist={() => navigate('/playlist')}
        />
      </section>

      {/* Grid Section */}
      <section className="page-layout-3col">
        <div className="page-layout-3col__column page-layout-3col__column--container">
          <CrPageHeader
            key="events-header"
            showEyebrow={false}
            title="Events"
            actionButtonText="See More Events"
            actionButtonIcon={<PiCalendarDots />}
            onActionClick={() => navigate('/events')}
          />
          {events?.slice(0, 3).map((event, index) => (
            <CrCard
              key={event.slug || event.id || `event-${index}`}
              variant="narrow"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              backgroundImage={getEventImageUrl(event)}
              preheader={getEventCategoryName(event)}
              title={event.title}
              dateTime={new Date(event.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              })}
              venue={getEventVenueName(event)}
              ageRestriction={getEventAgeRestriction(event)}
              contentSummary={event.excerpt}
              onClick={() => navigate(`/events/${event.slug}`)}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--bg page-layout-3col__column--articles">
          <CrPageHeader
            key="articles-header"
            showEyebrow={false}
            title="Articles"
            actionButtonText="View More Articles"
            actionButtonIcon={<PiReadCvLogo />}
            onActionClick={() => navigate('/articles')}
          />
          {articles?.slice(0, 6).map((article, index) => (
            <CrCard
              key={article.slug || article.id || `article-${index}`}
              variant="small"
              type="article"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              bannerBackgroundColor="none"
              backgroundImage={typeof article.featuredImage === 'string' ? article.featuredImage : typeof article.featuredImage === 'object' && article.featuredImage !== null && 'url' in article.featuredImage ? article.featuredImage.url : undefined}
              preheader={
                typeof article.category === 'string' ? article.category : typeof article.category === 'object' && article.category !== null && 'name' in article.category ? article.category.name : undefined
              }
              title={article.title}
              contentSummary={article.excerpt}
              onClick={() => navigate(`/articles/${article.slug}`)}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--large-gap">
          <CrPageHeader
            key="djs-header"
            showEyebrow={false}
            title="Our DJs"
            showActionButton={true}
            actionButtonText="Review the DJ Schedule"
            actionButtonIcon={<PiVinylRecord />}
            onActionClick={() => navigate('/schedule')}
          />
          {randomDJs.map((dj, index) => (
            <CrDjOverview
              key={dj.slug || dj.id || `dj-${index}`}
              size="medium"
              djName={dj.djName}
              showTime={formatShowTime(dj.showTime)}
              showTimes={prepareShowTimes(
                dj.showTime,
                dj.djName,
                dj.showName,
                (error) => {
                  showToast({
                    message: 'Unable to create calendar event. Please check the show time format.',
                    type: 'error',
                    duration: 5000,
                  })
                }
              )}
              showContent={false}
              buttonText="Profile"
              imageSrc={dj.imageSrc}
              isFavorite={loggedInUser?.favoriteDJs?.includes(dj.id)}
              onMoreClick={() => navigate(`/djs/${dj.slug}`)}
              onAddToCalendarClick={() => {
                try {
                  downloadDJShowCalendar({
                    djName: dj.djName,
                    showName: dj.showName,
                    showTime: dj.showTime,
                  })
                } catch (error) {
                  showToast({
                    message: 'Unable to create calendar event. Please check the show time format.',
                    type: 'error',
                    duration: 5000,
                  })
                }
              }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default LandingPage
