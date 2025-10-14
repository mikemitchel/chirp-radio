// CrRequestForm.tsx
import React, { useState } from 'react'
import CrButton from './CrButton'
import { PiPaperPlaneRight } from 'react-icons/pi'
import './CrRequestForm.css'

export interface RequestFormData {
  songTitle: string
  artistName: string
  albumName?: string
  message?: string
}

interface CrRequestFormProps {
  onSubmit?: (data: RequestFormData) => void
  className?: string
}

export default function CrRequestForm({ onSubmit, className = '' }: CrRequestFormProps) {
  const [formData, setFormData] = useState<RequestFormData>({
    songTitle: '',
    artistName: '',
    albumName: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(formData)
    }
    // Reset form
    setFormData({
      songTitle: '',
      artistName: '',
      albumName: '',
      message: '',
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className={`cr-request-form ${className}`}>
      <form onSubmit={handleSubmit}>
        <div className="cr-request-form__field">
          <label htmlFor="songTitle" className="cr-request-form__label">
            Song Title *
          </label>
          <input
            type="text"
            id="songTitle"
            name="songTitle"
            value={formData.songTitle}
            onChange={handleChange}
            required
            className="cr-request-form__input"
            placeholder="Enter song title"
          />
        </div>

        <div className="cr-request-form__field">
          <label htmlFor="artistName" className="cr-request-form__label">
            Artist Name *
          </label>
          <input
            type="text"
            id="artistName"
            name="artistName"
            value={formData.artistName}
            onChange={handleChange}
            required
            className="cr-request-form__input"
            placeholder="Enter artist name"
          />
        </div>

        <div className="cr-request-form__field">
          <label htmlFor="albumName" className="cr-request-form__label">
            Album Name (Optional)
          </label>
          <input
            type="text"
            id="albumName"
            name="albumName"
            value={formData.albumName}
            onChange={handleChange}
            className="cr-request-form__input"
            placeholder="Enter album name"
          />
        </div>

        <div className="cr-request-form__field">
          <label htmlFor="message" className="cr-request-form__label">
            Message or Shout-out (Optional)
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="cr-request-form__textarea"
            placeholder="Tell us why you'd like to hear this song or add a shout-out..."
            rows={4}
          />
        </div>

        <div className="cr-request-form__actions">
          <CrButton
            type="submit"
            variant="solid"
            color="primary"
            size="medium"
            rightIcon={<PiPaperPlaneRight />}
          >
            Submit Request
          </CrButton>
        </div>
      </form>
    </div>
  )
}
