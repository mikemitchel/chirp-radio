// CrDonateAmount.stories.tsx
import React from 'react';
import CrDonateAmount from './CrDonateAmount';

export default {
  title: 'Molecules/CrDonateAmount',
  component: CrDonateAmount,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from CrButton atoms in a button group pattern. Donation amount selector with preset amounts and custom input option. Functions as a tabbed button group for selecting contribution levels. Used in donation forms and funding campaigns. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  tags: ['autodocs'],
  argTypes: {
    selectedAmount: {
      control: { type: 'select' },
      options: [null, 10, 20, 60, 120, 180, 240, 365, 500, 'other'],
      description: 'Currently selected donation amount or "other" for custom'
    },
    amounts: {
      control: 'object',
      description: 'Array of preset donation amounts'
    },
    showOtherOption: {
      control: 'boolean',
      description: 'Whether to show the "OTHER $_____" option'
    },
    customAmount: {
      control: 'text',
      description: 'Value for custom amount input (when selectedAmount is "other")'
    },
    onAmountChange: {
      action: 'amount changed',
      description: 'Callback function called when amount selection changes'
    },
    onCustomAmountChange: {
      action: 'custom amount changed',
      description: 'Callback function called when custom amount input changes'
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes'
    }
  }
};

// Default story - No selection
export const Default = {
  args: {
    selectedAmount: null,
    customAmount: '',
    showOtherOption: true
  },
  render: (args) => {
    const [selectedAmount, setSelectedAmount] = React.useState(args.selectedAmount);
    const [customAmount, setCustomAmount] = React.useState(args.customAmount);

    React.useEffect(() => {
      setSelectedAmount(args.selectedAmount);
      setCustomAmount(args.customAmount);
    }, [args.selectedAmount, args.customAmount]);

    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        minHeight: '400px'
      }
    }, [
      React.createElement(CrDonateAmount, {
        key: 'amount',
        selectedAmount: selectedAmount,
        customAmount: customAmount,
        showOtherOption: args.showOtherOption,
        amounts: args.amounts,
        onAmountChange: (amount) => {
          setSelectedAmount(amount);
          if (args.onAmountChange) {
            args.onAmountChange(amount);
          }
        },
        onCustomAmountChange: (amount) => {
          setCustomAmount(amount);
          if (args.onCustomAmountChange) {
            args.onCustomAmountChange(amount);
          }
        }
      })
    ]);
  }
};

// Pre-selected amount
export const PreSelected = {
  args: {
    selectedAmount: 120,
    customAmount: '',
    showOtherOption: true
  },
  render: (args) => {
    const [selectedAmount, setSelectedAmount] = React.useState(args.selectedAmount);
    const [customAmount, setCustomAmount] = React.useState(args.customAmount);

    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        minHeight: '400px'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { marginBottom: 'var(--cr-space-4)', color: 'var(--cr-foreground)' }
      }, '$120.00 Pre-selected'),
      React.createElement(CrDonateAmount, {
        key: 'amount',
        selectedAmount: selectedAmount,
        customAmount: customAmount,
        onAmountChange: setSelectedAmount,
        onCustomAmountChange: setCustomAmount
      })
    ]);
  }
};

// Custom amount selected
export const CustomAmount = {
  args: {
    selectedAmount: 'other',
    customAmount: '75.50',
    showOtherOption: true
  },
  render: (args) => {
    const [selectedAmount, setSelectedAmount] = React.useState(args.selectedAmount);
    const [customAmount, setCustomAmount] = React.useState(args.customAmount);

    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        minHeight: '400px'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { marginBottom: 'var(--cr-space-4)', color: 'var(--cr-foreground)' }
      }, 'Custom Amount Mode'),
      React.createElement(CrDonateAmount, {
        key: 'amount',
        selectedAmount: selectedAmount,
        customAmount: customAmount,
        onAmountChange: setSelectedAmount,
        onCustomAmountChange: setCustomAmount
      })
    ]);
  }
};

// Without "Other" option
export const NoOtherOption = {
  args: {
    selectedAmount: 60,
    customAmount: '',
    showOtherOption: false
  },
  render: (args) => {
    const [selectedAmount, setSelectedAmount] = React.useState(args.selectedAmount);

    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        minHeight: '400px'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { marginBottom: 'var(--cr-space-4)', color: 'var(--cr-foreground)' }
      }, 'Preset Amounts Only'),
      React.createElement(CrDonateAmount, {
        key: 'amount',
        selectedAmount: selectedAmount,
        showOtherOption: false,
        onAmountChange: setSelectedAmount
      })
    ]);
  }
};

// Custom amounts array
export const CustomAmounts = {
  args: {
    amounts: [5, 15, 25, 50, 100],
    selectedAmount: 25,
    customAmount: '',
    showOtherOption: true
  },
  render: (args) => {
    const [selectedAmount, setSelectedAmount] = React.useState(args.selectedAmount);
    const [customAmount, setCustomAmount] = React.useState(args.customAmount);

    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        minHeight: '400px'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { marginBottom: 'var(--cr-space-4)', color: 'var(--cr-foreground)' }
      }, 'Custom Amount Options'),
      React.createElement(CrDonateAmount, {
        key: 'amount',
        amounts: args.amounts,
        selectedAmount: selectedAmount,
        customAmount: customAmount,
        onAmountChange: setSelectedAmount,
        onCustomAmountChange: setCustomAmount
      })
    ]);
  }
};

// Interactive demo
export const Interactive = {
  args: {
    selectedAmount: null,
    customAmount: '',
    showOtherOption: true
  },
  render: (args) => {
    const [selectedAmount, setSelectedAmount] = React.useState(args.selectedAmount);
    const [customAmount, setCustomAmount] = React.useState(args.customAmount);

    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        minHeight: '500px'
      }
    }, [
      React.createElement('h3', { 
        key: 'title',
        style: { marginBottom: 'var(--cr-space-4)', color: 'var(--cr-foreground)' }
      }, 'Interactive Amount Selector'),
      React.createElement(CrDonateAmount, {
        key: 'amount',
        selectedAmount: selectedAmount,
        customAmount: customAmount,
        onAmountChange: (amount) => {
          setSelectedAmount(amount);
          console.log('Amount changed to:', amount);
        },
        onCustomAmountChange: (amount) => {
          setCustomAmount(amount);
          console.log('Custom amount changed to:', amount);
        }
      }),
      React.createElement('div', {
        key: 'status',
        style: { 
          marginTop: 'var(--cr-space-4)', 
          padding: 'var(--cr-space-3)',
          background: 'var(--cr-default-100)',
          borderRadius: 'var(--cr-space-1)',
          color: 'var(--cr-foreground)'
        }
      }, [
        React.createElement('p', { 
          key: 'selected',
          style: { margin: 0, marginBottom: 'var(--cr-space-2)' }
        }, selectedAmount ? 
          `Selected: ${selectedAmount === 'other' ? `$${customAmount || '0.00'}` : `$${selectedAmount}.00`}` : 
          'No amount selected'
        ),
        selectedAmount === 'other' && React.createElement('p', {
          key: 'custom',
          style: { margin: 0, fontSize: '14px', color: 'var(--cr-default-700)' }
        }, `Custom amount: $${customAmount || '0.00'}`)
      ])
    ]);
  }
};