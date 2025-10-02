// CrProfileEditForm.tsx
import React from 'react'
import { PiFloppyDisk } from 'react-icons/pi'
import CrButton from './CrButton'
import CrSocialIcon from './CrSocialIcon'
import CrImageCropper from './CrImageCropper'
import './CrProfileEditForm.css'

interface CrProfileEditFormProps {
  firstName?: string
  lastName?: string
  email?: string
  avatarSrc?: string
  socialLinks?: Array<{ platform: string; url: string }>
  isDJ?: boolean
  isVolunteer?: boolean
  formData?: any
  onChange?: (field: string, value: any) => void
  onImageChange?: (images: { fullImage?: string; croppedImage?: string }) => void
  onSave?: () => void
  onCancel?: () => void
  originalFullImage?: string
}

export default function CrProfileEditForm({
  // Profile data
  firstName,
  lastName,
  email,
  avatarSrc,
  socialLinks = [],

  // User roles
  isDJ = false,
  isVolunteer = false,

  // Form data and handlers
  formData = {},
  onChange,
  onImageChange,
  onSave,
  onCancel,

  // Image handling
  originalFullImage,
}: CrProfileEditFormProps) {
  const handleInputChange = (field, value) => {
    if (onChange) {
      onChange(field, value)
    }
  }

  const handleImageChangeInternal = (images) => {
    if (onImageChange) {
      onImageChange(images)
    }
  }

  // ZIP code lookup for automatic city/state population
  const handleZipLookup = async (zipCode) => {
    if (zipCode && zipCode.length === 5) {
      try {
        const response = await fetch(`https://api.zippopotam.us/us/${zipCode}`)
        if (response.ok) {
          const data = await response.json()
          const place = data.places[0]
          if (place) {
            handleInputChange('city', place['place name'])
            handleInputChange('state', place['state abbreviation'])
            handleInputChange('location', `${place['place name']}, ${place['state abbreviation']}`)
          }
        }
      } catch (error) {
        console.log('ZIP lookup failed:', error)
      }
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-section">
        {/* Name Row */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">First Name *</label>
            <input
              type="text"
              value={formData.firstName || firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Enter your first name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              value={formData.lastName || lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Enter your last name"
              required
            />
          </div>
        </div>

        {/* DJ Name and Show Name Row - Only for DJs */}
        {isDJ && (
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">DJ Name *</label>
              <input
                type="text"
                value={formData.djName || ''}
                onChange={(e) => handleInputChange('djName', e.target.value)}
                placeholder="Your DJ name"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Show Name</label>
              <input
                type="text"
                value={formData.showName || ''}
                onChange={(e) => handleInputChange('showName', e.target.value)}
                placeholder="Your show name (optional)"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div className="form-group">
          <label className="form-label">Email Address *</label>
          <input
            type="email"
            value={formData.email || email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Profile Picture Section */}
        <div className="form-group">
          <label className="form-label">Profile Picture</label>
          <div className="cr-image-cropper">
            <CrImageCropper
              onImageChange={handleImageChangeInternal}
              initialFullImage={originalFullImage}
              initialCroppedImage={avatarSrc}
            />
          </div>
        </div>

        {/* Social Links */}
        <div className="form-group">
          <label className="form-label">Social Media Links</label>
          <div className="form-social-inputs">
            {['facebook', 'instagram', 'twitter', 'linkedin', 'bluesky'].map((platform) => {
              const existingLink = socialLinks.find((link) => link.platform === platform)
              return (
                <div key={platform} className="form-social-input-item">
                  <CrSocialIcon platform={platform} size={20} />
                  <input
                    type="text"
                    className="form-input--social"
                    value={formData[`${platform}Url`] || existingLink?.url || ''}
                    onChange={(e) => handleInputChange(`${platform}Url`, e.target.value)}
                    placeholder={`www.${platform}.com/yourusername`}
                  />
                </div>
              )
            })}
          </div>
        </div>

        {/* Volunteer/DJ Additional Fields */}
        {(isVolunteer || isDJ) && (
          <>
            {/* Phone Fields */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Primary Phone Type</label>
                <select
                  value={formData.primaryPhoneType || 'mobile'}
                  onChange={(e) => handleInputChange('primaryPhoneType', e.target.value)}
                >
                  <option value="mobile">Mobile</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Primary Phone Number</label>
                <input
                  type="tel"
                  value={formData.primaryPhone || ''}
                  onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Secondary Phone Type</label>
                <select
                  value={formData.secondaryPhoneType || 'home'}
                  onChange={(e) => handleInputChange('secondaryPhoneType', e.target.value)}
                >
                  <option value="">Select type</option>
                  <option value="mobile">Mobile</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Secondary Phone Number</label>
                <input
                  type="tel"
                  value={formData.secondaryPhone || ''}
                  onChange={(e) => handleInputChange('secondaryPhone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Address */}
            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main Street"
              />
            </div>

            {/* City, State, ZIP on one line */}
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label">City</label>
                <input
                  type="text"
                  value={formData.city || ''}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  placeholder="City (auto-filled from ZIP)"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  value={formData.state || ''}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="IL"
                  readOnly
                />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP Code</label>
                <input
                  type="text"
                  value={formData.zipCode || ''}
                  onChange={(e) => {
                    const zip = e.target.value
                    handleInputChange('zipCode', zip)
                    handleZipLookup(zip)
                  }}
                  placeholder="60614"
                  maxLength="5"
                />
              </div>
            </div>
          </>
        )}

        {/* DJ-Specific Field - Only DJ Bio */}
        {isDJ && (
          <div className="form-group">
            <label className="form-label">DJ Bio</label>
            <textarea
              value={formData.djBio || ''}
              onChange={(e) => handleInputChange('djBio', e.target.value)}
              placeholder="Tell us about your DJ experience, music style, and background..."
              rows={4}
            />
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <CrButton size="medium" variant="text" color="default" onClick={onCancel}>
          Cancel
        </CrButton>
        <CrButton
          size="medium"
          variant="solid"
          color="default"
          leftIcon={<PiFloppyDisk />}
          onClick={onSave}
        >
          Save Changes
        </CrButton>
      </div>
    </form>
  )
}
