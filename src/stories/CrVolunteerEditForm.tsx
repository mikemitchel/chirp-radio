// CrVolunteerEditForm.tsx
import { PiFloppyDisk } from 'react-icons/pi'
import CrButton from './CrButton'
import './CrVolunteerEditForm.css'
import { useVolunteerFormSettings } from '../hooks/useData'

// Fallback data in case CMS is unavailable
const FALLBACK_AGE_OPTIONS = ['18–24', '25–34', '35–44', '45–54', '55–64', '65+']
const FALLBACK_SPECIAL_SKILLS = [
  'Fundraising',
  'Sales',
  'Other',
  'Wants',
  'Journalism',
  'Photography',
  'Things',
  'To',
  'Marketing',
  'Politics',
  'Chirp',
  'Track',
]
const FALLBACK_HEAR_ABOUT = [
  'This',
  'Other',
  'Wants',
  'That',
  'Things',
  'To',
  'Something',
  'Chirp',
  'Track',
]
const FALLBACK_INTERESTS = [
  'DJ',
  'Content writing',
  'Event planning',
  'Marketing',
  'Community radio',
  'Event working',
  'Interviews',
  'Fundraising',
  'Other',
]
const FALLBACK_DJ_AVAILABILITY = [
  'Weekday mornings',
  'Weekend mornings',
  'Weekday day',
  'Weekend day',
  'Weekday evening',
  'Weekend evening',
  'Weekday night',
  'Weekend night',
]

interface CrVolunteerEditFormProps {
  formData?: any
  onChange?: (field: string, value: any) => void
  onSave?: () => void
  onCancel?: () => void
}

export default function CrVolunteerEditForm({
  // Form data and handlers
  formData = {},
  onChange,
  onSave,
  onCancel,
}: CrVolunteerEditFormProps) {
  const { data: formSettings } = useVolunteerFormSettings()

  const handleInputChange = (field: any, value: any) => {
    if (onChange) {
      onChange(field, value)
    }
  }

  // Extract values from CMS with fallbacks
  const ageLabel = formSettings?.ageQuestion?.label || 'Your Age (Generally) *'
  const ageOptions =
    formSettings?.ageQuestion?.options?.map((opt) => opt.value) || FALLBACK_AGE_OPTIONS

  const educationLabel =
    formSettings?.educationQuestion?.label || 'What colleges/universities have you attended? *'
  const educationPlaceholder =
    formSettings?.educationQuestion?.placeholder || 'Loyola University Chicago'

  const employerLabel =
    formSettings?.employerQuestion?.label || 'Who are you currently employed by? *'
  const employerPlaceholder = formSettings?.employerQuestion?.placeholder || 'Portillos'

  const volunteerOrgsLabel =
    formSettings?.volunteerOrgsQuestion?.label || 'What other organizations do you volunteer with?'
  const volunteerOrgsPlaceholder =
    formSettings?.volunteerOrgsQuestion?.placeholder || 'American Cancer Society'
  const addAnotherButtonText = formSettings?.volunteerOrgsQuestion?.addButtonText || '+ ADD ANOTHER'

  const radioExperienceLabel =
    formSettings?.radioExperienceQuestion?.label || 'Have you worked with a radio station before? *'
  const radioStationsFollowUpLabel =
    formSettings?.radioExperienceQuestion?.followUpLabel ||
    'What radio stations have you worked with?'
  const radioStationsPlaceholder =
    formSettings?.radioExperienceQuestion?.followUpPlaceholder || 'WLUW'

  const specialSkillsLabel =
    formSettings?.specialSkillsQuestion?.label || 'What special skills do you have?'
  const specialSkillsOptions =
    formSettings?.specialSkillsQuestion?.options?.map((opt) => opt.value) || FALLBACK_SPECIAL_SKILLS

  const hearAboutLabel =
    formSettings?.hearAboutChirpQuestion?.label || 'How did you hear about CHIRP?'
  const hearAboutOptions =
    formSettings?.hearAboutChirpQuestion?.options?.map((opt) => opt.value) || FALLBACK_HEAR_ABOUT

  const interestsLabel =
    formSettings?.interestsQuestion?.label || 'What are you interested in doing?'
  const interestsOptions =
    formSettings?.interestsQuestion?.options?.map((opt) => opt.value) || FALLBACK_INTERESTS

  const wantsToDJLabel =
    formSettings?.wantsToDJQuestion?.label || 'Do you want to be a DJ or on-air sub?'

  const djAvailabilityLabel =
    formSettings?.djAvailabilityQuestion?.label || "What's your DJ availability?"
  const djAvailabilityOptions =
    formSettings?.djAvailabilityQuestion?.options?.map((opt) => opt.value) ||
    FALLBACK_DJ_AVAILABILITY

  const cancelButtonText = formSettings?.formActions?.cancelButtonText || 'Cancel'
  const saveButtonText = formSettings?.formActions?.saveButtonText || 'Save Changes'

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="form-section">
        {/* Age */}
        <div className="form-group">
          <label className="form-label">{ageLabel}</label>
          <div className="form-radio-group">
            {ageOptions.map((ageRange) => (
              <label key={ageRange} className="form-radio-item">
                <input
                  type="radio"
                  name="age"
                  checked={formData.age === ageRange}
                  onChange={() => handleInputChange('age', ageRange)}
                  required
                />
                {ageRange}
              </label>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="form-group">
          <label className="form-label">{educationLabel}</label>
          <input
            type="text"
            value={formData.education || ''}
            onChange={(e) => handleInputChange('education', e.target.value)}
            placeholder={educationPlaceholder}
            required
          />
        </div>

        {/* Employment */}
        <div className="form-group">
          <label className="form-label">{employerLabel}</label>
          <input
            type="text"
            value={formData.employer || ''}
            onChange={(e) => handleInputChange('employer', e.target.value)}
            placeholder={employerPlaceholder}
            required
          />
        </div>

        {/* Volunteer Organizations */}
        <div className="form-group">
          <label className="form-label">{volunteerOrgsLabel}</label>
          <div className="form-group-column">
            {(formData.volunteerOrgs || ['']).map((org: any, index: any) => (
              <div key={index}>
                <input
                  type="text"
                  value={org || ''}
                  onChange={(e) => {
                    const newOrgs = [...(formData.volunteerOrgs || [''])]
                    newOrgs[index] = e.target.value
                    handleInputChange('volunteerOrgs', newOrgs)
                  }}
                  placeholder={volunteerOrgsPlaceholder}
                />
              </div>
            ))}
            <div className="flex-end">
              <CrButton
                size="small"
                variant="outline"
                color="default"
                onClick={() => {
                  const currentOrgs = formData.volunteerOrgs || ['']
                  handleInputChange('volunteerOrgs', [...currentOrgs, ''])
                }}
              >
                {addAnotherButtonText}
              </CrButton>
            </div>
          </div>
        </div>

        {/* Radio Station Experience */}
        <div className="form-group">
          <label className="form-label">{radioExperienceLabel}</label>
          <div className="form-radio-group">
            <label className="form-radio-item">
              <input
                type="radio"
                name="hasRadioExperience"
                checked={formData.hasRadioExperience === 'yes'}
                onChange={() => handleInputChange('hasRadioExperience', 'yes')}
                required
              />
              Yes
            </label>
            <label className="form-radio-item">
              <input
                type="radio"
                name="hasRadioExperience"
                checked={formData.hasRadioExperience === 'no'}
                onChange={() => handleInputChange('hasRadioExperience', 'no')}
                required
              />
              No
            </label>
          </div>
        </div>

        {/* Radio Stations - conditional */}
        {formData.hasRadioExperience === 'yes' && (
          <div className="form-group">
            <label className="form-label">{radioStationsFollowUpLabel}</label>
            <input
              type="text"
              value={formData.radioStations || ''}
              onChange={(e) => handleInputChange('radioStations', e.target.value)}
              placeholder={radioStationsPlaceholder}
            />
          </div>
        )}

        {/* Special Skills */}
        <div className="form-group">
          <label className="form-label">{specialSkillsLabel}</label>
          <div className="form-checkbox-grid">
            {specialSkillsOptions.map((skill) => (
              <label key={skill} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.specialSkills?.includes(skill) || false}
                  onChange={(e) => {
                    const currentSkills = formData.specialSkills || []
                    const newSkills = e.target.checked
                      ? [...currentSkills, skill]
                      : currentSkills.filter((s: any) => s !== skill)
                    handleInputChange('specialSkills', newSkills)
                  }}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* How did you hear about CHIRP */}
        <div className="form-group">
          <label className="form-label">{hearAboutLabel}</label>
          <div className="form-checkbox-grid">
            {hearAboutOptions.map((source) => (
              <label key={source} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.hearAboutChirp?.includes(source) || false}
                  onChange={(e) => {
                    const currentSources = formData.hearAboutChirp || []
                    const newSources = e.target.checked
                      ? [...currentSources, source]
                      : currentSources.filter((s: any) => s !== source)
                    handleInputChange('hearAboutChirp', newSources)
                  }}
                />
                {source}
              </label>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="form-group">
          <label className="form-label">{interestsLabel}</label>
          <div className="form-checkbox-grid">
            {interestsOptions.map((interest) => (
              <label key={interest} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.interests?.includes(interest) || false}
                  onChange={(e) => {
                    const currentInterests = formData.interests || []
                    const newInterests = e.target.checked
                      ? [...currentInterests, interest]
                      : currentInterests.filter((i: any) => i !== interest)
                    handleInputChange('interests', newInterests)
                  }}
                />
                {interest}
              </label>
            ))}
          </div>
        </div>

        {/* DJ Interest */}
        <div className="form-group">
          <label className="form-label">{wantsToDJLabel}</label>
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
          <label className="form-label">{djAvailabilityLabel}</label>
          <div className="form-checkbox-grid">
            {djAvailabilityOptions.map((timeSlot) => (
              <label key={timeSlot} className="form-checkbox-item">
                <input
                  type="checkbox"
                  checked={formData.djAvailability?.includes(timeSlot) || false}
                  onChange={(e) => {
                    const currentAvail = formData.djAvailability || []
                    const newAvail = e.target.checked
                      ? [...currentAvail, timeSlot]
                      : currentAvail.filter((a: any) => a !== timeSlot)
                    handleInputChange('djAvailability', newAvail)
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
        <CrButton size="medium" variant="text" color="default" onClick={onCancel}>
          {cancelButtonText}
        </CrButton>
        <CrButton
          size="medium"
          variant="solid"
          color="default"
          leftIcon={<PiFloppyDisk />}
          onClick={onSave}
        >
          {saveButtonText}
        </CrButton>
      </div>
    </form>
  )
}
