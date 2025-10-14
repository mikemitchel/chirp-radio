// CrAppIconSelector.stories.js
import CrAppIconSelector from './CrAppIconSelector'

export default {
  title: 'Organisms/CrAppIconSelector',
  component: CrAppIconSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'App icon selector component for mobile applications. Allows users to personalize their home screen by choosing from multiple app icon designs. Displays a grid of icon previews with visual indicators for current and selected states. Features a responsive grid layout that adapts to container size, smooth transitions, and an apply button that appears only when changes are pending. Supports asynchronous icon changes with loading states. Requires iOS 10.3+ for alternate icon functionality. Dark mode styling automatically adapts through CSS custom properties.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentIcon: {
      control: { type: 'select' },
      options: ['icon1', 'icon2', 'icon3', 'icon4', 'icon5', 'icon6', 'icon7', 'icon8'],
    },
  },
}

// Default state with first icon selected
export const Default = {
  args: {
    currentIcon: 'icon1',
    onIconChange: (iconId) => console.log('Icon changed to:', iconId),
    onApply: async (iconId) => {
      console.log('Applying icon:', iconId)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}

// Second icon selected
export const Icon2Selected = {
  args: {
    currentIcon: 'icon2',
    onIconChange: (iconId) => console.log('Icon changed to:', iconId),
    onApply: async (iconId) => {
      console.log('Applying icon:', iconId)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}

// Third icon selected
export const Icon3Selected = {
  args: {
    currentIcon: 'icon3',
    onIconChange: (iconId) => console.log('Icon changed to:', iconId),
    onApply: async (iconId) => {
      console.log('Applying icon:', iconId)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}

// Custom icons list
const customIcons = [
  {
    id: 'custom1',
    name: 'Neon',
    preview: '/images/app-icons/custom1.png',
    description: 'Bright neon style',
  },
  {
    id: 'custom2',
    name: 'Gradient',
    preview: '/images/app-icons/custom2.png',
    description: 'Modern gradient',
  },
  {
    id: 'custom3',
    name: 'Monochrome',
    preview: '/images/app-icons/custom3.png',
    description: 'Simple black & white',
  },
]

export const CustomIcons = {
  args: {
    icons: customIcons,
    currentIcon: 'custom1',
    onIconChange: (iconId) => console.log('Icon changed to:', iconId),
    onApply: async (iconId) => {
      console.log('Applying icon:', iconId)
      return new Promise((resolve) => setTimeout(resolve, 1000))
    },
  },
}
