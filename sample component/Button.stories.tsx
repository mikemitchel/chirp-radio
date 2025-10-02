// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react'
import Button from './Button'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: 'Click Me',
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const WithClick: Story = {
  args: {
    onClick: () => alert('Clicked!'),
  },
}
