// src/components/LoginRequiredModal.tsx
import React, { useState, useEffect } from 'react'
import CrModal from '../stories/CrModal'
import CrButton from '../stories/CrButton'
import CrButtonGroup from '../stories/CrButtonGroup'
import { useMobileAppSettings } from '../hooks/useData'
import CrForgotPasswordModal from './CrForgotPasswordModal'
import './CrLoginRequiredModal.css'

interface LoginRequiredModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (email: string, password: string) => void | Promise<void>
  onSignUp: (email: string, password: string) => void | Promise<void>
  initialMode?: 'login' | 'signup'
}

export default function LoginRequiredModal({
  isOpen,
  onClose,
  onLogin,
  onSignUp,
  initialMode = 'login',
}: LoginRequiredModalProps) {
  const { data: appSettings } = useMobileAppSettings()
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [showForgotPassword, setShowForgotPassword] = useState(false)

  // Update mode when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode)
    }
  }, [isOpen, initialMode])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
  }>({})

  // Derived values from CMS
  const loginMessage =
    appSettings?.loginModal?.loginMessage ||
    'Log in to your CHIRP Radio listener account to add songs to your collection.'
  const signupMessage =
    appSettings?.loginModal?.signupMessage ||
    'Create a CHIRP Radio listener account to save songs to your collection and more.'

  const handleModeChange = (value: string) => {
    setMode(value as 'login' | 'signup')
    // Clear errors when switching modes
    setErrors({})
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    const newErrors: { email?: string; password?: string; confirmPassword?: string } = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (mode === 'signup' && password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (mode === 'signup' && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Call appropriate handler with actual form values
    if (mode === 'login') {
      onLogin(email, password)
    } else {
      onSignUp(email, password)
    }

    // Clear form
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors({})
  }

  const handleCancel = () => {
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors({})
    setMode('login')
    onClose()
  }

  return (
    <>
      <CrModal
        isOpen={isOpen}
        onClose={handleCancel}
        scrimOnClick={handleCancel}
        title={mode === 'login' ? 'Log In' : 'Sign Up'}
        size="small"
      >
        <div className="cr-modal__body">
          <div className="login-modal">
            <div
              className="login-modal__message"
              dangerouslySetInnerHTML={{
                __html: mode === 'login' ? loginMessage : signupMessage,
              }}
            />

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
                size="medium"
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
                  placeholder={
                    mode === 'login'
                      ? 'Enter your password'
                      : 'Create a password (min 8 characters)'
                  }
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

              {/* Forgot Password Link */}
              {mode === 'login' && (
                <div className="login-modal__forgot-password">
                  <a
                    href="#"
                    className="login-modal__forgot-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowForgotPassword(true)
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Form Actions */}
              <div className="cr-modal__actions cr-modal__actions--space-between cr-modal__actions--gap">
                <CrButton
                  type="button"
                  variant="outline"
                  color="default"
                  size="medium"
                  onClick={handleCancel}
                >
                  Cancel
                </CrButton>
                <CrButton type="submit" variant="solid" color="secondary" size="medium">
                  {mode === 'login' ? 'Log In' : 'Sign Up'}
                </CrButton>
              </div>
            </form>
          </div>
        </div>
      </CrModal>

      <CrForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  )
}
