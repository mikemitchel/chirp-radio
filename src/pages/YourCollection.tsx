// src/pages/YourCollection.tsx
import React from 'react';
import CrPageHeader from '../stories/CrPageHeader';
import CrPlaylistTable from '../stories/CrPlaylistTable';
import CrAnnouncement from '../stories/CrAnnouncement';

// Sample data - all items marked as added (isAdded: true) to show "remove" button
const sampleCollectionItems = [
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
];

export default function YourCollection() {
  const handleItemRemove = (item: any, index: number) => {
    console.log('Remove item from collection:', item, index);
    // TODO: Implement remove from collection functionality
  };

  return (
    <div className="page-content">
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title="Your Collection"
        showEyebrow={false}
        showActionButton={false}
        titleSize="lg"
      />

      <CrPlaylistTable
        items={sampleCollectionItems}
        showHeader={true}
        groupByHour={false}
        onItemAddClick={handleItemRemove}
      />

      <CrAnnouncement
        variant="motivation"
        textureBackground="cr-bg-natural-d100"
        headlineText="Build your perfect playlist"
        bodyText="Add tracks as you discover them and create your own radio experience!"
        showLink={false}
        buttonCount="one"
        button1Text="DISCOVER MORE MUSIC"
        button1Icon="mobile"
        button1OnClick={() => console.log('Navigate to recently played')}
      />
    </div>
  );
}
