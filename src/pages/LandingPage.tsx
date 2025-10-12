// src/pages/LandingPage.tsx
import React, { useEffect } from 'react'
import { PiCalendarDots, PiReadCvLogo, PiVinylRecord } from 'react-icons/pi'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCurrentDjCard from '../stories/CrCurrentDjCard'
import CrAdSpace from '../stories/CrAdSpace'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import HeroCarousel from '../components/HeroCarousel'
import CrRecentlyPlayed from '../components/CrRecentlyPlayed'
import { useFeaturedAnnouncement, useAnnouncements, useEvents, useArticles, useTracks, useCurrentShow } from '../hooks/useData'

const LandingPage: React.FC = () => {
  const { data: featuredAnnouncement } = useFeaturedAnnouncement()
  const { data: announcements } = useAnnouncements()
  const { data: events } = useEvents()
  const { data: articles } = useArticles()
  const { data: tracks } = useTracks()
  const { data: currentShow } = useCurrentShow()

  // Add landing-page class to body on mount, remove on unmount
  useEffect(() => {
    document.body.classList.add('landing-page')
    return () => {
      document.body.classList.remove('landing-page')
    }
  }, [])

  // Get first non-featured active announcement for sidebar
  const sidebarAnnouncement = announcements?.find(a => a.isActive && !a.featuredOnLanding)
  // Transform events data for hero carousel (take first 3 featured events)
  const heroSlides = events?.filter(e => e.featured).slice(0, 3).map(event => ({
    backgroundImage: event.featuredImage,
    imageCaption: '',
    preheader: event.category,
    title: event.title,
    dateTime: new Date(event.date).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }),
    venue: event.venue.name,
    ageRestriction: event.ageRestriction,
    contentSummary: event.description,
    bannerButtonText: event.isFree ? 'Learn More' : 'Get Tickets',
    shareButtonText: 'Share',
  })) || []

  // Transform tracks data for recently played (take first 6 from last 2 hours)
  const recentlyPlayedTracks = tracks?.slice(0, 6).map(track => ({
    albumArt: track.albumArt,
    artistName: track.artistName,
    trackName: track.trackName,
    albumName: track.albumName,
    labelName: track.labelName,
    isLocal: track.isLocal,
    timeAgo: new Date(track.playedAt).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }),
  })) || []

  return (
    <div className="landing-page">
      {/* Top Announcement */}
      {featuredAnnouncement && (
        <section className="page-section">
          <div className="page-container">
            <CrAnnouncement
              variant={featuredAnnouncement.showDonationBar ? 'donation' : 'motivation'}
              textureBackground={featuredAnnouncement.backgroundColor}
              headlineText={featuredAnnouncement.title}
              bodyText={featuredAnnouncement.message}
              showLink={!!featuredAnnouncement.ctaText}
              linkText={featuredAnnouncement.ctaText}
              linkUrl={featuredAnnouncement.ctaUrl}
              buttonCount="none"
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
          {currentShow && (
            <CrCurrentDjCard
              djName={currentShow.djName}
              showName={currentShow.showName}
              startTime={currentShow.startTime}
              endTime={currentShow.endTime}
              djImage={currentShow.djImage}
              description="DJ Current is lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis risus eget urna mollis ornare vel eu leo. Curabitur blandit tempus porttitor. Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Praesent commodo cursus magna, vel scelerisque nisl consectetur et."
            />
          )}

          {sidebarAnnouncement && (
            <CrAnnouncement
              variant="motivation"
              widthVariant="third"
              textureBackground={sidebarAnnouncement.backgroundColor}
              headlineText={sidebarAnnouncement.title}
              bodyText={sidebarAnnouncement.message}
              showLink={!!sidebarAnnouncement.ctaText}
              linkText={sidebarAnnouncement.ctaText}
              linkUrl={sidebarAnnouncement.ctaUrl}
              buttonCount="none"
            />
          )}

          <CrAdSpace
            size="mobile-banner"
          />
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="page-section">
        <CrRecentlyPlayed tracks={recentlyPlayedTracks} />
      </section>

      {/* Grid Section */}
      <section className="page-layout-3col">
        <div className="page-layout-3col__column page-layout-3col__column--container">
          <CrPageHeader
            showEyebrow={false}
            title="Events"
            actionButtonText="See More Events"
            actionButtonIcon={<PiCalendarDots />}
          />
          {events?.slice(0, 3).map(event => (
            <CrCard
              key={event.id}
              variant="narrow"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              backgroundImage={event.featuredImage}
              preheader={event.category}
              title={event.title}
              dateTime={new Date(event.date).toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
              venue={event.venue.name}
              ageRestriction={event.isFree ? 'Free' : `$${event.ticketPrice}`}
              contentSummary={event.description}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--bg">
          <CrPageHeader
            showEyebrow={false}
            title="Articles"
            actionButtonText="View More Articles"
            actionButtonIcon={<PiReadCvLogo />}
          />
          {articles?.slice(0, 6).map(article => (
            <CrCard
              key={article.id}
              variant="small"
              type="article"
              textLayout="stacked"
              bannerHeight="tall"
              imageAspectRatio="16:9"
              bannerBackgroundColor="none"
              backgroundImage={article.featuredImage}
              preheader={article.category}
              title={article.title}
              contentSummary={article.excerpt}
            />
          ))}
        </div>

        <div className="page-layout-3col__column page-layout-3col__column--container page-layout-3col__column--large-gap">
          <CrPageHeader
            showEyebrow={false}
            title="Our DJs"
            showActionButton={true}
            actionButtonText="Review the DJ Schedule"
            actionButtonIcon={<PiVinylRecord />}
          />
          <CrDjOverview
            size="medium"
            djName="Sarah Martinez"
            showTime="Monday 6am - 8am"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="Marcus Chen"
            showTime="Tuesday 3pm - 5pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="Jessica Williams"
            showTime="Wednesday 7pm - 9pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="David Thompson"
            showTime="Thursday 12pm - 2pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="Alicia Rodriguez"
            showTime="Friday 8pm - 10pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="James Park"
            showTime="Saturday 10am - 12pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="Elena Vasquez"
            showTime="Sunday 2pm - 4pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="Ryan Kim"
            showTime="Monday 9pm - 11pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="Nina Patel"
            showTime="Tuesday 6am - 8am"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=faces"
          />
          <CrDjOverview
            size="medium"
            djName="Carlos Rivera"
            showTime="Wednesday 11am - 1pm"
            showContent={false}
            buttonText="Profile"
            imageSrc="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop&crop=faces"
          />
        </div>
      </section>

    </div>
  )
}

export default LandingPage
