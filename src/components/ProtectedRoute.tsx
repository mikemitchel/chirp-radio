// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router'
import { useAuth } from '../hooks/useAuth'
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
  redirectTo = '/',
}: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth()

  // Check if login is required
  if (requireLogin && !isLoggedIn) {
    return <Navigate to={redirectTo} replace />
  }

  // Check if specific roles are required
  if (requiredRoles && requiredRoles.length > 0) {
    if (!isLoggedIn) {
      return <Navigate to={redirectTo} replace />
    }

    if (!user || !requiredRoles.includes(user.role)) {
      return <Navigate to={redirectTo} replace />
    }
  }

  return <>{children}</>
}
