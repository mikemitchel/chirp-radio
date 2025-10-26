import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import usersData from '../data/users.json'
import { emit, on } from '../utils/eventBus'

// User type matching the data structure
interface User {
  id: string
  email: string
  username?: string
  firstName?: string
  lastName?: string
  profileImage?: string
  fullProfileImage?: string
  profileImageOrientation?: 'square' | 'landscape' | 'portrait'
  bio?: string
  location?: string
  memberSince?: string
  donorLevel?: string
  role?: string | string[]
  djName?: string
  showName?: string
  showTime?: string
  djExcerpt?: string
  djBio?: string
  djDonationLink?: string
  favoriteDJs?: string[]
  collection?: unknown[]
  [key: string]: unknown
}

interface UserContextValue {
  users: User[]
  getUserById: (id: string) => User | undefined
  updateUserFavoriteDJs: (userId: string, djId: string, isFavorite: boolean) => void
  currentUserId: string | null
  setCurrentUserId: (id: string | null) => void
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

interface UserProviderProps {
  children: React.ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  // Initialize users from mock data
  const [users, setUsers] = useState<User[]>(usersData.users as User[])
  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    // Try to get current user from localStorage
    const storedUser = localStorage.getItem('chirp-user')
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        return user.id || null
      } catch (e) {
        console.error('[UserContext] Failed to parse stored user', e)
      }
    }
    return null
  })

  // Get user by ID
  const getUserById = useCallback(
    (id: string) => {
      return users.find((u) => u.id === id)
    },
    [users]
  )

  // Update user's favorite DJs
  const updateUserFavoriteDJs = useCallback(
    (userId: string, djId: string, isFavorite: boolean) => {
      console.log('[UserContext] updateUserFavoriteDJs:', { userId, djId, isFavorite })

      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user.id === userId) {
            const favoriteDJs = user.favoriteDJs || []
            const updatedFavoriteDJs = isFavorite
              ? [...favoriteDJs, djId]
              : favoriteDJs.filter((id) => id !== djId)

            console.log('[UserContext] Updating user favorites:', {
              userId,
              oldFavorites: favoriteDJs,
              newFavorites: updatedFavoriteDJs,
            })

            return {
              ...user,
              favoriteDJs: updatedFavoriteDJs,
            }
          }
          return user
        })

        // Update localStorage if this is the current user
        if (userId === currentUserId) {
          const updatedUser = updatedUsers.find((u) => u.id === userId)
          if (updatedUser) {
            localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
            console.log('[UserContext] Updated localStorage for current user')
          }
        }

        return updatedUsers
      })

      // Emit typed event
      emit('userFavoritesUpdated')
    },
    [currentUserId]
  )

  // Sync currentUserId with localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem('chirp-user')
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser)
          setCurrentUserId(user.id || null)
        } catch (e) {
          console.error('[UserContext] Failed to parse stored user', e)
        }
      } else {
        setCurrentUserId(null)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Listen for updateUserFavoriteDJs events using typed event bus
  useEffect(() => {
    const unsubscribe = on('updateUserFavoriteDJs', (payload) => {
      updateUserFavoriteDJs(payload.userId, payload.djId, payload.isFavorite)
    })

    return unsubscribe
  }, [updateUserFavoriteDJs])

  const value: UserContextValue = {
    users,
    getUserById,
    updateUserFavoriteDJs,
    currentUserId,
    setCurrentUserId,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUsers(): UserContextValue {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUsers must be used within a UserProvider')
  }
  return context
}

// Export for backward compatibility with existing code
// eslint-disable-next-line react-refresh/only-export-components
export function useUserContext(): UserContextValue {
  return useUsers()
}
