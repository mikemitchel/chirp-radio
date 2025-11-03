// src/pages/ResetPasswordPage.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { Helmet } from 'react-helmet-async'
import CrButton from '../stories/CrButton'
import CrCard from '../stories/CrCard'
import '../components/LoginRequiredModal.css'

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; general?: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)

  // Redirect to home if no token
  useEffect(() => {
    if (!token) {
      navigate('/')
    }
  }, [token, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate inputs
    const newErrors: { password?: string; confirmPassword?: string } = {}

    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    setErrors({})

    try {
      const cmsUrl = import.meta.env.VITE_CMS_URL || 'http://localhost:3000'
      const response = await fetch(`${cmsUrl}/api/listeners/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      })

      if (response.ok) {
        setResetSuccess(true)
        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate('/')
        }, 3000)
      } else {
        const errorData = await response.json()
        setErrors({
          general:
            errorData.message || 'Failed to reset password. The link may have expired or is invalid.',
        })
      }
    } catch (error) {
      console.error('Reset password error:', error)
      setErrors({ general: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token) {
    return null
  }

  return (
    <>
      <Helmet>
        <title>Reset Password | CHIRP Radio</title>
      </Helmet>
      <div className="reset-password-page">
        <div className="page-layout-single">
          <div
            style={{
              maxWidth: '500px',
              margin: '0 auto',
              padding: 'var(--cr-space-12) var(--cr-space-4)',
            }}
          >
            {resetSuccess ? (
              <CrCard
                variant="article"
                type="page"
                imagePosition="none"
                title="Password Reset Successful!"
                titleTag="h1"
                titleSize="lg"
                bannerHeight="narrow"
                textLayout="stacked"
                bannerBackgroundColor="none"
                showTicketButton={false}
                showShareButton={false}
                contentSummary="Your password has been successfully reset. You will be redirected to the home page shortly."
              />
            ) : (
              <>
                <h1
                  style={{
                    font: 'var(--cr-title-xl)',
                    color: 'var(--cr-ink)',
                    marginBottom: 'var(--cr-space-4)',
                    textAlign: 'center',
                  }}
                >
                  Reset Your Password
                </h1>

                <p
                  style={{
                    fontSize: 'var(--cr-body-md)',
                    color: 'var(--cr-default-700)',
                    marginBottom: 'var(--cr-space-8)',
                    textAlign: 'center',
                  }}
                >
                  Enter your new password below
                </p>

                {errors.general && (
                  <div
                    style={{
                      padding: 'var(--cr-space-4)',
                      backgroundColor: 'var(--cr-error-100)',
                      border: '1px solid var(--cr-error-500)',
                      borderRadius: 'var(--cr-radius-sm)',
                      marginBottom: 'var(--cr-space-6)',
                      color: 'var(--cr-error-700)',
                      textAlign: 'center',
                    }}
                  >
                    {errors.general}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="login-modal__form">
                  {/* Password Input */}
                  <div className="login-modal__field">
                    <label htmlFor="password" className="login-modal__label">
                      New Password <span className="login-modal__required">*</span>
                    </label>
                    <input
                      type="password"
                      id="password"
                      className={`login-modal__input ${errors.password ? 'login-modal__input--error' : ''}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password (min 8 characters)"
                      disabled={isSubmitting}
                    />
                    {errors.password && <span className="login-modal__error">{errors.password}</span>}
                  </div>

                  {/* Confirm Password Input */}
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
                      placeholder="Re-enter new password"
                      disabled={isSubmitting}
                    />
                    {errors.confirmPassword && (
                      <span className="login-modal__error">{errors.confirmPassword}</span>
                    )}
                  </div>

                  {/* Form Actions */}
                  <div style={{ display: 'flex', gap: 'var(--cr-space-4)', marginTop: 'var(--cr-space-6)' }}>
                    <CrButton
                      type="button"
                      variant="outline"
                      color="default"
                      size="medium"
                      onClick={() => navigate('/')}
                      disabled={isSubmitting}
                      style={{ flex: 1 }}
                    >
                      Cancel
                    </CrButton>
                    <CrButton
                      type="submit"
                      variant="solid"
                      color="secondary"
                      size="medium"
                      disabled={isSubmitting}
                      style={{ flex: 1 }}
                    >
                      {isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </CrButton>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPasswordPage
