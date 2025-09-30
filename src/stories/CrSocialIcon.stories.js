// CrSocialIcon.stories.tsx
import React from 'react';
import CrSocialIcon from './CrSocialIcon';

export default {
  title: 'Atoms/CrSocialIcon',
  component: CrSocialIcon,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A social media icon component with platform-specific branding colors and consistent styling. Supports links, buttons, and static display modes. Is expandable as needed.'
      }
    }
  },
  argTypes: {
    platform: {
      control: 'select',
      options: ['facebook', 'instagram', 'twitter', 'bluesky', 'linkedin'],
      description: 'Social media platform'
    },
    size: {
      control: { type: 'range', min: 16, max: 64, step: 8 },
      description: 'Icon size in pixels'
    },
    url: {
      control: 'text',
      description: 'URL for the social media link'
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler function'
    }
  },
  tags: ['autodocs']
};

export const Facebook = {
  args: {
    platform: 'facebook',
    size: 32,
    url: 'www.facebook.com/chirpradio'
  }
};

export const Instagram = {
  args: {
    platform: 'instagram',
    size: 32,
    url: 'www.instagram.com/chirpradio'
  }
};

export const Twitter = {
  args: {
    platform: 'twitter',
    size: 32,
    url: 'www.twitter.com/chirpradio'
  }
};

export const Bluesky = {
  args: {
    platform: 'bluesky',
    size: 32,
    url: 'www.bluesky.com/chirpradio'
  }
};

export const LinkedIn = {
  args: {
    platform: 'linkedin',
    size: 32,
    url: 'www.linkedin.com/company/chirpradio'
  }
};

export const AllPlatforms = {
  render: () => {
    const platforms = [
      { platform: 'facebook', url: 'www.facebook.com/chirpradio' },
      { platform: 'instagram', url: 'www.instagram.com/chirpradio' },
      { platform: 'twitter', url: 'www.twitter.com/chirpradio' },
      { platform: 'bluesky', url: 'www.bluesky.com/chirpradio' },
      { platform: 'linkedin', url: 'www.linkedin.com/company/chirpradio' }
    ];

    return React.createElement('div', {
      style: {
        display: 'flex',
        gap: 'var(--cr-space-6)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, platforms.map(({ platform, url }) =>
      React.createElement(CrSocialIcon, {
        key: platform,
        platform,
        size: 32,
        url,
        onClick: (platform, url) => console.log(`Clicked ${platform}: ${url}`)
      })
    ));
  },
  parameters: {
    docs: {
      description: {
        story: 'All available social media platforms with their brand colors.'
      }
    }
  }
};

export const DifferentSizes = {
  render: () => {
    const sizes = [16, 24, 32, 48, 64];
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        gap: 'var(--cr-space-6)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, sizes.map(size =>
      React.createElement('div', {
        key: size,
        style: {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--cr-space-2)'
        }
      }, [
        React.createElement(CrSocialIcon, {
          key: 'icon',
          platform: 'instagram',
          size,
          url: 'www.instagram.com/chirpradio'
        }),
        React.createElement('span', {
          key: 'label',
          style: {
            fontSize: '12px',
            color: 'var(--cr-default-700)'
          }
        }, `${size}px`)
      ])
    ));
  },
  parameters: {
    docs: {
      description: {
        story: 'Social media icon in different sizes from 16px to 64px.'
      }
    }
  }
};

export const AsButtons = {
  render: () => {
    const platforms = ['facebook', 'instagram', 'twitter', 'bluesky', 'linkedin'];
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        gap: 'var(--cr-space-4)',
        alignItems: 'center',
        flexWrap: 'wrap'
      }
    }, platforms.map(platform =>
      React.createElement(CrSocialIcon, {
        key: platform,
        platform,
        size: 28,
        onClick: (clickedPlatform) => console.log(`Button clicked: ${clickedPlatform}`)
      })
    ));
  },
  parameters: {
    docs: {
      description: {
        story: 'Social media icons used as interactive buttons without URLs.'
      }
    }
  }
};

export const InProfileCardLayout = {
  render: () => {
    const socialLinks = [
      { platform: 'facebook', url: 'www.facebook.com/thisguyrighthere' },
      { platform: 'instagram', url: 'www.instagram.com/thisguydoingstuff' },
      { platform: 'twitter', url: 'www.twitter.com/thisguytakingtrash' },
      { platform: 'linkedin', url: 'www.linkedin.com/thisgutbuttonedup' },
      { platform: 'bluesky', url: 'www.bluesky.com/thisguygettingaway' }
    ];

    return React.createElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--cr-space-5)',
        maxWidth: '300px'
      }
    }, socialLinks.map(({ platform, url }) =>
      React.createElement('div', {
        key: platform,
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--cr-space-3)'
        }
      }, [
        React.createElement(CrSocialIcon, {
          key: 'icon',
          platform,
          size: 24,
          url
        }),
        React.createElement('a', {
          key: 'link',
          href: `https://${url}`,
          style: {
            font: 'var(--cr-body-sm)',
            color: 'var(--cr-ink)',
            textDecoration: 'underline',
            textUnderlinePosition: 'from-font'
          }
        }, url)
      ])
    ));
  },
  parameters: {
    docs: {
      description: {
        story: 'Social media icons used in a profile card layout with accompanying links.'
      }
    }
  }
};