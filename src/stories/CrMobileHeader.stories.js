// CrMobileHeader.stories.tsx
import CrMobileHeader from './CrMobileHeader'

export default {
  title: 'Molecules/CrMobileHeader',
  component: CrMobileHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Built from CrLogo and CrMenuButton atoms. Mobile application header with CHIRP logo, page title, and hamburger menu button. Provides consistent mobile navigation header across app screens. Handles text truncation for long titles. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
  argTypes: {
    pageTitle: {
      control: 'text',
      description: 'Title displayed in the center of the header',
    },
    variant: {
      control: 'select',
      options: ['default', 'transparent'],
      description: 'Visual variant of the header',
    },
    onMenuClick: {
      action: 'menu clicked',
      description: 'Callback when menu button is clicked',
    },
    onLogoClick: {
      action: 'logo clicked',
      description: 'Callback when logo is clicked',
    },
  },
}

// Default mobile header
export const Default = {
  args: {
    pageTitle: 'Page Title',
  },
}

// Long page title
export const LongTitle = {
  args: {
    pageTitle: 'Really Long Page Title That Might Wrap',
  },
}

// Short title
export const ShortTitle = {
  args: {
    pageTitle: 'Home',
  },
}

// Transparent variant
export const Transparent = {
  args: {
    pageTitle: 'Page Title',
    variant: 'transparent',
  },
}
