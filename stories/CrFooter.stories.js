// CrFooter.stories.js
import React from 'react';
import CrFooter from './CrFooter';

export default {
  title: 'Organisms/CrFooter',
  component: CrFooter,
  parameters: {
    layout: 'fullscreen',
    docs: {
  description: {
    component: 'CrFooter uses the CrSocialIcon atom for social media links. This component provides complete site footer with CHIRP branding, social media links, navigation sections, event images, and Callibrity attribution. Complex multi-section layout with responsive behavior and automatic light/dark mode logo switching. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
},
  },
  tags: ['autodocs'],
  argTypes: {
    onPrivacyPolicyClick: { action: 'privacy policy clicked' },
    onTermsOfServiceClick: { action: 'terms of service clicked' },
    onSitemapClick: { action: 'sitemap clicked' },
    onCallibrityClick: { action: 'callibrity clicked' },
    onSocialClick: { action: 'social clicked' },
  },
};

export const Default = {
  args: {},
  render: (args) => {
    return React.createElement(CrFooter, args);
  }
};

export const WithInteractions = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Footer with all interaction handlers configured for testing clicks on links and social media buttons.'
      },
    },
  },
  render: (args) => {
    const handlers = {
      onPrivacyPolicyClick: () => console.log('Privacy Policy clicked'),
      onTermsOfServiceClick: () => console.log('Terms of Service clicked'),
      onSitemapClick: () => console.log('Sitemap clicked'),
      onCallibrityClick: () => console.log('Callibrity link clicked'),
      onSocialClick: (platform) => console.log(`${platform} social clicked`),
    };
    
    return React.createElement(CrFooter, { ...args, ...handlers });
  }
};

export const DarkMode = {
  args: {},
  parameters: {
    backgrounds: { 
      default: 'dark',
      values: [
        { name: 'dark', value: '#2a2a2a' }
      ]
    },
    docs: {
      description: {
        story: 'Footer in dark mode showing adjusted background colors, white Callibrity logo, and textured background.'
      },
    },
  },
  render: (args) => {
    return React.createElement('div', {
      'data-theme': 'dark',
      style: { 
        backgroundColor: '#2a2a2a',
        minHeight: '300px'
      }
    }, React.createElement(CrFooter, args));
  }
};

export const Mobile = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Footer on mobile devices with stacked layout and centered alignment.'
      },
    },
  },
  render: (args) => {
    return React.createElement(CrFooter, args);
  }
};