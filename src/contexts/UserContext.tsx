import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { emit, on } from '../utils/eventBus'
import type { User, CollectionTrack } from '../types/user'
import { fetchAllMembers, updateMember } from '../utils/cmsMembers'

interface UserContextValue {
  users: User[]
  getUserById: (id: string) => User | undefined
  updateUserFavoriteDJs: (userId: string, djId: string, isFavorite: boolean) => void
  updateUserCollection: (userId: string, collection: CollectionTrack[]) => void
  currentUserId: string | null
  setCurrentUserId: (id: string | null) => void
  loading: boolean
  error: Error | null
}

const UserContext = createContext<UserContextValue | undefined>(undefined)

interface UserProviderProps {
  children: React.ReactNode
}

export function UserProvider({ children }: UserProviderProps) {
  // Initialize users as empty - will load from CMS
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)
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

  // Always fetch users from CMS
  useEffect(() => {
    console.log('[UserContext] Fetching users from CMS API...')
    setLoading(true)
    setError(null)

    fetchAllMembers()
      .then((cmsUsers) => {
        console.log('[UserContext] Loaded users from CMS:', cmsUsers.length)
        setUsers(cmsUsers)
        setLoading(false)
      })
      .catch((err) => {
        console.error('[UserContext] Failed to load users from CMS:', err)
        setError(err)
        setLoading(false)
      })
  }, [])

  // Get user by ID
  const getUserById = useCallback(
    (id: string) => {
      return users.find((u) => u.id === id)
    },
    [users]
  )

  // Update user's favorite DJs
  const updateUserFavoriteDJs = useCallback(
    async (userId: string, djId: string, isFavorite: boolean) => {
      console.log('[UserContext] updateUserFavoriteDJs START:', {
        userId,
        djId,
        isFavorite,
        usersCount: users.length,
      })

      // Check if this is a CMS user or temp/demo user
      const currentUser = users.find((u) => u.id === userId)
      const isTempUser = !currentUser

      if (isTempUser) {
        console.log('[UserContext] Temp/demo user detected - updating localStorage only:', userId)

        // For temp users, update localStorage directly
        const storedUser = localStorage.getItem('chirp-user')
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser)
            if (parsedUser.id === userId) {
              const favoriteDJs = parsedUser.favoriteDJs || []
              const updatedFavoriteDJs = isFavorite
                ? [...favoriteDJs, djId]
                : favoriteDJs.filter((id: string) => id !== djId)

              const updatedUser = {
                ...parsedUser,
                favoriteDJs: updatedFavoriteDJs,
              }

              localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
              console.log('[UserContext] ✅ Updated temp user in localStorage:', {
                id: updatedUser.id,
                favoriteDJs: updatedUser.favoriteDJs,
              })

              // Emit event to refresh AuthContext
              emit('userFavoritesUpdated')
              return
            }
          } catch (error) {
            console.error('[UserContext] Failed to parse localStorage user:', error)
            return
          }
        }

        console.error('[UserContext] Temp user not found in localStorage')
        return
      }

      // CMS user - proceed with full CMS save
      console.log('[UserContext] CMS user found:', {
        id: currentUser.id,
        email: currentUser.email,
        currentFavorites: currentUser.favoriteDJs,
      })

      const favoriteDJs = currentUser.favoriteDJs || []
      const updatedFavoriteDJs = isFavorite
        ? [...favoriteDJs, djId]
        : favoriteDJs.filter((id) => id !== djId)

      console.log('[UserContext] Favorites update:', {
        old: favoriteDJs,
        new: updatedFavoriteDJs,
      })

      // Convert to CMS format: array of objects with djId field
      const cmsFavoriteDJs = updatedFavoriteDJs.map((id) => ({ djId: id }))

      // First update in CMS
      try {
        console.log('[UserContext] Saving to CMS...', { userId, cmsFavoriteDJs })
        const result = await updateMember(userId, { favoriteDJs: cmsFavoriteDJs })
        console.log('[UserContext] ✅ CMS save successful:', result)
      } catch (error) {
        console.error('[UserContext] ❌ Failed to save favoriteDJs to CMS:', error)
        // Don't update local state if CMS save fails
        return
      }

      // Then update local state
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user.id === userId) {
            console.log('[UserContext] Updating user favorites in state:', {
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
            console.log('[UserContext] ✅ Updated localStorage for current user:', {
              id: updatedUser.id,
              favoriteDJs: updatedUser.favoriteDJs,
            })
          }
        }

        return updatedUsers
      })

      // Emit typed event
      console.log('[UserContext] Emitting userFavoritesUpdated event')
      emit('userFavoritesUpdated')
    },
    [currentUserId, users]
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

  // Update user's collection
  const updateUserCollection = useCallback(
    async (userId: string, collection: CollectionTrack[]) => {
      console.log('[UserContext] updateUserCollection:', {
        userId,
        collectionLength: collection.length,
      })

      // First update in CMS
      try {
        await updateMember(userId, { collection })
        console.log('[UserContext] Saved collection to CMS successfully')
      } catch (error) {
        console.error('[UserContext] Failed to save collection to CMS:', error)
        // Don't update local state if CMS save fails
        return
      }

      // Then update local state
      setUsers((prevUsers) => {
        const updatedUsers = prevUsers.map((user) => {
          if (user.id === userId) {
            console.log('[UserContext] Updating user collection:', {
              userId,
              oldCollectionLength: user.collection?.length || 0,
              newCollectionLength: collection.length,
            })

            return {
              ...user,
              collection,
            }
          }
          return user
        })

        // Update localStorage if this is the current user
        if (userId === currentUserId) {
          const updatedUser = updatedUsers.find((u) => u.id === userId)
          if (updatedUser) {
            localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
            console.log('[UserContext] Updated localStorage for current user collection')
          }
        }

        return updatedUsers
      })

      // Emit typed event
      emit('userCollectionUpdated')
    },
    [currentUserId]
  )

  // Listen for updateUserFavoriteDJs events using typed event bus
  useEffect(() => {
    const unsubscribe = on('updateUserFavoriteDJs', (payload) => {
      updateUserFavoriteDJs(payload.userId, payload.djId, payload.isFavorite)
    })

    return unsubscribe
  }, [updateUserFavoriteDJs])

  // Listen for updateUserCollection events using typed event bus
  useEffect(() => {
    const unsubscribe = on('updateUserCollection', (payload) => {
      updateUserCollection(payload.userId, payload.collection)
    })

    return unsubscribe
  }, [updateUserCollection])

  const value: UserContextValue = {
    users,
    getUserById,
    updateUserFavoriteDJs,
    updateUserCollection,
    currentUserId,
    setCurrentUserId,
    loading,
    error,
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
