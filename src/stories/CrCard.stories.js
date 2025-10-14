// CrCard.stories.tsx
import React from 'react'
import CrCard from './CrCard'

export default {
  title: 'Organisms/CrCard',
  component: CrCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'CrCard uses the CrCardBanner molecule, the CrCardDetails molecule, the CrChip atom, and the CrButton atom. This component provides comprehensive content cards with multiple layout variants including event cards and flexible article layouts. This molecular composition makes it a proper Organism. Supports different image positions, caption placements, and content types with responsive behavior. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    backgroundImage: {
      control: 'text',
      description: 'URL for the background image',
    },
    imageCaption: {
      control: 'text',
      description: 'Caption for the image',
    },
    dateTime: {
      control: 'text',
      description: 'Event date and time',
    },
    venue: {
      control: 'text',
      description: 'Venue name',
    },
    ageRestriction: {
      control: 'text',
      description: 'Age restriction',
    },
    contentSummary: {
      control: 'text',
      description: 'Main content text',
    },
    metaContent: {
      control: 'text',
      description: 'Meta content for article layouts',
    },
    timeSlot: {
      control: 'text',
      description: 'Time slot for article layouts',
    },
    showMeta: {
      control: 'boolean',
      description: 'Show meta info (article variant only)',
    },
    preheader: {
      control: 'text',
      description: 'Banner preheader text',
    },
    title: {
      control: 'text',
      description: 'Banner title text',
    },
    bannerButtonText: {
      control: 'text',
      description: 'Banner ticket button text',
    },
    shareButtonText: {
      control: 'text',
      description: 'Banner share button text',
    },
    continueButtonText: {
      control: 'text',
      description: 'Continue reading button text',
    },
    variant: {
      control: 'select',
      options: ['default', 'wide', 'narrow', 'small', 'article'],
      description: 'Layout variant',
    },
    imagePosition: {
      control: 'select',
      options: ['left', 'right', 'full', 'none'],
      description: 'Image position (article variant only)',
      if: { arg: 'variant', eq: 'article' },
    },
    imageSize: {
      control: 'select',
      options: ['small', 'large'],
      description: 'Image size (article variant only)',
      if: { arg: 'variant', eq: 'article' },
    },
    captionPosition: {
      control: 'select',
      options: ['bottom', 'overlay', 'none'],
      description: 'Caption position (article variant only)',
      if: { arg: 'variant', eq: 'article' },
    },
    imageAspectRatio: {
      control: 'select',
      options: ['16:9', '4:3', '1:1'],
      description: 'Image aspect ratio (non-article variants)',
      if: { arg: 'variant', neq: 'article' },
    },
    articleImageAspectRatio: {
      control: 'select',
      options: ['16:9', '4:3', '9:16', '1:1'],
      description: 'Image aspect ratio (article variant only)',
      if: { arg: 'variant', eq: 'article' },
      table: {
        category: 'Article Layout',
      },
    },
    type: {
      control: 'select',
      options: ['event', 'article'],
      description: 'Card details type (default and wide variants only)',
    },
    bannerHeight: {
      control: 'select',
      options: ['narrow', 'tall'],
      description: 'Banner height (all variants)',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the card',
    },
  },
  tags: ['autodocs'],
}

const commonProps = {
  backgroundImage:
    'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
  imageCaption: 'Photo credit - John Dough',
  dateTime: 'Sept 30, 2025 @ 10:00pm',
  venue: 'Lincoln Hall',
  ageRestriction: '21+',
  contentSummary:
    'Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur. Nullam id dolor id nibh ultricies vehicula ut id elit. Curabitur blandit tempus porttitor. Maecenas faucibus mollis interdum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Vestibulum id ligula porta felis euismod semper. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed odio dui. Aenean lacinia bibendum nulla sed consectetur.',
  metaContent: 'This content is 30 characters.',
  timeSlot: 'Monday 12pm - 12pm',
  preheader: 'Intro Preheader Thing',
  title: 'Title of the Thing',
  bannerButtonText: 'Buy Tix',
  shareButtonText: 'Share',
  continueButtonText: 'Continue Reading',
  imageAspectRatio: '16:9',
}

export const Default = {
  args: {
    ...commonProps,
    variant: 'default',
  },
}

export const DefaultClickable = {
  args: {
    ...commonProps,
    variant: 'default',
    onClick: () => alert('Card clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with onClick handler - hover to see the lift effect and click interaction',
      },
    },
  },
}

export const Wide = {
  args: {
    ...commonProps,
    variant: 'wide',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const WideClickable = {
  args: {
    ...commonProps,
    variant: 'wide',
    onClick: () => alert('Card clicked!'),
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story:
          'Wide card with onClick handler - hover to see the lift effect and click interaction',
      },
    },
  },
}

export const Narrow = {
  args: {
    ...commonProps,
    variant: 'narrow',
  },
}

export const NarrowClickable = {
  args: {
    ...commonProps,
    variant: 'narrow',
    onClick: () => alert('Card clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Narrow card with onClick handler - hover to see the lift effect and click interaction',
      },
    },
  },
}

export const Small = {
  args: {
    ...commonProps,
    variant: 'small',
  },
}

export const SmallClickable = {
  args: {
    ...commonProps,
    variant: 'small',
    onClick: () => alert('Card clicked!'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Small card with onClick handler - hover to see the lift effect and click interaction',
      },
    },
  },
}

// Article Variants
export const ArticleListing = {
  args: {
    ...commonProps,
    variant: 'article',
    imagePosition: 'none',
    articleImageAspectRatio: '16:9',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const ArticleDetailed = {
  args: {
    ...commonProps,
    variant: 'article',
    imagePosition: 'right',
    imageSize: 'large',
    captionPosition: 'bottom',
    articleImageAspectRatio: '4:3',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const ArticleIllustrated = {
  args: {
    ...commonProps,
    variant: 'article',
    imagePosition: 'left',
    imageSize: 'large',
    captionPosition: 'bottom',
    articleImageAspectRatio: '9:16',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const ArticleFeature = {
  args: {
    ...commonProps,
    variant: 'article',
    imagePosition: 'full',
    imageSize: 'large',
    captionPosition: 'bottom',
    articleImageAspectRatio: '16:9',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const ArticleMini = {
  args: {
    ...commonProps,
    variant: 'article',
    imagePosition: 'left',
    imageSize: 'small',
    captionPosition: 'bottom',
    showMeta: true,
    articleImageAspectRatio: '1:1',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const ArticleMiniInline = {
  args: {
    ...commonProps,
    variant: 'article',
    imagePosition: 'left',
    imageSize: 'small',
    captionPosition: 'overlay',
    showMeta: true,
    articleImageAspectRatio: '1:1',
  },
  parameters: {
    layout: 'fullscreen',
  },
}

export const ArticleExamples = {
  render: () => {
    const examples = [
      {
        name: 'Listing',
        imagePosition: 'none',
        articleImageAspectRatio: '16:9',
      },
      {
        name: 'Feature',
        imagePosition: 'full',
        imageSize: 'large',
        articleImageAspectRatio: '16:9',
      },
      {
        name: 'Detailed',
        imagePosition: 'right',
        imageSize: 'large',
        articleImageAspectRatio: '4:3',
      },
      {
        name: 'Illustrated',
        imagePosition: 'left',
        imageSize: 'large',
        articleImageAspectRatio: '9:16',
      },
      {
        name: 'Mini',
        imagePosition: 'left',
        imageSize: 'small',
        showMeta: true,
        articleImageAspectRatio: '1:1',
      },
      {
        name: 'Mini Inline',
        imagePosition: 'left',
        imageSize: 'small',
        showMeta: true,
        captionPosition: 'overlay',
        articleImageAspectRatio: '1:1',
      },
    ]

    return React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--cr-space-8)',
          padding: 'var(--cr-space-4)',
          maxWidth: '1200px',
          margin: '0 auto',
        },
      },
      [
        React.createElement(
          'h2',
          {
            key: 'title',
            style: {
              fontFamily: 'var(--cr-display-sm)',
              marginBottom: 'var(--cr-space-4)',
            },
          },
          'Article Layout Examples'
        ),

        ...examples.map((example, index) =>
          React.createElement('div', { key: example.name }, [
            React.createElement(
              'h3',
              {
                key: `title-${index}`,
                style: {
                  marginBottom: 'var(--cr-space-3)',
                  fontFamily: 'var(--cr-title-lg)',
                },
              },
              example.name
            ),
            React.createElement(CrCard, {
              key: `card-${index}`,
              ...commonProps,
              variant: 'article',
              ...example,
            }),
          ])
        ),
      ]
    )
  },
  parameters: {
    layout: 'fullscreen',
  },
}
