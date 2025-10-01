// CrSongRequestForm.tsx
import React, { useState } from 'react';
import { PiPaperPlaneTilt } from 'react-icons/pi';
import CrButton from './CrButton';
import './CrSongRequestForm.css';

interface CrSongRequestFormProps {
  title?: string;
  bodyContent?: string;
  maxMessageLength?: number;
  onCancel?: () => void;
  onSubmit?: (data: { artist: string; songTitle: string; message?: string }) => void;
  className?: string;
}

export default function CrSongRequestForm({
  title = 'Make a Song Request',
  bodyContent = 'Request a song for the DJ to play during their show.',
  maxMessageLength = 200,
  onCancel,
  onSubmit,
  className = ''
}: CrSongRequestFormProps) {
  const [artist, setArtist] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ artist?: string; songTitle?: string }>({});

  const handleCancel = () => {
    setArtist('');
    setSongTitle('');
    setMessage('');
    setErrors({});
    if (onCancel) onCancel();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { artist?: string; songTitle?: string } = {};

    if (!artist.trim()) {
      newErrors.artist = 'Artist is required';
    }

    if (!songTitle.trim()) {
      newErrors.songTitle = 'Song title is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});

    if (onSubmit) {
      onSubmit({
        artist: artist.trim(),
        songTitle: songTitle.trim(),
        message: message.trim() || undefined
      });
    }

    // Clear form after successful submission
    handleCancel();
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxMessageLength) {
      setMessage(value);
    }
  };

  return (
    <div className={`cr-song-request-form ${className}`}>
      <h1 className="cr-song-request-form__title">{title}</h1>

      {bodyContent && (
        <p className="cr-song-request-form__body">{bodyContent}</p>
      )}

      <form onSubmit={handleSubmit} className="cr-song-request-form__form">
        {/* Artist Input */}
        <div className="cr-song-request-form__field">
          <label htmlFor="artist" className="cr-song-request-form__label">
            Artist <span className="cr-song-request-form__required">*</span>
          </label>
          <input
            type="text"
            id="artist"
            className={`cr-song-request-form__input ${errors.artist ? 'cr-song-request-form__input--error' : ''}`}
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            placeholder="Enter artist name"
          />
          {errors.artist && (
            <span className="cr-song-request-form__error">{errors.artist}</span>
          )}
        </div>

        {/* Song Title Input */}
        <div className="cr-song-request-form__field">
          <label htmlFor="songTitle" className="cr-song-request-form__label">
            Song Title <span className="cr-song-request-form__required">*</span>
          </label>
          <input
            type="text"
            id="songTitle"
            className={`cr-song-request-form__input ${errors.songTitle ? 'cr-song-request-form__input--error' : ''}`}
            value={songTitle}
            onChange={(e) => setSongTitle(e.target.value)}
            placeholder="Enter song title"
          />
          {errors.songTitle && (
            <span className="cr-song-request-form__error">{errors.songTitle}</span>
          )}
        </div>

        {/* Message to DJ Textarea */}
        <div className="cr-song-request-form__field">
          <label htmlFor="message" className="cr-song-request-form__label">
            Message to DJ <span className="cr-song-request-form__optional">(optional)</span>
          </label>
          <textarea
            id="message"
            className="cr-song-request-form__textarea"
            value={message}
            onChange={handleMessageChange}
            placeholder="Add a message or dedication"
            rows={4}
          />
          <div className="cr-song-request-form__helper-row">
            <span className="cr-song-request-form__helper-text">
              Keep it friendly and respectful
            </span>
            <span className="cr-song-request-form__char-count">
              {message.length}/{maxMessageLength}
            </span>
          </div>
        </div>

        {/* Form Actions */}
        <div className="cr-song-request-form__actions">
          <CrButton
            type="button"
            variant="outline"
            color="default"
            size="large"
            onClick={handleCancel}
          >
            Cancel
          </CrButton>
          <CrButton
            type="submit"
            variant="solid"
            color="secondary"
            size="large"
            leftIcon={<PiPaperPlaneTilt />}
          >
            Send Request
          </CrButton>
        </div>
      </form>

      {/* Note: Server-side validation and moderation should include:
          - Content filtering for inappropriate language
          - URL detection and blocking
          - Rate limiting per user
          - Optional manual review queue for first-time users
      */}
    </div>
  );
}
