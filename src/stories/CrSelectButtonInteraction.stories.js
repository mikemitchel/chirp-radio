import React from 'react'
import CrSelectButtonInteraction from './CrSelectButtonInteraction'
import { PiUserCircle, PiHandHeartLight, PiGearSix } from 'react-icons/pi'

export default {
  title: 'Molecules/CrSelectButtonInteraction',
  component: CrSelectButtonInteraction,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Built from CrButton and CrSelect atoms to show dropdown functionality. Button component that opens a dropdown menu with selectable options. Combines button styling with select behavior for better UX than native selects. Supports icons and various button variants. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
    controls: {
      exclude: ['leftIcon', 'options', 'onSelect', 'className', 'buttonProps'],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'default', 'light'],
      description: 'Button color variant',
    },
    size: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large'],
    },
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'text'],
    },
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
    disabled: {
      control: 'boolean',
    },
  },
}

const accountOptions = [
  { value: 'profile', label: 'Your Profile' },
  { value: 'favorites', label: 'Your Favorites' },
  { value: 'donations', label: 'Past Donations' },
  { value: 'purchases', label: 'Past Purchases' },
  { value: 'signout', label: 'Sign Out' },
]

const volunteerOptions = [
  { value: 'schedule', label: 'My Schedule' },
  { value: 'hours', label: 'Log Hours' },
  { value: 'training', label: 'Training' },
  { value: 'directory', label: 'Directory' },
]

const settingsOptions = [
  { value: 'general', label: 'General Settings' },
  { value: 'notifications', label: 'Notifications' },
  { value: 'privacy', label: 'Privacy' },
  { value: 'billing', label: 'Billing' },
]

export const Default = {
  args: {
    children: 'Account',
    leftIcon: React.createElement(PiUserCircle),
    options: accountOptions,
    color: 'default',
  },
}

export const Primary = {
  args: {
    children: 'Volunteer',
    leftIcon: React.createElement(PiHandHeartLight),
    options: volunteerOptions,
    variant: 'solid',
    color: 'primary',
  },
}

export const Outline = {
  args: {
    children: 'Settings',
    leftIcon: React.createElement(PiGearSix),
    options: settingsOptions,
    variant: 'outline',
    color: 'secondary',
  },
}

export const Small = {
  args: {
    children: 'Menu',
    leftIcon: React.createElement(PiUserCircle),
    options: accountOptions,
    size: 'small',
    variant: 'text',
    color: 'default',
  },
}

export const Large = {
  args: {
    children: 'Large Menu',
    leftIcon: React.createElement(PiUserCircle),
    options: accountOptions,
    size: 'large',
    variant: 'solid',
    color: 'primary',
  },
}

export const Disabled = {
  args: {
    children: 'Disabled',
    leftIcon: React.createElement(PiUserCircle),
    options: accountOptions,
    disabled: true,
    color: 'default',
  },
}

export const Demo = {
  render: (args) =>
    React.createElement(
      'div',
      {
        style: { padding: '40px' },
      },
      [
        React.createElement(CrSelectButtonInteraction, {
          ...args,
          key: 'dropdown',
        }),
        React.createElement(
          'div',
          {
            key: 'content',
            style: {
              marginTop: '200px',
              padding: '20px',
              backgroundColor: 'var(--cr-input)',
              borderRadius: '8px',
              color: 'var(--cr-foreground)',
              maxWidth: '500px',
            },
          },
          [
            React.createElement('h3', { key: 'title' }, 'Content Below'),
            React.createElement(
              'p',
              { key: 'text' },
              'This shows how the dropdown appears above other content.'
            ),
          ]
        ),
      ]
    ),
  args: {
    children: 'Demo',
    leftIcon: React.createElement(PiUserCircle),
    options: accountOptions,
    color: 'default',
  },
  parameters: {
    layout: 'fullscreen',
  },
}
