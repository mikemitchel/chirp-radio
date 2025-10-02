// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

interface User {
  email: string;
  // Add more user properties as needed
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('chirp-logged-in');
    return saved === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('chirp-user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Sync login state to localStorage
  useEffect(() => {
    localStorage.setItem('chirp-logged-in', String(isLoggedIn));
  }, [isLoggedIn]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('chirp-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chirp-user');
    }
  }, [user]);

  const login = (email: string) => {
    // In real implementation, this would call an API
    // For now, we'll simulate a login
    const mockUser: User = { email };
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('chirp-user');
    localStorage.removeItem('chirp-logged-in');
  };

  const signup = (email: string) => {
    // In real implementation, this would call an API
    // For now, we'll simulate a signup
    const mockUser: User = { email };
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  return {
    isLoggedIn,
    user,
    login,
    logout,
    signup
  };
}
