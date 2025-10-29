// CrFormsShowcase.tsx
import { useState } from 'react'
import CrButton from './CrButton'
import CrSocialIcon from './CrSocialIcon'
import { PiFloppyDisk, PiMusicNotes, PiArrowRight } from 'react-icons/pi'

export default function CrFormsShowcase() {
  const [demoFormData, setDemoFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    facebookUrl: 'www.facebook.com/johndoe',
    primaryPhoneType: 'mobile',
    primaryPhone: '(555) 123-4567',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60614',
    specialSkills: ['Marketing', 'Photography'],
    interests: ['DJ', 'Event planning'],
    wantsToDJ: 'yes',
    djAvailability: ['Weekday evening'],
    volunteerOrgs: [{ org: 'Chicago Music Coalition', type: 'Arts' }],
  })

  const handleDemoFormChange = (field: any, value: any) => {
    setDemoFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div
      style={{
        padding: 'var(--cr-space-6)',
        background: 'var(--cr-background)',
        minHeight: '100vh',
        fontFamily: 'var(--cr-font-antonio), serif',
      }}
    >
      {/* Header */}
      <div
        style={{
          textAlign: 'center',
          marginBottom: 'var(--cr-space-8)',
          borderBottom: '1px solid var(--cr-default-300)',
          paddingBottom: 'var(--cr-space-6)',
        }}
      >
        <h1
          style={{
            font: 'var(--cr-title-xl)',
            color: 'var(--cr-ink)',
            margin: '0 0 var(--cr-space-4) 0',
          }}
        >
          CHIRP Forms Documentation
        </h1>
        <p
          style={{
            font: 'var(--cr-body-reg)',
            color: 'var(--cr-default-700)',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          Complete documentation of form elements, input styles, and layout patterns used across
          CHIRP Radio components.
        </p>
      </div>

      {/* Global Form Elements */}
      <div style={{ marginBottom: 'var(--cr-space-8)' }}>
        <h2
          style={{
            font: 'var(--cr-title-lg)',
            color: 'var(--cr-ink)',
            marginBottom: 'var(--cr-space-6)',
          }}
        >
          Global Form Elements
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--cr-space-6)',
          }}
        >
          {/* Basic Inputs */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Basic Input Elements
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--cr-space-5)',
              }}
            >
              <div className="form-group">
                <label className="form-label">Text Input</label>
                <input type="text" placeholder="Enter text" value="Sample text" readOnly />
              </div>

              <div className="form-group">
                <label className="form-label">Email Input</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value="user@chirpradio.org"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Input</label>
                <input type="tel" placeholder="(555) 123-4567" value="(312) 555-0123" readOnly />
              </div>

              <div className="form-group">
                <label className="form-label">Select Dropdown</label>
                <select value="mobile" disabled>
                  <option value="mobile">Mobile</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Textarea</label>
                <textarea
                  rows={3}
                  placeholder="Enter description..."
                  value="Sample textarea content"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Form States */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Input States
            </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--cr-space-5)',
              }}
            >
              <div className="form-group">
                <label className="form-label">Normal State</label>
                <input type="text" placeholder="Normal input" />
              </div>

              <div className="form-group">
                <label className="form-label">Focused State</label>
                <input
                  type="text"
                  placeholder="Focused input"
                  style={{
                    borderColor: 'var(--cr-primary-500)',
                    boxShadow: '0 0 0 3px var(--cr-primary-100)',
                  }}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label className="form-label">Disabled State</label>
                <input type="text" value="Disabled input" disabled />
              </div>

              <div className="form-group">
                <label className="form-label">Readonly State</label>
                <input type="text" value="Readonly input" readOnly />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Layout Patterns */}
      <div style={{ marginBottom: 'var(--cr-space-8)' }}>
        <h2
          style={{
            font: 'var(--cr-title-lg)',
            color: 'var(--cr-ink)',
            marginBottom: 'var(--cr-space-6)',
          }}
        >
          Form Layout Patterns
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--cr-space-6)',
          }}
        >
          {/* Form Row Layout */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Form Row Layout (.form-row)
            </h3>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  value={demoFormData.firstName}
                  onChange={(e) => handleDemoFormChange('firstName', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={demoFormData.lastName}
                  onChange={(e) => handleDemoFormChange('lastName', e.target.value)}
                />
              </div>
            </div>

            {/* Address Row with Custom Flex */}
            <div className="form-row">
              <div className="form-group" style={{ flex: 2 }}>
                <label className="form-label">City</label>
                <input
                  type="text"
                  placeholder="Chicago"
                  value={demoFormData.city}
                  onChange={(e) => handleDemoFormChange('city', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  placeholder="IL"
                  value={demoFormData.state}
                  onChange={(e) => handleDemoFormChange('state', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">ZIP</label>
                <input
                  type="text"
                  placeholder="60614"
                  value={demoFormData.zipCode}
                  onChange={(e) => handleDemoFormChange('zipCode', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Social Media Inputs */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Social Media Inputs (.form-social-inputs)
            </h3>

            <div className="form-social-inputs">
              {['facebook', 'instagram', 'twitter'].map((platform) => (
                <div key={platform} className="form-social-input-item">
                  <CrSocialIcon platform={platform} size={20} />
                  <input
                    type="text"
                    className="form-input--social"
                    value={(demoFormData as any)[`${platform}Url`] || ''}
                    onChange={(e) => handleDemoFormChange(`${platform}Url`, e.target.value)}
                    placeholder={`www.${platform}.com/yourusername`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox Grid */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Checkbox Grid Layout (.form-checkbox-grid)
            </h3>

            <div className="form-group">
              <label className="form-label">What special skills do you have?</label>
              <div className="form-checkbox-grid">
                {['Marketing', 'Photography', 'Journalism', 'Sales', 'Politics', 'Fundraising'].map(
                  (skill) => (
                    <label key={skill} className="form-checkbox-item">
                      <input
                        type="checkbox"
                        checked={demoFormData.specialSkills?.includes(skill) || false}
                        onChange={(e) => {
                          const current = demoFormData.specialSkills || []
                          const updated = e.target.checked
                            ? [...current, skill]
                            : current.filter((s) => s !== skill)
                          handleDemoFormChange('specialSkills', updated)
                        }}
                      />
                      {skill}
                    </label>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Radio Group */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Radio Group Layout (.form-radio-group)
            </h3>

            <div className="form-group">
              <label className="form-label">Do you want to be a DJ?</label>
              <div className="form-radio-group">
                <label className="form-radio-item">
                  <input
                    type="radio"
                    name="demoWantsToDJ"
                    checked={demoFormData.wantsToDJ === 'yes'}
                    onChange={() => handleDemoFormChange('wantsToDJ', 'yes')}
                  />
                  Yes
                </label>
                <label className="form-radio-item">
                  <input
                    type="radio"
                    name="demoWantsToDJ"
                    checked={demoFormData.wantsToDJ === 'no'}
                    onChange={() => handleDemoFormChange('wantsToDJ', 'no')}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Component Examples */}
      <div style={{ marginBottom: 'var(--cr-space-8)' }}>
        <h2
          style={{
            font: 'var(--cr-title-lg)',
            color: 'var(--cr-ink)',
            marginBottom: 'var(--cr-space-6)',
          }}
        >
          Real Component Examples
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'var(--cr-space-6)',
          }}
        >
          {/* Profile Form Example */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Profile Edit Form Pattern
            </h3>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-section">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      value={demoFormData.firstName}
                      onChange={(e) => handleDemoFormChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      value={demoFormData.lastName}
                      onChange={(e) => handleDemoFormChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    value={demoFormData.email}
                    onChange={(e) => handleDemoFormChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Phone Type</label>
                    <select
                      value={demoFormData.primaryPhoneType}
                      onChange={(e) => handleDemoFormChange('primaryPhoneType', e.target.value)}
                    >
                      <option value="mobile">Mobile</option>
                      <option value="home">Home</option>
                      <option value="work">Work</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={demoFormData.primaryPhone}
                      onChange={(e) => handleDemoFormChange('primaryPhone', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <CrButton size="medium" variant="text" color="default">
                  Cancel
                </CrButton>
                <CrButton size="medium" variant="solid" color="default" leftIcon={<PiFloppyDisk />}>
                  Save Changes
                </CrButton>
              </div>
            </form>
          </div>

          {/* Modal Form Example */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Modal Form Pattern (Song Request)
            </h3>

            <form onSubmit={(e) => e.preventDefault()}>
              <p
                style={{
                  font: 'var(--cr-body-reg)',
                  color: 'var(--cr-ink)',
                  margin: '0 0 var(--cr-space-4) 0',
                }}
              >
                Send a song request to the DJ currently on air.
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--cr-space-4)',
                }}
              >
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input type="text" placeholder="Enter your name" />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input type="email" placeholder="your@email.com" />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Location</label>
                  <input type="text" placeholder="City, State" />
                </div>

                <div className="form-group">
                  <label className="form-label">Song Request</label>
                  <textarea placeholder="Tell us about the song you'd like to hear..." rows={4} />
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 'var(--cr-space-4)',
                }}
              >
                <CrButton
                  variant="solid"
                  color="secondary"
                  leftIcon={<PiMusicNotes />}
                  rightIcon={<PiArrowRight />}
                  size="medium"
                >
                  SEND REQUEST
                </CrButton>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* CSS Classes Reference */}
      <div>
        <h2
          style={{
            font: 'var(--cr-title-lg)',
            color: 'var(--cr-ink)',
            marginBottom: 'var(--cr-space-6)',
          }}
        >
          CSS Classes Reference
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--cr-space-6)',
          }}
        >
          {/* Layout Classes */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Layout Classes
            </h3>

            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              <div>
                <strong>.form-section</strong> - Form section container
              </div>
              <div>
                <strong>.form-group</strong> - Individual form field group
              </div>
              <div>
                <strong>.form-row</strong> - Horizontal row layout
              </div>
              <div>
                <strong>.form-label</strong> - Form field labels
              </div>
              <div>
                <strong>.form-actions</strong> - Form action buttons
              </div>
            </div>
          </div>

          {/* Control Classes */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Control Classes
            </h3>

            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              <div>
                <strong>.form-checkbox-grid</strong> - Checkbox grid layout
              </div>
              <div>
                <strong>.form-checkbox-item</strong> - Individual checkbox
              </div>
              <div>
                <strong>.form-radio-group</strong> - Radio button group
              </div>
              <div>
                <strong>.form-radio-item</strong> - Individual radio button
              </div>
              <div>
                <strong>.form-social-inputs</strong> - Social media inputs
              </div>
              <div>
                <strong>.form-social-input-item</strong> - Social input with icon
              </div>
            </div>
          </div>

          {/* Input Variants */}
          <div
            style={{
              padding: 'var(--cr-space-5)',
              border: '1px solid var(--cr-default-300)',
              borderRadius: 'var(--cr-space-2)',
            }}
          >
            <h3
              style={{
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
              }}
            >
              Input Variants
            </h3>

            <div
              style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: '1.6',
              }}
            >
              <div>
                <strong>input[type="text"]</strong> - Global text input
              </div>
              <div>
                <strong>input[type="email"]</strong> - Global email input
              </div>
              <div>
                <strong>input[type="tel"]</strong> - Global phone input
              </div>
              <div>
                <strong>select</strong> - Global select dropdown
              </div>
              <div>
                <strong>textarea</strong> - Global textarea
              </div>
              <div>
                <strong>.form-input--social</strong> - Social media input
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
