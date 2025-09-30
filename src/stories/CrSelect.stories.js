// CrDropdownMenu.stories.tsx
import CrDropdownMenu from './CrSelect';

export default {
  title: 'Atoms/CrSelect',
  component: CrDropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Dropdown select component for choosing from predefined options. Provides a clean, accessible alternative to native HTML select elements with consistent styling across browsers. Supports custom option lists, placeholder text, and disabled states. Maintains proper keyboard navigation (arrow keys, enter, escape) and screen reader compatibility with ARIA attributes. Commonly used for form inputs, filter controls, and settings menus where users need to pick from a limited set of choices. Dark mode styling automatically adapts through [data-theme="dark"] CSS selectors while maintaining proper contrast and visual hierarchy for all dropdown states.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
    },
  },
};

const accountOptions = [
  { value: 'profile', label: 'Your Profile' },
  { value: 'favorites', label: 'Your Favorites' },
  { value: 'donations', label: 'Past Donations' },
  { value: 'purchases', label: 'Past Purchases' },
  { value: 'signout', label: 'Sign Out' }
];

const fruitOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' },
  { value: 'grape', label: 'Grape' }
];

// Account menu - Light theme
export const AccountLight = {
  args: {
    options: accountOptions,
    theme: "light"
  }
};

// Generic options menu
export const FruitMenu = {
  args: {
    options: fruitOptions,
    theme: "light"
  }
};