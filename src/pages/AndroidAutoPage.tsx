import React from 'react'
import { AudioPlayerProvider, useAudioPlayer } from '../contexts/AudioPlayerContext'
import '../styles/android-auto.css'

const AndroidAutoContent: React.FC = () => {
  const { isPlaying, togglePlayback, currentData } = useAudioPlayer()

  return (
    <div className="android-auto-page">
      <div className="android-auto-header">
        <img src="/assets/CHIRP-bird.svg" alt="CHIRP Radio" className="android-auto-logo" />
        <h1 className="android-auto-title">Page Title</h1>
      </div>

      {currentData.dj && (
        <div className="android-auto-dj">
          <span className="android-auto-dj-label">DJ {currentData.dj}</span>
          <span className="android-auto-show-name">{currentData.dj} Show</span>
          <span className="android-auto-on-air">On-Air</span>
        </div>
      )}

      <div className="android-auto-main">
        <div className="android-auto-album-container">
          <img
            src={currentData.albumArt || '/assets/CHIRP-bird.svg'}
            alt={currentData.album}
            className="android-auto-album"
          />
        </div>

        <div className="android-auto-track-info">
          <h2 className="android-auto-track-title">{currentData.track || 'Song Name'}</h2>
          <p className="android-auto-track-artist">{currentData.artist || 'Artist Name'}</p>
          <p className="android-auto-track-album">{currentData.album || 'Album Name'}</p>
          <p className="android-auto-track-label">Label Name</p>
        </div>
      </div>

      <div className="android-auto-controls">
        <button
          onClick={togglePlayback}
          className="android-auto-play-button"
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  )
}

export const AndroidAutoPage: React.FC = () => {
  return (
    <AudioPlayerProvider>
      <AndroidAutoContent />
    </AudioPlayerProvider>
  )
}
