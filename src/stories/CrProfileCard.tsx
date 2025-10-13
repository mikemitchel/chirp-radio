// CrProfileCard.tsx
import React, { useState } from 'react'
import { PiHeart, PiMinus, PiPencilSimple, PiUser } from 'react-icons/pi'
import CrButton from './CrButton'
import CrChip from './CrChip'
import CrPageHeader from './CrPageHeader'
import './CrProfileCard.css'
import CrProfileEditForm from './CrProfileEditForm'
import CrSettingsToggles from './CrSettingsToggles'
import CrSocialIcon from './CrSocialIcon'
import CrTable from './CrTable'
import CrVolunteerEditForm from './CrVolunteerEditForm'

// Custom Saved Tracks Table Header Component
const CrPlaylistTableHeaderSaved = ({ className = '' }) => {
  return (
    <div className={`cr-playlist-table-header ${className}`}>
      <div className="cr-playlist-table-header__art"></div>

      <div className="cr-playlist-table-header__grid">
        <div className="cr-playlist-table-header__left">
          <div className="cr-playlist-table-header__track">Title</div>
          <div className="cr-playlist-table-header__artist">Artist Name</div>
        </div>

        <div className="cr-playlist-table-header__right">
          <div className="cr-playlist-table-header__album">Album</div>
          <div className="cr-playlist-table-header__label">Label</div>
        </div>
      </div>

      <div className="cr-playlist-table-header__time">
        <div className="cr-playlist-table-header__time-label">Date</div>
        <div className="cr-playlist-table-header__played-label">Saved</div>
      </div>

      <div className="cr-playlist-table-header__action">
        <div className="cr-playlist-table-header__add-label">Remove from</div>
        <div className="cr-playlist-table-header__collection-label">Collection</div>
      </div>
    </div>
  )
}

// Custom Saved Tracks Table Item Component
const CrPlaylistItemSaved = ({
  albumArt,
  albumArtAlt,
  artistName,
  trackName,
  albumName,
  labelName,
  timeAgo,
  isLocal = false,
  onToggleRemove,
  className = '',
}) => {
  return (
    <div className={`cr-playlist-item cr-playlist-item--table ${className}`}>
      <div className="cr-playlist-item__table-album-art">
        <img src={albumArt} alt={albumArtAlt} className="cr-playlist-item__image" />
      </div>

      <div className="cr-playlist-item__table-grid">
        <div className="cr-playlist-item__table-left">
          <div className="cr-playlist-item__table-artist">
            {artistName}
            {isLocal && (
              <CrChip variant="primary" size="small" squared>
                LOCAL
              </CrChip>
            )}
          </div>
          <div className="cr-playlist-item__table-track">{trackName}</div>
        </div>

        <div className="cr-playlist-item__table-right">
          <div className="cr-playlist-item__table-album">{albumName}</div>
          <div className="cr-playlist-item__table-label">{labelName}</div>
        </div>
      </div>

      <div className="cr-playlist-item__table-time">{timeAgo}</div>

      <div className="cr-playlist-item__table-action">
        <CrButton
          variant="text"
          size="xsmall"
          color="secondary"
          rightIcon={<PiMinus />}
          onClick={onToggleRemove}
        >
          Remove
        </CrButton>
      </div>
    </div>
  )
}

// Custom Saved Tracks Table Component
const CrPlaylistTableSaved = ({
  items = [],
  showHeader = true,
  onItemRemoveClick,
  className = '',
}) => {
  return (
    <div className={`cr-playlist-table ${className}`}>
      {showHeader && <CrPlaylistTableHeaderSaved />}

      <div className="cr-playlist-table__items">
        {items.map((item, index) => (
          <CrPlaylistItemSaved
            key={item.id || index}
            albumArt={item.albumArt}
            albumArtAlt={item.albumArtAlt}
            artistName={item.artistName}
            trackName={item.trackName}
            albumName={item.albumName}
            labelName={item.labelName}
            timeAgo={item.timeAgo}
            isLocal={item.isLocal}
            onToggleRemove={() => onItemRemoveClick && onItemRemoveClick(item, index)}
          />
        ))}
      </div>
    </div>
  )
}

interface CrProfileCardProps {
  state?: 'view' | 'editProfile' | 'editVolunteer' | 'loggedOut'
  eyebrowText?: string
  title?: string
  showEditButton?: boolean
  onEditClick?: () => void
  firstName?: string
  lastName?: string
  location?: string
  email?: string
  memberSince?: string
  avatarSrc?: string
  avatarAlt?: string
  socialLinks?: Array<{ platform: string; url: string }>
  permissions?: string[]
  showPermissions?: boolean
  isVolunteer?: boolean
  isDJ?: boolean
  onStateChange?: (state: string) => void
  onSave?: () => void
  onCancel?: () => void
  onChange?: (field: string, value: any) => void
  formData?: any
  maxWidth?: string
  className?: string
  // Account Settings props
  streamingQuality?: string
  onStreamingQualityChange?: (quality: string) => void
  pushNotifications?: boolean
  onPushNotificationsChange?: (checked: boolean) => void
  onLogin?: () => void
  onLogout?: () => void
  onSignUp?: () => void
  onForgotPassword?: () => void
  onShareApp?: () => void
  onLikeAppStore?: () => void
  onAppSupport?: () => void
  onTermsPrivacy?: () => void
}

export default function CrProfileCard({
  // Component state
  state = 'view', // "view" | "editProfile" | "editVolunteer" | "loggedOut"

  // Header section
  eyebrowText = 'CHIRP Radio',
  title = 'Profile - Edit',
  showEditButton = true,
  onEditClick,

  // Profile info
  firstName = 'Person',
  lastName = 'Name',
  location = 'Chicago, Illinois',
  email = 'email@qmail.com',
  memberSince = 'September 30, 2008',

  // Avatar
  avatarSrc,
  avatarAlt = 'User avatar',

  // Social links
  socialLinks = [
    { platform: 'facebook', url: 'www.facebook.com/thisguyrighthere' },
    { platform: 'instagram', url: 'www.instagram.com/thisguydoingstuff' },
    { platform: 'twitter', url: 'www.twitter.com/thisguytakingtrash' },
    { platform: 'linkedin', url: 'www.linkedin.com/thisguybuttonedup' },
    { platform: 'bluesky', url: 'www.bluesky.com/thisguygettingaway' },
  ],

  // Permissions
  permissions = ['Default', 'Admin', 'Board Member', 'DJ', 'Content Publisher', 'Volunteer'],
  showPermissions = true,

  // User role for determining what edit options to show
  isVolunteer = false, // true if user has volunteer permissions
  isDJ = false, // true if user has DJ permissions

  // State change handlers
  onStateChange, // Callback to change state between editProfile/editVolunteer

  // Form handlers
  onSave,
  onCancel,
  onChange,

  // Form data
  formData = {},

  // Account Settings
  streamingQuality = '128',
  onStreamingQualityChange,
  pushNotifications = false,
  onPushNotificationsChange,
  onLogin,
  onLogout,
  onSignUp,
  onForgotPassword,
  onShareApp,
  onLikeAppStore,
  onAppSupport,
  onTermsPrivacy,

  // Layout
  maxWidth = '860px',
  className = '',
}: CrProfileCardProps) {
  // Track the original full image separately from the cropped avatar
  const [originalFullImage, setOriginalFullImage] = useState(avatarSrc)

  const componentClasses = ['cr-profile-card', `cr-profile-card--${state}`, className]
    .filter(Boolean)
    .join(' ')

  const handleImageChange = (images) => {
    // When new images are provided, update both the avatar and store the full image
    if (images.fullImage) {
      setOriginalFullImage(images.fullImage)
    }
    if (onChange && images.croppedImage) {
      onChange('avatarSrc', images.croppedImage)
    }
  }

  const isEditing = state === 'editProfile' || state === 'editVolunteer'
  const showEditTabs = (isVolunteer || isDJ) && isEditing

  // Render logged out state
  if (state === 'loggedOut') {
    return (
      <div className={componentClasses} style={{ maxWidth }}>
        <CrPageHeader
          eyebrowText={eyebrowText}
          title="Create Your CHIRP Account"
          showActionButton={false}
        />

        <section className="cr-profile-card__not-logged-in">
          <div className="cr-profile-card__not-logged-in-content">
            <h2 className="cr-profile-card__not-logged-in-title">Join CHIRP Radio Today</h2>
            <p className="cr-profile-card__not-logged-in-description">
              Create a CHIRP Radio account to unlock all the features and benefits of our community.
            </p>

            <h3 className="cr-profile-card__benefits-title">Benefits of Creating an Account:</h3>
            <ul className="cr-profile-card__benefits-list">
              <li>Save your favorite songs from our live stream to your personal collection</li>
              <li>Make song requests directly to our DJs during their shows</li>
              <li>Access your saved tracks across web and mobile apps</li>
              <li>Save your information for store purchases and donations</li>
              <li>Sync your preferences and settings between devices</li>
              <li>Get personalized recommendations based on your listening history</li>
              <li>Receive updates about upcoming shows and events</li>
            </ul>

            <div className="cr-profile-card__not-logged-in-actions">
              <CrButton variant="solid" color="secondary" size="large" onClick={onSignUp}>
                sign up
              </CrButton>
              <div className="cr-profile-card__not-logged-in-divider">
                <span className="cr-profile-card__not-logged-in-divider-text">
                  Already have a CHIRP Radio account?
                </span>
              </div>
              <CrButton variant="outline" color="default" size="large" onClick={onLogin}>
                log in
              </CrButton>
            </div>
          </div>
        </section>
      </div>
    )
  }

  // Render view state (logged in)
  if (state === 'view') {
    return (
      <div className={componentClasses} style={{ maxWidth }}>
        <CrPageHeader
          eyebrowText={eyebrowText}
          title={title}
          showActionButton={showEditButton}
          actionButtonText="Edit"
          actionButtonIcon={<PiPencilSimple />}
          onActionClick={onEditClick}
        />

        <section className="cr-profile-card__profile">
          <div className="cr-profile-card__profile-info">
            <h2 className="cr-profile-card__name cr-title-lg">
              {firstName} {lastName}
            </h2>

            <div className="cr-profile-card__details">
              <div className="cr-profile-card__detail-item">
                <span className="cr-profile-card__detail-label">Location:</span>
                <span className="cr-profile-card__detail-value">{location}</span>
              </div>

              <div className="cr-profile-card__detail-item">
                <span className="cr-profile-card__detail-label">Email:</span>
                <div className="cr-profile-card__detail-value-with-action">
                  <span className="cr-profile-card__detail-value">{email}</span>
                  <CrButton variant="text" color="default" size="xsmall" onClick={onLogout}>
                    log out
                  </CrButton>
                </div>
              </div>

              <div className="cr-profile-card__detail-item">
                <span className="cr-profile-card__detail-label">Member Since:</span>
                <span className="cr-profile-card__detail-value">{memberSince}</span>
              </div>
            </div>
          </div>

          <div className="cr-profile-card__avatar-container">
            <div className="cr-profile-card__avatar">
              {avatarSrc ? (
                <img src={avatarSrc} alt={avatarAlt} className="cr-profile-card__avatar-image" />
              ) : (
                <div className="cr-profile-card__avatar-placeholder">
                  <svg className="cr-profile-card__avatar-icon" viewBox="0 0 100 100">
                    <circle cx="50" cy="35" r="18" />
                    <path d="M20 80 Q20 65 50 65 Q80 65 80 80 L80 85 Q80 90 75 90 L25 90 Q20 90 20 85 Z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="cr-profile-card__social-section">
          <div className="cr-profile-card__social-columns">
            <div className="cr-profile-card__social-column">
              {socialLinks.slice(0, Math.ceil(socialLinks.length / 2)).map((link, index) => (
                <div key={`${link.platform}-${index}`} className="cr-profile-card__social-item">
                  <CrSocialIcon platform={link.platform} size={24} url={link.url} />
                  <a
                    href={`https://${link.url}`}
                    className="cr-profile-card__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
            <div className="cr-profile-card__social-column">
              {socialLinks.slice(Math.ceil(socialLinks.length / 2)).map((link, index) => (
                <div key={`${link.platform}-${index}`} className="cr-profile-card__social-item">
                  <CrSocialIcon platform={link.platform} size={24} url={link.url} />
                  <a
                    href={`https://${link.url}`}
                    className="cr-profile-card__social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.url}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {showPermissions && (
          <section className="cr-profile-card__permissions">
            <div className="cr-profile-card__permissions-label">Permissions:</div>
            <div className="cr-profile-card__permissions-chips">
              {permissions.map((permission, index) => (
                <CrChip key={index} variant="light" size="small">
                  {permission}
                </CrChip>
              ))}
            </div>
          </section>
        )}

        {/* Account Settings Section */}
        <section className="cr-profile-card__account-settings">
          <CrPageHeader
            eyebrowText="Your Account"
            title="Account Settings"
            titleTag="h2"
            titleSize="lg"
            showEyebrow={false}
            showActionButton={false}
          />

          <div className="cr-profile-card__settings">
            <CrSettingsToggles
              streamingQuality={streamingQuality}
              onStreamingQualityChange={onStreamingQualityChange}
              pushNotifications={pushNotifications}
              onPushNotificationsChange={onPushNotificationsChange}
            />
          </div>
        </section>

        {/* DJ Schedule Section - Only for DJs */}
        {isDJ && (
          <section className="cr-profile-card__dj-schedule">
            <CrTable
              columns={[
                {
                  key: 'date',
                  title: 'Date',
                  sortable: true,
                  width: 'medium',
                },
                {
                  key: 'time',
                  title: 'Time',
                  sortable: true,
                  width: 'medium',
                },
                {
                  key: 'show',
                  title: 'Show',
                  sortable: true,
                  width: 'wide',
                },
                {
                  key: 'status',
                  title: 'Status',
                  align: 'center',
                  width: 'narrow',
                  render: (value, row) => {
                    return React.createElement(
                      CrChip,
                      {
                        variant: row.status === 'Scheduled' ? 'primary' : 'light',
                        size: 'small',
                      },
                      row.status
                    )
                  },
                },
              ]}
              data={[
                {
                  id: '1',
                  date: '09/25/2024',
                  time: '8:00 PM - 10:00 PM',
                  show: 'Underground Sounds with DJ Sarah',
                  status: 'Scheduled',
                },
                {
                  id: '2',
                  date: '09/18/2024',
                  time: '8:00 PM - 10:00 PM',
                  show: 'Underground Sounds with DJ Sarah',
                  status: 'Completed',
                },
                {
                  id: '3',
                  date: '09/11/2024',
                  time: '8:00 PM - 10:00 PM',
                  show: 'Underground Sounds with DJ Sarah',
                  status: 'Completed',
                },
              ]}
              variant="default"
              striped={true}
              bordered={false}
              hover={true}
              sortable={true}
              loading={false}
              empty={false}
              initialSortColumn="date"
              initialSortDirection="desc"
              eyebrowText="CHIRP Radio"
              tableTitle="Your DJ Schedule"
              showEyebrow={true}
              showActionButton={false}
            />
          </section>
        )}
      </div>
    )
  }

  // Render edit states using extracted form components
  return (
    <div className={componentClasses} style={{ maxWidth }}>
      <CrPageHeader eyebrowText={eyebrowText} title={title} showActionButton={false} />

      {/* Edit Tabs - only show if user is volunteer/DJ and in edit mode */}
      {showEditTabs && (
        <div className="cr-profile-card__edit-tabs">
          <button
            className={`cr-profile-card__edit-tab ${state === 'editProfile' ? 'cr-profile-card__edit-tab--active' : ''}`}
            onClick={() => onStateChange && onStateChange('editProfile')}
          >
            <PiUser size={16} />
            Profile Details
          </button>
          <button
            className={`cr-profile-card__edit-tab ${state === 'editVolunteer' ? 'cr-profile-card__edit-tab--active' : ''}`}
            onClick={() => onStateChange && onStateChange('editVolunteer')}
          >
            <PiHeart size={16} />
            Volunteer Details
          </button>
        </div>
      )}

      {/* Render appropriate form component */}
      {state === 'editProfile' && (
        <CrProfileEditForm
          firstName={firstName}
          lastName={lastName}
          email={email}
          avatarSrc={avatarSrc}
          socialLinks={socialLinks}
          isDJ={isDJ}
          isVolunteer={isVolunteer}
          formData={formData}
          onChange={onChange}
          onImageChange={handleImageChange}
          onSave={onSave}
          onCancel={onCancel}
          originalFullImage={originalFullImage}
        />
      )}

      {state === 'editVolunteer' && (
        <CrVolunteerEditForm
          formData={formData}
          onChange={onChange}
          onSave={onSave}
          onCancel={onCancel}
        />
      )}
    </div>
  )
}
