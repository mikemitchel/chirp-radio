// CrChip.stories.tsx
import CrChip from './CrChip';

export default {
  title: 'Atoms/CrChip',
  component: CrChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Compact status and category tag component for labels, badges, and indicators. Supports multiple variants (primary, secondary, light) and sizes (small, medium, large) with optional squared corners for different visual treatments. Commonly used for showing On-Air and LOCAL artist indicators, age restrictions (21+, All Ages), content categories, and user tags. Maintains readable contrast ratios and appropriate padding for different text lengths. Can be used individually or in groups for filtering and categorization. Dark mode styling automatically adapts colors and contrast through [data-theme="dark"] CSS selectors while preserving semantic meaning and visual hierarchy.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: 'Text content of the chip'
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'light'],
      description: 'Chip color variant'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Chip size'
    },
    squared: {
      control: 'boolean',
      description: 'Use squared corners instead of rounded'
    }
  },
};

// Color variants - rounded
export const Primary = {
  args: {
    children: 'Tag Text',
    variant: 'primary',
    size: 'medium',
    squared: false
  },
};

export const Secondary = {
  args: {
    children: 'Tag Text',
    variant: 'secondary',
    size: 'medium',
    squared: false
  },
};

export const Light = {
  args: {
    children: 'Tag Text',
    variant: 'light',
    size: 'medium',
    squared: false
  },
};

// Squared variants
export const PrimarySquared = {
  args: {
    children: 'Tag Text',
    variant: 'primary',
    size: 'medium',
    squared: true
  },
};

export const SecondarySquared = {
  args: {
    children: 'Tag Text',
    variant: 'secondary',
    size: 'medium',
    squared: true
  },
};

// Special cases
export const Local = {
  args: {
    children: 'LOCAL',
    variant: 'primary',
    size: 'small',
    squared: true
  },
  parameters: {
    docs: {
      description: {
        story: 'LOCAL chip configuration - primary color, small size, squared corners.'
      }
    }
  }
};

export const Age21 = {
  args: {
    children: '21+',
    variant: 'secondary',
    size: 'large'
  },
};

export const AllAges = {
  args: {
    children: 'ALL AGES',
    variant: 'secondary',
    size: 'large'
  },
};