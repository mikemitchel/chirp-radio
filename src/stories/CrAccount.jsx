// CrAccount.tsx
import React from 'react';
import CrAvatar from './CrAvatar';
import CrChip from './CrChip';
import CrButton from './CrButton';
import './CrAccount.css';

export default function CrAccount({
  isLoggedIn = false,
  isVolunteer = false,
  userName = "Johanna Dough",
  userAvatar = "https://images.unsplash.com/photo-1580489944761-15a19d654956",
  showTags = true,
  tags = ["Hello World", "Hello World", "Hello World"],
  onLoginClick,
  onVolunteerDropdown
}) {
  
  const DownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  );

  // Logged out state
  if (!isLoggedIn) {
    return (
      <div className="cr-account">
        <CrAvatar isLoggedIn={false} size={32} />
        <button className="cr-account__login-button" onClick={onLoginClick}>
          Log In
        </button>
      </div>
    );
  }

  // Logged in state
  return (
    <div className="cr-account">
      <CrAvatar 
        src={userAvatar} 
        alt={userName}
        isLoggedIn={true} 
      />
      
      {/* Greeting text */}
      <div className="cr-account__greeting">
        <span className="cr-account__hello">Hello</span>
        <span className="cr-account__name">{userName}</span>
      </div>
      
      {/* Volunteer dropdown */}
      {isVolunteer && (
        <CrButton
          size="xsmall"
          variant="outline"
          color="default"
          rightIcon={<DownIcon />}
          onClick={onVolunteerDropdown}
        >
          Volunteer
        </CrButton>
      )}
      
      {/* Tags (volunteer mode) */}
      {isVolunteer && showTags && (
        <div className="cr-account__tags">
          {tags.map((tag, index) => (
            <CrChip key={index} variant="secondary" size="small">
              {tag}
            </CrChip>
          ))}
        </div>
      )}
    </div>
  );
}