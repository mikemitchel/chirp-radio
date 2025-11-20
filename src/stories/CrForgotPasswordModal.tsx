// src/components/ForgotPasswordModal.tsx
import React, { useState } from 'react'
import CrModal from '../stories/CrModal'
import CrButton from '../stories/CrButton'
import './CrLoginRequiredModal.css' // Reuse the same styles

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ForgotPasswordModal({ isOpen, onClose }: ForgotPasswordModalProps) {
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState<{ email?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate email
    const newErrors: { email?: string } = {}

    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)

    try {
      const cmsUrl = import.meta.env.VITE_CMS_URL || 'http://localhost:3000'
      const response = await fetch(`${cmsUrl}/api/listeners/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setSubmitted(true)
        setErrors({})
      } else {
        // Even if the email doesn't exist, show success message for security
        setSubmitted(true)
        setErrors({})
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setErrors({ email: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setEmail('')
    setErrors({})
    setSubmitted(false)
    onClose()
  }

  return (
    <CrModal
      isOpen={isOpen}
      onClose={handleClose}
      scrimOnClick={handleClose}
      title="Reset Password"
      size="small"
    >
      <div className="cr-modal__body">
        <div className="login-modal">
          {!submitted ? (
            <>
              <div className="login-modal__message">
                Enter your email address and we'll send you a link to reset your password.
              </div>

              <form onSubmit={handleSubmit} className="login-modal__form">
                <div className="login-modal__field">
                  <label htmlFor="forgot-email" className="login-modal__label">
                    Email <span className="login-modal__required">*</span>
                  </label>
                  <input
                    type="email"
                    id="forgot-email"
                    className={`login-modal__input ${errors.email ? 'login-modal__input--error' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  {errors.email && <span className="login-modal__error">{errors.email}</span>}
                </div>

                <div className="cr-modal__actions cr-modal__actions--space-between cr-modal__actions--gap">
                  <CrButton
                    type="button"
                    variant="outline"
                    color="default"
                    size="medium"
                    onClick={handleClose}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </CrButton>
                  <CrButton
                    type="submit"
                    variant="solid"
                    color="secondary"
                    size="medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                  </CrButton>
                </div>
              </form>
            </>
          ) : (
            <>
              <div className="login-modal__message">
                If an account exists with that email address, we've sent you a password reset link.
                Please check your inbox and spam folder.
              </div>

              <div className="cr-modal__actions">
                <CrButton
                  type="button"
                  variant="solid"
                  color="secondary"
                  size="medium"
                  onClick={handleClose}
                >
                  Close
                </CrButton>
              </div>
            </>
          )}
        </div>
      </div>
    </CrModal>
  )
}
