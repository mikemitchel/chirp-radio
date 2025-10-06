// src/pages/AccountSettings.tsx
import React, { useState, useEffect } from 'react';
import CrPageHeader from '../stories/CrPageHeader';
import CrAccountSettingsPage from '../stories/CrAccountSettingsPage';
import { useAuth } from '../hooks/useAuth';
import { useNotification } from '../contexts/NotificationContext';

export default function AccountSettings() {
  const { isLoggedIn, user, login, logout } = useAuth();
  const { showToast } = useNotification();

  // Get the appropriate storage based on login state
  const getStorage = () => isLoggedIn ? localStorage : sessionStorage;

  // Load dark mode preference
  const [darkMode, setDarkMode] = useState<'light' | 'dark' | 'device'>(() => {
    const storage = getStorage();
    const saved = storage.getItem('chirp-dark-mode');
    if (saved === 'light' || saved === 'dark' || saved === 'device') {
      return saved;
    }
    return 'light'; // Default to light mode
  });

  // Load streaming quality preference
  const [streamingQuality, setStreamingQuality] = useState(() => {
    const storage = getStorage();
    const saved = storage.getItem('chirp-streaming-quality');
    return saved || '128';
  });

  // When login state changes, migrate settings
  useEffect(() => {
    if (isLoggedIn) {
      // User just logged in - migrate session settings to localStorage
      const sessionDarkMode = sessionStorage.getItem('chirp-dark-mode');
      const sessionQuality = sessionStorage.getItem('chirp-streaming-quality');

      if (sessionDarkMode !== null) {
        localStorage.setItem('chirp-dark-mode', sessionDarkMode);
        sessionStorage.removeItem('chirp-dark-mode');
      }

      if (sessionQuality !== null) {
        localStorage.setItem('chirp-streaming-quality', sessionQuality);
        sessionStorage.removeItem('chirp-streaming-quality');
      }

      // Reload settings from localStorage
      const savedDarkMode = localStorage.getItem('chirp-dark-mode');
      if (savedDarkMode === 'light' || savedDarkMode === 'dark' || savedDarkMode === 'device') {
        setDarkMode(savedDarkMode);
      } else {
        setDarkMode('light');
      }
      setStreamingQuality(localStorage.getItem('chirp-streaming-quality') || '128');
    } else {
      // User logged out - load from sessionStorage (or defaults if not set)
      const savedDarkMode = sessionStorage.getItem('chirp-dark-mode');
      if (savedDarkMode === 'light' || savedDarkMode === 'dark' || savedDarkMode === 'device') {
        setDarkMode(savedDarkMode);
      } else {
        setDarkMode('light');
      }
      setStreamingQuality(sessionStorage.getItem('chirp-streaming-quality') || '128');
    }
  }, [isLoggedIn]);

  // Apply dark mode on mount and when it changes
  useEffect(() => {
    const applyTheme = () => {
      if (darkMode === 'device') {
        // Follow system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      } else if (darkMode === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
    };

    applyTheme();

    // Listen for system preference changes (only if mode is 'device')
    if (darkMode === 'device') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => applyTheme();
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [darkMode]);

  const handleDarkModeChange = (mode: 'light' | 'dark' | 'device') => {
    setDarkMode(mode);
    const storage = getStorage();
    storage.setItem('chirp-dark-mode', mode);
  };

  const handleStreamingQualityChange = (quality: string) => {
    setStreamingQuality(quality);
    const storage = getStorage();
    storage.setItem('chirp-streaming-quality', quality);

    // Dispatch custom event for same-window updates
    window.dispatchEvent(new CustomEvent('chirp-quality-change', { detail: quality }));
  };

  const handlePushNotificationsChange = (checked: boolean) => {
    // TODO: Save notification preference
  };

  const handleLogin = () => {
    // For demo purposes, simulate login with a demo account
    login('demo@chirpradio.org');
    showToast({
      message: 'Successfully logged in',
      type: 'success',
      duration: 5000,
    });
  };

  const handleLogout = () => {
    logout();
    showToast({
      message: 'Successfully logged out',
      type: 'success',
      duration: 5000,
    });
  };

  const handleSignUp = () => {
    // TODO: Navigate to sign up flow
  };

  const handleForgotPassword = () => {
    // TODO: Navigate to password recovery
  };

  const handleShareApp = () => {
    // TODO: Open share dialog
  };

  const handleLikeAppStore = () => {
    // TODO: Open app store link
  };

  const handleAppSupport = () => {
    // TODO: Navigate to support page
  };

  const handleTermsPrivacy = () => {
    // TODO: Navigate to terms and privacy page
  };

  return (
    <div className="page-content">
      <CrPageHeader
        eyebrowText="CHIRP Radio"
        title="Account Settings"
        showEyebrow={false}
        showActionButton={false}
        titleSize="lg"
      />

      <CrAccountSettingsPage
        isLoggedIn={isLoggedIn}
        userEmail={user?.email || 'account@gmail.com'}
        streamingQuality={streamingQuality}
        pushNotifications={false}
        darkMode={darkMode}
        onStreamingQualityChange={handleStreamingQualityChange}
        onPushNotificationsChange={handlePushNotificationsChange}
        onDarkModeChange={handleDarkModeChange}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onSignUp={handleSignUp}
        onForgotPassword={handleForgotPassword}
        onShareApp={handleShareApp}
        onLikeAppStore={handleLikeAppStore}
        onAppSupport={handleAppSupport}
        onTermsPrivacy={handleTermsPrivacy}
      />
    </div>
  );
}
