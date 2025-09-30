// CrProfileCard.stories.tsx
import React from 'react';
import CrProfileCard from './CrProfileCard';

export default {
  title: 'Templates/CrProfileCard',
  component: CrProfileCard,
  parameters: {
    layout: 'padded',
    controls: {
      exclude: ['socialLinks', 'permissions', 'maxWidth', 'formData', 'avatarAlt', 'className', 'onEditClick', 'onChange', 'onSave', 'onCancel']
    },
    docs: {
  description: {
    component: 'CrProfileCard uses the CrPageHeader molecule, the CrChip atom, the CrButton atom, the CrSocialIcon atom, the CrTable organism, the CrProfileEditForm template, and the CrVolunteerEditForm template. This component provides complete user profile management with view, edit profile, and edit volunteer states. This extensive composition of atoms, molecules, organisms, and other templates makes it a proper Template. Includes avatar management, social links, permissions display, and custom saved tracks table functionality. Dark mode adapts through [data-theme="dark"] CSS selectors.'
  }
}
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['view', 'editProfile', 'editVolunteer'],
      description: 'Component state'
    },
    eyebrowText: {
      control: 'text',
      description: 'Small text above the title'
    },
    title: {
      control: 'text',
      description: 'Main page title'
    },
    showEditButton: {
      control: 'boolean',
      description: 'Whether to show the edit button'
    },
    firstName: {
      control: 'text',
      description: 'User first name'
    },
    lastName: {
      control: 'text',
      description: 'User last name'
    },
    location: {
      control: 'text',
      description: 'User location'
    },
    email: {
      control: 'text',
      description: 'User email address'
    },
    memberSince: {
      control: 'text',
      description: 'Membership start date'
    },
    avatarSrc: {
      control: 'text',
      description: 'URL for user avatar image'
    },
    showPermissions: {
      control: 'boolean',
      description: 'Whether to show the permissions section'
    },
    isVolunteer: {
      control: 'boolean',
      description: 'Whether user has volunteer permissions'
    },
    isDJ: {
      control: 'boolean',
      description: 'Whether user has DJ permissions'
    }
  },
  tags: ['autodocs']
};

export const ViewState = {
  args: {
    state: 'view',
    eyebrowText: "CHIRP Radio",
    title: "Profile - View",
    showEditButton: true,
    firstName: "Person",
    lastName: "Name",
    location: "Chicago, Illinois",
    email: "email@qmail.com", 
    memberSince: "September 30, 2008",
    avatarSrc: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face",
    socialLinks: [
      { platform: 'facebook', url: 'www.facebook.com/thisguyrighthere' },
      { platform: 'instagram', url: 'www.instagram.com/thisguydoingstuff' },
      { platform: 'twitter', url: 'www.twitter.com/thisguytakingtrash' },
      { platform: 'linkedin', url: 'www.linkedin.com/thisguybuttonedup' },
      { platform: 'bluesky', url: 'www.bluesky.com/thisguygettingaway' }
    ],
    permissions: ['Default', 'Admin', 'Board Member', 'DJ', 'Content Publisher', 'Volunteer'],
    showPermissions: true,
    isVolunteer: true,
    isDJ: false,
    maxWidth: '860px'
  },
  render: (args) => {
    const [currentAvatar, setCurrentAvatar] = React.useState(args.avatarSrc);
    const [formState, setFormState] = React.useState({
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      djBio: 'Passionate about underground hip-hop and jazz fusion...',
      primaryPhoneType: 'mobile',
      primaryPhone: '(555) 123-4567',
      address: '123 Music Ave',
      zipCode: '60614',
      city: 'Chicago',
      state: 'IL'
    });

    React.useEffect(() => {
      setFormState(prev => ({
        ...prev,
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email
      }));
      setCurrentAvatar(args.avatarSrc);
    }, [args.firstName, args.lastName, args.email, args.avatarSrc]);

    const handleEditClick = () => {
      console.log('Edit clicked - switch to editProfile state in controls');
    };

    const handleStateChange = (newState) => {
      console.log(`State changed to: ${newState} - use controls to change state`);
    };

    const handleCancel = () => {
      console.log('Cancel clicked - switch to view state in controls');
    };

    const handleChange = (field, value) => {
      console.log(`Field ${field} changed to:`, value);
      if (field === 'avatarSrc') {
        setCurrentAvatar(value);
      } else {
        setFormState(prev => ({
          ...prev,
          [field]: value
        }));
      }
    };

    return React.createElement('div', {
      style: { maxWidth: '1200px', margin: '0 auto' }
    }, React.createElement(CrProfileCard, {
      ...args,
      avatarSrc: currentAvatar,
      onEditClick: handleEditClick,
      onStateChange: handleStateChange,
      onCancel: handleCancel,
      onChange: handleChange,
      onSave: () => console.log('Save changes'),
      formData: formState
    }));
  }
};

export const EditDJProfile = {
  args: {
    state: 'editProfile',
    eyebrowText: "CHIRP Radio",
    title: "Profile - Edit DJ",
    showEditButton: false,
    firstName: "DJ",
    lastName: "Mike",
    location: "Chicago, Illinois",
    email: "dj.mike@chirpradio.org",
    memberSince: "March 10, 2018",
    avatarSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    socialLinks: [
      { platform: 'facebook', url: 'www.facebook.com/djmikechirp' },
      { platform: 'instagram', url: 'www.instagram.com/djmike_chirp' },
      { platform: 'twitter', url: 'www.twitter.com/djmikechirp' }
    ],
    permissions: ['Default', 'DJ', 'Content Publisher'],
    showPermissions: true,
    isVolunteer: true,
    isDJ: true,
    formData: {
      djBio: 'Passionate about underground hip-hop and jazz fusion...',
      primaryPhoneType: 'mobile',
      primaryPhone: '(555) 123-4567',
      address: '123 Music Ave',
      zipCode: '60614',
      city: 'Chicago',
      state: 'IL'
    },
    maxWidth: '860px'
  },
  render: (args) => {
    const [currentAvatar, setCurrentAvatar] = React.useState(args.avatarSrc);
    const [formState, setFormState] = React.useState(args.formData);

    const handleChange = (field, value) => {
      console.log(`DJ field ${field} changed to:`, value);
      if (field === 'avatarSrc') {
        setCurrentAvatar(value);
      } else {
        setFormState(prev => ({
          ...prev,
          [field]: value
        }));
      }
    };

    return React.createElement('div', {
      style: { maxWidth: '1200px', margin: '0 auto' }
    }, React.createElement(CrProfileCard, {
      ...args,
      avatarSrc: currentAvatar,
      formData: formState,
      onStateChange: (newState) => {
        console.log(`State changed to: ${newState}`);
      },
      onChange: handleChange,
      onSave: () => console.log('Save DJ profile changes'),
      onCancel: () => console.log('Cancel DJ profile editing')
    }));
  }
};

export const EditVolunteerState = {
  args: {
    state: 'editVolunteer',
    eyebrowText: "CHIRP Radio",
    title: "Volunteer Details - Edit",
    showEditButton: false,
    firstName: "Volunteer",
    lastName: "User",
    location: "Chicago, Illinois",
    email: "volunteer@chirpradio.org",
    memberSince: "January 15, 2020",
    avatarSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    socialLinks: [
      { platform: 'facebook', url: 'www.facebook.com/volunteeruser' },
      { platform: 'instagram', url: 'www.instagram.com/volunteerlife' },
      { platform: 'twitter', url: 'www.twitter.com/chirpvolunteer' }
    ],
    permissions: ['Default', 'Volunteer'],
    showPermissions: true,
    isVolunteer: true,
    isDJ: false,
    formData: {
      bio: 'Passionate about independent music and community radio...',
      skills: ['Audio Engineering', 'Music Curation', 'Social Media'],
      availability: {
        Monday: ['Evening'],
        Wednesday: ['Afternoon', 'Evening'],
        Saturday: ['Morning', 'Afternoon']
      },
      notes: 'Available for special events and music festivals.'
    },
    maxWidth: '860px'
  },
  render: (args) => {
    const [currentAvatar, setCurrentAvatar] = React.useState(args.avatarSrc);
    const [formState, setFormState] = React.useState(args.formData);

    const handleChange = (field, value) => {
      console.log(`Volunteer field ${field} changed to:`, value);
      if (field === 'avatarSrc') {
        setCurrentAvatar(value);
      } else {
        setFormState(prev => ({
          ...prev,
          [field]: value
        }));
      }
    };

    return React.createElement('div', {
      style: { maxWidth: '1200px', margin: '0 auto' }
    }, React.createElement(CrProfileCard, {
      ...args,
      avatarSrc: currentAvatar,
      formData: formState,
      onStateChange: (newState) => {
        console.log(`State changed to: ${newState}`);
      },
      onChange: handleChange,
      onSave: () => console.log('Save volunteer profile changes'),
      onCancel: () => console.log('Cancel volunteer profile editing')
    }));
  }
};

export const ListenerProfile = {
  args: {
    state: 'view',
    eyebrowText: "CHIRP Radio",
    title: "Profile - View",
    showEditButton: false,
    firstName: "Sarah",
    lastName: "Listener",
    location: "Evanston, Illinois",
    email: "sarah.listener@gmail.com",
    memberSince: "November 5, 2022",
    avatarSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    socialLinks: [
      { platform: 'facebook', url: 'www.facebook.com/sarahlistener' },
      { platform: 'instagram', url: 'www.instagram.com/sarahmusic' }
    ],
    permissions: ['Default'],
    showPermissions: false,
    isVolunteer: false,
    isDJ: false,
    maxWidth: '860px'
  },
  render: (args) => {
    return React.createElement('div', {
      style: { maxWidth: '1200px', margin: '0 auto' }
    }, React.createElement(CrProfileCard, args));
  }
};

// FIXED Interactive Demo - Clean state management
export const InteractiveDemo = {
  args: {
    state: 'view',
    eyebrowText: "CHIRP Radio",
    title: "Profile - View", 
    showEditButton: true,
    firstName: "DJ Sarah",
    lastName: "Martinez",
    location: "Chicago, Illinois",
    email: "sarah.martinez@chirpradio.org",
    memberSince: "March 15, 2019",
    avatarSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face",
    socialLinks: [
      { platform: 'facebook', url: 'www.facebook.com/djsarahchirp' },
      { platform: 'instagram', url: 'www.instagram.com/djsarah_music' },
      { platform: 'twitter', url: 'www.twitter.com/djsarahchirp' }
    ],
    permissions: ['Default', 'DJ', 'Content Publisher', 'Volunteer'],
    showPermissions: true,
    isVolunteer: true,
    isDJ: true,
    maxWidth: '860px'
  },
  render: (args) => {
    // Single source of truth for all state
    const [profileState, setProfileState] = React.useState({
      currentState: args.state,
      currentTitle: args.title,
      currentAvatar: args.avatarSrc,
      formData: {
        firstName: args.firstName,
        lastName: args.lastName,
        email: args.email,
        djBio: 'Sarah brings energy and passion to Chicago\'s underground music scene, specializing in electronic, house, and techno. With over 5 years of DJing experience, she\'s known for seamless mixing and discovering new artists.',
        primaryPhoneType: 'mobile',
        primaryPhone: '(555) 234-5678',
        secondaryPhoneType: 'home',
        secondaryPhone: '(555) 987-6543',
        address: '456 Music Row',
        zipCode: '60622',
        city: 'Chicago',
        state: 'IL',
        age: '30+',
        education: 'Columbia College Chicago - Audio Engineering',
        employer: 'Independent Music Producer',
        volunteerOrgs: [
          { org: 'Chicago Music Coalition', type: 'Arts' },
          { org: 'Youth Music Education', type: 'Education' }
        ],
        radioStations: 'WLUW, WNUR',
        specialSkills: ['Marketing', 'Photography', 'Journalism'],
        hearAboutChirp: ['Other', 'Things'],
        interests: ['DJ', 'Event planning', 'Marketing', 'Community radio'],
        wantsToDJ: 'yes',
        djAvailability: ['Weekday evening', 'Weekend evening', 'Weekend night']
      }
    });
    
    const handleEditClick = () => {
      setProfileState(prev => ({
        ...prev,
        currentState: 'editProfile',
        currentTitle: 'Profile - Edit'
      }));
    };

    const handleStateChange = (newState) => {
      setProfileState(prev => ({
        ...prev,
        currentState: newState,
        currentTitle: newState === 'editProfile' ? 'Profile - Edit' : 'Volunteer Details - Edit'
      }));
    };

    const handleCancel = () => {
      setProfileState(prev => ({
        ...prev,
        currentState: 'view',
        currentTitle: 'Profile - View'
      }));
    };

    const handleSave = () => {
      console.log('Saving changes...', profileState);
      setProfileState(prev => ({
        ...prev,
        currentState: 'view',
        currentTitle: 'Profile - View'
      }));
    };

    const handleChange = (field, value) => {
      console.log(`Field ${field} changed to:`, value);
      
      if (field === 'avatarSrc') {
        // Handle avatar changes directly
        setProfileState(prev => ({
          ...prev,
          currentAvatar: value
        }));
      } else {
        // Handle form field changes
        setProfileState(prev => ({
          ...prev,
          formData: {
            ...prev.formData,
            [field]: value
          }
        }));
      }
    };

    return React.createElement('div', {
      style: { maxWidth: '1200px', margin: '0 auto' }
    }, React.createElement(CrProfileCard, {
      ...args,
      state: profileState.currentState,
      title: profileState.currentTitle,
      showEditButton: profileState.currentState === 'view',
      avatarSrc: profileState.currentAvatar,
      onEditClick: handleEditClick,
      onStateChange: handleStateChange,
      onCancel: handleCancel,
      onSave: handleSave,
      onChange: handleChange,
      formData: profileState.formData
    }));
  }
};