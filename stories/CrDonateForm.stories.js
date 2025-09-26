// CrDonateForm.stories.js
import React from 'react';
import CrDonateForm from './CrDonateForm';

export default {
  title: 'Templates/CrDonateForm',
  component: CrDonateForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'CrDonateForm uses the CrButtonGroup atom, the CrDonateAmount molecule, the CrPageHeader molecule, and the CrButton atom. This component provides complete donation form functionality with frequency selection, amount selection, company matching section, and Vinyl Circle options. This combination of multiple molecules makes it a proper Template. Supports both default donation and Vinyl Circle variants with form validation and submission handling. Dark mode adapts through [data-theme="dark"] CSS selectors.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'vinylCircle'],
      description: 'Form variant - default donation or vinyl circle'
    },
    title: {
      control: 'text',
      description: 'Main title of the donation form'
    },
    description: {
      control: 'text',
      description: 'Description text explaining the donation campaign'
    },
    showCompanyMatching: {
      control: 'boolean',
      description: 'Whether to show the company matching section'
    },
    showVinylCircle: {
      control: 'boolean',
      description: 'Whether to show the Vinyl Circle section'
    },
    showDedicationOption: {
      control: 'boolean',
      description: 'Whether to show the dedication checkbox'
    }
  }
};

export const Default = {
  args: {
    variant: 'default',
    showCompanyMatching: true,
    showVinylCircle: true,
    showDedicationOption: true
  },
  render: (args) => {
    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        minHeight: '800px',
        maxWidth: '900px',
        margin: '0 auto'
      }
    }, [
      React.createElement(CrDonateForm, {
        key: 'form',
        ...args
      })
    ]);
  }
};

export const Interactive = {
  render: () => {
    const [variant, setVariant] = React.useState('default');
    
    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        maxWidth: '800px',
        margin: '0 auto'
      }
    }, [
      React.createElement('div', {
        key: 'status',
        style: { 
          marginBottom: 'var(--cr-space-4)', 
          padding: 'var(--cr-space-3)',
          background: 'var(--cr-default-100)',
          borderRadius: 'var(--cr-space-1)',
          color: 'var(--cr-foreground)'
        }
      }, [
        React.createElement('h4', { 
          key: 'title',
          style: { margin: 0, marginBottom: 'var(--cr-space-2)' }
        }, 'Interactive Demo'),
        React.createElement('p', { 
          key: 'desc',
          style: { margin: 0, fontSize: '14px' }
        }, `Current variant: ${variant}. Click "Join the Vinyl Circle" or "Make Regular Donation" to switch content.`)
      ]),
      React.createElement(CrDonateForm, {
        key: 'form',
        variant: variant,
        showCompanyMatching: true,
        showVinylCircle: true,
        showDedicationOption: true,
        onVinylCircleClick: () => setVariant('vinylCircle'),
        onSwitchToDefault: () => setVariant('default')
      })
    ]);
  }
};

export const VinylCircle = {
  args: {
    variant: 'vinylCircle',
    showCompanyMatching: false,
    showVinylCircle: false,
    showDedicationOption: true
  },
  render: (args) => {
    return React.createElement('div', {
      style: { 
        background: 'var(--cr-background)',
        padding: 'var(--cr-space-4)',
        maxWidth: '800px',
        margin: '0 auto'
      }
    }, [
      React.createElement(CrDonateForm, {
        key: 'form',
        ...args
      })
    ]);
  }
};