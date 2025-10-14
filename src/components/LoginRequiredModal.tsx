// src/components/LoginRequiredModal.tsx
import React, { useState } from 'react';
import CrModal from '../stories/CrModal';
import CrButton from '../stories/CrButton';
import CrButtonGroup from '../stories/CrButtonGroup';
import './LoginRequiredModal.css';

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSignUp: (email: string, password: string) => void;
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  onSignUp
}: LoginRequiredModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleModeChange = (value: string) => {
    setMode(value as 'login' | 'signup');
    // Clear errors when switching modes
    setErrors({});
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: {
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (mode === 'signup') {
      if (!confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (password !== confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});

    if (mode === 'login') {
      onLogin(email.trim(), password);
    } else {
      onSignUp(email.trim(), password);
    }

    // Clear form
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
    setMode('login');
    onClose();
  };

  return (
    <CrModal
      isOpen={isOpen}
      onClose={handleCancel}
      scrimOnClick={handleCancel}
      title={mode === 'login' ? 'Log In' : 'Sign Up'}
      size="small"
    >
      <div className="login-modal">
        <p className="login-modal__message">
          {mode === 'login'
            ? 'Log in to your CHIRP Radio listener account to add songs to your collection.'
            : 'Create a CHIRP Radio listener account to save songs to your collection and more.'}
        </p>

        <div className="login-modal__mode-toggle">
          <CrButtonGroup
            options={[
              { label: 'Log In', value: 'login' },
              { label: 'Sign Up', value: 'signup' },
            ]}
            selectedValue={mode}
            onSelectionChange={handleModeChange}
            layout="horizontal"
            variant="schedule"
            size="small"
          />
        </div>

        <form onSubmit={handleSubmit} className="login-modal__form">
          {/* Email Input */}
          <div className="login-modal__field">
            <label htmlFor="email" className="login-modal__label">
              Email <span className="login-modal__required">*</span>
            </label>
            <input
              type="email"
              id="email"
              className={`login-modal__input ${errors.email ? 'login-modal__input--error' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <span className="login-modal__error">{errors.email}</span>}
          </div>

          {/* Password Input */}
          <div className="login-modal__field">
            <label htmlFor="password" className="login-modal__label">
              Password <span className="login-modal__required">*</span>
            </label>
            <input
              type="password"
              id="password"
              className={`login-modal__input ${errors.password ? 'login-modal__input--error' : ''}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={mode === 'login' ? 'Enter your password' : 'Create a password (min 8 characters)'}
            />
            {errors.password && <span className="login-modal__error">{errors.password}</span>}
          </div>

          {/* Confirm Password Input - Only for Sign Up */}
          {mode === 'signup' && (
            <div className="login-modal__field">
              <label htmlFor="confirmPassword" className="login-modal__label">
                Confirm Password <span className="login-modal__required">*</span>
              </label>
              <input
                type="password"
                id="confirmPassword"
                className={`login-modal__input ${errors.confirmPassword ? 'login-modal__input--error' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
              />
              {errors.confirmPassword && (
                <span className="login-modal__error">{errors.confirmPassword}</span>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="login-modal__actions">
            <CrButton
              type="button"
              variant="outline"
              color="default"
              size="medium"
              onClick={handleCancel}
            >
              Cancel
            </CrButton>
            <CrButton
              type="submit"
              variant="solid"
              color="secondary"
              size="medium"
            >
              {mode === 'login' ? 'Log In' : 'Sign Up'}
            </CrButton>
          </div>
        </form>
      </div>
    </CrModal>
  );
}
