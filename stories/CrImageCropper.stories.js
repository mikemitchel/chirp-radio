// CrImageCropper.stories.js
import React from 'react';
import CrImageCropper from './CrImageCropper';

export default {
  title: 'Molecules/CrImageCropper',
  component: CrImageCropper,
  parameters: {
    layout: 'centered',
docs: {
  description: {
    component: 'Built from CrButton atom for add action. Individual ranking list item showing position number, song title, artist, and record label with optional add button. Used within rating lists and music charts. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    maxFileSize: {
      control: 'number',
      description: 'Maximum file size in bytes'
    },
    acceptedFormats: {
      control: 'text',
      description: 'Comma-separated list of accepted MIME types'
    },
    onImageChange: {
      action: 'imageChanged',
      description: 'Callback fired when both images are updated'
    }
  },
  tags: ['autodocs']
};

export const Default = {
  args: {
    maxFileSize: 2 * 1024 * 1024, // 2MB
    acceptedFormats: 'image/jpeg,image/png',
    onImageChange: (images) => {
      console.log('Images updated:', images);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Default image cropper with drag-and-drop upload. Click or drag an image file to upload, then use the crop modal to create both full (400x300) and avatar (200x200) versions. Properly handles both landscape and portrait images.'
      }
    }
  }
};

export const HighFileSize = {
  args: {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    acceptedFormats: 'image/jpeg,image/png',
    onImageChange: (images) => {
      console.log('High res images:', images);
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Image cropper configured for higher quality images with 5MB file size limit.'
      }
    }
  }
};