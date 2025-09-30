// CrCurrentDj.stories.tsx
import CrCurrentDj from './CrCurrentDj';

export default {
  title: 'Molecules/CrCurrentDj',
  component: CrCurrentDj,
  parameters: {
    layout: 'centered',
docs: {
  description: {
    component: 'Built from CrChip atom for on-air status display. Current DJ information component showing DJ name, show title, and on-air status. Handles text truncation for long names. Used in headers and now-playing contexts. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs'],
  argTypes: {
    djName: {
      control: 'text',
      description: 'Name of the current DJ'
    },
    showName: {
      control: 'text',
      description: 'Name of the current show'
    },
    isOnAir: {
      control: 'boolean',
      description: 'Whether to show the on-air status chip'
    },
    statusText: {
      control: 'text',
      description: 'Text to display in the status chip'
    }
  },
};

export const Default = {
  args: {
    djName: 'DJ Current',
    showName: 'Current Show',
    isOnAir: true,
    statusText: 'On-Air'
  },
};

export const LongNames = {
  args: {
    djName: 'DJ Really Long Name That Might Overflow',
    showName: 'An Extremely Long Show Name That Should Truncate Properly',
    isOnAir: true,
    statusText: 'On-Air'
  },
};

export const OffAir = {
  args: {
    djName: 'DJ Offline',
    showName: 'Previous Show',
    isOnAir: false
  },
};

export const CustomStatus = {
  args: {
    djName: 'DJ Live',
    showName: 'Music Hour',
    isOnAir: true,
    statusText: 'Live'
  },
};