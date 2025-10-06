// src/pages/YourCollection.tsx
import React, { useState } from 'react';
import CrPageHeader from '../stories/CrPageHeader';
import CrPlaylistTable from '../stories/CrPlaylistTable';
import CrAnnouncement from '../stories/CrAnnouncement';
import CrButton from '../stories/CrButton';
import CrModal from '../stories/CrModal';
import CrToast from '../stories/CrToast';
import { useAuth } from '../hooks/useAuth';

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
  const { isLoggedIn, login } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<any>(null);
  const [showToast, setShowToast] = useState(false);
  const [removedSongName, setRemovedSongName] = useState('');

  const handleItemRemove = (item: any, index: number) => {
    setItemToRemove(item);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      console.log('Removing item from collection:', itemToRemove);
      setRemovedSongName(`${itemToRemove.trackName} by ${itemToRemove.artistName}`);
      setIsModalOpen(false);
      setItemToRemove(null);
      // TODO: Actually remove the item from the collection
      // Show toast after modal closes
      setTimeout(() => {
        setShowToast(true);
      }, 300);
    }
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setItemToRemove(null);
  };

  const handleLogin = () => {
    // For demo purposes, simulate login with a demo account
    login('demo@chirpradio.org');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked from collection');
    // TODO: Open signup modal or navigate to signup
  };

  if (!isLoggedIn) {
    return (
      <div className="page-content">
        <CrPageHeader
          eyebrowText="CHIRP Radio"
          title="Your Collection"
          showEyebrow={false}
          showActionButton={false}
          titleSize="lg"
        />

        <div style={{
          padding: 'var(--cr-space-8) var(--cr-space-4)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{
            font: 'var(--cr-body-bold)',
            fontSize: '18px',
            color: 'var(--cr-ink)',
            marginBottom: 'var(--cr-space-4)'
          }}>
            Don't have a CHIRP Radio Account?
          </h2>

          <p style={{
            font: 'var(--cr-body-reg)',
            color: 'var(--cr-ink)',
            lineHeight: 1.4,
            marginBottom: 'var(--cr-space-4)'
          }}>
            A profile allows you to interact with the site in all sorts of helpful ways:
          </p>

          <ul style={{
            listStyle: 'disc',
            paddingLeft: 'var(--cr-space-5)',
            marginBottom: 'var(--cr-space-4)'
          }}>
            <li style={{
              font: 'var(--cr-body-reg)',
              color: 'var(--cr-ink)',
              lineHeight: 1.4,
              marginBottom: 'var(--cr-space-2)'
            }}>
              You can add songs to your collection that you hear across our web and mobile applications so you don't forget them
            </li>
            <li style={{
              font: 'var(--cr-body-reg)',
              color: 'var(--cr-ink)',
              lineHeight: 1.4,
              marginBottom: 'var(--cr-space-2)'
            }}>
              You can save your information for store purchases and donations
            </li>
            <li style={{
              font: 'var(--cr-body-reg)',
              color: 'var(--cr-ink)',
              lineHeight: 1.4
            }}>
              Your profile settings will be saved between your mobile and web experiences
            </li>
          </ul>

          <p style={{
            font: 'var(--cr-body-reg)',
            color: 'var(--cr-ink)',
            lineHeight: 1.4,
            marginBottom: 'var(--cr-space-6)'
          }}>
            So create your profile today, and start getting the maximum benefit from CHIRPradio.org!
          </p>

          <div style={{
            display: 'flex',
            gap: 'var(--cr-space-4)',
            marginBottom: 'var(--cr-space-4)'
          }}>
            <CrButton
              variant="solid"
              color="secondary"
              size="medium"
              onClick={handleSignUp}
            >
              sign up
            </CrButton>
            <CrButton
              variant="outline"
              color="default"
              size="medium"
              onClick={handleLogin}
            >
              log in
            </CrButton>
          </div>
        </div>
      </div>
    );
  }

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

      <CrModal
        isOpen={isModalOpen}
        onClose={handleCancelRemove}
        scrimOnClick={handleCancelRemove}
        title="Remove from Collection"
        size="small"
        showCloseButton={true}
      >
        <div style={{ padding: 'var(--cr-space-4)' }}>
          <p style={{
            font: 'var(--cr-body-reg)',
            color: 'var(--cr-ink)',
            lineHeight: 1.6,
            marginBottom: 'var(--cr-space-6)'
          }}>
            Are you sure you want to remove <strong>{itemToRemove?.trackName}</strong> by <strong>{itemToRemove?.artistName}</strong> from your collection?
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 'var(--cr-space-4)'
          }}>
            <CrButton
              variant="outline"
              color="default"
              size="medium"
              onClick={handleCancelRemove}
            >
              No
            </CrButton>
            <CrButton
              variant="solid"
              color="primary"
              size="medium"
              onClick={handleConfirmRemove}
            >
              Yes, Remove
            </CrButton>
          </div>
        </div>
      </CrModal>

      {showToast && (
        <CrToast
          message={`Removed ${removedSongName} from your collection`}
          type="success"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          duration={5000}
        />
      )}
    </div>
  );
}
