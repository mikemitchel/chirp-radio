// CrProfileCard.jsx
import React, { useState } from 'react';
import { PiPencilSimple, PiUser, PiHeart, PiMinus } from 'react-icons/pi';
import CrPageHeader from './CrPageHeader';
import CrChip from './CrChip';
import CrButton from './CrButton';
import CrSocialIcon from './CrSocialIcon';
import CrTable from './CrTable';
import CrProfileEditForm from './CrProfileEditForm';
import CrVolunteerEditForm from './CrVolunteerEditForm';
import './CrProfileCard.css';

// Custom Saved Tracks Table Header Component
const CrPlaylistTableHeaderSaved = ({ className = "" }) => {
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
  );
};

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
  className = "" 
}) => {
  return (
    <div className={`cr-playlist-item cr-playlist-item--table ${className}`}>
      <div className="cr-playlist-item__table-album-art">
        <img 
          src={albumArt} 
          alt={albumArtAlt}
          className="cr-playlist-item__image"
        />
      </div>
      
      <div className="cr-playlist-item__table-grid">
        <div className="cr-playlist-item__table-left">
          <div className="cr-playlist-item__table-artist">
            {artistName}
            {isLocal && (
              <CrChip variant="primary" size="small" squared>LOCAL</CrChip>
            )}
          </div>
          <div className="cr-playlist-item__table-track">
            {trackName}
          </div>
        </div>
        
        <div className="cr-playlist-item__table-right">
          <div className="cr-playlist-item__table-album">
            {albumName}
          </div>
          <div className="cr-playlist-item__table-label">
            {labelName}
          </div>
        </div>
      </div>
      
      <div className="cr-playlist-item__table-time">
        {timeAgo}
      </div>
      
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
  );
};

// Custom Saved Tracks Table Component  
const CrPlaylistTableSaved = ({ items = [], showHeader = true, onItemRemoveClick, className = "" }) => {
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
  );
};

export default function CrProfileCard({
  // Component state
  state = "view", // "view" | "editProfile" | "editVolunteer"
  
  // Header section
  eyebrowText = "CHIRP Radio",
  title = "Profile - Edit",
  showEditButton = true,
  onEditClick,
  
  // Profile info
  firstName = "Person",
  lastName = "Name",
  location = "Chicago, Illinois", 
  email = "email@qmail.com",
  memberSince = "September 30, 2008",
  
  // Avatar
  avatarSrc,
  avatarAlt = "User avatar",
  
  // Social links
  socialLinks = [
    { platform: 'facebook', url: 'www.facebook.com/thisguyrighthere' },
    { platform: 'instagram', url: 'www.instagram.com/thisguydoingstuff' },
    { platform: 'twitter', url: 'www.twitter.com/thisguytakingtrash' },
    { platform: 'linkedin', url: 'www.linkedin.com/thisguybuttonedup' },
    { platform: 'bluesky', url: 'www.bluesky.com/thisguygettingaway' }
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
  
  // Layout
  maxWidth = '860px',
  className = ""
}) {
  // Track the original full image separately from the cropped avatar
  const [originalFullImage, setOriginalFullImage] = useState(avatarSrc);
  
  const componentClasses = [
    'cr-profile-card',
    `cr-profile-card--${state}`,
    className
  ].filter(Boolean).join(' ');

  const handleImageChange = (images) => {
    // When new images are provided, update both the avatar and store the full image
    if (images.fullImage) {
      setOriginalFullImage(images.fullImage);
    }
    if (onChange && images.croppedImage) {
      onChange('avatarSrc', images.croppedImage);
    }
  };

  const isEditing = state === 'editProfile' || state === 'editVolunteer';
  const showEditTabs = (isVolunteer || isDJ) && isEditing;

  // Render view state
  if (state === "view") {
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
            <h2 className="cr-profile-card__name">{firstName} {lastName}</h2>
            
            <div className="cr-profile-card__details">
              <div className="cr-profile-card__detail-item">
                <span className="cr-profile-card__detail-label">Location:</span>
                <span className="cr-profile-card__detail-value">{location}</span>
              </div>
              
              <div className="cr-profile-card__detail-item">
                <span className="cr-profile-card__detail-label">Email:</span>
                <span className="cr-profile-card__detail-value">{email}</span>
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
                <img 
                  src={avatarSrc} 
                  alt={avatarAlt}
                  className="cr-profile-card__avatar-image"
                />
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
                  <CrSocialIcon 
                    platform={link.platform}
                    size={24}
                    url={link.url}
                  />
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
                  <CrSocialIcon 
                    platform={link.platform}
                    size={24}
                    url={link.url}
                  />
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
                <CrChip 
                  key={index} 
                  variant="light" 
                  size="small"
                >
                  {permission}
                </CrChip>
              ))}
            </div>
          </section>
        )}

        {/* Saved Tracks Section */}
        <section className="cr-profile-card__saved-tracks">
          <CrPageHeader
            eyebrowText="Your Music"
            title="Saved Tracks"
            showEyebrow={true}
            showActionButton={false}
          />
          
          <div className="cr-profile-card__playlist-table">
            <CrPlaylistTableSaved 
              items={[
                {
                  id: '1',
                  albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
                  albumArtAlt: 'Kind of Blue album cover',
                  artistName: 'Miles Davis',
                  trackName: 'So What',
                  albumName: 'Kind of Blue',
                  labelName: 'Columbia Records',
                  timeAgo: '09/15/2024',
                  isAdded: true,
                  isLocal: false
                },
                {
                  id: '2',
                  albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
                  albumArtAlt: 'Giant Steps album cover',
                  artistName: 'John Coltrane',
                  trackName: 'Giant Steps',
                  albumName: 'Giant Steps',
                  labelName: 'Atlantic Records',
                  timeAgo: '09/12/2024',
                  isAdded: true,
                  isLocal: true
                },
                {
                  id: '3',
                  albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
                  albumArtAlt: 'Time Out album cover',
                  artistName: 'Dave Brubeck',
                  trackName: 'Take Five',
                  albumName: 'Time Out',
                  labelName: 'Columbia Records',
                  timeAgo: '09/08/2024',
                  isAdded: true,
                  isLocal: false
                }
              ]}
              showHeader={true}
              onItemRemoveClick={(item, index) => {
                console.log('Remove clicked for:', item.trackName);
              }}
            />
          </div>
        </section>

        {/* Donation History Section */}
        <section className="cr-profile-card__donations">
          <CrTable
            columns={[
              {
                key: 'date',
                title: 'Date',
                sortable: true,
                width: 'medium'
              },
              {
                key: 'type',
                title: 'Type',
                sortable: true,
                width: 'medium'
              },
              {
                key: 'amount',
                title: 'Amount',
                align: 'right',
                sortable: true,
                width: 'medium'
              },
              {
                key: 'receipt',
                title: 'Receipt',
                align: 'center',
                width: 'narrow',
                render: (value, row) => {
                  return React.createElement(CrButton, {
                    size: 'small',
                    variant: 'text',
                    color: 'default',
                    leftIcon: React.createElement('svg', {
                      width: 16,
                      height: 16,
                      viewBox: '0 0 24 24',
                      fill: 'none',
                      stroke: 'currentColor',
                      strokeWidth: 2
                    }, [
                      React.createElement('path', {
                        key: 'download-path',
                        d: 'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3'
                      })
                    ]),
                    onClick: () => {
                      console.log(`Downloading receipt for donation ${row.id}`);
                    },
                    'aria-label': `Download receipt for ${row.amount} donation on ${row.date}`
                  }, 'Receipt');
                }
              }
            ]}
            data={[
              {
                id: '1',
                date: '09/15/2024',
                type: 'Sustaining Member',
                amount: '$25.00',
                receipt: ''
              },
              {
                id: '2',
                date: '08/15/2024',
                type: 'Sustaining Member',
                amount: '$25.00',
                receipt: ''
              },
              {
                id: '3',
                date: '07/15/2024',
                type: 'One-Time Donation',
                amount: '$100.00',
                receipt: ''
              },
              {
                id: '4',
                date: '06/15/2024',
                type: 'Sustaining Member',
                amount: '$25.00',
                receipt: ''
              }
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
            tableTitle="Your Donation History"
            showEyebrow={true}
            showActionButton={false}
          />
        </section>

        {/* Store Purchases Section */}
        <section className="cr-profile-card__store-purchases">
          <CrTable
            columns={[
              {
                key: 'date',
                title: 'Date',
                sortable: true,
                width: 'medium'
              },
              {
                key: 'item',
                title: 'Item',
                sortable: true,
                width: 'wide'
              },
              {
                key: 'price',
                title: 'Price',
                align: 'right',
                sortable: true,
                width: 'medium'
              },
              {
                key: 'status',
                title: 'Status',
                align: 'center',
                width: 'narrow',
                render: (value, row) => {
                  return React.createElement(CrChip, {
                    variant: row.status === 'Shipped' ? 'primary' : row.status === 'Delivered' ? 'success' : 'light',
                    size: 'small'
                  }, row.status);
                }
              }
            ]}
            data={[
              {
                id: '1',
                date: '09/10/2024',
                item: 'CHIRP Radio T-Shirt - Medium',
                price: '$25.00',
                status: 'Delivered'
              },
              {
                id: '2',
                date: '08/22/2024',
                item: 'CHIRP Radio Tote Bag',
                price: '$15.00',
                status: 'Delivered'
              },
              {
                id: '3',
                date: '07/05/2024',
                item: 'CHIRP Radio Coffee Mug',
                price: '$12.00',
                status: 'Delivered'
              },
              {
                id: '4',
                date: '09/20/2024',
                item: 'CHIRP Radio Hoodie - Large',
                price: '$45.00',
                status: 'Shipped'
              }
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
            tableTitle="Store Purchases"
            showEyebrow={true}
            showActionButton={false}
          />
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
                  width: 'medium'
                },
                {
                  key: 'time',
                  title: 'Time',
                  sortable: true,
                  width: 'medium'
                },
                {
                  key: 'show',
                  title: 'Show',
                  sortable: true,
                  width: 'wide'
                },
                {
                  key: 'status',
                  title: 'Status',
                  align: 'center',
                  width: 'narrow',
                  render: (value, row) => {
                    return React.createElement(CrChip, {
                      variant: row.status === 'Scheduled' ? 'primary' : 'light',
                      size: 'small'
                    }, row.status);
                  }
                }
              ]}
              data={[
                {
                  id: '1',
                  date: '09/25/2024',
                  time: '8:00 PM - 10:00 PM',
                  show: 'Underground Sounds with DJ Sarah',
                  status: 'Scheduled'
                },
                {
                  id: '2',
                  date: '09/18/2024',
                  time: '8:00 PM - 10:00 PM',
                  show: 'Underground Sounds with DJ Sarah',
                  status: 'Completed'
                },
                {
                  id: '3',
                  date: '09/11/2024',
                  time: '8:00 PM - 10:00 PM',
                  show: 'Underground Sounds with DJ Sarah',
                  status: 'Completed'
                }
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
    );
  }

  // Render edit states using extracted form components
  return (
    <div className={componentClasses} style={{ maxWidth }}>
      <CrPageHeader
        eyebrowText={eyebrowText}
        title={title}
        showActionButton={false}
      />

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
  );
}