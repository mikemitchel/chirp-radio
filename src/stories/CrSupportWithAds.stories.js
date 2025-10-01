// CrSupportWithAds.stories.tsx
import React from 'react';
import CrSupportWithAds from './CrSupportWithAds';

export default {
  title: 'Molecules/CrSupportWithAds',
  component: CrSupportWithAds,
  parameters: {
    layout: 'padded',
    controls: {
      exclude: ['additionalLogos', 'adAlt', 'adTarget', 'className', 'onAdLoad', 'onAdError', 'onAdClick', 'onAdImpression', 'adCustomWidth', 'adCustomHeight', 'adHtmlContent', 'adVideoSrc', 'adEmbedCode']
    },
docs: {
  description: {
    component: 'Built from CrSupport and CrAdSpace atoms in layout container. Combined component showing supporter logos alongside advertisement space. Responsive layout (side-by-side on web, stacked on mobile). Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs'],
  argTypes: {
    // Support section controls
    showAdditionalLogos: {
      control: 'boolean',
      description: 'Show additional supporter logos',
      table: { category: 'Support' }
    },
    logoCount: {
      control: { type: 'select' },
      options: [1, 2, 3],
      description: 'Number of additional logos to show',
      table: { category: 'Support' }
    },
    
    // Ad section controls
    adSize: {
      control: { type: 'select' },
      options: ['large-rectangle', 'leaderboard', 'medium-rectangle', 'mobile-banner', 'wide-skyscraper', 'custom'],
      description: 'Predefined ad size',
      table: { category: 'Advertisement' }
    },
    adContentType: {
      control: { type: 'select' },
      options: ['image', 'video', 'html', 'embed'],
      description: 'Type of ad content',
      table: { category: 'Advertisement' }
    },
    adSrc: {
      control: 'text',
      description: 'Ad image/video source URL',
      table: { category: 'Advertisement' }
    },
    adHref: {
      control: 'text',
      description: 'Ad click-through URL',
      table: { category: 'Advertisement' }
    },
    adLoading: {
      control: 'boolean',
      description: 'Show ad loading state',
      table: { category: 'Advertisement' }
    },
    adShowLabel: {
      control: 'boolean',
      description: 'Show ad size label in placeholder',
      table: { category: 'Advertisement' }
    },
    
    // Layout controls
    layoutVariant: {
      control: { type: 'select' },
      options: ['default', 'support-heavy', 'compact'],
      description: 'Layout variation',
      table: { category: 'Layout' }
    }
  }
};

// Sample additional logos
const sampleLogos = [
  {
    src: '/src/assets/support-logos/logoipsum-343.svg',
    alt: 'Additional Supporter 1'
  },
  {
    src: '/src/assets/support-logos/logoipsum-360.svg',
    alt: 'Additional Supporter 2'
  },
  {
    src: '/src/assets/support-logos/logoipsum-358.svg',
    alt: 'Additional Supporter 3'
  }
];

// Template function to handle logo count
const Template = (args) => {
  const { logoCount, layoutVariant, ...otherArgs } = args;
  const additionalLogos = otherArgs.showAdditionalLogos ? sampleLogos.slice(0, logoCount) : [];
  
  const className = layoutVariant !== 'default' ? `cr-support-with-ads--${layoutVariant}` : '';
  
  return React.createElement(CrSupportWithAds, {
    ...otherArgs,
    additionalLogos,
    className
  });
};

export const Default = {
  render: Template,
  args: {
    showAdditionalLogos: false,
    logoCount: 2,
    adSize: 'medium-rectangle',
    adContentType: 'image',
    adSrc: 'https://picsum.photos/seed/ad1/300/250',
    adHref: 'https://example.com',
    adLoading: false,
    adShowLabel: true,
    layoutVariant: 'default'
  }
};

export const WithAdditionalLogos = {
  render: Template,
  args: {
    showAdditionalLogos: true,
    logoCount: 3,
    adSize: 'medium-rectangle',
    adContentType: 'image',
    adSrc: 'https://picsum.photos/seed/ad2/300/250',
    adHref: 'https://example.com',
    adLoading: false,
    adShowLabel: true,
    layoutVariant: 'default'
  }
};

export const WithLargeAd = {
  render: Template,
  args: {
    showAdditionalLogos: true,
    logoCount: 2,
    adSize: 'large-rectangle',
    adContentType: 'image',
    adSrc: 'https://picsum.photos/seed/ad3/336/280',
    adHref: 'https://example.com',
    adLoading: false,
    adShowLabel: true,
    layoutVariant: 'default'
  }
};