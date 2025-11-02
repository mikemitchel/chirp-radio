export interface Member {
  id?: number
  firstName?: string | null
  lastName?: string | null
  location?: string | null
  profileImage?: string | null
  fullProfileImage?: string | null
  profileImageOrientation?: ('square' | 'landscape' | 'portrait') | null
  djName?: string | null
  showName?: string | null
  djExcerpt?: string | null
  djBio?: string | null
  djDonationLink?: string | null
  primaryPhoneType?: ('Mobile' | 'Home' | 'Work') | null
  primaryPhone?: string | null
  secondaryPhoneType?: ('Mobile' | 'Home' | 'Work') | null
  secondaryPhone?: string | null
  address?: string | null
  city?: string | null
  state?: string | null
  zipCode?: string | null
  socialLinks?: {
    facebook?: string
    twitter?: string
    instagram?: string
    website?: string
    soundcloud?: string
    mixcloud?: string
    [key: string]: string | undefined
  }
}
