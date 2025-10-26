// src/pages/ListenPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { PiVinylRecord, PiPlaylist } from 'react-icons/pi'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrPlaylistItem from '../stories/CrPlaylistItem'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrList from '../stories/CrList'
import CrAdSpace from '../stories/CrAdSpace'
import {
  useTracks,
  useCurrentUser,
  useTop25,
  useMostAdded,
  useHalloween,
  useAnnouncements,
  useSiteSettings,
} from '../hooks/useData'
import { useNotification } from '../contexts/NotificationContext'
import { getCollection, removeFromCollection, type CollectionTrack } from '../utils/collectionDB'
import './ListenPage.css'

const ListenPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: tracks } = useTracks()
  const { data: currentUser } = useCurrentUser()
  const { data: top25Chart } = useTop25()
  const { data: mostAddedChart } = useMostAdded()
  const { data: halloweenChart } = useHalloween()
  const { data: announcements } = useAnnouncements()
  const { data: siteSettings } = useSiteSettings()
  const { showModal, showToast } = useNotification()
  const [collection, setCollection] = useState<CollectionTrack[]>([])

  // Transform tracks for playlist table - only show last 2 hours
  const recentlyPlayedTracks = React.useMemo(() => {
    if (!tracks) return []

    // First, find the most recent 2 unique hours by sorting tracks by time
    const tracksSortedByTime = [...tracks].sort(
      (a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime()
    )

    // Get unique hours from sorted tracks (most recent hours first)
    const uniqueHours: string[] = []
    tracksSortedByTime.forEach((track) => {
      if (!uniqueHours.includes(track.hourKey)) {
        uniqueHours.push(track.hourKey)
      }
    })

    // Get only the first 2 unique hours (most recent)
    const recentHours = uniqueHours.slice(0, 2)

    // Filter tracks from those 2 hours, then sort NEWEST to OLDEST (reverse chronological)
    const filteredTracks = tracks
      .filter((track) => recentHours.includes(track.hourKey))
      .sort((a, b) => new Date(b.playedAt).getTime() - new Date(a.playedAt).getTime())

    // Map to the format needed
    return filteredTracks.map((track) => {
      // Parse the hourKey to determine start/end times
      const hourMatch = track.hourKey?.match(/(\d+)(am|pm)/i)
      let startTime = '12:00am'
      let endTime = '1:00am'

      if (hourMatch) {
        const hour = parseInt(hourMatch[1])
        const period = hourMatch[2].toLowerCase()
        startTime = `${hour}:00${period}`

        // Calculate end time (next hour)
        if (hour === 12) {
          endTime = period === 'am' ? '1:00am' : '1:00pm'
        } else if (hour === 11) {
          endTime = period === 'am' ? '12:00pm' : '12:00am'
        } else {
          endTime = `${hour + 1}:00${period}`
        }
      }

      return {
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
        hourKey: track.hourKey,
        hourData: {
          startTime,
          endTime,
          djName: track.djName,
          showName: track.showName,
          djProfileUrl: '#',
        },
      }
    })
  }, [tracks])

  // Load collection on mount
  useEffect(() => {
    setCollection(getCollection())
  }, [])

  // Listen for collection updates
  useEffect(() => {
    const handleCollectionUpdate = () => {
      setCollection(getCollection())
    }

    window.addEventListener('chirp-collection-updated', handleCollectionUpdate)
    return () => {
      window.removeEventListener('chirp-collection-updated', handleCollectionUpdate)
    }
  }, [])

  // Handle removing tracks from collection
  const handleItemRemove = (item: any, index: number) => {
    showModal({
      title: 'Remove from Collection',
      message: `Are you sure you want to remove ${item.trackName} by ${item.artistName} from your collection?`,
      confirmText: 'Yes, Remove',
      cancelText: 'No',
      onConfirm: () => {
        const removed = removeFromCollection(item.id)
        if (removed) {
          showToast({
            message: `Removed ${item.trackName} by ${item.artistName} from your collection`,
            type: 'success',
            duration: 5000,
          })
        }
      },
    })
  }

  // Get user collection for sidebar (first 3 items)
  const userCollectionTracks = collection.slice(0, 3).map((track) => ({
    ...track,
    albumArt: track.albumArt,
    artistName: track.artistName,
    trackName: track.trackName,
    albumName: track.albumName,
    labelName: track.labelName,
    isLocal: track.isLocal,
    isAdded: true,
    timeAgo: `Added on ${new Date(track.dateAdded).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })}`,
  }))

  // Transform chart data for lists
  const top25Items =
    top25Chart?.tracks?.map((track) => ({
      songName: track.trackName,
      artistName: track.artistName,
      recordCompany: track.labelName,
    })) || []

  const mostAddedItems =
    mostAddedChart?.tracks?.map((track) => ({
      songName: track.trackName,
      artistName: track.artistName,
      recordCompany: track.labelName,
    })) || []

  // Get week date for headers
  const getWeekOfDate = () => {
    if (top25Chart?.weekOf) {
      return new Date(top25Chart.weekOf).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    }
    return new Date(
      new Date().setDate(new Date().getDate() - new Date().getDay())
    ).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Get sidebar content from Site Settings
  const sidebarAnnouncementId =
    typeof siteSettings?.listenSidebarAnnouncement === 'string'
      ? siteSettings.listenSidebarAnnouncement
      : siteSettings?.listenSidebarAnnouncement?.id

  const sidebarAnnouncement = sidebarAnnouncementId
    ? announcements?.find((a) => a.id === sidebarAnnouncementId)
    : announcements?.[3] // fallback

  const fullWidthAnnouncementId =
    typeof siteSettings?.fullWidthAnnouncement === 'string'
      ? siteSettings.fullWidthAnnouncement
      : siteSettings?.fullWidthAnnouncement?.id

  const fullWidthAnnouncement = fullWidthAnnouncementId
    ? announcements?.find((a) => a.id === fullWidthAnnouncementId)
    : announcements?.[2] // fallback

  const sidebarAdvertisement = siteSettings?.listenSidebarAdvertisement

  // Get weekly charts from Site Settings
  const leftWeeklyChart = siteSettings?.leftWeeklyChart || top25Chart
  const rightWeeklyChart = siteSettings?.rightWeeklyChart || mostAddedChart
  const sidebarWeeklyChart = siteSettings?.listenSidebarWeeklyChart || halloweenChart

  // Dummy data for "This Week's Adds" - will be replaced when we have this data
  const weeksAddsTracks = [
    {
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Chance_the_rapper_acid_rap.jpg',
      artistName: 'Chance the Rapper',
      trackName: 'Pusha Man',
      albumName: 'Acid Rap',
      labelName: 'Chance the Rapper',
      isLocal: true,
      timeAgo: '10:36am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt:
        'https://upload.wikimedia.org/wikipedia/en/c/ce/Alkaline_Trio_-_From_Here_to_Infirmary_cover.jpg',
      artistName: 'Alkaline Trio',
      trackName: 'Stupid Kid',
      albumName: 'From Here to Infirmary',
      labelName: 'Vagrant Records',
      isLocal: true,
      timeAgo: '10:30am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://f4.bcbits.com/img/a3263361162_16.jpg',
      artistName: 'Signals Midwest',
      trackName: 'Your New, Old Apartment',
      albumName: 'Pin',
      labelName: 'Lauren Records',
      timeAgo: '10:27am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://f4.bcbits.com/img/a1076606024_16.jpg',
      artistName: 'Into It. Over It.',
      trackName: 'Vis Major',
      albumName: 'Standards',
      labelName: 'Storchmasers',
      isLocal: true,
      timeAgo: '10:24am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/9/95/Gukfmm.jpg',
      artistName: 'The Get Up Kids',
      trackName: 'Last Place You Look',
      albumName: 'Four Minute Mile',
      labelName: 'Doghouse Records',
      timeAgo: '10:21am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt:
        'https://upload.wikimedia.org/wikipedia/en/2/23/Sugar_-_File_Under_Easy_Listening.jpg',
      artistName: 'Sugar',
      trackName: 'Gee Angel',
      albumName: 'File Under: Easy Listening',
      labelName: 'Creation Records',
      timeAgo: '10:17am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1619983081563-430f63602796?w=200&h=200&fit=crop',
      artistName: 'Dinosaur Jr.',
      trackName: 'Little Fury Things',
      albumName: "You're Living All Over Me",
      labelName: 'SST Records',
      timeAgo: '10:14am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=200&h=200&fit=crop',
      artistName: 'Pavement',
      trackName: 'Summer Babe',
      albumName: 'Slanted and Enchanted',
      labelName: 'Matador Records',
      timeAgo: '10:10am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1598387993281-cecf8b71a8f8?w=200&h=200&fit=crop',
      artistName: 'Sonic Youth',
      trackName: 'Teen Age Riot',
      albumName: 'Daydream Nation',
      labelName: 'Enigma Records',
      timeAgo: '10:06am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=200&h=200&fit=crop',
      artistName: 'Pixies',
      trackName: 'Debaser',
      albumName: 'Doolittle',
      labelName: '4AD Records',
      timeAgo: '10:02am',
      hourKey: '10am',
      hourData: {
        startTime: '10:00am',
        endTime: '11:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1526478806334-5fd488fcaabc?w=200&h=200&fit=crop',
      artistName: 'The Smiths',
      trackName: 'The Queen Is Dead',
      albumName: 'The Queen Is Dead',
      labelName: 'Rough Trade',
      timeAgo: '9:56am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?w=200&h=200&fit=crop',
      artistName: 'Joy Division',
      trackName: 'Disorder',
      albumName: 'Unknown Pleasures',
      labelName: 'Factory Records',
      timeAgo: '9:52am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop',
      artistName: 'My Bloody Valentine',
      trackName: 'Only Shallow',
      albumName: 'Loveless',
      labelName: 'Creation Records',
      isLocal: false,
      timeAgo: '9:48am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=200&h=200&fit=crop',
      artistName: 'Ride',
      trackName: 'Vapour Trail',
      albumName: 'Nowhere',
      labelName: 'Creation Records',
      timeAgo: '9:44am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=200&h=200&fit=crop',
      artistName: 'Slowdive',
      trackName: 'Alison',
      albumName: 'Souvlaki',
      labelName: 'Creation Records',
      timeAgo: '9:40am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      artistName: 'The Jesus and Mary Chain',
      trackName: 'Just Like Honey',
      albumName: 'Psychocandy',
      labelName: 'Blanco y Negro',
      timeAgo: '9:36am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
      artistName: 'Hüsker Dü',
      trackName: 'Something I Learned Today',
      albumName: 'Zen Arcade',
      labelName: 'SST Records',
      timeAgo: '9:32am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
    {
      albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
      artistName: 'The Replacements',
      trackName: 'I Will Dare',
      albumName: 'Let It Be',
      labelName: 'Twin/Tone Records',
      timeAgo: '9:28am',
      hourKey: '9am',
      hourData: {
        startTime: '9:00am',
        endTime: '10:00am',
        djName: 'DJ Current',
        showName: 'The Current Show',
        djProfileUrl: '#',
      },
    },
  ]

  const collectionTracks = [
    {
      id: '1',
      albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
      albumArtAlt: 'Kind of Blue album cover',
      artistName: 'Miles Davis',
      trackName: 'So What',
      albumName: 'Kind of Blue',
      labelName: 'Columbia Records',
      timeAgo: '2:45pm',
      isLocal: false,
      isAdded: true,
    },
    {
      id: '2',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      albumArtAlt: 'Giant Steps album cover',
      artistName: 'John Coltrane',
      trackName: 'Giant Steps',
      albumName: 'Giant Steps',
      labelName: 'Atlantic Records',
      timeAgo: '2:30pm',
      isLocal: true,
      isAdded: true,
    },
    {
      id: '3',
      albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
      albumArtAlt: 'Time Out album cover',
      artistName: 'Dave Brubeck',
      trackName: 'Take Five',
      albumName: 'Time Out',
      labelName: 'Columbia Records',
      timeAgo: '2:15pm',
      isLocal: false,
      isAdded: true,
    },
    {
      id: '4',
      albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
      albumArtAlt: "Takin' Off album cover",
      artistName: 'Herbie Hancock',
      trackName: 'Watermelon Man',
      albumName: "Takin' Off",
      labelName: 'Blue Note Records',
      timeAgo: '1:45pm',
      isLocal: false,
      isAdded: true,
    },
    {
      id: '5',
      albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
      albumArtAlt: 'A Love Supreme album cover',
      artistName: 'John Coltrane',
      trackName: 'Acknowledgement',
      albumName: 'A Love Supreme',
      labelName: 'Impulse! Records',
      timeAgo: '1:15pm',
      isLocal: false,
      isAdded: true,
    },
  ]

  return (
    <div className="listen-page">
      <section className="page-container">
        <CrPageHeader title="Listen" showEyebrow={false} showActionButton={false} />
      </section>

      <div className="page-layout-main-sidebar">
        <div className="page-layout-main-sidebar__main">
          <CrPageHeader
            title="Current Playlist"
            titleTag="h2"
            titleSize="lg"
            showEyebrow={false}
            showActionButton={true}
            actionButtonText="Previous Plays"
            actionButtonIcon={<PiVinylRecord />}
            onActionClick={() => navigate('/playlist')}
          />
          <CrPlaylistTable
            items={recentlyPlayedTracks}
            showHeader={true}
            groupByHour={true}
            className="listen-page__playlist"
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          {currentUser && collection.length > 0 && (
            <>
              <CrPageHeader
                title="A Few from Your Collection"
                titleTag="h3"
                titleSize="md"
                showEyebrow={false}
                showActionButton={true}
                actionButtonText="Your Collection"
                actionButtonIcon={<PiPlaylist />}
                actionButtonSize="medium"
                onActionClick={() => navigate('/collection')}
              />
              <CrPlaylistTable
                items={userCollectionTracks}
                showHeader={false}
                groupByHour={false}
                variant="default"
                onItemAddClick={handleItemRemove}
              />
            </>
          )}
          {sidebarWeeklyChart && (
            <CrList
              preheader={sidebarWeeklyChart.preheader}
              title={sidebarWeeklyChart.title}
              showActionButton={false}
              showAddButton={false}
              items={
                sidebarWeeklyChart.tracks?.map((item: any) => ({
                  songName: item.costumeName || item.trackName,
                  artistName: item.artistName,
                  recordCompany: item.labelName,
                })) || []
              }
            />
          )}
          {sidebarAdvertisement && (
            <CrAdSpace
              size={sidebarAdvertisement.size || 'large-rectangle'}
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
      </div>

      <section className="page-section">
        <div className="page-container">
          {fullWidthAnnouncement && (
            <CrAnnouncement
              variant={fullWidthAnnouncement.variant}
              textureBackground={fullWidthAnnouncement.textureBackground}
              headlineText={fullWidthAnnouncement.headlineText}
              bodyText={fullWidthAnnouncement.bodyText}
              showLink={fullWidthAnnouncement.showLink}
              linkText={fullWidthAnnouncement.linkText}
              linkUrl={fullWidthAnnouncement.linkUrl}
              buttonCount={fullWidthAnnouncement.buttonCount}
              button1Text={fullWidthAnnouncement.button1Text}
              button1Icon={fullWidthAnnouncement.button1Icon}
              button2Text={fullWidthAnnouncement.button2Text}
              button2Icon={fullWidthAnnouncement.button2Icon}
              currentAmount={fullWidthAnnouncement.currentAmount}
              targetAmount={fullWidthAnnouncement.targetAmount}
            />
          )}
        </div>
      </section>

      <section className="page-layout-2col">
        <div className="page-layout-2col__column">
          {leftWeeklyChart && (
            <CrList
              preheader={leftWeeklyChart.preheader || `Week of ${getWeekOfDate()}`}
              title={leftWeeklyChart.title || 'Top 25'}
              bannerButtonText="View Full Chart"
              items={
                leftWeeklyChart.tracks?.map((track: any) => ({
                  songName: track.trackName,
                  artistName: track.artistName,
                  recordCompany: track.labelName,
                })) || []
              }
            />
          )}
        </div>
        <div className="page-layout-2col__column">
          {rightWeeklyChart && (
            <CrList
              preheader={rightWeeklyChart.preheader || 'Chicago Local Artists'}
              title={rightWeeklyChart.title || 'Most Added'}
              bannerButtonText="View All Local"
              items={
                rightWeeklyChart.tracks?.map((track: any) => ({
                  songName: track.trackName,
                  artistName: track.artistName,
                  recordCompany: track.labelName,
                })) || []
              }
            />
          )}
        </div>
      </section>
    </div>
  )
}

export default ListenPage
