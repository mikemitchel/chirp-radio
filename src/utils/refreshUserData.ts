// Utility to refresh logged-in user data with latest fields from users.json
// This is useful when new fields are added to the data structure

import usersData from '../data/users.json'

export function refreshLoggedInUserData() {
  try {
    const storedUser = localStorage.getItem('chirp-user')
    if (!storedUser) {
      console.log('[refreshUserData] No logged-in user found')
      return false
    }

    const currentUser = JSON.parse(storedUser)
    const latestUserData = usersData.users.find(u => u.id === currentUser.id)

    if (!latestUserData) {
      console.log('[refreshUserData] User not found in users.json:', currentUser.id)
      return false
    }

    // Merge latest data with current user, preserving any runtime changes
    const updatedUser = {
      ...latestUserData,
      ...currentUser,
      // Explicitly update DJ fields from latest data if they exist
      djExcerpt: latestUserData.djExcerpt || currentUser.djExcerpt || '',
      djBio: latestUserData.djBio || currentUser.djBio || '',
    }

    localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
    console.log('[refreshUserData] Updated user data for:', currentUser.id)
    return true
  } catch (error) {
    console.error('[refreshUserData] Error:', error)
    return false
  }
}

// Auto-run on import if in development
if (import.meta.env.DEV) {
  refreshLoggedInUserData()
}
