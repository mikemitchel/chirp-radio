// CrIconsShowcase.tsx
import React, { useState } from 'react'
import {
  // Navigation & Actions
  PiArrowRight,
  PiArrowSquareUp,
  PiCaretLeft,
  PiCaretRight,
  PiCaretUp,
  PiCaretDown,
  PiCaretUpDown,
  PiX,
  PiXBold,
  PiMagnifyingGlass,
  PiDotsThreeOutlineVerticalFill,
  PiPlus,
  PiMinus,

  // Calendar & Events
  PiCalendarBlank,
  PiCalendarDot,
  PiCalendarDots,
  PiCalendarPlus,
  PiTicket,

  // Music & Media
  PiVinylRecord,
  PiMusicNote,
  PiMusicNotes,
  PiPlaylist,
  PiPlayFill,
  PiPauseFill,
  PiHeadphones,
  PiMicrophone,

  // User & Social
  PiHeart,
  PiHeartFill,
  PiHandHeart,
  PiHandHeartLight,
  PiUser,
  PiUserCircle,
  PiChatCircleText,
  PiChatCircleTextLight,
  PiSignIn,

  // Content & Documents
  PiReadCvLogo,
  PiNotepad,
  PiPaperclip,
  PiNewspaper,
  PiMapTrifold,

  // Communication
  PiPaperPlaneRight,
  PiPaperPlaneTilt,

  // Settings & Tools
  PiGear,
  PiFloppyDisk,
  PiPencilSimple,
  PiUploadSimple,

  // Shopping & Commerce
  PiShoppingBag,

  // Visibility & Display
  PiEye,
  PiEyeSlash,
  PiDownload,
  PiDownloadSimple,
  PiExport,

  // Collection & Add
  PiPlusCircle,
  PiPlusSquare,
} from 'react-icons/pi'
import { FaFacebookSquare, FaInstagram, FaTwitterSquare, FaLinkedin } from 'react-icons/fa'
import { SiBluesky } from 'react-icons/si'

export default function CrIconsShowcase() {
  const [selectedSize, setSelectedSize] = useState(64)
  const [selectedColor, setSelectedColor] = useState('default')

  // All React Icons used in CHIRP components
  const icons = [
    // Navigation & Actions
    {
      name: 'PiArrowRight',
      component: PiArrowRight,
      usage: 'Right arrow for buttons, CTAs, and forward navigation',
      components: ['CrAnnouncement', 'CrShoppingCart', 'CrDonateForm', 'CrCard', 'CrCurrentDjCard'],
    },
    {
      name: 'PiArrowSquareUp',
      component: PiArrowSquareUp,
      usage: 'Share or external link icon for cards and banners',
      components: ['CrCardDetails', 'CrCardBanner', 'CrCard'],
    },
    {
      name: 'PiCaretLeft',
      component: PiCaretLeft,
      usage: 'Left navigation in pagination and calendar controls',
      components: ['CrCalendarEvent', 'CrPagination'],
    },
    {
      name: 'PiCaretRight',
      component: PiCaretRight,
      usage: 'Right navigation in pagination, calendar, and list expansion',
      components: ['CrCalendarEvent', 'CrPagination', 'CrDonateForm', 'CrDjOverview'],
    },
    {
      name: 'PiCaretUp',
      component: PiCaretUp,
      usage: 'Sort ascending indicator in tables',
      components: ['CrTable'],
    },
    {
      name: 'PiCaretDown',
      component: PiCaretDown,
      usage: 'Dropdown indicators, sort descending, and expandable sections',
      components: ['CrSelectButtonInteraction', 'CrPlaylistHourBreak', 'CrTable'],
    },
    {
      name: 'PiCaretUpDown',
      component: PiCaretUpDown,
      usage: 'Sortable column indicator in tables',
      components: ['CrTable'],
    },
    {
      name: 'PiX',
      component: PiX,
      usage: 'Close buttons and dismiss actions',
      components: ['CrDjScheduleSearch', 'CrShoppingCart', 'CrMainNav'],
    },
    {
      name: 'PiXBold',
      component: PiXBold,
      usage: 'Bold close button for menu overlays',
      components: ['CrMenuButton'],
    },
    {
      name: 'PiMagnifyingGlass',
      component: PiMagnifyingGlass,
      usage: 'Search icon in main navigation',
      components: ['CrMainNav', 'CrMenuButton'],
    },
    {
      name: 'PiDotsThreeOutlineVerticalFill',
      component: PiDotsThreeOutlineVerticalFill,
      usage: 'Menu toggle button in main navigation',
      components: ['CrMenuButton'],
    },
    {
      name: 'PiPlus',
      component: PiPlus,
      usage: 'Add or create new item actions',
      components: ['CrPageHeader'],
    },
    {
      name: 'PiMinus',
      component: PiMinus,
      usage: 'Remove or minimize actions',
      components: ['CrProfileCard'],
    },

    // Calendar & Events
    {
      name: 'PiCalendarBlank',
      component: PiCalendarBlank,
      usage: 'Base calendar icon in calendar event component',
      components: ['CrCalendarEvent'],
    },
    {
      name: 'PiCalendarDot',
      component: PiCalendarDot,
      usage: 'Calendar with event indicator in main navigation',
      components: ['CrMainNav'],
    },
    {
      name: 'PiCalendarDots',
      component: PiCalendarDots,
      usage: 'Events section headers and event-related CTAs',
      components: ['CrCardDetails', 'CrCard', 'CrEventItem', 'CrPageHeader', 'Pages'],
    },
    {
      name: 'PiCalendarPlus',
      component: PiCalendarPlus,
      usage: 'Add to calendar action on event detail pages',
      components: ['EventDetailPage'],
    },
    {
      name: 'PiTicket',
      component: PiTicket,
      usage: 'Ticket purchase button on event cards and banners',
      components: ['CrCardBanner'],
    },

    // Music & Media
    {
      name: 'PiVinylRecord',
      component: PiVinylRecord,
      usage: 'Vinyl-related content, donation tiers, and music features',
      components: ['CrDonateForm', 'ListenPage', 'LandingPage'],
    },
    {
      name: 'PiMusicNote',
      component: PiMusicNote,
      usage: 'Single music note for DJ cards and music features',
      components: ['CrCurrentDjCard'],
    },
    {
      name: 'PiMusicNotes',
      component: PiMusicNotes,
      usage: 'Music library, collection links, and music-related actions',
      components: ['CrSidebar', 'CrDjOverview', 'CrFormsShowcase', 'CrModal'],
    },
    {
      name: 'PiPlaylist',
      component: PiPlaylist,
      usage: 'Playlist views and recently played sections',
      components: ['CrRecentlyPlayed', 'ListenPage'],
    },
    {
      name: 'PiPlayFill',
      component: PiPlayFill,
      usage: 'Play button in music player and previous shows',
      components: ['CrStreamingMusicPlayer', 'CrPreviousShows'],
    },
    {
      name: 'PiPauseFill',
      component: PiPauseFill,
      usage: 'Pause button in music player and previous shows',
      components: ['CrStreamingMusicPlayer', 'CrPreviousShows'],
    },
    {
      name: 'PiHeadphones',
      component: PiHeadphones,
      usage: 'Listen/audio sections in navigation and DJ overview',
      components: ['CrDjOverview'],
    },
    {
      name: 'PiMicrophone',
      component: PiMicrophone,
      usage: 'DJ and broadcast-related navigation',
      components: ['CrMainNav'],
    },

    // User & Social
    {
      name: 'PiHeart',
      component: PiHeart,
      usage: 'Favorite/like actions and profile interactions',
      components: ['DJDetailPage', 'CrProfileCard', 'CrMenuButton', 'CrTable'],
    },
    {
      name: 'PiHeartFill',
      component: PiHeartFill,
      usage: 'Favorited/liked state indicator',
      components: ['DJDetailPage', 'CrTable'],
    },
    {
      name: 'PiHandHeart',
      component: PiHandHeart,
      usage: 'DJ donation and support actions',
      components: ['CrDjDonation'],
    },
    {
      name: 'PiHandHeartLight',
      component: PiHandHeartLight,
      usage: 'Community actions, volunteer, and donate buttons in sidebar',
      components: ['CrSidebar', 'CrSelectButtonInteraction', 'CrAnnouncement'],
    },
    {
      name: 'PiUser',
      component: PiUser,
      usage: 'User profile placeholder and profile actions',
      components: ['CrProfileCard'],
    },
    {
      name: 'PiUserCircle',
      component: PiUserCircle,
      usage: 'User account menu and profile interactions',
      components: ['CrSelectButtonInteraction'],
    },
    {
      name: 'PiChatCircleText',
      component: PiChatCircleText,
      usage: 'Chat or comment features in DJ overview',
      components: ['CrDjOverview'],
    },
    {
      name: 'PiChatCircleTextLight',
      component: PiChatCircleTextLight,
      usage: 'Request button in sidebar for user interactions',
      components: ['CrSidebar'],
    },
    {
      name: 'PiSignIn',
      component: PiSignIn,
      usage: 'Sign in prompt on request song page',
      components: ['RequestSongPage'],
    },

    // Content & Documents
    {
      name: 'PiReadCvLogo',
      component: PiReadCvLogo,
      usage: 'Articles section headers and article-related CTAs',
      components: ['CrPageHeader', 'Pages'],
    },
    {
      name: 'PiNotepad',
      component: PiNotepad,
      usage: 'Terms & Privacy documentation links',
      components: ['CrAccountSettingsPage'],
    },
    {
      name: 'PiPaperclip',
      component: PiPaperclip,
      usage: 'App Support & Feedback button',
      components: ['CrAccountSettingsPage'],
    },
    {
      name: 'PiNewspaper',
      component: PiNewspaper,
      usage: 'News and articles navigation',
      components: ['CrMainNav'],
    },
    {
      name: 'PiMapTrifold',
      component: PiMapTrifold,
      usage: 'Venue location icon in card details',
      components: ['CrCardDetails', 'CrCard'],
    },

    // Communication
    {
      name: 'PiPaperPlaneRight',
      component: PiPaperPlaneRight,
      usage: 'Send button in request forms',
      components: ['CrRequestForm'],
    },
    {
      name: 'PiPaperPlaneTilt',
      component: PiPaperPlaneTilt,
      usage: 'Submit button in song request forms',
      components: ['CrSongRequestForm'],
    },

    // Settings & Tools
    {
      name: 'PiGear',
      component: PiGear,
      usage: 'Settings and configuration actions across the application',
      components: ['CrPageHeader', 'CrSidebar', 'CrSelectButtonInteraction'],
    },
    {
      name: 'PiFloppyDisk',
      component: PiFloppyDisk,
      usage: 'Save button in forms and edit interfaces',
      components: ['CrVolunteerEditForm', 'CrProfileEditForm', 'CrFormsShowcase'],
    },
    {
      name: 'PiPencilSimple',
      component: PiPencilSimple,
      usage: 'Edit actions in profile cards and image cropper',
      components: ['CrProfileCard', 'CrImageCropper', 'CrPageHeader'],
    },
    {
      name: 'PiUploadSimple',
      component: PiUploadSimple,
      usage: 'Upload button in image cropper',
      components: ['CrImageCropper'],
    },

    // Shopping & Commerce
    {
      name: 'PiShoppingBag',
      component: PiShoppingBag,
      usage: 'Shopping cart and store navigation',
      components: ['CrMainNav'],
    },

    // Visibility & Display
    {
      name: 'PiEye',
      component: PiEye,
      usage: 'Show/visibility toggle in ad spaces and tables',
      components: ['CrAdSpace', 'CrTable'],
    },
    {
      name: 'PiEyeSlash',
      component: PiEyeSlash,
      usage: 'Hide/visibility toggle in ad spaces',
      components: ['CrAdSpace'],
    },
    {
      name: 'PiDownload',
      component: PiDownload,
      usage: 'Download action in tables',
      components: ['CrTable'],
    },
    {
      name: 'PiDownloadSimple',
      component: PiDownloadSimple,
      usage: 'Simple download icon variant in tables',
      components: ['CrTable'],
    },
    {
      name: 'PiExport',
      component: PiExport,
      usage: 'Export action in tables',
      components: ['CrTable'],
    },

    // Collection & Add
    {
      name: 'PiPlusCircle',
      component: PiPlusCircle,
      usage: 'Add to collection in track info and playlist items',
      components: ['CrTrackInfo', 'CrPlaylistItem'],
    },
    {
      name: 'PiPlusSquare',
      component: PiPlusSquare,
      usage: 'Add item action in list items',
      components: ['CrListItem'],
    },
  ]

  // Social media icons (Font Awesome from react-icons/fa)
  const socialIcons = [
    {
      name: 'FaFacebookSquare',
      component: FaFacebookSquare,
      usage: 'Facebook social media link in footer',
      components: ['CrFooter', 'CrSocialIcon'],
    },
    {
      name: 'FaInstagram',
      component: FaInstagram,
      usage: 'Instagram social media link in footer',
      components: ['CrFooter', 'CrSocialIcon'],
    },
    {
      name: 'FaTwitterSquare',
      component: FaTwitterSquare,
      usage: 'Twitter social media link in footer',
      components: ['CrFooter', 'CrSocialIcon'],
    },
    {
      name: 'FaLinkedin',
      component: FaLinkedin,
      usage: 'LinkedIn social media link in footer',
      components: ['CrFooter', 'CrSocialIcon'],
    },
    {
      name: 'SiBluesky',
      component: SiBluesky,
      usage: 'Bluesky social media link in footer',
      components: ['CrFooter', 'CrSocialIcon'],
    },
  ]

  const colorOptions = [
    { name: 'Default', value: 'default', color: 'var(--cr-ink)' },
    { name: 'Primary', value: 'primary', color: 'var(--cr-primary-700)' },
    { name: 'Secondary', value: 'secondary', color: 'var(--cr-secondary-700)' },
    { name: 'Muted', value: 'muted', color: 'var(--cr-default-500)' },
    { name: 'Current', value: 'current', color: 'currentColor' },
  ]

  const getIconColor = () => {
    const colorOption = colorOptions.find((opt) => opt.value === selectedColor)
    return colorOption ? colorOption.color : 'var(--cr-ink)'
  }

  return React.createElement(
    'div',
    {
      key: 'main-container',
      className: 'sg-container',
    },
    [
      // Header
      React.createElement(
        'div',
        {
          key: 'header',
          className: 'sg-header sg-margin-bottom-xl',
        },
        [
          React.createElement(
            'h1',
            {
              key: 'title',
              className: 'sg-title',
            },
            'Icons Documentation'
          ),
          React.createElement(
            'p',
            {
              key: 'description',
              className: 'sg-description',
            },
            [
              'Complete documentation of all React Icons used in the CHIRP Radio WebApp project. ',
              'Icons are from the ',
              React.createElement(
                'code',
                {
                  key: 'code-inline',
                  style: {
                    backgroundColor: 'var(--cr-default-100)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontFamily: 'Monaco, monospace',
                    fontSize: '0.875em',
                    color: 'var(--cr-primary-700)',
                  },
                },
                'react-icons'
              ),
              ' library (Phosphor Icons, Font Awesome, and Simple Icons).',
            ]
          ),
        ]
      ),

      // Controls
      React.createElement(
        'div',
        {
          key: 'controls',
          className: 'sg-card sg-margin-bottom-lg',
        },
        [
          React.createElement(
            'h3',
            {
              key: 'controls-title',
              className: 'sg-card-title',
            },
            'Preview Controls'
          ),
          React.createElement(
            'div',
            {
              key: 'controls-content',
              className: 'sg-card-content',
            },
            [
              React.createElement(
                'div',
                {
                  key: 'controls-wrapper',
                  className: 'sg-icon-controls',
                },
                [
                  // Size Control
                  React.createElement('div', { key: 'size-group', className: 'sg-control-group' }, [
                    React.createElement(
                      'label',
                      { key: 'size-label', className: 'sg-control-label' },
                      `Size: ${selectedSize}px`
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'size-slider-wrapper',
                        style: {
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--cr-space-3)',
                        },
                      },
                      [
                        React.createElement(
                          'span',
                          {
                            key: 'min-label',
                            style: { fontSize: '12px', color: 'var(--cr-default-700)' },
                          },
                          '16px'
                        ),
                        React.createElement('input', {
                          key: 'size-slider',
                          type: 'range',
                          min: 16,
                          max: 128,
                          value: selectedSize,
                          onChange: (e) => setSelectedSize(Number(e.target.value)),
                          style: {
                            flex: 1,
                            cursor: 'pointer',
                          },
                        }),
                        React.createElement(
                          'span',
                          {
                            key: 'max-label',
                            style: { fontSize: '12px', color: 'var(--cr-default-700)' },
                          },
                          '128px'
                        ),
                      ]
                    ),
                  ]),

                  // Color Control
                  React.createElement(
                    'div',
                    { key: 'color-group', className: 'sg-control-group' },
                    [
                      React.createElement(
                        'label',
                        { key: 'color-label', className: 'sg-control-label' },
                        'Color'
                      ),
                      React.createElement(
                        'div',
                        {
                          key: 'color-buttons',
                          style: {
                            display: 'flex',
                            gap: 'var(--cr-space-1)',
                            flexWrap: 'wrap',
                          },
                        },
                        colorOptions.map((colorOption) =>
                          React.createElement(
                            'button',
                            {
                              key: `color-${colorOption.value}`,
                              style: {
                                padding: 'var(--cr-space-1) var(--cr-space-2)',
                                backgroundColor:
                                  selectedColor === colorOption.value
                                    ? 'var(--cr-primary-700)'
                                    : 'var(--cr-default-100)',
                                color:
                                  selectedColor === colorOption.value ? 'white' : 'var(--cr-ink)',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: '600',
                              },
                              onClick: () => setSelectedColor(colorOption.value),
                            },
                            colorOption.name
                          )
                        )
                      ),
                    ]
                  ),
                ]
              ),
            ]
          ),
        ]
      ),

      // Phosphor Icons Grid
      React.createElement('div', { key: 'phosphor-section' }, [
        React.createElement(
          'h2',
          {
            key: 'phosphor-title',
            style: {
              font: 'var(--cr-nav2)',
              color: 'var(--cr-ink)',
              marginBottom: 'var(--cr-space-4)',
              fontWeight: '600',
            },
          },
          'Phosphor Icons (react-icons/pi)'
        ),

        React.createElement(
          'div',
          {
            key: 'phosphor-grid',
            className: 'sg-icon-grid',
            style: {
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--cr-space-4)',
            },
          },
          icons.map((icon, index) => {
            const IconComponent = icon.component
            return React.createElement(
              'div',
              {
                key: `icon-${index}`,
                className: 'sg-card',
              },
              [
                // Icon Preview
                React.createElement(
                  'div',
                  {
                    key: 'preview',
                    className: 'sg-icon-preview',
                    style: { color: getIconColor() },
                  },
                  React.createElement(IconComponent, { size: selectedSize })
                ),

                // Icon Name
                React.createElement(
                  'div',
                  {
                    key: 'name',
                    className: 'sg-card-title',
                    style: { fontSize: '16px', fontWeight: '600' },
                  },
                  icon.name
                ),

                // Usage Description
                React.createElement(
                  'p',
                  {
                    key: 'usage',
                    className: 'cr-body-sm',
                    style: {
                      color: 'var(--cr-default-700)',
                      marginBottom: 'var(--cr-space-3)',
                      lineHeight: '1.5',
                    },
                  },
                  icon.usage
                ),

                // Components Used In
                React.createElement(
                  'div',
                  {
                    key: 'components-section',
                    style: { marginBottom: 'var(--cr-space-3)' },
                  },
                  [
                    React.createElement(
                      'div',
                      {
                        key: 'components-label',
                        className: 'sg-eyebrow',
                        style: { marginBottom: 'var(--cr-space-2)' },
                      },
                      'Used in:'
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'component-tags',
                        style: {
                          display: 'flex',
                          gap: 'var(--cr-space-1)',
                          flexWrap: 'wrap',
                        },
                      },
                      icon.components.map((comp) =>
                        React.createElement(
                          'span',
                          {
                            key: `tag-${comp}`,
                            style: {
                              backgroundColor: 'var(--cr-primary-100)',
                              color: 'var(--cr-primary-700)',
                              padding: 'var(--cr-space-xs) var(--cr-space-2)',
                              borderRadius: 'var(--cr-space-xs)',
                              fontSize: '11px',
                              fontWeight: '600',
                              textTransform: 'uppercase',
                              letterSpacing: '0.025em',
                            },
                          },
                          comp
                        )
                      )
                    ),
                  ]
                ),

                // Code Example
                React.createElement('div', { key: 'code-section' }, [
                  React.createElement(
                    'div',
                    {
                      key: 'code-label',
                      className: 'sg-eyebrow',
                      style: { marginBottom: 'var(--cr-space-2)' },
                    },
                    'Import & Usage:'
                  ),
                  React.createElement(
                    'pre',
                    {
                      key: 'code-block',
                      className: 'sg-code-box',
                      style: {
                        margin: 0,
                        fontSize: '12px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                      },
                    },
                    `import { ${icon.name} } from 'react-icons/pi';

<${icon.name} size={${selectedSize}} />`
                  ),
                ]),
              ]
            )
          })
        ),
      ]),

      // Social Media Icons Grid (Font Awesome)
      React.createElement(
        'div',
        { key: 'social-section', style: { marginTop: 'var(--cr-space-8)' } },
        [
          React.createElement(
            'h2',
            {
              key: 'social-title',
              style: {
                font: 'var(--cr-nav2)',
                color: 'var(--cr-ink)',
                marginBottom: 'var(--cr-space-4)',
                fontWeight: '600',
              },
            },
            'Social Media Icons'
          ),

          React.createElement(
            'div',
            {
              key: 'social-grid',
              className: 'sg-icon-grid',
              style: {
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--cr-space-4)',
              },
            },
            socialIcons.map((icon, index) => {
              const IconComponent = icon.component
              return React.createElement(
                'div',
                {
                  key: `social-icon-${index}`,
                  className: 'sg-card',
                },
                [
                  // Icon Preview
                  React.createElement(
                    'div',
                    {
                      key: 'preview',
                      className: 'sg-icon-preview',
                      style: { color: getIconColor() },
                    },
                    React.createElement(IconComponent, { size: selectedSize })
                  ),

                  // Icon Name
                  React.createElement(
                    'div',
                    {
                      key: 'name',
                      className: 'sg-card-title',
                      style: { fontSize: '16px', fontWeight: '600' },
                    },
                    icon.name
                  ),

                  // Usage Description
                  React.createElement(
                    'p',
                    {
                      key: 'usage',
                      className: 'cr-body-sm',
                      style: {
                        color: 'var(--cr-default-700)',
                        marginBottom: 'var(--cr-space-3)',
                        lineHeight: '1.5',
                      },
                    },
                    icon.usage
                  ),

                  // Components Used In
                  React.createElement(
                    'div',
                    {
                      key: 'components-section',
                      style: { marginBottom: 'var(--cr-space-3)' },
                    },
                    [
                      React.createElement(
                        'div',
                        {
                          key: 'components-label',
                          className: 'sg-eyebrow',
                          style: { marginBottom: 'var(--cr-space-2)' },
                        },
                        'Used in:'
                      ),
                      React.createElement(
                        'div',
                        {
                          key: 'component-tags',
                          style: {
                            display: 'flex',
                            gap: 'var(--cr-space-1)',
                            flexWrap: 'wrap',
                          },
                        },
                        icon.components.map((comp) =>
                          React.createElement(
                            'span',
                            {
                              key: `tag-${comp}`,
                              style: {
                                backgroundColor: 'var(--cr-primary-100)',
                                color: 'var(--cr-primary-700)',
                                padding: 'var(--cr-space-xs) var(--cr-space-2)',
                                borderRadius: 'var(--cr-space-xs)',
                                fontSize: '11px',
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: '0.025em',
                              },
                            },
                            comp
                          )
                        )
                      ),
                    ]
                  ),

                  // Code Example
                  React.createElement('div', { key: 'code-section' }, [
                    React.createElement(
                      'div',
                      {
                        key: 'code-label',
                        className: 'sg-eyebrow',
                        style: { marginBottom: 'var(--cr-space-2)' },
                      },
                      'Import & Usage:'
                    ),
                    React.createElement(
                      'pre',
                      {
                        key: 'code-block',
                        className: 'sg-code-box',
                        style: {
                          margin: 0,
                          fontSize: '12px',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        },
                      },
                      icon.name === 'SiBluesky'
                        ? `import { ${icon.name} } from 'react-icons/si';\n\n<${icon.name} size={${selectedSize}} />`
                        : `import { ${icon.name} } from 'react-icons/fa';\n\n<${icon.name} size={${selectedSize}} />`
                    ),
                  ]),
                ]
              )
            })
          ),
        ]
      ),

      // Usage Guidelines
      React.createElement('div', { key: 'guidelines', className: 'sg-card sg-margin-top-lg' }, [
        React.createElement(
          'h2',
          {
            key: 'guidelines-title',
            className: 'sg-card-title',
            style: { fontSize: '20px', textAlign: 'center' },
          },
          'Usage Guidelines'
        ),
        React.createElement('div', { key: 'guidelines-content', className: 'sg-card-content' }, [
          // Import Instructions
          React.createElement(
            'div',
            {
              key: 'import-section',
              style: { marginBottom: 'var(--cr-space-5)' },
            },
            [
              React.createElement(
                'h3',
                {
                  key: 'import-title',
                  style: {
                    font: 'var(--cr-nav2)',
                    color: 'var(--cr-ink)',
                    marginBottom: 'var(--cr-space-3)',
                    fontWeight: '600',
                  },
                },
                'Import Instructions'
              ),
              React.createElement(
                'pre',
                {
                  key: 'import-code',
                  className: 'sg-code-box',
                  style: { fontSize: '13px' },
                },
                `// Import Phosphor icons from react-icons/pi
import {
  PiHandHeartLight,
  PiCaretLeft,
  PiCaretRight,
  PiCalendarDots,
  PiReadCvLogo
} from 'react-icons/pi';

// Import Font Awesome icons from react-icons/fa
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLinkedin
} from 'react-icons/fa';

// Import Simple Icons
import { SiBluesky } from 'react-icons/si';`
              ),
            ]
          ),

          // Sizing Standards
          React.createElement(
            'div',
            {
              key: 'sizing-section',
              style: { marginBottom: 'var(--cr-space-5)' },
            },
            [
              React.createElement(
                'h3',
                {
                  key: 'sizing-title',
                  style: {
                    font: 'var(--cr-nav2)',
                    color: 'var(--cr-ink)',
                    marginBottom: 'var(--cr-space-3)',
                    fontWeight: '600',
                  },
                },
                'Sizing Standards'
              ),
              React.createElement(
                'ul',
                {
                  key: 'sizing-list',
                  style: {
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  },
                },
                [
                  React.createElement(
                    'li',
                    {
                      key: 'size-16-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'size-16-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        '16px: '
                      ),
                      'Small inline icons, form controls',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'size-20-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'size-20-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        '20px: '
                      ),
                      'Navigation icons, small buttons',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'size-24-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'size-24-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        '24px: '
                      ),
                      'Standard button icons, menu items (most common)',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'size-32-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'size-32-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        '32px: '
                      ),
                      'Large buttons, prominent actions',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'size-48-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'size-48-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        '48px: '
                      ),
                      'Hero buttons, main actions',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'size-64-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'size-64-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        '64px+: '
                      ),
                      'Large displays, hero sections, special cases',
                    ]
                  ),
                ]
              ),
            ]
          ),

          // Color Usage
          React.createElement(
            'div',
            {
              key: 'color-section',
              style: { marginBottom: 'var(--cr-space-5)' },
            },
            [
              React.createElement(
                'h3',
                {
                  key: 'color-title',
                  style: {
                    font: 'var(--cr-nav2)',
                    color: 'var(--cr-ink)',
                    marginBottom: 'var(--cr-space-3)',
                    fontWeight: '600',
                  },
                },
                'Color Usage'
              ),
              React.createElement(
                'ul',
                {
                  key: 'color-list',
                  style: {
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                  },
                },
                [
                  React.createElement(
                    'li',
                    {
                      key: 'color-ink-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'color-ink-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        'var(--cr-ink): '
                      ),
                      'Default text color, primary icon color',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'color-primary-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'color-primary-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        'var(--cr-primary-700): '
                      ),
                      'Active states, primary actions',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'color-secondary-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'color-secondary-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        'var(--cr-secondary-700): '
                      ),
                      'Secondary actions, accents',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'color-default-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        borderBottom: '1px solid var(--cr-default-200)',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'color-default-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        'var(--cr-default-700): '
                      ),
                      'Muted icons, secondary information',
                    ]
                  ),
                  React.createElement(
                    'li',
                    {
                      key: 'color-current-item',
                      style: {
                        padding: 'var(--cr-space-2) 0',
                        lineHeight: '1.6',
                      },
                    },
                    [
                      React.createElement(
                        'strong',
                        {
                          key: 'color-current-strong',
                          style: { color: 'var(--cr-primary-700)' },
                        },
                        'currentColor: '
                      ),
                      'Inherit color from parent element',
                    ]
                  ),
                ]
              ),
            ]
          ),

          // Best Practices
          React.createElement('div', { key: 'practices-section' }, [
            React.createElement(
              'h3',
              {
                key: 'practices-title',
                style: {
                  font: 'var(--cr-nav2)',
                  color: 'var(--cr-ink)',
                  marginBottom: 'var(--cr-space-3)',
                  fontWeight: '600',
                },
              },
              'Best Practices'
            ),
            React.createElement(
              'ul',
              {
                key: 'practices-list',
                style: {
                  listStyle: 'disc',
                  paddingLeft: 'var(--cr-space-5)',
                  margin: 0,
                },
              },
              [
                React.createElement(
                  'li',
                  {
                    key: 'practice-1-item',
                    style: {
                      padding: 'var(--cr-space-1) 0',
                      lineHeight: '1.6',
                    },
                  },
                  'Always use consistent sizing within the same component context'
                ),
                React.createElement(
                  'li',
                  {
                    key: 'practice-2-item',
                    style: {
                      padding: 'var(--cr-space-1) 0',
                      lineHeight: '1.6',
                    },
                  },
                  'Prefer CSS variables for colors to maintain theme consistency'
                ),
                React.createElement(
                  'li',
                  {
                    key: 'practice-3-item',
                    style: {
                      padding: 'var(--cr-space-1) 0',
                      lineHeight: '1.6',
                    },
                  },
                  'Use semantic naming for icon imports to improve code readability'
                ),
                React.createElement(
                  'li',
                  {
                    key: 'practice-4-item',
                    style: {
                      padding: 'var(--cr-space-1) 0',
                      lineHeight: '1.6',
                    },
                  },
                  'Include appropriate aria-labels for accessibility when icons convey meaning'
                ),
                React.createElement(
                  'li',
                  {
                    key: 'practice-5-item',
                    style: {
                      padding: 'var(--cr-space-1) 0',
                      lineHeight: '1.6',
                    },
                  },
                  'Choose icons from the Phosphor family for UI consistency'
                ),
              ]
            ),
          ]),
        ]),
      ]),
    ]
  )
}
