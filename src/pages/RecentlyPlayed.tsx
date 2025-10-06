// src/pages/RecentlyPlayed.tsx
import React from 'react';
import CrPageHeader from '../stories/CrPageHeader';
import CrPlaylistTable from '../stories/CrPlaylistTable';
import CrAnnouncement from '../stories/CrAnnouncement';

// Sample data - will be replaced with API call
const samplePlaylistItems = [
  // 2pm hour
  {
    id: '1',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show'
    },
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    artistName: 'Miles Davis',
    trackName: 'So What',
    albumName: 'Kind of Blue',
    labelName: 'Columbia Records',
    timeAgo: '2:45pm',
    isLocal: false,
    isAdded: false
  },
  {
    id: '2',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show'
    },
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    artistName: 'John Coltrane',
    trackName: 'Giant Steps',
    albumName: 'Giant Steps',
    labelName: 'Atlantic Records',
    timeAgo: '2:30pm',
    isLocal: true,
    isAdded: false
  },
  {
    id: '3',
    hourKey: '2pm',
    hourData: {
      startTime: '2:00pm',
      endTime: '3:00pm',
      djName: 'DJ Current',
      djProfileUrl: '#',
      showName: 'The Current Show'
    },
    albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
    artistName: 'Dave Brubeck',
    trackName: 'Take Five',
    albumName: 'Time Out',
    labelName: 'Columbia Records',
    timeAgo: '2:15pm',
    isLocal: false,
    isAdded: false
  },
  // 1pm hour
  {
    id: '4',
    hourKey: '1pm',
    hourData: {
      startTime: '1:00pm',
      endTime: '2:00pm',
      djName: 'DJ Afternoon',
      djProfileUrl: '#',
      showName: 'Afternoon Vibes'
    },
    albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
    artistName: 'Herbie Hancock',
    trackName: 'Watermelon Man',
    albumName: 'Takin\' Off',
    labelName: 'Blue Note Records',
    timeAgo: '1:45pm',
    isLocal: false,
    isAdded: false
  },
  {
    id: '5',
    hourKey: '1pm',
    hourData: {
      startTime: '1:00pm',
      endTime: '2:00pm',
      djName: 'DJ Afternoon',
      djProfileUrl: '#',
      showName: 'Afternoon Vibes'
    },
    albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
    artistName: 'John Coltrane',
    trackName: 'Acknowledgement',
    albumName: 'A Love Supreme',
    labelName: 'Impulse! Records',
    timeAgo: '1:15pm',
    isLocal: false,
    isAdded: true
  }
];

export default function RecentlyPlayed() {
  const handleItemAdd = (item: any, index: number) => {
    console.log('Toggle add for item:', item, index);
    // TODO: Implement add to collection functionality
  };

  return (
    <div className="page-content">
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title="Recently Played"
        showEyebrow={false}
        showActionButton={false}
        titleSize="lg"
      />

      <CrPlaylistTable
        items={samplePlaylistItems}
        showHeader={true}
        groupByHour={true}
        onItemAddClick={handleItemAdd}
      />

      <CrAnnouncement
        variant="motivation"
        textureBackground="cr-bg-natural-d100"
        headlineText="Love what you're hearing?"
        bodyText="Save your favorite tracks and create custom playlists!"
        showLink={false}
        buttonCount="one"
        button1Text="EXPLORE YOUR COLLECTION"
        button1Icon="mobile"
        button1OnClick={() => console.log('Navigate to collection')}
      />
    </div>
  );
}
