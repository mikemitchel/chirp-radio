// CrCardBanner.stories.js
import React from 'react';
import CrCardBanner from './CrCardBanner';

export default {
  title: 'Molecules/CrCardBanner',
  component: CrCardBanner,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'Built from CrButton atoms for ticket and share actions. Card header component with preheader text, main title, and action buttons. Supports different heights (narrow/tall) and text layouts (stacked/inline). Includes optional textured backgrounds. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    preheader: {
      control: 'text',
      description: 'Preheader text (title case - CSS will make it uppercase)'
    },
    title: {
      control: 'text',
      description: 'Main title text'
    },
    showPreheader: {
      control: 'boolean',
      description: 'Toggle to show or hide the preheader'
    },
    textLayout: {
      control: 'select',
      options: ['stacked', 'inline'],
      description: 'Text layout - stacked (vertical) or inline (horizontal). Note: narrow height forces inline.'
    },
    height: {
      control: 'select',
      options: ['narrow', 'tall'],
      description: 'Component height - narrow (60px) or tall (84px). Narrow forces inline text layout.'
    },
    backgroundColor: {
      control: 'select',
      options: ['textured', 'none'],
      description: 'Background - textured (CR-texture-natural-light) or no background'
    },
    showTicketButton: {
      control: 'boolean',
      description: 'Show the ticket purchase button'
    },
    showShareButton: {
      control: 'boolean',
      description: 'Show the share button'
    },
    ticketButtonText: {
      control: 'text',
      description: 'Text for the ticket button'
    },
    shareButtonText: {
      control: 'text',
      description: 'Text for the share button'
    }
  },
  tags: ['autodocs']
};

// Default story
export const Default = {
  args: {
    preheader: 'Intro Preheader Thing',
    title: 'Title of the Thing',
    showPreheader: true,
    textLayout: 'stacked',
    height: 'tall',
    backgroundColor: 'textured',
    showTicketButton: true,
    showShareButton: true,
    ticketButtonText: 'Buy Tix',
    shareButtonText: 'Share'
  }
};

// Narrow height (inline layout forced)
export const Narrow = {
  args: {
    preheader: 'Intro Preheader Thing',
    title: 'Title of the Thing',
    showPreheader: true,
    textLayout: 'stacked', // Will be overridden to inline
    height: 'narrow',
    backgroundColor: 'textured',
    showTicketButton: true,
    showShareButton: true,
    ticketButtonText: 'BUY TIX',
    shareButtonText: 'SHARE'
  }
};

// Tall with inline layout
export const TallInline = {
  args: {
    preheader: 'Intro Preheader Thing',
    title: 'Title of the Thing',
    showPreheader: true,
    textLayout: 'inline',
    height: 'tall',
    backgroundColor: 'textured',
    showTicketButton: true,
    showShareButton: true,
    ticketButtonText: 'BUY TIX',
    shareButtonText: 'SHARE'
  }
};

// No background
export const NoBackground = {
  args: {
    preheader: 'Intro Preheader Thing',
    title: 'Title of the Thing',
    showPreheader: true,
    textLayout: 'stacked',
    height: 'tall',
    backgroundColor: 'none',
    showTicketButton: true,
    showShareButton: true,
    ticketButtonText: 'BUY TIX',
    shareButtonText: 'SHARE'
  }
};

// No preheader
export const NoPreheader = {
  args: {
    preheader: 'Intro Preheader Thing',
    title: 'Title of the Thing',
    showPreheader: false,
    textLayout: 'stacked',
    height: 'tall',
    backgroundColor: 'textured',
    showTicketButton: true,
    showShareButton: true,
    ticketButtonText: 'BUY TIX',
    shareButtonText: 'SHARE'
  }
};

// Event variation
export const Event = {
  args: {
    preheader: 'Live Performance',
    title: 'Jazz Night at CHIRP',
    showPreheader: true,
    textLayout: 'stacked',
    height: 'tall',
    backgroundColor: 'textured',
    showTicketButton: true,
    showShareButton: true,
    ticketButtonText: 'BUY TIX',
    shareButtonText: 'SHARE'
  }
};

// Show variation
export const Show = {
  args: {
    preheader: 'Weekly Program',
    title: 'Morning Mix with Sarah',
    showPreheader: true,
    textLayout: 'inline',
    height: 'narrow',
    backgroundColor: 'textured',
    showTicketButton: false,
    showShareButton: true,
    ticketButtonText: 'BUY TIX',
    shareButtonText: 'SHARE'
  }
};

// Three variations showcase
export const ThreeVariations = {
  render: (args) => {
    return React.createElement('div', { 
      style: { 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 'var(--cr-space-lg)' 
      } 
    }, [
      React.createElement(CrCardBanner, {
        key: 'tall-stacked',
        preheader: 'Intro Preheader Thing',
        title: 'Title of the Thing',
        showPreheader: true,
        textLayout: 'stacked',
        height: 'tall',
        backgroundColor: 'textured',
        showTicketButton: true,
        showShareButton: true,
        ticketButtonText: 'BUY TIX',
        shareButtonText: 'SHARE'
      }),
      React.createElement(CrCardBanner, {
        key: 'tall-inline',
        preheader: 'Intro Preheader Thing',
        title: 'Title of the Thing',
        showPreheader: true,
        textLayout: 'inline',
        height: 'tall',
        backgroundColor: 'textured',
        showTicketButton: true,
        showShareButton: true,
        ticketButtonText: 'BUY TIX',
        shareButtonText: 'SHARE'
      }),
      React.createElement(CrCardBanner, {
        key: 'narrow-inline',
        preheader: 'Intro Preheader Thing',
        title: 'Title of the Thing',
        showPreheader: true,
        textLayout: 'stacked', // Will be forced to inline
        height: 'narrow',
        backgroundColor: 'textured',
        showTicketButton: true,
        showShareButton: true,
        ticketButtonText: 'BUY TIX',
        shareButtonText: 'SHARE'
      })
    ]);
  },
  parameters: {
    docs: {
      description: {
        story: 'Three variations: Tall Stacked, Tall Inline, and Narrow (which forces inline layout).'
      }
    }
  }
};