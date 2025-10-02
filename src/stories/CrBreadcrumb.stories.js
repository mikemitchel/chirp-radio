import React from 'react'
import CrBreadcrumb from './CrBreadcrumb'

export default {
  title: 'Molecules/CrBreadcrumb',
  component: CrBreadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Built from CrLogo atom and navigation link elements. Navigation path component showing user location hierarchy with clickable ancestor links. Includes optional CHIRP logo and separator arrows between path segments. Handles responsive truncation for long paths. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showLogo: {
      control: 'boolean',
      description: 'Show or hide the CHIRP logo',
    },
  },
}

// Template for stories
const Template = (args) => {
  return React.createElement(
    'div',
    {
      style: {
        padding: 'var(--cr-space-4)',
        background: 'var(--cr-background)',
        minWidth: '400px',
      },
    },
    [
      React.createElement(CrBreadcrumb, {
        key: 'breadcrumb',
        ...args,
        onItemClick: (item) => console.log('Breadcrumb clicked:', item),
      }),
    ]
  )
}

export const Default = Template.bind({})
Default.args = {
  showLogo: true,
  items: [
    { label: 'Home', isClickable: true, path: '/' },
    { label: 'Listen', isClickable: true, path: '/listen' },
    { label: 'Playlist - Current', isClickable: false },
  ],
}

export const WithoutLogo = Template.bind({})
WithoutLogo.args = {
  showLogo: false,
  items: [
    { label: 'Home', isClickable: true, path: '/' },
    { label: 'Articles', isClickable: true, path: '/articles' },
    { label: 'Music Reviews', isClickable: false },
  ],
}

export const LongBreadcrumb = Template.bind({})
LongBreadcrumb.args = {
  showLogo: true,
  items: [
    { label: 'Home', isClickable: true, path: '/' },
    { label: 'Listen', isClickable: true, path: '/listen' },
    { label: 'Playlists', isClickable: true, path: '/playlists' },
    { label: 'Electronic', isClickable: true, path: '/playlists/electronic' },
    { label: 'Deep House Mix - Vol 12', isClickable: false },
  ],
}

export const ShortBreadcrumb = Template.bind({})
ShortBreadcrumb.args = {
  showLogo: true,
  items: [
    { label: 'Home', isClickable: true, path: '/' },
    { label: 'About', isClickable: false },
  ],
}
