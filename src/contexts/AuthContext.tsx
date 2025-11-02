// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useUsers } from './UserContext'
import type { User, UserRole, CollectionTrack } from '../types/user'
import { loadCollectionFromUser } from '../utils/collectionDB'

// Legacy role type for backward compatibility
export type LegacyUserRole = 'listener' | 'volunteer' | 'dj'

// Extended User interface for AuthContext (adds some auth-specific fields)
interface AuthUser extends User {
  password?: string // For demo purposes only
  pendingEmail?: string
  pendingEmailToken?: string
  pendingEmailExpiry?: string
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (email: string, name?: string, role?: LegacyUserRole, avatar?: string) => void
  signOut: () => void
  signup: (email: string, name?: string, role?: LegacyUserRole) => void
  switchProfile: (profileType: 'listener' | 'volunteer' | 'regular-dj' | 'substitute-dj' | 'board-member') => void
  verifyPassword: (password: string) => boolean
  requestEmailChange: (newEmail: string, token: string) => boolean
  verifyEmailChange: (token: string) => boolean
  cancelEmailChange: () => void
  updateFavoriteDJs: (djId: string, isFavorite: boolean) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { getUserById, setCurrentUserId, currentUserId, updateUserFavoriteDJs: updateUserFavoriteDJsInContext, users } = useUsers()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('chirp-logged-in')
    return saved === 'true'
  })

  // Get user from UserContext
  const user = currentUserId ? getUserById(currentUserId) : null

  // Debug logging
  useEffect(() => {
    console.log('[AuthContext] User updated:', {
      currentUserId,
      user: user ? { id: user.id, email: user.email, firstName: user.firstName, roles: user.roles } : null
    })
  }, [currentUserId, user])

  // Sync login state to localStorage
  useEffect(() => {
    localStorage.setItem('chirp-logged-in', String(isLoggedIn))
  }, [isLoggedIn])

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

  const signOut = () => {
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

  const switchProfile = (profileType: 'listener' | 'volunteer' | 'regular-dj' | 'substitute-dj' | 'board-member') => {
    // Map profile types to demo user emails (actual users in Members collection)
    const emailMap: Record<'listener' | 'volunteer' | 'regular-dj' | 'substitute-dj' | 'board-member', string> = {
      'listener': 'listener@chirpradio.org',
      'volunteer': 'volunteer@chirpradio.org',
      'regular-dj': 'regular-dj@chirpradio.org',
      'substitute-dj': 'substitute-dj@chirpradio.org',
      'board-member': 'board-member@chirpradio.org',
    }

    // Find the actual user from the Members collection
    const demoUser = users.find(u => u.email === emailMap[profileType])

    console.log('[AuthContext] switchProfile:', {
      profileType,
      email: emailMap[profileType],
      demoUser: demoUser ? { id: demoUser.id, email: demoUser.email, firstName: demoUser.firstName } : null,
      totalUsers: users.length,
      allEmails: users.map(u => u.email)
    })

    // FALLBACK: If demo users aren't loaded yet, use hardcoded profiles
    const profiles: Record<'listener' | 'volunteer' | 'regular-dj' | 'substitute-dj' | 'board-member', Partial<User>> = {
      listener: {
        id: 'user-listener-demo',
        email: 'listener@chirpradio.org',
        username: 'listeneruser',
        firstName: 'Demo',
        lastName: 'Listener',
        location: 'Chicago, IL',
        roles: ['Listener'],
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
        collection: [],
        favoriteDJs: [],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'dark',
          autoPlay: true,
        },
      },
      volunteer: {
        id: 'user-volunteer-demo',
        email: 'volunteer@chirpradio.org',
        username: 'volunteeruser',
        firstName: 'Demo',
        lastName: 'Volunteer',
        location: 'Chicago, Illinois',
        roles: ['Listener', 'Volunteer'],
        avatar:
          'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=faces',
        memberSince: '2021-01-20',
        password: 'demo123',
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
        collection: [],
        favoriteDJs: [],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'light',
          autoPlay: true,
        },
      },
      'regular-dj': {
        id: 'user-regular-dj-demo',
        email: 'regular-dj@chirpradio.org',
        username: 'regulardj',
        firstName: 'Demo',
        lastName: 'DJ',
        location: 'Chicago, Illinois',
        roles: ['Listener', 'Volunteer', 'Regular DJ'],
        avatar:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces',
        fullProfileImage:
          'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&crop=faces',
        memberSince: '2017-09-15',
        password: 'demo123',
        djName: 'Demo DJ',
        showName: 'Demo Show',
        showTime: 'Fri 11pm - 1am',
        djExcerpt:
          "Demo DJ profile for testing the regular DJ role and functionality.",
        djBio:
          "This is a demo DJ profile used for development and testing purposes. It demonstrates all the features and fields available to regular DJs in the CHIRP Radio system.",
        djDonationLink: 'https://www.chirpradio.org/donate/demo-dj',
        profileImageOrientation: 'square',
        primaryPhoneType: 'mobile',
        primaryPhone: '(773) 555-2847',
        secondaryPhoneType: '',
        secondaryPhone: '',
        address: '1842 W Division St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60622',
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
        collection: [],
        favoriteDJs: [],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'light',
          autoPlay: true,
        },
      },
      'substitute-dj': {
        id: 'user-substitute-dj-demo',
        email: 'substitute-dj@chirpradio.org',
        username: 'subdj',
        firstName: 'Demo',
        lastName: 'SubDJ',
        location: 'Chicago, Illinois',
        roles: ['Listener', 'Volunteer', 'Substitute DJ'],
        avatar:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces',
        memberSince: '2019-06-15',
        password: 'demo123',
        djName: 'Demo Sub DJ',
        showName: 'Fill-In Show',
        djExcerpt:
          "Demo substitute DJ profile for testing substitute DJ role and functionality.",
        djBio:
          "This is a demo substitute DJ profile used for development and testing purposes. It demonstrates all the features and fields available to substitute DJs in the CHIRP Radio system.",
        substituteAvailability: ['Weekday morning', 'Weekend afternoon', 'Weekday evening'],
        primaryPhoneType: 'mobile',
        primaryPhone: '(773) 555-9999',
        age: '25-34',
        education: 'Columbia College Chicago',
        employer: 'Freelance',
        specialSkills: ['DJ', 'Audio production'],
        hearAboutChirp: ['Friend'],
        interests: ['DJ', 'Community radio'],
        wantsToDJ: 'yes',
        djAvailability: ['Weekday morning', 'Weekend afternoon', 'Weekday evening'],
        donationHistory: [
          { id: '1', date: '01/15/2024', amount: 50, type: 'One-time', status: 'Completed' },
          { id: '2', date: '10/01/2023', amount: 25, type: 'One-time', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '11/20/2023', item: 'CHIRP T-Shirt', amount: 25, status: 'Completed' },
        ],
        collection: [],
        favoriteDJs: [],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'light',
          autoPlay: true,
        },
      },
      'board-member': {
        id: 'user-board-member-demo',
        email: 'board-member@chirpradio.org',
        username: 'boardmember',
        firstName: 'Demo',
        lastName: 'BoardMember',
        location: 'Chicago, Illinois',
        roles: ['Listener', 'Volunteer', 'Regular DJ', 'Board Member'],
        avatar:
          'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=faces',
        memberSince: '2015-03-10',
        password: 'demo123',
        djName: 'Demo Board DJ',
        showName: 'Leadership Show',
        showTime: 'Wed 3pm - 5pm',
        djExcerpt:
          "Demo board member DJ profile combining DJ and board responsibilities.",
        djBio:
          "This is a demo board member DJ profile used for development and testing purposes. It demonstrates all the features and fields available to DJs who are also board members in the CHIRP Radio system.",
        boardPosition: 'Secretary',
        boardSince: '2020-01-15',
        boardTermEnd: '2026-01-15',
        primaryPhoneType: 'mobile',
        primaryPhone: '(773) 555-7777',
        address: '123 Board St',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
        age: '45-54',
        education: 'Northwestern University',
        employer: 'Non-Profit Management',
        specialSkills: ['DJ', 'Board governance', 'Fundraising'],
        hearAboutChirp: ['Community event'],
        interests: ['DJ', 'Community radio', 'Board leadership'],
        wantsToDJ: 'yes',
        djAvailability: ['Weekday afternoon'],
        socialLinks: {
          linkedin: 'www.linkedin.com/demoboard',
          facebook: 'www.facebook.com/demoboard',
        },
        donationHistory: [
          { id: '1', date: '02/01/2024', amount: 500, type: 'Monthly', status: 'Active' },
          { id: '2', date: '01/01/2024', amount: 500, type: 'Monthly', status: 'Completed' },
          { id: '3', date: '12/01/2023', amount: 500, type: 'Monthly', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '01/15/2024', item: 'CHIRP Supporter Pack', amount: 100, status: 'Completed' },
        ],
        collection: [],
        favoriteDJs: [],
        preferences: {
          emailNotifications: true,
          showNotifications: true,
          darkMode: 'light',
          autoPlay: true,
        },
      },
    }

    // Use real demo user if found, otherwise fall back to hardcoded profile
    const selectedProfile = demoUser || profiles[profileType]

    if (!selectedProfile) {
      console.error(`[AuthContext] No profile available for ${profileType}`)
      return
    }

    // Load user's collection from the user record
    if (selectedProfile.id) {
      loadCollectionFromUser(selectedProfile.collection || [])
    }

    localStorage.setItem('chirp-user', JSON.stringify(selectedProfile))
    localStorage.setItem('chirp-logged-in', 'true')
    if (selectedProfile.id) {
      console.log(`[AuthContext] Setting currentUserId to:`, selectedProfile.id)
      setCurrentUserId(selectedProfile.id)
    } else {
      console.error(`[AuthContext] No ID found on selectedProfile!`, selectedProfile)
    }
    setIsLoggedIn(true)
    console.log(`✅ Switched to ${profileType} profile${demoUser ? ' (from CMS)' : ' (fallback)'}:`, {
      id: selectedProfile.id,
      email: selectedProfile.email,
      firstName: selectedProfile.firstName,
      roles: selectedProfile.roles
    })
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

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        signOut,
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
