// CrSidebar.stories.tsx
import React from 'react'
import CrSidebar from './CrSidebar'

export default {
  title: 'Organisms/CrSidebar',
  component: CrSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CrSidebar uses the CrButton atom, the CrLogo atom, and the CrMenuButton atom. This component provides complete navigation sidebar with CHIRP branding, hierarchical menu structure, and footer actions. Complex multi-level navigation system with mobile overlay behavior and backdrop. Supports web and mobile variants with extensive navigation handlers. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls sidebar visibility',
    },
    variant: {
      control: { type: 'select' },
      options: ['web', 'mobile'],
      description: 'Sidebar variant for different layouts',
    },
  },
}

// Template for all stories
const Template = (args) => {
  return React.createElement(
    'div',
    {
      style: {
        height: '100vh',
        position: 'relative',
        background: 'var(--cr-background)',
      },
    },
    [
      // Main content that stays in place
      React.createElement(
        'div',
        {
          key: 'content',
          style: {
            padding: 'var(--cr-space-4)',
            height: '100vh',
            overflow: 'auto',
          },
        },
        [
          React.createElement('h1', { key: 'title' }, 'Main Content Area'),
          React.createElement(
            'p',
            { key: 'desc' },
            'This demonstrates how the sidebar slides out as a lightbox overlay without pushing content.'
          ),
          React.createElement(
            'p',
            { key: 'desc2' },
            'The sidebar should appear over this content with a backdrop.'
          ),
          React.createElement(
            'div',
            {
              key: 'filler',
              style: {
                height: '200vh',
                background: 'linear-gradient(to bottom, #f0f0f0, #e0e0e0)',
              },
            },
            'Scroll content to test overlay behavior'
          ),
        ]
      ),

      // Sidebar component
      React.createElement(CrSidebar, {
        key: 'sidebar',
        ...args,
        onClose: () => console.log('Close clicked'),
        onLogoClick: () => console.log('Logo clicked'),
        onHomeClick: () => console.log('Home clicked'),
        onNowPlayingClick: () => console.log('Now Playing clicked'),
        onRecentPlaylistClick: () => console.log('Recent Playlist clicked'),
        onYourCollectionClick: () => console.log('Your Collection clicked'),
        onListenClick: () => console.log('Listen clicked'),
        onPlaylistClick: () => console.log('Playlist clicked'),
        onPodcastClick: () => console.log('Podcast clicked'),
        onDjsClick: () => console.log('DJs clicked'),
        onScheduleClick: () => console.log('Schedule clicked'),
        onEventsClick: () => console.log('Events clicked'),
        onArticlesClick: () => console.log('Articles clicked'),
        onDonateClick: () => console.log('Donate clicked'),
        onWaysToGiveClick: () => console.log('Ways to Give clicked'),
        onVinylCircleClick: () => console.log('Vinyl Circle clicked'),
        onShopClick: () => console.log('Shop clicked'),
        onAboutClick: () => console.log('About clicked'),
        onOtherWaysToListenClick: () => console.log('Other Ways to Listen clicked'),
        onContactClick: () => console.log('Contact clicked'),
        onBecomeVolunteerClick: () => console.log('Become a Volunteer clicked'),
        onRequestClick: () => console.log('Request clicked'),
        onAccountSettingsClick: () => console.log('Account Settings clicked'),
      }),
    ]
  )
}

// Web variant (default)
export const WebDefault = Template.bind({})
WebDefault.args = {
  isOpen: true,
  variant: 'web',
}

export const WebClosed = Template.bind({})
WebClosed.args = {
  isOpen: false,
  variant: 'web',
}

// Mobile variant
export const MobileDefault = Template.bind({})
MobileDefault.args = {
  isOpen: true,
  variant: 'mobile',
}
MobileDefault.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

export const MobileClosed = Template.bind({})
MobileClosed.args = {
  isOpen: false,
  variant: 'mobile',
}
MobileClosed.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}

// Interactive mobile example
export const MobileInteractive = Template.bind({})
MobileInteractive.args = {
  isOpen: true,
  variant: 'mobile',
}
MobileInteractive.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
  docs: {
    description: {
      story:
        'Mobile sidebar with all interaction handlers configured. Shows the mobile-specific sections like "Now Playing", "Recent Playlist", and "Your Collection" at the top, plus the close button.',
    },
  },
}

// Legacy support - keeping original stories for backward compatibility
export const Default = Template.bind({})
Default.args = {
  isOpen: true,
  variant: 'web',
}

export const Closed = Template.bind({})
Closed.args = {
  isOpen: false,
  variant: 'web',
}

export const MobileView = Template.bind({})
MobileView.args = {
  isOpen: true,
  variant: 'mobile',
}
MobileView.parameters = {
  viewport: {
    defaultViewport: 'mobile1',
  },
}
