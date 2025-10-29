// CrProfileEditForm.tsx
import { useState } from 'react'
import { PiFloppyDisk } from 'react-icons/pi'
import CrButton from './CrButton'
import CrImageCropper from './CrImageCropper'
import './CrProfileEditForm.css'
import CrSocialIcon from './CrSocialIcon'

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

interface ValidationErrors {
  [key: string]: string
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
  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({})

  // Helper function to get character count excluding line breaks
  const getCharCount = (text: string): number => {
    if (!text) return 0
    return text.replace(/\n/g, '').trim().length
  }

  // Helper function to get character counter color
  const getCounterColor = (current: number, min: number, max: number): string => {
    if (current < min) return 'var(--cr-error-500)'
    if (current > max * 0.9) return 'var(--cr-warning-500)'
    return 'var(--cr-success-500)'
  }

  const validateField = (field: string, value: any): string => {
    // Required field validation
    if (field === 'firstName' || field === 'lastName' || field === 'email') {
      if (!value || value.trim() === '') {
        return 'This field is required'
      }
    }

    // Email validation
    if (field === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address'
      }
    }

    // Profile picture validation for volunteers and DJs
    if ((isVolunteer || isDJ) && field === 'avatarSrc') {
      if (!value || value.trim() === '') {
        return 'Profile picture is required'
      }
    }

    // DJ-specific required fields
    if (isDJ) {
      if (field === 'djName' && (!value || value.trim() === '')) {
        return 'DJ Name is required for DJs'
      }
      if (field === 'djExcerpt') {
        if (!value || value.trim() === '') {
          return 'DJ Excerpt is required for DJs'
        }
        const charCount = getCharCount(value)
        if (charCount < 65) {
          return 'DJ Excerpt must be at least 65 characters (excluding line breaks)'
        }
      }
      if (field === 'djBio') {
        if (!value || value.trim() === '') {
          return 'DJ Content is required for DJs'
        }
        const charCount = getCharCount(value)
        if (charCount < 180) {
          return 'DJ Content must be at least 180 characters (excluding line breaks)'
        }
      }
      if (field === 'djDonationLink' && (!value || value.trim() === '')) {
        return 'DJ Donation Link is required for DJs'
      }
    }

    // Volunteer-specific required fields
    if (isVolunteer) {
      if (field === 'primaryPhone' && (!value || value.trim() === '')) {
        return 'Primary Phone Number is required for volunteers'
      }
      if (field === 'zipCode' && (!value || value.trim() === '')) {
        return 'ZIP Code is required for volunteers'
      }
    }

    return ''
  }

  const handleInputChange = (field: string, value: any) => {
    if (onChange) {
      onChange(field, value)
    }

    // Validate if field has been touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }))
    }
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const value = formData[field]
    const error = validateField(field, value)
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {}
    const fieldsToValidate = ['firstName', 'lastName', 'email']

    // Add profile picture validation for volunteers and DJs
    if (isVolunteer || isDJ) {
      fieldsToValidate.push('avatarSrc')
    }

    if (isDJ) {
      fieldsToValidate.push('djName', 'djExcerpt', 'djBio', 'djDonationLink')
    }

    if (isVolunteer) {
      fieldsToValidate.push('primaryPhone', 'zipCode')
    }

    fieldsToValidate.forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) {
        newErrors[field] = error
      }
    })

    setErrors(newErrors)
    setTouched(fieldsToValidate.reduce((acc, field) => ({ ...acc, [field]: true }), {}))

    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (validateForm() && onSave) {
      onSave()
    }
  }

  const handleImageChangeInternal = (images: any) => {
    if (onImageChange) {
      onImageChange(images)
    }

    // Update both full image and avatarSrc when image changes
    if (images.fullImage) {
      handleInputChange('fullProfileImage', images.fullImage)
    }
    if (images.croppedImage) {
      handleInputChange('avatarSrc', images.croppedImage)
    }
    if (images.orientation) {
      handleInputChange('profileImageOrientation', images.orientation)
    }
  }

  const handleOrientationChange = (orientation: 'square' | 'landscape' | 'portrait') => {
    handleInputChange('profileImageOrientation', orientation)
  }

  // ZIP code lookup for automatic city/state population
  const handleZipLookup = async (zipCode: any) => {
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
              onBlur={() => handleBlur('firstName')}
              placeholder="Enter your first name"
              className={errors.firstName ? 'form-input--error' : ''}
              required
            />
            {errors.firstName && <span className="form-error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              type="text"
              value={formData.lastName || lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              placeholder="Enter your last name"
              className={errors.lastName ? 'form-input--error' : ''}
              required
            />
            {errors.lastName && <span className="form-error">{errors.lastName}</span>}
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
                onBlur={() => handleBlur('djName')}
                placeholder="Your DJ name"
                className={errors.djName ? 'form-input--error' : ''}
                required
              />
              {errors.djName && <span className="form-error">{errors.djName}</span>}
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
            onBlur={() => handleBlur('email')}
            placeholder="e.g., alex.rivera@chirpradio.org"
            className={errors.email ? 'form-input--error' : ''}
            required
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>

        {/* Profile Picture Section */}
        <div className="form-group">
          <label className="form-label">Profile Picture{(isVolunteer || isDJ) && ' *'}</label>
          <div className="cr-image-cropper">
            <CrImageCropper
              onImageChange={handleImageChangeInternal}
              initialFullImage={originalFullImage}
              initialCroppedImage={avatarSrc}
              showFullImage={isDJ}
              initialOrientation={formData.profileImageOrientation || 'square'}
              onOrientationChange={handleOrientationChange}
            />
          </div>
          {errors.avatarSrc && <span className="form-error">{errors.avatarSrc}</span>}
        </div>

        {/* DJ-Specific Fields */}
        {isDJ && (
          <>
            <div className="form-group">
              <label className="form-label">DJ Excerpt *</label>
              <textarea
                value={formData.djExcerpt || ''}
                onChange={(e) => handleInputChange('djExcerpt', e.target.value)}
                onBlur={() => handleBlur('djExcerpt')}
                placeholder="Brief description of your style (shown on DJ cards)"
                className={errors.djExcerpt ? 'form-input--error' : ''}
                rows={2}
                maxLength={180}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {errors.djExcerpt && <span className="form-error">{errors.djExcerpt}</span>}
                <span className="form-character-count" style={{ marginLeft: 'auto', fontSize: '12px', color: getCounterColor(getCharCount(formData.djExcerpt || ''), 65, 180) }}>
                  {getCharCount(formData.djExcerpt || '')}/180
                </span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">DJ Content *</label>
              <textarea
                value={formData.djBio || ''}
                onChange={(e) => handleInputChange('djBio', e.target.value)}
                onBlur={() => handleBlur('djBio')}
                placeholder="Tell us about your DJ experience and background (shown in DJ Profile)"
                className={errors.djBio ? 'form-input--error' : ''}
                rows={4}
                maxLength={1000}
                required
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {errors.djBio && <span className="form-error">{errors.djBio}</span>}
                <span className="form-character-count" style={{ marginLeft: 'auto', fontSize: '12px', color: getCounterColor(getCharCount(formData.djBio || ''), 180, 1000) }}>
                  {getCharCount(formData.djBio || '')}/1000
                </span>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">DJ Donation Link *</label>
              <input
                type="text"
                value={formData.djDonationLink || ''}
                onChange={(e) => handleInputChange('djDonationLink', e.target.value)}
                onBlur={() => handleBlur('djDonationLink')}
                placeholder="https://www.chirpradio.org/dontate/(your DJ donation link)"
                className={errors.djDonationLink ? 'form-input--error' : ''}
                required
              />
              {errors.djDonationLink && <span className="form-error">{errors.djDonationLink}</span>}
            </div>
          </>
        )}

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
                <label className="form-label">Primary Phone Number{isVolunteer && ' *'}</label>
                <input
                  type="tel"
                  value={formData.primaryPhone || ''}
                  onChange={(e) => handleInputChange('primaryPhone', e.target.value)}
                  onBlur={() => handleBlur('primaryPhone')}
                  placeholder="(555) 123-4567"
                  className={errors.primaryPhone ? 'form-input--error' : ''}
                  required={isVolunteer}
                />
                {errors.primaryPhone && <span className="form-error">{errors.primaryPhone}</span>}
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
                placeholder="e.g., 1842 W Division St, Apt 3B"
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
                <label className="form-label">ZIP Code{isVolunteer && ' *'}</label>
                <input
                  type="text"
                  value={formData.zipCode || ''}
                  onChange={(e) => {
                    const zip = e.target.value
                    handleInputChange('zipCode', zip)
                    handleZipLookup(zip)
                  }}
                  onBlur={() => handleBlur('zipCode')}
                  placeholder="60614"
                  maxLength={5}
                  className={errors.zipCode ? 'form-input--error' : ''}
                  required={isVolunteer}
                />
                {errors.zipCode && <span className="form-error">{errors.zipCode}</span>}
              </div>
            </div>
          </>
        )}

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
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <CrButton size="large" variant="text" color="default" onClick={onCancel}>
          Cancel
        </CrButton>
        <CrButton
          size="large"
          variant="solid"
          color="secondary"
          leftIcon={<PiFloppyDisk />}
          onClick={handleSave}
        >
          Save Changes
        </CrButton>
      </div>
    </form>
  )
}
