// src/pages/ListenPage.tsx
import React from 'react'
import { PiVinylRecord, PiPlaylist } from 'react-icons/pi'
import CrPageHeader from '../stories/CrPageHeader'
import CrPlaylistTable from '../stories/CrPlaylistTable'
import CrPlaylistItem from '../stories/CrPlaylistItem'
import CrAnnouncement from '../stories/CrAnnouncement'
import CrList from '../stories/CrList'
import './ListenPage.css'

const ListenPage: React.FC = () => {
  const recentlyPlayedTracks = [
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
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Alkaline_Trio_-_From_Here_to_Infirmary_cover.jpg',
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
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/2/23/Sugar_-_File_Under_Easy_Listening.jpg',
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
      isAdded: true
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
      isAdded: true
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
      isAdded: true
    },
    {
      id: '4',
      albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
      albumArtAlt: 'Takin\' Off album cover',
      artistName: 'Herbie Hancock',
      trackName: 'Watermelon Man',
      albumName: 'Takin\' Off',
      labelName: 'Blue Note Records',
      timeAgo: '1:45pm',
      isLocal: false,
      isAdded: true
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
      isAdded: true
    }
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
            actionButtonText="Complete Playlist"
            actionButtonIcon={<PiVinylRecord />}
          />
          <CrPlaylistTable items={recentlyPlayedTracks} showHeader={true} groupByHour={true} className="listen-page__playlist" />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-d100"
            showLink={false}
            buttonCount="two"
          />
        </div>

        <div className="page-layout-main-sidebar__sidebar">
          <CrPageHeader
            title="A Few from Your Collection"
            titleTag="h3"
            titleSize="md"
            showEyebrow={false}
            showActionButton={true}
            actionButtonText="Your Collection"
            actionButtonIcon={<PiPlaylist />}
          />
          <CrPlaylistTable
            items={collectionTracks}
            showHeader={false}
            groupByHour={false}
            variant="default"
          />
          <CrList
            preheader={`Week of ${new Date(new Date().setDate(new Date().getDate() - new Date().getDay())).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
            title="This Week's Adds"
            bannerButtonText="View All Adds"
            items={[
              { songName: "Espresso", artistName: "Sabrina Carpenter", recordCompany: "Island Records" },
              { songName: "Too Sweet", artistName: "Hozier", recordCompany: "Columbia Records" },
              { songName: "Beautiful Things", artistName: "Benson Boone", recordCompany: "Night Street Records" },
              { songName: "Illusion", artistName: "Dua Lipa", recordCompany: "Warner Records" },
              { songName: "Thinkin Bout Me", artistName: "Morgan Wallen", recordCompany: "Big Loud Records" },
              { songName: "we can't be friends", artistName: "Ariana Grande", recordCompany: "Republic Records" },
              { songName: "End of Beginning", artistName: "Djo", recordCompany: "AWAL" },
              { songName: "Lunch", artistName: "Billie Eilish", recordCompany: "Darkroom/Interscope" },
              { songName: "Hot To Go!", artistName: "Chappell Roan", recordCompany: "Island Records" },
              { songName: "Pink Pony Club", artistName: "Chappell Roan", recordCompany: "Island Records" }
            ]}
          />
          <CrAnnouncement
            variant="motivation"
            textureBackground="cr-bg-natural-s900"
            showLink={false}
            buttonCount="one"
          />
        </div>
      </div>

      <section className="page-layout-2col">
        <div className="page-layout-2col__column">
          <CrList
            preheader={`Week of ${new Date(new Date().setDate(new Date().getDate() - new Date().getDay())).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
            title="Top 25"
            bannerButtonText="View Full Chart"
            items={[
              { songName: "Cruel Summer", artistName: "Taylor Swift", recordCompany: "Republic Records" },
              { songName: "Paint The Town Red", artistName: "Doja Cat", recordCompany: "Kemosabe Records" },
              { songName: "Vampire", artistName: "Olivia Rodrigo", recordCompany: "Geffen Records" },
              { songName: "Last Night", artistName: "Morgan Wallen", recordCompany: "Big Loud Records" },
              { songName: "Snooze", artistName: "SZA", recordCompany: "Top Dawg Entertainment" },
              { songName: "Fast Car", artistName: "Luke Combs", recordCompany: "Columbia Nashville" },
              { songName: "fukumean", artistName: "Gunna", recordCompany: "YSL Records" },
              { songName: "Northern Attitude", artistName: "Noah Kahan", recordCompany: "Republic Records" },
              { songName: "I Remember Everything", artistName: "Zach Bryan feat. Kacey Musgraves", recordCompany: "Warner Records" },
              { songName: "Strangers", artistName: "Kenya Grace", recordCompany: "Major Recordings" },
              { songName: "Rich Baby Daddy", artistName: "Drake feat. Sexyy Red", recordCompany: "OVO Sound" },
              { songName: "Greedy", artistName: "Tate McRae", recordCompany: "RCA Records" },
              { songName: "What Was I Made For?", artistName: "Billie Eilish", recordCompany: "Darkroom/Interscope" },
              { songName: "Dance The Night", artistName: "Dua Lipa", recordCompany: "Warner Records" },
              { songName: "All My Life", artistName: "Lil Durk feat. J. Cole", recordCompany: "Alamo Records" },
              { songName: "You Proof", artistName: "Morgan Wallen", recordCompany: "Big Loud Records" },
              { songName: "Surround Sound", artistName: "JID feat. 21 Savage", recordCompany: "Dreamville Records" },
              { songName: "Die For You", artistName: "The Weeknd & Ariana Grande", recordCompany: "XO/Republic" },
              { songName: "Anti-Hero", artistName: "Taylor Swift", recordCompany: "Republic Records" },
              { songName: "Ella Baila Sola", artistName: "Eslabon Armado x Peso Pluma", recordCompany: "DEL Records" },
              { songName: "Monaco", artistName: "Bad Bunny", recordCompany: "Rimas Entertainment" },
              { songName: "Karma", artistName: "Taylor Swift feat. Ice Spice", recordCompany: "Republic Records" },
              { songName: "Flowers", artistName: "Miley Cyrus", recordCompany: "Columbia Records" },
              { songName: "Standing Next to You", artistName: "Jung Kook", recordCompany: "BIGHIT MUSIC" },
              { songName: "Boy's a liar Pt. 2", artistName: "PinkPantheress & Ice Spice", recordCompany: "Warner Records" }
            ]}
          />
        </div>
        <div className="page-layout-2col__column">
          <CrList
            preheader="Chicago Local Artists"
            title="Most Added"
            bannerButtonText="View All Local"
            items={[
              { songName: "Sunset Boulevard", artistName: "The Moonlighters", recordCompany: "Independent" },
              { songName: "City Lights", artistName: "Neon Dreams", recordCompany: "Local Records" },
              { songName: "Midnight Train", artistName: "The Wanderers", recordCompany: "Urban Sound" },
              { songName: "Electric Avenue", artistName: "Voltage Collective", recordCompany: "DIY Records" },
              { songName: "River Run", artistName: "The Folk People", recordCompany: "Prairie Records" },
              { songName: "Steel City", artistName: "Industrial Mind", recordCompany: "Factory Floor" },
              { songName: "Golden Hour", artistName: "Sunrise Sessions", recordCompany: "Morning Light" },
              { songName: "Neon Nights", artistName: "Retro Wave", recordCompany: "Synth Pop Records" },
              { songName: "Hometown Hero", artistName: "Local Legend", recordCompany: "Neighborhood Sounds" },
              { songName: "Lake Effect", artistName: "Winter Warning", recordCompany: "Cold Wave Records" },
              { songName: "Rush Hour", artistName: "Traffic Jam", recordCompany: "Commuter Music" },
              { songName: "Deep Dish", artistName: "Pizza Party", recordCompany: "Chicago Style" },
              { songName: "Blue Line", artistName: "Transit Authority", recordCompany: "Public Transit" },
              { songName: "Bean Town", artistName: "Millennium Park", recordCompany: "Loop Records" },
              { songName: "Wicker Park", artistName: "Hipster Highway", recordCompany: "Artisan Audio" },
              { songName: "Navy Pier", artistName: "Ferris Wheel", recordCompany: "Lakefront Sounds" },
              { songName: "Hot Dogs", artistName: "No Ketchup", recordCompany: "Vienna Beef" },
              { songName: "Southside Soul", artistName: "Chi-Town Funk", recordCompany: "Soul Records" },
              { songName: "Lakeshore Drive", artistName: "Aliotta Haynes", recordCompany: "Classic Chicago" },
              { songName: "Sweet Home", artistName: "Chicago Band", recordCompany: "Horn Section" },
              { songName: "Magnificent Mile", artistName: "Shopping Spree", recordCompany: "Retail Therapy" },
              { songName: "River North", artistName: "Gallery District", recordCompany: "Art Scene" },
              { songName: "Lincoln Park", artistName: "Zoo Crew", recordCompany: "Green Space" },
              { songName: "Pilsen Pride", artistName: "Barrio Beat", recordCompany: "Cultural Sounds" },
              { songName: "Bucktown Boogie", artistName: "Western Avenue", recordCompany: "Northwest Side" }
            ]}
          />
        </div>
      </section>
    </div>
  )
}

export default ListenPage
