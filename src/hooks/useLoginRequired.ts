// src/hooks/useLoginRequired.ts
import { useState } from 'react';
import { useAuth } from './useAuth';

export function useLoginRequired() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn, login, signup } = useAuth();

  const requireLogin = (callback: () => void) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return false;
    }
    callback();
    return true;
  };

  const handleLogin = (email: string, password: string) => {
    // TODO: Validate credentials with API
    login(email, email.split('@')[0]); // For demo, use email prefix as name
    setShowLoginModal(false);

    window.dispatchEvent(new CustomEvent('chirp-show-toast', {
      detail: {
        message: 'Successfully logged in!',
        type: 'success',
        duration: 3000,
      }
    }));
  };

  const handleSignUp = (email: string, password: string) => {
    // TODO: Create account with API
    signup(email, email.split('@')[0]); // For demo, use email prefix as name
    setShowLoginModal(false);

    window.dispatchEvent(new CustomEvent('chirp-show-toast', {
      detail: {
        message: 'Account created successfully!',
        type: 'success',
        duration: 3000,
      }
    }));
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  return {
    isLoggedIn,
    showLoginModal,
    requireLogin,
    handleLogin,
    handleSignUp,
    closeModal,
  };
}
