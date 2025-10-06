// CrProfileEditForm.stories.tsx
import React from 'react'
import CrProfileEditForm from './CrProfileEditForm'

export default {
  title: 'Molecules/CrProfileEditForm',
  component: CrProfileEditForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Built from CrButton atoms, CrSocialIcon atoms, and CrImageCropper molecule. Complex profile editing form with personal info, avatar upload, and social links. This uses image cropper molecule - consider moving to Organisms category. Handles validation and form state management. Dark mode adapts through [data-theme="dark"] CSS selectors.',
      },
    },
  },
  argTypes: {
    firstName: {
      control: 'text',
      description: 'User first name',
    },
    lastName: {
      control: 'text',
      description: 'User last name',
    },
    email: {
      control: 'text',
      description: 'User email address',
    },
    isDJ: {
      control: 'boolean',
      description: 'Whether user has DJ permissions',
    },
    isVolunteer: {
      control: 'boolean',
      description: 'Whether user has volunteer permissions',
    },
    avatarSrc: {
      control: 'text',
      description: 'Current avatar image URL',
    },
  },
  tags: ['autodocs'],
}

export const Default = {
  args: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    isDJ: false,
    isVolunteer: false,
    avatarSrc:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    socialLinks: [
      { platform: 'facebook', url: 'www.facebook.com/johndoe' },
      { platform: 'instagram', url: 'www.instagram.com/johndoe' },
    ],
    formData: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    originalFullImage:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  },
  render: (args) => {
    const [formData, setFormData] = React.useState(args.formData)

    const handleChange = (field, value) => {
      console.log(`Field ${field} changed to:`, value)
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    const handleImageChange = (images) => {
      console.log('Image changed:', images)
    }

    return React.createElement(CrProfileEditForm, {
      ...args,
      formData: formData,
      onChange: handleChange,
      onImageChange: handleImageChange,
      onSave: () => console.log('Save clicked'),
      onCancel: () => console.log('Cancel clicked'),
    })
  },
}

export const DJProfile = {
  args: {
    firstName: 'DJ Sarah',
    lastName: 'Martinez',
    email: 'sarah.martinez@chirpradio.org',
    isDJ: true,
    isVolunteer: true,
    avatarSrc:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    socialLinks: [
      { platform: 'facebook', url: 'www.facebook.com/djsarah' },
      { platform: 'instagram', url: 'www.instagram.com/djsarah_music' },
    ],
    formData: {
      firstName: 'DJ Sarah',
      lastName: 'Martinez',
      email: 'sarah.martinez@chirpradio.org',
      djName: 'DJ Sarah',
      showName: 'Underground Sounds',
      djBio: 'Passionate about electronic music and community radio...',
      primaryPhoneType: 'mobile',
      primaryPhone: '(555) 123-4567',
      address: '123 Music Ave',
      zipCode: '60614',
      city: 'Chicago',
      state: 'IL',
    },
    originalFullImage:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  },
  render: (args) => {
    const [formData, setFormData] = React.useState(args.formData)

    const handleChange = (field, value) => {
      console.log(`DJ field ${field} changed to:`, value)
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    const handleImageChange = (images) => {
      console.log('DJ image changed:', images)
    }

    return React.createElement(CrProfileEditForm, {
      ...args,
      formData: formData,
      onChange: handleChange,
      onImageChange: handleImageChange,
      onSave: () => console.log('DJ Save clicked'),
      onCancel: () => console.log('DJ Cancel clicked'),
    })
  },
}
