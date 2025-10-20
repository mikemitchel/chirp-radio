// CrMobileAppFrame.stories.tsx
import React from 'react'
import CrMobileAppFrame from './CrMobileAppFrame'
import { AudioPlayerProvider } from '../contexts/AudioPlayerContext'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Templates/CrMobileAppFrame',
  component: CrMobileAppFrame,
  decorators: [
    (Story) => React.createElement(BrowserRouter, null, React.createElement(AuthProvider, null, React.createElement(AudioPlayerProvider, null, React.createElement(Story)))),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CrMobileAppFrame uses the CrMobileHeader molecule, the CrStreamingMusicPlayer template, and the CrSidebar organism. This component provides complete mobile application layout with header, content area, and integrated music player. Supports both landing page (full-screen player) and interior page (footer player) variants. This complex composition of multiple high-level components makes it a proper Template. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['landing', 'interior'],
      description:
        'Frame layout variant - landing page with background player or interior page with content and footer player',
    },
    pageTitle: {
      control: 'text',
      description: 'Title displayed in the mobile header',
    },
    contentTitle: {
      control: 'text',
      description: 'Main content title (interior variant only)',
      if: { arg: 'variant', eq: 'interior' },
    },
    contentSubtitle: {
      control: 'text',
      description: 'Main content subtitle (interior variant only)',
      if: { arg: 'variant', eq: 'interior' },
    },
    onLogoClick: {
      action: 'logo clicked',
      description: 'Callback when header logo is clicked',
    },
    // Sidebar navigation handlers
    onHomeClick: { action: 'home clicked' },
    onNowPlayingClick: { action: 'now playing clicked' },
    onRecentPlaylistClick: { action: 'recent playlist clicked' },
    onYourCollectionClick: { action: 'your collection clicked' },
    onListenClick: { action: 'listen clicked' },
    onPlaylistClick: { action: 'playlist clicked' },
    onPodcastClick: { action: 'podcast clicked' },
    onDjsClick: { action: 'djs clicked' },
    onScheduleClick: { action: 'schedule clicked' },
    onEventsClick: { action: 'events clicked' },
    onArticlesClick: { action: 'articles clicked' },
    onDonateClick: { action: 'donate clicked' },
    onWaysToGiveClick: { action: 'ways to give clicked' },
    onVinylCircleClick: { action: 'vinyl circle clicked' },
    onShopClick: { action: 'shop clicked' },
    onAboutClick: { action: 'about clicked' },
    onOtherWaysToListenClick: { action: 'other ways to listen clicked' },
    onContactClick: { action: 'contact clicked' },
    onBecomeVolunteerClick: { action: 'become volunteer clicked' },
    onRequestClick: { action: 'request clicked' },
    onAccountSettingsClick: { action: 'account settings clicked' },
  },
}

// Landing page layout
export const Landing = {
  args: {
    variant: 'landing',
    pageTitle: 'CHIRP Radio',
    streamingPlayerProps: {
      djName: 'DJ Current',
      showName: 'The Current Show',
      artistName: 'John Coltrane',
      trackName: 'Giant Steps',
      albumName: 'Giant Steps',
      labelName: 'Atlantic Records',
      albumArt:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Coltrane_Giant_Steps.jpg/500px-Coltrane_Giant_Steps.jpg',
      autoFetch: false,
      isTrackAdded: false,
      isLocal: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Landing page layout** - Mobile header fixed at top with mobile streaming player as full-screen background. Perfect for the main app entry point where the music experience is the primary focus.',
      },
    },
  },
}

// Interior page layout
export const Interior = {
  args: {
    variant: 'interior',
    pageTitle: 'Discover',
    contentTitle: 'Welcome to CHIRP Radio',
    contentSubtitle: 'Chicago Independent Radio Project',
    streamingPlayerProps: {
      artistName: 'Thom Yorke',
      trackName: 'Hearing Damage',
      albumArt: 'https://e.snmc.io/i/300/w/edc39e408543b26904eb76748c2f1c4d/8819855',
      autoFetch: false,
      isTrackAdded: true,
      isLocal: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Interior page layout** - Mobile header at top, scrollable content area with default sections, and slim streaming player fixed at bottom like a footer. Ideal for content pages, navigation, and user interactions.',
      },
    },
  },
}

// Custom content example
export const CustomContent = {
  args: {
    variant: 'interior',
    pageTitle: 'My Collection',
    streamingPlayerProps: {
      artistName: 'Radiohead',
      trackName: 'Everything In Its Right Place',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/0/02/Radioheadkidiamnesia.png',
      autoFetch: false,
      isTrackAdded: true,
      isLocal: false,
    },
  },
  render: (args) =>
    React.createElement(
      CrMobileAppFrame,
      args,
      React.createElement(
        'div',
        { style: { textAlign: 'center', padding: '2rem 0' } },
        React.createElement(
          'h1',
          { style: { marginBottom: '1rem', color: 'var(--cr-primary-500)' } },
          'My Saved Tracks'
        ),
        React.createElement(
          'p',
          { style: { marginBottom: '2rem', color: 'var(--cr-default-700)' } },
          'Your personal collection of favorite CHIRP Radio tracks'
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              marginTop: '2rem',
            },
          },
          React.createElement(
            'div',
            {
              style: {
                background: 'var(--cr-primary-100)',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid var(--cr-primary-300)',
              },
            },
            React.createElement('h3', { style: { marginBottom: '0.5rem' } }, 'Recently Added'),
            React.createElement(
              'p',
              { style: { color: 'var(--cr-default-700)', margin: 0 } },
              '12 tracks this week'
            )
          ),
          React.createElement(
            'div',
            {
              style: {
                background: 'var(--cr-secondary-100)',
                padding: '1.5rem',
                borderRadius: '8px',
                border: '1px solid var(--cr-secondary-300)',
              },
            },
            React.createElement('h3', { style: { marginBottom: '0.5rem' } }, 'Most Played'),
            React.createElement(
              'p',
              { style: { color: 'var(--cr-default-700)', margin: 0 } },
              '87 total plays'
            )
          )
        )
      )
    ),
  parameters: {
    docs: {
      description: {
        story:
          '**Custom content example** - Interior layout with custom React content passed as children. Shows how to create specific page layouts within the mobile app frame structure.',
      },
    },
  },
}

// Live API data example
export const WithLiveData = {
  args: {
    variant: 'interior',
    pageTitle: 'Now Playing',
    contentTitle: 'Live from CHIRP',
    contentSubtitle: 'Currently broadcasting',
    streamingPlayerProps: {
      autoFetch: true,
      apiUrl: 'https://chirpradio.appspot.com/api/current_playlist',
      streamUrl: 'https://peridot.streamguys1.com:5185/live',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Live API data** - Interior layout with streaming player fetching real-time data from CHIRP Radio API. The player will automatically update with current track information.',
      },
    },
  },
}

// Menu and navigation interactions
export const InteractiveExample = {
  args: {
    variant: 'interior',
    pageTitle: 'Home',
    contentTitle: 'CHIRP Radio',
    contentSubtitle: 'Independent music for independent minds',
  },
  render: (args) => {
    const [currentPage, setCurrentPage] = React.useState('Home')

    const handleLogoClick = () => {
      setCurrentPage('Home')
      console.log('Logo clicked - navigating to home')
    }

    const handleNavigation = (page) => {
      setCurrentPage(page)
      console.log(`Navigating to: ${page}`)
    }

    return React.createElement(
      CrMobileAppFrame,
      {
        ...args,
        pageTitle: currentPage,
        onLogoClick: handleLogoClick,
        onHomeClick: () => handleNavigation('Home'),
        onNowPlayingClick: () => handleNavigation('Now Playing'),
        onRecentPlaylistClick: () => handleNavigation('Recent Playlist'),
        onYourCollectionClick: () => handleNavigation('Your Collection'),
        onListenClick: () => handleNavigation('Listen'),
        onPlaylistClick: () => handleNavigation('Playlist'),
        onPodcastClick: () => handleNavigation('Podcast'),
        onDjsClick: () => handleNavigation('DJs'),
        onScheduleClick: () => handleNavigation('Schedule'),
        onEventsClick: () => handleNavigation('Events'),
        onArticlesClick: () => handleNavigation('Articles'),
        onDonateClick: () => handleNavigation('Donate'),
        onWaysToGiveClick: () => handleNavigation('Ways to Give'),
        onVinylCircleClick: () => handleNavigation('Vinyl Circle'),
        onShopClick: () => handleNavigation('Shop'),
        onAboutClick: () => handleNavigation('About'),
        onOtherWaysToListenClick: () => handleNavigation('Other Ways to Listen'),
        onContactClick: () => handleNavigation('Contact'),
        onBecomeVolunteerClick: () => handleNavigation('Become a Volunteer'),
        onRequestClick: () => handleNavigation('Request'),
        onAccountSettingsClick: () => handleNavigation('Account Settings'),
        streamingPlayerProps: {
          artistName: 'The National',
          trackName: 'I Need My Girl',
          albumArt:
            'https://upload.wikimedia.org/wikipedia/en/6/60/The_National_-_Trouble_Will_Find_Me.jpg',
          autoFetch: false,
          isLocal: false,
        },
      },
      React.createElement(
        'div',
        { style: { textAlign: 'center' } },
        React.createElement(
          'p',
          {
            style: {
              marginBottom: '2rem',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            },
          },
          `Current page: ${currentPage}`
        ),
        React.createElement(
          'p',
          { style: { marginBottom: '2rem', color: 'var(--cr-primary-500)' } },
          'Click the menu button (☰) in the header to open the sidebar navigation!'
        ),
        React.createElement(
          'div',
          {
            style: {
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            },
          },
          ['Discover', 'Schedule', 'Shows', 'Community', 'About'].map((page) =>
            React.createElement(
              'button',
              {
                key: page,
                onClick: () => setCurrentPage(page),
                style: {
                  padding: '0.75rem 1.5rem',
                  background:
                    currentPage === page ? 'var(--cr-primary-500)' : 'var(--cr-default-100)',
                  color: currentPage === page ? 'white' : 'var(--cr-ink)',
                  border: '1px solid var(--cr-border)',
                  borderRadius: '6px',
                  cursor: 'pointer',
                },
              },
              page
            )
          )
        ),
        React.createElement(
          'div',
          {
            style: {
              marginTop: '2rem',
              padding: '1rem',
              background: 'var(--cr-default-100)',
              borderRadius: '8px',
            },
          },
          React.createElement('h3', { style: { marginBottom: '1rem' } }, 'Navigation Test'),
          React.createElement(
            'p',
            { style: { margin: 0 } },
            'Use the sidebar menu to navigate between sections. All navigation handlers are wired up and will update the page title and log to the console.'
          )
        )
      )
    )
  },
  parameters: {
    docs: {
      description: {
        story:
          '**Interactive sidebar navigation** - Click the menu button (☰) in the header to open the mobile sidebar. All navigation links are functional and will update the page title. Try navigating through different sections to see the sidebar in action!',
      },
    },
  },
}
