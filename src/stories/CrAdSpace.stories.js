// CrAdSpace.stories.tsx
import React from 'react'
import CrAdSpace from './CrAdSpace'

export default {
  title: 'Atoms/CrAdSpace',
  component: CrAdSpace,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible ad space component that supports multiple content types and standardized ad sizes. Includes accessibility features, impression tracking, and responsive behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: [
        'large-rectangle',
        'leaderboard',
        'medium-rectangle',
        'mobile-banner',
        'wide-skyscraper',
        'custom',
      ],
      description: 'Predefined ad size or custom',
    },
    contentType: {
      control: { type: 'select' },
      options: ['image', 'video', 'html', 'embed'],
      description: 'Type of ad content to display',
    },
    customWidth: {
      control: { type: 'number', min: 100, max: 1000, step: 10 },
      description: 'Custom width in pixels (only used with size="custom")',
      if: { arg: 'size', eq: 'custom' },
    },
    customHeight: {
      control: { type: 'number', min: 50, max: 800, step: 10 },
      description: 'Custom height in pixels (only used with size="custom")',
      if: { arg: 'size', eq: 'custom' },
    },
    src: {
      control: 'text',
      description: 'Image or video source URL',
      if: { arg: 'contentType', neq: 'html' },
    },
    alt: {
      control: 'text',
      description: 'Alt text for accessibility',
    },
    href: {
      control: 'text',
      description: 'URL to navigate to when clicked',
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_self', '_parent', '_top'],
      description: 'Link target attribute',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show size label in placeholder',
    },
  },
}

// Sample image for demos (placeholder service)
const sampleImageUrl = 'https://picsum.photos/seed/ad'

// Template function
const Template = (args) => {
  return React.createElement(
    'div',
    {
      style: {
        padding: 'var(--cr-space-4)',
        background: 'var(--cr-background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
      },
    },
    [
      React.createElement(CrAdSpace, {
        key: 'ad',
        ...args,
        onLoad: () => console.log('Ad loaded'),
        onError: () => console.log('Ad error'),
        onClick: () => console.log('Ad clicked'),
        onImpression: () => console.log('Ad impression tracked'),
      }),
    ]
  )
}

// Standard ad sizes with placeholders
export const LargeRectangle = Template.bind({})
LargeRectangle.args = {
  size: 'large-rectangle',
  contentType: 'image',
  showLabel: true,
}

export const Leaderboard = Template.bind({})
Leaderboard.args = {
  size: 'leaderboard',
  contentType: 'image',
  showLabel: true,
}

export const MediumRectangle = Template.bind({})
MediumRectangle.args = {
  size: 'medium-rectangle',
  contentType: 'image',
  showLabel: true,
}

export const MobileBanner = Template.bind({})
MobileBanner.args = {
  size: 'mobile-banner',
  contentType: 'image',
  showLabel: true,
}

export const WideSkyscraper = Template.bind({})
WideSkyscraper.args = {
  size: 'wide-skyscraper',
  contentType: 'image',
  showLabel: true,
}

export const CustomSize = Template.bind({})
CustomSize.args = {
  size: 'custom',
  customWidth: 400,
  customHeight: 300,
  contentType: 'image',
  showLabel: true,
}

// Image ads
export const ImageAd = Template.bind({})
ImageAd.args = {
  size: 'medium-rectangle',
  contentType: 'image',
  src: `${sampleImageUrl}/300/250`,
  alt: 'Sample advertisement',
  href: 'https://example.com',
  target: '_blank',
}

export const ImageAdLarge = Template.bind({})
ImageAdLarge.args = {
  size: 'large-rectangle',
  contentType: 'image',
  src: `${sampleImageUrl}/336/280`,
  alt: 'Large advertisement',
  href: 'https://example.com',
}

// Video ad
export const VideoAd = Template.bind({})
VideoAd.args = {
  size: 'medium-rectangle',
  contentType: 'video',
  videoSrc: 'https://www.pexels.com/download/video/2022395/',
  alt: 'Video advertisement',
}

// HTML ad
export const HtmlAd = Template.bind({})
HtmlAd.args = {
  size: 'medium-rectangle',
  contentType: 'html',
  htmlContent: `
    <div style="
      width: 100%; 
      height: 100%; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: Arial, sans-serif;
      text-align: center;
      padding: 20px;
      box-sizing: border-box;
    ">
      <h3 style="margin: 0 0 10px 0; font-size: 18px;">Special Offer!</h3>
      <p style="margin: 0 0 15px 0; font-size: 14px;">Save 50% on Premium</p>
      <button style="
        background: white;
        color: #667eea;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      ">Learn More</button>
    </div>
  `,
  alt: 'Interactive HTML advertisement',
}

// Embed ad (simulated)
export const EmbedAd = Template.bind({})
EmbedAd.args = {
  size: 'leaderboard',
  contentType: 'embed',
  embedCode: `
    <div style="
      width: 100%; 
      height: 100%; 
      background: #f8f9fa;
      border: 2px dashed #dee2e6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: Arial, sans-serif;
      color: #6c757d;
      text-align: center;
    ">
      <div>
        <p style="margin: 0; font-size: 14px; font-weight: bold;">Third-Party Ad Network</p>
        <p style="margin: 5px 0 0 0; font-size: 12px;">Embedded ad content would appear here</p>
      </div>
    </div>
  `,
  alt: 'Embedded advertisement',
}

// Loading state
export const LoadingState = Template.bind({})
LoadingState.args = {
  size: 'medium-rectangle',
  contentType: 'image',
  loading: true,
}

// Error state demo
export const ErrorState = () => {
  return React.createElement(
    'div',
    {
      style: {
        padding: 'var(--cr-space-4)',
        background: 'var(--cr-background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
      },
    },
    [
      React.createElement(CrAdSpace, {
        key: 'ad',
        size: 'medium-rectangle',
        contentType: 'image',
        src: 'https://invalid-url-to-trigger-error.jpg',
        alt: 'Advertisement that fails to load',
      }),
    ]
  )
}

// Multiple sizes showcase
export const AllSizes = () => {
  const sizes = [
    { name: 'mobile-banner', label: 'Mobile Banner' },
    { name: 'leaderboard', label: 'Leaderboard' },
    { name: 'medium-rectangle', label: 'Medium Rectangle' },
    { name: 'large-rectangle', label: 'Large Rectangle' },
    { name: 'wide-skyscraper', label: 'Wide Skyscraper' },
  ]

  return React.createElement(
    'div',
    {
      style: {
        padding: 'var(--cr-space-4)',
        background: 'var(--cr-background)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--cr-space-6)',
        alignItems: 'center',
      },
    },
    [
      React.createElement(
        'h2',
        {
          key: 'title',
          style: {
            font: 'var(--cr-title-lg)',
            color: 'var(--cr-foreground)',
            marginBottom: 'var(--cr-space-4)',
          },
        },
        'Standard Ad Sizes'
      ),

      ...sizes.map((size, index) =>
        React.createElement(
          'div',
          {
            key: size.name,
            style: {
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'var(--cr-space-2)',
            },
          },
          [
            React.createElement(
              'h3',
              {
                key: 'label',
                style: {
                  font: 'var(--cr-body-reg)',
                  color: 'var(--cr-foreground)',
                  margin: 0,
                },
              },
              size.label
            ),
            React.createElement(CrAdSpace, {
              key: 'ad',
              size: size.name,
              contentType: 'image',
              showLabel: true,
            }),
          ]
        )
      ),
    ]
  )
}

AllSizes.parameters = {
  layout: 'fullscreen',
}
