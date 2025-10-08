// src/pages/MakeRequest.tsx
import React from 'react';
import CrPageHeader from '../stories/CrPageHeader';
import CrCurrentDj from '../stories/CrCurrentDj';
import CrSongRequestForm from '../stories/CrSongRequestForm';
import CrButton from '../stories/CrButton';
import { useAuth } from '../hooks/useAuth';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

interface MakeRequestProps {
  testDjName?: string;
  testShowName?: string;
}

export default function MakeRequest({ testDjName, testShowName }: MakeRequestProps = {}) {
  const { isLoggedIn, login } = useAuth();
  const { currentData } = useAudioPlayer();

  const handleSubmit = (data: any) => {
    console.log('Song request submitted:', data);
    // TODO: Send request to API
  };

  const handleCancel = () => {
    console.log('Song request cancelled');
    // TODO: Handle cancel action (e.g., navigate back)
  };

  const handleLogin = () => {
    // For demo purposes, simulate login with a demo account
    login('demo@chirpradio.org');
  };

  const handleSignUp = () => {
    console.log('Sign up clicked from make request');
    // TODO: Open signup modal or navigate to signup
  };

  if (!isLoggedIn) {
    return (
      <div className="page-content">
        <CrPageHeader
          eyebrowText="CHIRP Radio"
          title="Make a Song Request"
          showEyebrow={false}
          showActionButton={false}
          titleSize="lg"
        />

        <div className="auth-prompt-container">
          <p className="auth-prompt-text-lg">
            You need to be logged in to make a song request. This helps us know who the request is coming from and ensures a better experience for everyone.
          </p>

          <div className="auth-prompt-buttons-wrap">
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
        title="Make a Request"
        showEyebrow={false}
        showActionButton={false}
        titleSize="lg"
      />

      <div className="current-dj-wrapper">
        <CrCurrentDj
          djName={testDjName || currentData.dj}
          showName={testShowName || currentData.show}
          isOnAir={true}
          statusText="On-Air"
        />
      </div>

      <CrSongRequestForm
        title=""
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
