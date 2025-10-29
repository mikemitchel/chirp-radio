// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useUsers } from './UserContext'

export type UserRole = 'listener' | 'volunteer' | 'dj'

interface SocialLinks {
  facebook?: string
  instagram?: string
  twitter?: string
  bluesky?: string
  linkedin?: string
}

interface DonationHistory {
  id: string
  date: string
  amount: number
  type: string
  status: string
}

interface PurchaseHistory {
  id: string
  date: string
  item: string
  amount: number
  status: string
}

interface CollectionTrack {
  id: string
  trackName: string
  artistName: string
  albumName: string
  albumArt: string
  labelName: string
  isLocal?: boolean
  dateAdded: string
}

interface UserPreferences {
  emailNotifications?: boolean
  showNotifications?: boolean
  darkMode?: 'light' | 'dark' | 'device'
  autoPlay?: boolean
}

interface User {
  id?: string
  email: string
  name: string
  firstName?: string
  lastName?: string
  location?: string
  role: UserRole
  avatar?: string
  fullProfileImage?: string
  profileImageOrientation?: 'square' | 'landscape' | 'portrait'
  memberSince?: string
  socialLinks?: SocialLinks
  djName?: string
  showName?: string
  showTime?: string
  djExcerpt?: string
  djBio?: string
  djDonationLink?: string
  primaryPhoneType?: string
  primaryPhone?: string
  secondaryPhoneType?: string
  secondaryPhone?: string
  address?: string
  city?: string
  state?: string
  zipCode?: string
  permissions?: string[]
  donationHistory?: DonationHistory[]
  purchaseHistory?: PurchaseHistory[]
  collection?: CollectionTrack[]
  preferences?: UserPreferences
  favoriteDJs?: string[]
  password?: string // For demo purposes only
  pendingEmail?: string
  pendingEmailToken?: string
  pendingEmailExpiry?: string
  age?: string
  education?: string
  employer?: string
  volunteerOrgs?: string[]
  hasRadioExperience?: string
  radioStations?: string
  specialSkills?: string[]
  hearAboutChirp?: string[]
  interests?: string[]
  wantsToDJ?: string
  djAvailability?: string[]
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (email: string, name?: string, role?: UserRole, avatar?: string) => void
  logout: () => void
  signup: (email: string, name?: string, role?: UserRole) => void
  switchProfile: (role: UserRole) => void
  verifyPassword: (password: string) => boolean
  requestEmailChange: (newEmail: string, token: string) => boolean
  verifyEmailChange: (token: string) => boolean
  cancelEmailChange: () => void
  updateFavoriteDJs: (djId: string, isFavorite: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { getUserById, setCurrentUserId, currentUserId, updateUserFavoriteDJs: updateUserFavoriteDJsInContext } = useUsers()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('chirp-logged-in')
    return saved === 'true'
  })

  // Get user from UserContext instead of local state
  const user = currentUserId ? getUserById(currentUserId) : null

  // Sync login state to localStorage
  useEffect(() => {
    localStorage.setItem('chirp-logged-in', String(isLoggedIn))
  }, [isLoggedIn])

  // Sync user to localStorage and UserContext
  useEffect(() => {
    if (user) {
      localStorage.setItem('chirp-user', JSON.stringify(user))
    } else {
      localStorage.removeItem('chirp-user')
      setCurrentUserId(null)
    }
  }, [user, setCurrentUserId])

  const login = (email: string, name?: string, role?: UserRole, avatar?: string) => {
    const mockUser: User = {
      email,
      name: name || email.split('@')[0],
      role: role || 'listener',
      avatar,
    }
    localStorage.setItem('chirp-user', JSON.stringify(mockUser))
    if (mockUser.id) {
      setCurrentUserId(mockUser.id)
    }
    setIsLoggedIn(true)
  }

  const logout = () => {
    setCurrentUserId(null)
    setIsLoggedIn(false)
    localStorage.removeItem('chirp-user')
    localStorage.removeItem('chirp-logged-in')
  }

  const signup = (email: string, name?: string, role?: UserRole) => {
    const mockUser: User = {
      email,
      name: name || email.split('@')[0],
      role: role || 'listener',
    }
    localStorage.setItem('chirp-user', JSON.stringify(mockUser))
    if (mockUser.id) {
      setCurrentUserId(mockUser.id)
    }
    setIsLoggedIn(true)
  }

  const switchProfile = (role: UserRole) => {
    // Define profile data
    const profiles: Record<UserRole, Partial<User>> = {
      listener: {
        id: 'user-001',
        email: 'demo@chirpradio.org',
        name: 'Alex Johnson',
        firstName: 'Alex',
        lastName: 'Johnson',
        location: 'Chicago, IL',
        role: 'listener',
        avatar:
          'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces',
        memberSince: '2018-03-15',
        password: 'demo123',
        donationHistory: [
          { id: '1', date: '01/15/2024', amount: 50, type: 'One-time', status: 'Completed' },
          { id: '2', date: '12/01/2023', amount: 25, type: 'One-time', status: 'Completed' },
          { id: '3', date: '10/15/2023', amount: 100, type: 'One-time', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '01/20/2024', item: 'CHIRP Logo T-Shirt', amount: 25, status: 'Completed' },
          { id: '2', date: '12/15/2023', item: 'Chicago Skyline Music Poster', amount: 20, status: 'Completed' },
        ],
        collection: [
          {
            id: 'track-001',
            trackName: 'Cruel Summer',
            artistName: 'Taylor Swift',
            albumName: 'Lover',
            albumArt:
              'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
            labelName: 'Republic Records',
            dateAdded: '2024-12-01T14:30:00Z',
          },
          {
            id: 'track-002',
            trackName: 'Pusha Man',
            artistName: 'Chance the Rapper',
            albumName: 'Acid Rap',
            albumArt:
              'https://upload.wikimedia.org/wikipedia/en/5/5b/Chance_the_rapper_acid_rap.jpg',
            labelName: 'Chance the Rapper',
            isLocal: true,
            dateAdded: '2024-12-02T10:15:00Z',
          },
          {
            id: 'track-003',
            trackName: 'Stupid Kid',
            artistName: 'Alkaline Trio',
            albumName: 'From Here to Infirmary',
            albumArt:
              'https://upload.wikimedia.org/wikipedia/en/c/ce/Alkaline_Trio_-_From_Here_to_Infirmary_cover.jpg',
            labelName: 'Vagrant Records',
            isLocal: true,
            dateAdded: '2024-12-03T16:45:00Z',
          },
        ],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'dark',
          autoPlay: true,
        },
      },
      volunteer: {
        id: 'vol-007',
        email: 'amanda.miller@chirpradio.org',
        name: 'Amanda Miller',
        firstName: 'Amanda',
        lastName: 'Miller',
        location: 'Chicago, Illinois',
        role: 'volunteer',
        avatar:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces',
        memberSince: '2021-01-20',
        password: 'demo123',
        permissions: ['Volunteer'],
        primaryPhoneType: 'mobile',
        primaryPhone: '(773) 555-2891',
        secondaryPhoneType: '',
        secondaryPhone: '',
        age: '35–44',
        education: 'University of Illinois at Chicago',
        employer: 'Starbucks',
        volunteerOrgs: ['Greater Chicago Food Depository'],
        hasRadioExperience: 'no',
        radioStations: '',
        specialSkills: ['Fundraising', 'Event planning'],
        hearAboutChirp: ['Friend', 'Concert'],
        interests: ['Event working', 'Fundraising', 'Community radio'],
        wantsToDJ: 'no',
        djAvailability: [],
        socialLinks: {
          facebook: 'www.facebook.com/amandamiller',
          instagram: 'www.instagram.com/amandamiller',
          linkedin: 'www.linkedin.com/amandamiller',
        },
        donationHistory: [
          { id: '1', date: '02/01/2024', amount: 150, type: 'Monthly', status: 'Active' },
          { id: '2', date: '01/01/2024', amount: 150, type: 'Monthly', status: 'Completed' },
          { id: '3', date: '11/20/2023', amount: 75, type: 'One-time', status: 'Completed' },
          { id: '4', date: '09/15/2023', amount: 200, type: 'One-time', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '02/10/2024', item: 'Vintage Radio Waves Poster', amount: 20, status: 'Completed' },
          { id: '2', date: '01/05/2024', item: 'CHIRP Logo Hoodie', amount: 45, status: 'Completed' },
          { id: '3', date: '11/28/2023', item: 'CHIRP Enamel Mug', amount: 15, status: 'Completed' },
        ],
        collection: [
          {
            id: 'track-004',
            trackName: 'Pusha Man',
            artistName: 'Chance the Rapper',
            albumName: 'Acid Rap',
            albumArt:
              'https://upload.wikimedia.org/wikipedia/en/5/5b/Chance_the_rapper_acid_rap.jpg',
            labelName: 'Chance the Rapper',
            isLocal: true,
            dateAdded: '2024-12-02T10:15:00Z',
          },
          {
            id: 'track-005',
            trackName: 'Stupid Kid',
            artistName: 'Alkaline Trio',
            albumName: 'From Here to Infirmary',
            albumArt:
              'https://upload.wikimedia.org/wikipedia/en/c/ce/Alkaline_Trio_-_From_Here_to_Infirmary_cover.jpg',
            labelName: 'Vagrant Records',
            isLocal: true,
            dateAdded: '2024-11-25T16:45:00Z',
          },
          {
            id: 'track-006',
            trackName: 'Take Me Out',
            artistName: 'Franz Ferdinand',
            albumName: 'Franz Ferdinand',
            albumArt:
              'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop',
            labelName: 'Domino Recording',
            dateAdded: '2024-11-15T14:20:00Z',
          },
        ],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'light',
          autoPlay: true,
        },
      },
      dj: {
        id: 'dj-001',
        email: 'alex.rivera@chirpradio.org',
        name: 'Alex Rivera',
        firstName: 'Alex',
        lastName: 'Rivera',
        location: 'Chicago, Illinois',
        role: 'dj',
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
        fullProfileImage:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&crop=faces',
        memberSince: '2017-09-15',
        password: 'demo123',
        djName: 'Alex Rivera',
        showName: 'Night Vibes',
        showTime: 'Fri 11pm - 1am',
        djExcerpt:
          "Late-night sonic adventurer bringing fearless genre-hopping and deep cuts to Chicago's insomniacs.",
        djBio:
          "Alex discovered their passion for radio while DJing college house parties, where they developed an ear for blending genres that shouldn't work together but somehow do. After graduating with a degree in Audio Production from Columbia College Chicago, they spent years working in commercial radio before finding their true home at CHIRP.\n\nKnown for fearless genre-hopping and deep cuts that surprise even the most seasoned music heads, Alex brings a fresh perspective to late-night radio. Their show has become a destination for night owls and insomniacs seeking sonic adventures.\n\nWhen not behind the mic, Alex produces electronic music in their home studio and teaches DJ workshops at local community centers. They're passionate about making radio accessible to underrepresented voices in Chicago's music scene.",
        djDonationLink: 'https://www.chirpradio.org/donate/alex-rivera',
        profileImageOrientation: 'square',
        primaryPhoneType: 'mobile',
        primaryPhone: '(773) 555-2847',
        secondaryPhoneType: '',
        secondaryPhone: '',
        address: '1842 W Division St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60622',
        permissions: ['DJ', 'Content Publisher', 'Volunteer'],
        socialLinks: {
          facebook: 'www.facebook.com/alexrivera',
          instagram: 'www.instagram.com/alexrivera',
          twitter: 'www.twitter.com/alexrivera',
          linkedin: 'www.linkedin.com/alexrivera',
          bluesky: 'bsky.app/profile/alexrivera.bsky.social',
        },
        donationHistory: [
          { id: '1', date: '02/05/2024', amount: 250, type: 'Monthly', status: 'Active' },
          { id: '2', date: '01/05/2024', amount: 250, type: 'Monthly', status: 'Completed' },
          { id: '3', date: '12/05/2023', amount: 250, type: 'Monthly', status: 'Completed' },
          { id: '4', date: '10/31/2023', amount: 500, type: 'One-time', status: 'Completed' },
          { id: '5', date: '08/15/2023', amount: 100, type: 'One-time', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '01/25/2024', item: 'CHIRP 20th Anniversary Poster', amount: 20, status: 'Completed' },
          { id: '2', date: '12/20/2023', item: 'Underground Music Scene Poster', amount: 20, status: 'Completed' },
          { id: '3', date: '11/15/2023', item: 'CHIRP Baseball Cap', amount: 22, status: 'Completed' },
          { id: '4', date: '10/10/2023', item: 'CHIRP Vinyl Tote Bag', amount: 18, status: 'Completed' },
        ],
        collection: [
          {
            id: 'track-007',
            trackName: 'Vis Major',
            artistName: 'Into It. Over It.',
            albumName: 'Standards',
            albumArt: 'https://f4.bcbits.com/img/a1076606024_16.jpg',
            labelName: 'Storchmasers',
            isLocal: true,
            dateAdded: '2024-12-05T11:24:00Z',
          },
          {
            id: 'track-008',
            trackName: 'Last Place You Look',
            artistName: 'The Get Up Kids',
            albumName: 'Four Minute Mile',
            albumArt: 'https://upload.wikimedia.org/wikipedia/en/9/95/Gukfmm.jpg',
            labelName: 'Doghouse Records',
            dateAdded: '2024-11-30T10:21:00Z',
          },
          {
            id: 'track-009',
            trackName: 'Only Shallow',
            artistName: 'My Bloody Valentine',
            albumName: 'Loveless',
            albumArt:
              'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop',
            labelName: 'Creation Records',
            dateAdded: '2024-11-18T09:48:00Z',
          },
        ],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'light',
          autoPlay: true,
        },
      },
    }

    const selectedProfile = profiles[role]
    localStorage.setItem('chirp-user', JSON.stringify(selectedProfile))
    localStorage.setItem('chirp-logged-in', 'true')
    if (selectedProfile.id) {
      setCurrentUserId(selectedProfile.id)
    }
    setIsLoggedIn(true)
    console.log(`✅ Switched to ${role} profile:`, selectedProfile)
  }

  const verifyPassword = (password: string): boolean => {
    return user?.password === password
  }

  const requestEmailChange = (newEmail: string, token: string): boolean => {
    if (!user) return false
    const expiry = new Date()
    expiry.setHours(expiry.getHours() + 48)
    const updatedUser = {
      ...user,
      pendingEmail: newEmail,
      pendingEmailToken: token,
      pendingEmailExpiry: expiry.toISOString(),
    }
    localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
    return true
  }

  const verifyEmailChange = (token: string): boolean => {
    if (!user || !user.pendingEmail || !user.pendingEmailToken) return false
    if (user.pendingEmailToken !== token) return false
    if (user.pendingEmailExpiry) {
      const expiry = new Date(user.pendingEmailExpiry as string)
      if (expiry < new Date()) return false
    }
    const updatedUser = {
      ...user,
      email: user.pendingEmail,
      pendingEmail: undefined,
      pendingEmailToken: undefined,
      pendingEmailExpiry: undefined,
    }
    localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
    return true
  }

  const cancelEmailChange = () => {
    if (!user) return
    const updatedUser = {
      ...user,
      pendingEmail: undefined,
      pendingEmailToken: undefined,
      pendingEmailExpiry: undefined,
    }
    localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
  }

  const updateFavoriteDJs = (djId: string, isFavorite: boolean) => {
    if (!user?.id) return
    // Use UserContext to update favorites
    updateUserFavoriteDJsInContext(user.id, djId, isFavorite)
  }

  // Convert UserContext User to AuthContext User type
  const authUser: User | null = user ? {
    ...user,
    name: user.djName || user.username || user.email.split('@')[0],
    role: (Array.isArray(user.role) ? user.role[0] : user.role || 'listener') as UserRole,
    collection: user.collection as CollectionTrack[] | undefined,
  } : null

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user: authUser,
        login,
        logout,
        signup,
        switchProfile,
        verifyPassword,
        requestEmailChange,
        verifyEmailChange,
        cancelEmailChange,
        updateFavoriteDJs,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook for accessing auth context
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
