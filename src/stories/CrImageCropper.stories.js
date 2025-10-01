// CrImageCropper.stories.tsx
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
  render: (args) => React.createElement(CrImageCropper, args),
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
        story: 'Default image cropper with drag-and-drop upload. Click or drag an image file to upload, then use the crop modal to create both full and avatar versions. Properly handles both landscape and portrait images.'
      }
    }
  }
};

export const HighFileSize = {
  render: (args) => React.createElement(CrImageCropper, args),
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

export const InteractiveDemo = {
  render: (args) => {
    const [imageState, setImageState] = React.useState({
      fullImage: null,
      croppedImage: null
    });

    const handleImageChange = (images) => {
      console.log('Images changed:', images);
      setImageState({
        fullImage: images.fullImage,
        croppedImage: images.croppedImage
      });
    };

    const infoSection = React.createElement('div', {
      style: {
        marginBottom: '24px'
      }
    }, [
      React.createElement('h2', {
        key: 'title',
        style: { margin: '0 0 8px 0' }
      }, 'Interactive Image Cropper Demo'),
      React.createElement('p', {
        key: 'desc',
        style: {
          margin: 0,
          color: '#666',
          fontSize: '14px'
        }
      }, 'Upload an image to see the full workflow: drag/drop or click to upload, then use the modal to crop and zoom the image. The cropped avatar will appear as a circular preview.')
    ]);

    const cropperSection = React.createElement(CrImageCropper, {
      maxFileSize: args.maxFileSize,
      acceptedFormats: args.acceptedFormats,
      onImageChange: handleImageChange
    });

    const resultSection = imageState.croppedImage ? React.createElement('div', {
      style: {
        marginTop: '24px',
        padding: '24px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        textAlign: 'center'
      }
    }, [
      React.createElement('h3', {
        key: 'result-title',
        style: { margin: '0 0 16px 0' }
      }, 'Result:'),
      React.createElement('div', {
        key: 'result-images',
        style: {
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          alignItems: 'flex-start'
        }
      }, [
        React.createElement('div', { key: 'full' }, [
          React.createElement('p', {
            key: 'label',
            style: {
              margin: '0 0 8px 0',
              fontSize: '12px',
              fontWeight: 'bold'
            }
          }, 'Full Image'),
          React.createElement('img', {
            key: 'img',
            src: imageState.fullImage,
            alt: 'Full profile',
            style: {
              maxWidth: '300px',
              maxHeight: '300px',
              border: '2px solid #ddd',
              borderRadius: '4px'
            }
          })
        ]),
        React.createElement('div', { key: 'avatar' }, [
          React.createElement('p', {
            key: 'label',
            style: {
              margin: '0 0 8px 0',
              fontSize: '12px',
              fontWeight: 'bold'
            }
          }, 'Avatar (Cropped)'),
          React.createElement('img', {
            key: 'img',
            src: imageState.croppedImage,
            alt: 'Avatar',
            style: {
              width: '200px',
              height: '200px',
              border: '2px solid #ddd',
              borderRadius: '50%'
            }
          })
        ])
      ])
    ]) : null;

    return React.createElement('div', {
      style: {
        maxWidth: '900px',
        margin: '0 auto'
      }
    }, [infoSection, cropperSection, resultSection]);
  },
  args: {
    maxFileSize: 2 * 1024 * 1024,
    acceptedFormats: 'image/jpeg,image/png'
  },
  parameters: {
    docs: {
      description: {
        story: 'Full interactive demo showing the complete workflow: upload, crop, zoom, and see the final results. Try uploading your own image to test the cropping functionality.'
      }
    }
  }
};