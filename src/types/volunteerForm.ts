// Volunteer Form Settings from CMS
// Manually synced with chirp-cms/payload-types.ts

export interface VolunteerFormSettings {
  ageQuestion: {
    label: string
    options: Array<{
      value: string
      id: string
    }>
  }
  educationQuestion: {
    label: string
    placeholder: string
  }
  employerQuestion: {
    label: string
    placeholder: string
  }
  volunteerOrgsQuestion: {
    label: string
    placeholder: string
    addButtonText: string
  }
  radioExperienceQuestion: {
    label: string
    followUpLabel: string
    followUpPlaceholder: string
  }
  specialSkillsQuestion: {
    label: string
    options: Array<{
      value: string
      id: string
    }>
  }
  hearAboutChirpQuestion: {
    label: string
    options: Array<{
      value: string
      id: string
    }>
  }
  interestsQuestion: {
    label: string
    options: Array<{
      value: string
      id: string
    }>
  }
  wantsToDJQuestion: {
    label: string
  }
  djAvailabilityQuestion: {
    label: string
    options: Array<{
      value: string
      id: string
    }>
  }
  formActions: {
    cancelButtonText: string
    saveButtonText: string
  }
}
