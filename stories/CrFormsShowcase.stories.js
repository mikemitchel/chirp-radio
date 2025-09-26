// CrFormsShowcase.stories.js
import CrFormsShowcase from './CrFormsShowcase';
import React from 'react';

export default {
  title: 'Style Guide/Forms',
  component: CrFormsShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete documentation of form elements and input styles used in the CHIRP project, including validation states and layout patterns.'
      }
    }
  },
  tags: ['autodocs']
};

export const Documentation = {
  render: function() {
    return React.createElement(CrFormsShowcase);
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive documentation showing form elements, input fields, validation states, and layout patterns used in CHIRP components.'
      }
    }
  }
};