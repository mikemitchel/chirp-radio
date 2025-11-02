// src/components/ProtectedRoute.tsx
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { isVolunteer, isDJ, isBoardMember } from '../types/user'
import { useUsers } from '../contexts/UserContext'
import type { UserRole } from '../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireLogin?: boolean
  requiredRoles?: UserRole[]
  redirectTo?: string
}

export default function ProtectedRoute({
  children,
  requireLogin = false,
  requiredRoles,
  redirectTo,
}: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth()
  const { loading } = useUsers()
  const location = useLocation()

  // Wait for users to load from CMS before checking permissions
  if (loading) {
    return null // or return a loading spinner
  }

  // Determine default redirect based on current route
  const defaultRedirect = location.pathname.startsWith('/app') ? '/app' : '/'
  const finalRedirectTo = redirectTo || defaultRedirect

  // Check if login is required
  if (requireLogin && !isLoggedIn) {
    return <Navigate to={finalRedirectTo} replace />
  }

  // Check if specific roles are required
  if (requiredRoles && requiredRoles.length > 0) {
    if (!isLoggedIn) {
      return <Navigate to={finalRedirectTo} replace />
    }

    if (!user) {
      return <Navigate to={finalRedirectTo} replace />
    }

    // Map legacy role names to helper functions
    const hasRequiredRole = requiredRoles.some(role => {
      const roleLower = role.toLowerCase()
      if (roleLower === 'volunteer') return isVolunteer(user)
      if (roleLower === 'dj') return isDJ(user)
      if (roleLower === 'board-member' || roleLower === 'board member') return isBoardMember(user)
      // Direct role match for new role format
      return user.roles?.includes(role as any)
    })

    if (!hasRequiredRole) {
      return <Navigate to={finalRedirectTo} replace />
    }
  }

  return <>{children}</>
}
