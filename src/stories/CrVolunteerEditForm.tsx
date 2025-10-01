// CrVolunteerEditForm.tsx
import React from 'react';
import { PiFloppyDisk } from 'react-icons/pi';
import CrButton from './CrButton';
import './CrVolunteerEditForm.css';

interface CrVolunteerEditFormProps {
  formData?: any;
  onChange?: (field: string, value: any) => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function CrVolunteerEditForm({
  // Form data and handlers
  formData = {},
  onChange,
  onSave,
  onCancel
}: CrVolunteerEditFormProps) {
  const handleInputChange = (field, value) => {
    if (onChange) {
      onChange(field, value);
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-section">
        {/* Age */}
        <div className="form-group">
          <label className="form-label">Your Age (Generally) *</label>
          <input
            type="text"
            value={formData.age || ''}
            onChange={(e) => handleInputChange('age', e.target.value)}
            placeholder="40+"
            required
          />
        </div>

        {/* Education */}
        <div className="form-group">
          <label className="form-label">What colleges/universities have you attended? *</label>
          <input
            type="text"
            value={formData.education || ''}
            onChange={(e) => handleInputChange('education', e.target.value)}
            placeholder="Loyola University Chicago"
            required
          />
        </div>

        {/* Employment */}
        <div className="form-group">
          <label className="form-label">Who are you currently employed by? *</label>
          <input
            type="text"
            value={formData.employer || ''}
            onChange={(e) => handleInputChange('employer', e.target.value)}
            placeholder="Chicago Public Library"
            required
          />
        </div>

        {/* Volunteer Organizations */}
        <div className="form-group">
          <label className="form-label">What other organizations do you volunteer with?</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--cr-space-4)' }}>
            {(formData.volunteerOrgs || [{ org: '', type: '' }]).map((orgData, index) => (
              <div key={index} className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    value={orgData.org || ''}
                    onChange={(e) => {
                      const newOrgs = [...(formData.volunteerOrgs || [])];
                      newOrgs[index] = { ...newOrgs[index], org: e.target.value };
                      handleInputChange('volunteerOrgs', newOrgs);
                    }}
                    placeholder="American Cancer Society"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    value={orgData.type || ''}
                    onChange={(e) => {
                      const newOrgs = [...(formData.volunteerOrgs || [])];
                      newOrgs[index] = { ...newOrgs[index], type: e.target.value };
                      handleInputChange('volunteerOrgs', newOrgs);
                    }}
                    placeholder="Arts"
                  />
                </div>
              </div>
            ))}
            <CrButton
              size="small"
              variant="outline"
              color="default"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                const currentOrgs = formData.volunteerOrgs || [];
                handleInputChange('volunteerOrgs', [...currentOrgs, { org: '', type: '' }]);
              }}
            >
              + ADD ANOTHER
            </CrButton>
          </div>
        </div>

        {/* Radio Stations */}
        <div className="form-group">
          <label className="form-label">What radio stations have you worked with?</label>
          <input
            type="text"
            value={formData.radioStations || ''}
            onChange={(e) => handleInputChange('radioStations', e.target.value)}
            placeholder="WLUW"
          />
        </div>

        {/* Special Skills */}
        <div className="form-group">
          <label className="form-label">What special skills do you have?</label>
          <div className="form-checkbox-grid">
            {[
              'Fundraising', 'Sales', 'Other', 'Wants', 
              'Journalism', 'Photography', 'Things', 'To',
              'Marketing', 'Politics', 'Chirp', 'Track'
            ].map(skill => (
              <label key={skill} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.specialSkills?.includes(skill) || false}
                  onChange={(e) => {
                    const currentSkills = formData.specialSkills || [];
                    const newSkills = e.target.checked
                      ? [...currentSkills, skill]
                      : currentSkills.filter(s => s !== skill);
                    handleInputChange('specialSkills', newSkills);
                  }}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* How did you hear about CHIRP */}
        <div className="form-group">
          <label className="form-label">How did you hear about CHIRP?</label>
          <div className="form-checkbox-grid">
            {[
              'This', 'Other', 'Wants',
              'That', 'Things', 'To', 
              'Something', 'Chirp', 'Track'
            ].map(source => (
              <label key={source} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.hearAboutChirp?.includes(source) || false}
                  onChange={(e) => {
                    const currentSources = formData.hearAboutChirp || [];
                    const newSources = e.target.checked
                      ? [...currentSources, source]
                      : currentSources.filter(s => s !== source);
                    handleInputChange('hearAboutChirp', newSources);
                  }}
                />
                {source}
              </label>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="form-group">
          <label className="form-label">What are you interested in doing?</label>
          <div className="form-checkbox-grid">
            {[
              'DJ', 'Content writing', 'Event planning',
              'Marketing', 'Community radio', 'Event working',
              'Interviews', 'Fundraising', 'Other'
            ].map(interest => (
              <label key={interest} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.interests?.includes(interest) || false}
                  onChange={(e) => {
                    const currentInterests = formData.interests || [];
                    const newInterests = e.target.checked
                      ? [...currentInterests, interest]
                      : currentInterests.filter(i => i !== interest);
                    handleInputChange('interests', newInterests);
                  }}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        {/* DJ Interest */}
        <div className="form-group">
          <label className="form-label">Do you want to be a DJ or on-air sub?</label>
          <div className="form-radio-group">
            <label className="form-radio-item">
              <input
                type="radio"
                name="wantsToDJ"
                checked={formData.wantsToDJ === 'yes'}
                onChange={() => handleInputChange('wantsToDJ', 'yes')}
              />
              Yes
            </label>
            <label className="form-radio-item">
              <input
                type="radio"
                name="wantsToDJ"
                checked={formData.wantsToDJ === 'no'}
                onChange={() => handleInputChange('wantsToDJ', 'no')}
              />
              No
            </label>
          </div>
        </div>

        {/* DJ Availability */}
        <div className="form-group">
          <label className="form-label">What's your DJ availability?</label>
          <div className="form-checkbox-grid">
            {[
              'Weekday mornings', 'Weekend mornings',
              'Weekday day', 'Weekend day',
              'Weekday evening', 'Weekend evening',
              'Weekday night', 'Weekend night'
            ].map(timeSlot => (
              <label key={timeSlot} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.djAvailability?.includes(timeSlot) || false}
                  onChange={(e) => {
                    const currentAvail = formData.djAvailability || [];
                    const newAvail = e.target.checked
                      ? [...currentAvail, timeSlot]
                      : currentAvail.filter(a => a !== timeSlot);
                    handleInputChange('djAvailability', newAvail);
                  }}
                />
                {timeSlot}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="form-actions">
        <CrButton
          size="medium"
          variant="text"
          color="default"
          onClick={onCancel}
        >
          Cancel
        </CrButton>
        <CrButton
          size="medium"
          variant="solid"
          color="default"
          leftIcon={<PiFloppyDisk />}
          onClick={onSave}
        >
          Save Changes
        </CrButton>
      </div>
    </form>
  );
}