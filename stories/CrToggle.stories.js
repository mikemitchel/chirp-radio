// CrToggle.stories.js
import React, { useState } from 'react';
import CrToggle from './CrToggle';

export default {
  title: 'Atoms/CrToggle',
  component: CrToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible toggle component that supports both boolean (ON/OFF) and selection (choose between two options) variants.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'Whether the toggle is checked'
    },
    disabled: {
      control: 'boolean', 
      description: 'Whether the toggle is disabled'
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the toggle'
    },
    variant: {
      control: { type: 'select' },
      options: ['boolean', 'selection'],
      description: 'Toggle variant - boolean for ON/OFF, selection for choosing between options'
    },
    leftLabel: {
      control: 'text',
      description: 'Left label text (for selection variant)'
    },
    rightLabel: {
      control: 'text',
      description: 'Right label text (for selection variant)'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessibility label'
    }
  },
};

export const Default = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    
    return React.createElement(CrToggle, {
      ...args,
      checked: args.checked !== undefined ? args.checked : checked,
      onChange: (newChecked) => {
        setChecked(newChecked);
        if (args.onChange) args.onChange(newChecked);
      }
    });
  },
  args: {
    checked: false,
    disabled: false,
    size: 'medium',
    variant: 'boolean',
    'aria-label': 'Toggle setting'
  },
};

export const BooleanToggle = {
  render: (args) => {
    const [checked, setChecked] = useState(args.checked || false);
    
    return React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--cr-space-3)'
      }
    }, [
      React.createElement('span', { 
        key: 'off-label',
        style: { 
          font: 'var(--cr-nav2)', 
          color: 'var(--cr-ink)'
        }
      }, 'OFF'),
      React.createElement(CrToggle, {
        key: 'toggle',
        ...args,
        checked: checked,
        onChange: (newChecked) => {
          setChecked(newChecked);
          if (args.onChange) args.onChange(newChecked);
        }
      }),
      React.createElement('span', { 
        key: 'on-label',
        style: { 
          font: 'var(--cr-nav2)', 
          color: 'var(--cr-ink)'
        }
      }, 'ON')
    ]);
  },
  args: {
    checked: false,
    disabled: false,
    size: 'medium',
    variant: 'boolean',
    'aria-label': 'Toggle setting'
  },
};

export const StreamingQuality = {
  render: (args) => {
    const [isHigh, setIsHigh] = useState(true); // true = 128, false = 64
    
    return React.createElement(CrToggle, {
      ...args,
      checked: isHigh,
      onChange: (newChecked) => {
        setIsHigh(newChecked);
        if (args.onChange) args.onChange(newChecked ? '128' : '64');
      }
    });
  },
  args: {
    checked: true,
    variant: 'selection',
    leftLabel: '128',
    rightLabel: '64',
    size: 'medium',
    'aria-label': 'Streaming quality selection'
  },
};

export const Checked = {
  render: (args) => {
    const [checked, setChecked] = useState(true);
    
    return React.createElement(CrToggle, {
      ...args,
      checked: checked,
      onChange: (newChecked) => {
        setChecked(newChecked);
        if (args.onChange) args.onChange(newChecked);
      }
    });
  },
  args: {
    checked: true,
    variant: 'boolean',
    size: 'medium',
    'aria-label': 'Checked toggle'
  },
};

export const Disabled = {
  render: (args) => React.createElement(CrToggle, args),
  args: {
    checked: false,
    disabled: true,
    variant: 'boolean',
    size: 'medium',
    'aria-label': 'Disabled toggle'
  },
};

export const DisabledChecked = {
  render: (args) => React.createElement(CrToggle, args),
  args: {
    checked: true,
    disabled: true,
    variant: 'boolean',
    size: 'medium',
    'aria-label': 'Disabled checked toggle'
  },
};

export const Sizes = {
  render: () => React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--cr-space-4)',
      alignItems: 'flex-start'
    }
  }, [
    React.createElement('div', { 
      key: 'small',
      style: { display: 'flex', alignItems: 'center', gap: 'var(--cr-space-3)' }
    }, [
      React.createElement(CrToggle, {
        key: 'toggle',
        size: 'small',
        checked: true,
        variant: 'boolean',
        'aria-label': 'Small toggle'
      }),
      React.createElement('span', { key: 'label' }, 'Small')
    ]),
    React.createElement('div', { 
      key: 'medium',
      style: { display: 'flex', alignItems: 'center', gap: 'var(--cr-space-3)' }
    }, [
      React.createElement(CrToggle, {
        key: 'toggle',
        size: 'medium',
        checked: true,
        variant: 'boolean',
        'aria-label': 'Medium toggle'
      }),
      React.createElement('span', { key: 'label' }, 'Medium')
    ]),
    React.createElement('div', { 
      key: 'large',
      style: { display: 'flex', alignItems: 'center', gap: 'var(--cr-space-3)' }
    }, [
      React.createElement(CrToggle, {
        key: 'toggle',
        size: 'large',
        checked: true,
        variant: 'boolean',
        'aria-label': 'Large toggle'
      }),
      React.createElement('span', { key: 'label' }, 'Large')
    ])
  ])
};