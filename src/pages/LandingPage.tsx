// src/pages/LandingPage.tsx
import React from 'react'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrCurrentDjCard from '../stories/CrCurrentDjCard'
import CrAdSpace from '../stories/CrAdSpace'
import CrDjOverview from '../stories/CrDjOverview'
import CrPageHeader from '../stories/CrPageHeader'
import CrCard from '../stories/CrCard'
import HeroCarousel from '../components/HeroCarousel'
import CrRecentlyPlayed from '../components/CrRecentlyPlayed'

const LandingPage: React.FC = () => {
  const heroSlides = [
    {
      backgroundImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
      imageCaption: 'Photo credit - John Dough',
      preheader: 'Featured Event',
      title: 'Live Music Tonight',
      dateTime: 'Oct 6, 2025 @ 9:00pm',
      venue: 'Lincoln Hall',
      ageRestriction: '21+',
      contentSummary: 'Join us for an unforgettable night of live music featuring local bands and special guests. Doors open at 8pm.',
      bannerButtonText: 'Buy Tickets',
      shareButtonText: 'Share',
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop',
      imageCaption: 'Photo credit - Jane Smith',
      preheader: 'Special Performance',
      title: 'Jazz Night',
      dateTime: 'Oct 7, 2025 @ 8:00pm',
      venue: 'The Green Mill',
      ageRestriction: '18+',
      contentSummary: 'Experience the smooth sounds of jazz with our featured artists. A night of timeless classics and modern interpretations.',
      bannerButtonText: 'Get Tickets',
      shareButtonText: 'Share',
    },
    {
      backgroundImage: 'https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop',
      imageCaption: 'Photo credit - Mike Jones',
      preheader: 'Community Event',
      title: 'CHIRP Block Party',
      dateTime: 'Oct 8, 2025 @ 12:00pm',
      venue: 'Wicker Park',
      ageRestriction: 'All Ages',
      contentSummary: 'Join us for our annual block party with live music, food trucks, and community fun. Free admission!',
      bannerButtonText: 'Learn More',
      shareButtonText: 'Share',
    },
  ]

  const recentlyPlayedTracks = [
    {
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Chance_the_rapper_acid_rap.jpg',
      artistName: 'Chance the Rapper',
      trackName: 'Pusha Man',
      albumName: 'Acid Rap',
      labelName: 'Chance the Rapper',
      isLocal: true,
      timeAgo: '10:36am',
    },
    {
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Alkaline_Trio_-_From_Here_to_Infirmary_cover.jpg',
      artistName: 'Alkaline Trio',
      trackName: 'Stupid Kid',
      albumName: 'From Here to Infirmary',
      labelName: 'Vagrant Records',
      isLocal: true,
      timeAgo: '10:30am',
    },
    {
      albumArt: 'https://f4.bcbits.com/img/a3263361162_16.jpg',
      artistName: 'Signals Midwest',
      trackName: 'Your New, Old Apartment',
      albumName: 'Pin',
      labelName: 'Lauren Records',
      timeAgo: '10:27am',
    },
    {
      albumArt: 'https://f4.bcbits.com/img/a1076606024_16.jpg',
      artistName: 'Into It. Over It.',
      trackName: 'Vis Major',
      albumName: 'Standards',
      labelName: 'Storchmasers',
      isLocal: true,
      timeAgo: '10:24am',
    },
    {
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/9/95/Gukfmm.jpg',
      artistName: 'The Get Up Kids',
      trackName: 'Last Place You Look',
      albumName: 'Four Minute Mile',
      labelName: 'Doghouse Records',
      timeAgo: '10:21am',
    },
    {
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/2/23/Sugar_-_File_Under_Easy_Listening.jpg',
      artistName: 'Sugar',
      trackName: 'Gee Angel',
      albumName: 'File Under: Easy Listening',
      labelName: 'Creation Records',
      timeAgo: '10:17am',
    },
  ]

  return (
    <div className="landing-page">
      {/* Top Announcement */}
      <section className="landing-announcement-top">
        <CrAnnouncement
          variant="donation"
          textureBackground="cr-bg-natural-a500"
        />
      </section>

      {/* Main Content Area */}
      <section className="landing-main-content">
        <div className="landing-main-left">
          <HeroCarousel slides={heroSlides} />
        </div>

        <div className="landing-main-right">
          <CrCurrentDjCard />

          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-s900"
          />

          <CrAdSpace
            size="custom"
            customHeight="50px"
          />
        </div>
      </section>

      {/* Recently Played Section */}
      <section className="landing-recently-played">
        <CrRecentlyPlayed tracks={recentlyPlayedTracks} />
      </section>

      {/* Grid Section */}
      <section className="landing-grid">
        <div className="landing-grid-left">
          <CrPageHeader
            showEyebrow={false}
            title="Events"
            actionButtonText="See More Events"
          />
          <CrCard
            variant="narrow"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            backgroundImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop"
            preheader="Featured Event"
            title="Live Music Tonight"
            dateTime="Oct 6, 2025 @ 9:00pm"
            venue="Lincoln Hall"
            ageRestriction="21+"
            contentSummary="Join us for an unforgettable night of live music featuring local bands and special guests. Doors open at 8pm."
          />
          <CrCard
            variant="narrow"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            backgroundImage="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&h=600&fit=crop"
            preheader="Special Performance"
            title="Jazz Night"
            dateTime="Oct 7, 2025 @ 8:00pm"
            venue="The Green Mill"
            ageRestriction="18+"
            contentSummary="Experience the smooth sounds of jazz with our featured artists. A night of timeless classics and modern interpretations."
          />
          <CrCard
            variant="narrow"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            backgroundImage="https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop"
            preheader="Community Event"
            title="CHIRP Block Party"
            dateTime="Oct 8, 2025 @ 12:00pm"
            venue="Wicker Park"
            ageRestriction="All Ages"
            contentSummary="Join us for our annual block party with live music, food trucks, and community fun. Free admission!"
          />
        </div>

        <div className="landing-grid-middle">
          <CrPageHeader
            showEyebrow={false}
            title="Articles"
            actionButtonText="View More Articles"
          />
          <CrCard
            variant="small"
            type="article"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            bannerBackgroundColor="none"
            backgroundImage="https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop"
            preheader="Artist Interview"
            title="Emerging Voices in Indie Folk"
            contentSummary="We sat down with a local singer-songwriter to discuss their latest album and the creative process behind their unique blend of folk and electronic music."
          />
          <CrCard
            variant="small"
            type="article"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            bannerBackgroundColor="none"
            backgroundImage="https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=300&h=300&fit=crop"
            preheader="Band Feature"
            title="The Unexpecteds"
            contentSummary="Alejandro Montoya Marin and Matt Walsh talk about forming The Unexpecteds, their journey through Chicago's music scene, and what's next for the band."
          />
          <CrCard
            variant="small"
            type="article"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            bannerBackgroundColor="none"
            backgroundImage="https://images.unsplash.com/photo-1445985543470-41fba5c3144a?w=300&h=300&fit=crop"
            preheader="Album Review"
            title="Midwest Soundscapes"
            contentSummary="A deep dive into the latest releases from Chicago's indie scene, exploring how local artists are shaping the sound of modern Midwest music."
          />
          <CrCard
            variant="small"
            type="article"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            bannerBackgroundColor="none"
            backgroundImage="https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=300&h=300&fit=crop"
            preheader="Music News"
            title="Festival Season Preview"
            contentSummary="Get ready for summer with our comprehensive guide to Chicago's upcoming music festivals, featuring lineups, tips, and must-see performances."
          />
          <CrCard
            variant="small"
            type="article"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            bannerBackgroundColor="none"
            backgroundImage="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=300&h=300&fit=crop"
            preheader="DJ Spotlight"
            title="Behind the Decks"
            contentSummary="Meet the DJs who keep CHIRP Radio alive, sharing their favorite tracks, what inspires their selections, and the stories behind their shows."
          />
          <CrCard
            variant="small"
            type="article"
            textLayout="stacked"
            bannerHeight="tall"
            imageAspectRatio="16:9"
            bannerBackgroundColor="none"
            backgroundImage="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&h=300&fit=crop"
            preheader="Community"
            title="Local Venues We Love"
            contentSummary="Celebrating the neighborhood spots and historic venues that make Chicago's music community thrive, from intimate clubs to legendary halls."
          />
        </div>

        <div className="landing-grid-right">
          <CrPageHeader
            showEyebrow={false}
            title="Our DJs"
            showActionButton={false}
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
