// CrVolunteerEditForm.stories.js
import React from 'react';
import CrVolunteerEditForm from './CrVolunteerEditForm';

export default {
  title: 'Templates/CrVolunteerEditForm',
  component: CrVolunteerEditForm,
  parameters: {
    layout: 'padded',
docs: {
  description: {
    component: 'CrVolunteerEditForm uses the CrButton atom, combined with basic form elements and input fields. This component represents the Volunteer Profile page and provides volunteer profile editing form with fields for volunteer-specific information. Since it contains no atomic design system components and is just form elements, this should be reclassified as a Molecule rather than a Template. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    formData: {
      control: 'object',
      description: 'Form data object containing volunteer information'
    }
  },
  tags: ['autodocs']
};

export const Default = {
  args: {
    formData: {
      age: '30+',
      education: 'University of Chicago',
      employer: 'Chicago Public Library',
      volunteerOrgs: [
        { org: 'American Red Cross', type: 'Humanitarian' },
        { org: 'Local Food Bank', type: 'Community' }
      ],
      radioStations: 'WLUW, WNUR',
      specialSkills: ['Marketing', 'Photography'],
      hearAboutChirp: ['Other', 'Things'],
      interests: ['DJ', 'Event planning', 'Marketing'],
      wantsToDJ: 'yes',
      djAvailability: ['Weekday evening', 'Weekend evening']
    }
  },
  render: (args) => {
    const [formData, setFormData] = React.useState(args.formData);
    
    const handleChange = (field, value) => {
      console.log(`Volunteer field ${field} changed to:`, value);
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return React.createElement(CrVolunteerEditForm, {
      ...args,
      formData: formData,
      onChange: handleChange,
      onSave: () => console.log('Volunteer Save clicked'),
      onCancel: () => console.log('Volunteer Cancel clicked')
    });
  }
};

export const MinimalData = {
  args: {
    formData: {
      age: '',
      education: '',
      employer: '',
      volunteerOrgs: [{ org: '', type: '' }],
      radioStations: '',
      specialSkills: [],
      hearAboutChirp: [],
      interests: [],
      wantsToDJ: 'no',
      djAvailability: []
    }
  },
  render: (args) => {
    const [formData, setFormData] = React.useState(args.formData);
    
    const handleChange = (field, value) => {
      console.log(`Minimal field ${field} changed to:`, value);
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return React.createElement(CrVolunteerEditForm, {
      ...args,
      formData: formData,
      onChange: handleChange,
      onSave: () => console.log('Minimal Save clicked'),
      onCancel: () => console.log('Minimal Cancel clicked')
    });
  }
};

export const ExperiencedVolunteer = {
  args: {
    formData: {
      age: '40+',
      education: 'Northwestern University - Journalism, DePaul University - MBA',
      employer: 'Chicago Tribune',
      volunteerOrgs: [
        { org: 'Chicago Music Coalition', type: 'Arts' },
        { org: 'Youth Music Education', type: 'Education' },
        { org: 'Community Radio Network', type: 'Media' }
      ],
      radioStations: 'WLUW, WNUR, WBEZ (intern)',
      specialSkills: ['Journalism', 'Marketing', 'Fundraising', 'Photography'],
      hearAboutChirp: ['Other', 'Things', 'Chirp'],
      interests: ['DJ', 'Content writing', 'Event planning', 'Marketing', 'Interviews'],
      wantsToDJ: 'yes',
      djAvailability: ['Weekday evening', 'Weekend evening', 'Weekend day']
    }
  },
  render: (args) => {
    const [formData, setFormData] = React.useState(args.formData);
    
    const handleChange = (field, value) => {
      console.log(`Experienced field ${field} changed to:`, value);
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

    return React.createElement(CrVolunteerEditForm, {
      ...args,
      formData: formData,
      onChange: handleChange,
      onSave: () => console.log('Experienced Save clicked'),
      onCancel: () => console.log('Experienced Cancel clicked')
    });
  }
};