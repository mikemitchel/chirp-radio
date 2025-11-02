// src/components/UserTypeSwitcher.tsx
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import './UserTypeSwitcher.css'

export default function UserTypeSwitcher() {
  const { user, switchProfile, signOut } = useAuth()
  const [isExpanded, setIsExpanded] = useState(false)

  // Only render in development
  if (!import.meta.env.DEV) {
    return null
  }

  const profiles = [
    { id: 'listener', label: 'Listener' },
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'regular-dj', label: 'Regular DJ' },
    { id: 'substitute-dj', label: 'Substitute DJ' },
    { id: 'board-member', label: 'Board Member' },
  ] as const

  // Determine current active profile based on user roles
  const getCurrentProfile = () => {
    if (!user) return null

    // Match based on roles array
    const roles = user.roles || []

    if (roles.includes('Board Member')) return 'board-member'
    if (roles.includes('Regular DJ')) return 'regular-dj'
    if (roles.includes('Substitute DJ')) return 'substitute-dj'
    if (roles.includes('Volunteer')) return 'volunteer'
    if (roles.includes('Listener')) return 'listener'

    return null
  }

  const currentProfile = getCurrentProfile()

  const handleProfileSwitch = (profileId: typeof profiles[number]['id']) => {
    switchProfile(profileId)
  }

  return (
    <div className={`user-type-switcher ${isExpanded ? 'user-type-switcher--expanded' : ''}`}>
      <div
        className="user-type-switcher__header"
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: 'pointer' }}
      >
        <span className="user-type-switcher__label">Dev Tools</span>
        <span className="user-type-switcher__toggle">{isExpanded ? '▼' : '▶'}</span>
      </div>

      {isExpanded && (
        <>
          {user && (
            <div className="user-type-switcher__roles">
              <span className="user-type-switcher__roles-label">Roles:</span>
              <span className="user-type-switcher__roles-value">
                {user.roles?.join(', ') || 'None'}
              </span>
            </div>
          )}

          <div className="user-type-switcher__buttons">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                className={`user-type-switcher__button ${
                  currentProfile === profile.id ? 'user-type-switcher__button--active' : ''
                }`}
                onClick={() => handleProfileSwitch(profile.id)}
              >
                {profile.label}
              </button>
            ))}
            <button
              className={`user-type-switcher__button ${
                !user ? 'user-type-switcher__button--active' : ''
              }`}
              onClick={() => signOut()}
            >
              Signed Out
            </button>
          </div>
        </>
      )}
    </div>
  )
}
