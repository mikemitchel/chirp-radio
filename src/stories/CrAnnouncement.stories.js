// CrAnnouncement.stories.tsx
import React from 'react'
import CrAnnouncement from './CrAnnouncement'

export default {
  title: 'Organisms/CrAnnouncement',
  component: CrAnnouncement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'CrAnnouncement uses the CrDonationBar atom and the CrButton atom. This component displays site-wide announcement banners for important messages, donation drives, or event promotions. Supports different background colors and themes with customizable action buttons and optional donation progress bars. Can display speaker and mobile icons for app promotion messaging. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['donation', 'motivation'],
      description: 'Component variant',
    },
    widthVariant: {
      control: 'select',
      options: ['full', 'third'],
      description: 'Width variant - full (desktop 2-col) or third (compact, header on top)',
    },
    textureBackground: {
      control: 'select',
      options: ['cr-bg-natural-a500', 'cr-bg-natural-s100', 'cr-bg-natural-s900', 'cr-bg-natural-d100', 'cr-bg-natural-d900'],
      description: 'Textured background class'
    },
    buttonCount: {
      control: 'select',
      options: ['one', 'two', 'none'],
      description: 'Number of buttons to display',
    },
  },
}

// Donation variant with yellow background
export const DonationYellow = {
  args: {
    variant: 'donation',
    textureBackground: 'cr-bg-natural-a500',
    headlineText: "It's our fifteenth anniversary!",
    bodyText: 'Celebrate our history & help us plan for the future!',
    showLink: true,
    linkText: 'DONATE TODAY & HELP US RAISE $48K!',
    linkUrl: '#',
    buttonCount: 'two',
    button1Text: 'SMART SPEAKER',
    button1Icon: 'speaker',
    button2Text: 'MOBILE',
    button2Icon: 'mobile',
    currentAmount: 7271,
    targetAmount: 48000,
  },
}

// Motivation variant with blue background
export const MotivationBlue = {
  args: {
    variant: 'motivation',
    textureBackground: 'cr-bg-natural-s100',
    headlineText: 'Listen to Chirp on the go!',
    bodyText: 'Listen to CHIRP Radio your way on your smart speaker or mobile devices.',
    showLink: true,
    linkText: 'Discover how today!',
    linkUrl: '#',
    buttonCount: 'two',
    button1Text: 'SMART SPEAKER',
    button1Icon: 'speaker',
    button2Text: 'MOBILE',
    button2Icon: 'mobile',
  },
}

// Donation variant with dark background
export const DonationDark = {
  args: {
    variant: 'donation',
    textureBackground: 'cr-bg-natural-d100',
    headlineText: 'Support Independent Radio',
    bodyText: 'Your donation keeps CHIRP Radio broadcasting',
    showLink: false,
    buttonCount: 'one',
    button1Text: 'DONATE NOW',
    button1Icon: 'speaker',
    currentAmount: 15600,
    targetAmount: 25000,
  },
}

// Single button variant
export const SingleButton = {
  args: {
    variant: 'motivation',
    textureBackground: 'cr-bg-natural-a500',
    headlineText: 'Listen Anywhere',
    bodyText: 'Take CHIRP Radio with you wherever you go',
    showLink: false,
    buttonCount: 'one',
    button1Text: 'GET THE APP',
    button1Icon: 'mobile',
  },
}

// All texture backgrounds showcase
export const AllBackgrounds = {
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--cr-space-4)'
    }
  }, [
    React.createElement(CrAnnouncement, {
      key: 'yellow',
      variant: 'donation',
      textureBackground: 'cr-bg-natural-a500',
      headlineText: "Yellow Background (A500)",
      bodyText: "Accent color texture background",
      showLink: false,
      buttonCount: 'two',
      currentAmount: 5000,
      targetAmount: 10000
    }),
    React.createElement(CrAnnouncement, {
      key: 'blue',
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-s100',
      headlineText: "Blue Background (S100)",
      bodyText: "Secondary color texture background",
      showLink: false,
      buttonCount: 'two'
    }),
    React.createElement(CrAnnouncement, {
      key: 'dark',
      variant: 'donation',
      textureBackground: 'cr-bg-natural-d100',
      headlineText: "Dark Background (D100)",
      bodyText: "Default light gray texture background",
      showLink: false,
      buttonCount: 'two',
      currentAmount: 8000,
      targetAmount: 12000
    }),
    React.createElement(CrAnnouncement, {
      key: 'darker',
      variant: 'motivation',
      textureBackground: 'cr-bg-natural-s900',
      headlineText: "Darker Blue Background (S900)",
      bodyText: "Secondary dark texture background",
      showLink: false,
      buttonCount: 'two'
    }),
    React.createElement(CrAnnouncement, {
      key: 'darkest',
      variant: 'donation',
      textureBackground: 'cr-bg-natural-d900',
      headlineText: "Darkest Background (D900)",
      bodyText: "Default dark gray texture background",
      showLink: false,
      buttonCount: 'two',
      currentAmount: 12000,
      targetAmount: 20000
    })
  ])
};

// Third width variant - compact layout for sidebars
export const ThirdWidth = {
  args: {
    variant: 'motivation',
    widthVariant: 'third',
    textureBackground: 'cr-bg-natural-s900',
    headlineText: 'Listen on the go!',
    bodyText: 'Stream CHIRP Radio on your smart speaker or mobile device.',
    showLink: true,
    linkText: 'Get the app today!',
    linkUrl: '#',
    buttonCount: 'two',
    button1Text: 'SMART SPEAKER',
    button1Icon: 'speaker',
    button2Text: 'MOBILE',
    button2Icon: 'mobile',
  },
  decorators: [
    (Story) =>
      React.createElement(
        'div',
        { style: { maxWidth: '420px', margin: '0 auto' } },
        React.createElement(Story)
      ),
  ],
};
