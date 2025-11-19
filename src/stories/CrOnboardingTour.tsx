// src/components/OnboardingTour.tsx
import { useState, useEffect } from 'react'
import CrModal from '../stories/CrModal'
import CrButton from '../stories/CrButton'
import { useAuth } from '../contexts/AuthContext'
import { Capacitor } from '@capacitor/core'
import './CrOnboardingTour.css'

interface OnboardingStep {
  id: string
  title: string
  description: any // Lexical JSON or HTML string
  featureIdentifier: string
  order: number
  platform: 'web' | 'mobile' | 'both'
  media?: {
    url: string
    alt?: string
  }
  ctaText?: string
  isActive: boolean
}

interface OnboardingTourProps {
  isOpen: boolean
  onComplete: () => void
}

export default function OnboardingTour({ isOpen, onComplete }: OnboardingTourProps) {
  const { user } = useAuth()
  const [steps, setSteps] = useState<OnboardingStep[]>([])
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch onboarding steps from CMS
  useEffect(() => {
    const fetchSteps = async () => {
      try {
        setLoading(true)
        setError(null)

        // Determine platform
        const platform = Capacitor.isNativePlatform() ? 'mobile' : 'web'

        // Fetch from CMS API
        const cmsUrl = import.meta.env.VITE_CMS_URL || 'http://localhost:3000'
        const response = await fetch(`${cmsUrl}/api/onboarding-steps?platform=${platform}`)

        if (!response.ok) {
          throw new Error('Failed to fetch onboarding steps')
        }

        const data = await response.json()

        if (data.success && data.steps) {
          setSteps(data.steps)
        } else {
          throw new Error('Invalid response from CMS')
        }
      } catch (err) {
        console.error('Error fetching onboarding steps:', err)
        setError('Unable to load onboarding tour')
      } finally {
        setLoading(false)
      }
    }

    if (isOpen) {
      fetchSteps()
    }
  }, [isOpen])

  const currentStep = steps[currentStepIndex]
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === steps.length - 1

  const handleNext = () => {
    if (isLastStep) {
      handleComplete()
    } else {
      setCurrentStepIndex((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStepIndex((prev) => prev - 1)
    }
  }

  const handleSkip = () => {
    handleComplete()
  }

  const handleComplete = async () => {
    // Mark onboarding as complete for this user
    if (user?.id) {
      try {
        // Only update CMS if this is a real user (not temp user)
        if (!user.id.includes('temp')) {
          const cmsUrl = import.meta.env.VITE_CMS_URL || 'http://localhost:3000'
          await fetch(`${cmsUrl}/api/members/${user.id}/complete-onboarding`, {
            method: 'PATCH',
          })
        } else {
          console.log('[OnboardingTour] Skipping CMS update for temp user')
        }
      } catch (err) {
        console.error('Error marking onboarding as complete:', err)
      }
    }

    // Update local user state
    if (user) {
      const updatedUser = { ...user, onboardingCompleted: true }
      localStorage.setItem('chirp-user', JSON.stringify(updatedUser))
    }

    onComplete()
  }

  // Convert Lexical JSON to HTML
  const lexicalToHtml = (lexicalData: any): string => {
    if (!lexicalData?.root?.children) return ''

    const processNode = (node: any): string => {
      if (node.type === 'text') {
        return node.text || ''
      }

      if (node.type === 'paragraph') {
        const content = node.children?.map(processNode).join('') || ''
        return `<p>${content}</p>`
      }

      if (node.type === 'heading') {
        const level = node.tag || 'h2'
        const content = node.children?.map(processNode).join('') || ''
        return `<${level}>${content}</${level}>`
      }

      if (node.type === 'list') {
        const tag = node.listType === 'number' ? 'ol' : 'ul'
        const content = node.children?.map(processNode).join('') || ''
        return `<${tag}>${content}</${tag}>`
      }

      if (node.type === 'listitem') {
        const content = node.children?.map(processNode).join('') || ''
        return `<li>${content}</li>`
      }

      // Default: process children if they exist
      if (node.children) {
        return node.children.map(processNode).join('')
      }

      return ''
    }

    return lexicalData.root.children.map(processNode).join('')
  }

  // Render description (handle both HTML string and Lexical JSON)
  const renderDescription = (description: any) => {
    if (typeof description === 'string') {
      return <div dangerouslySetInnerHTML={{ __html: description }} />
    }

    // Convert Lexical JSON to HTML
    const html = lexicalToHtml(description)
    return <div dangerouslySetInnerHTML={{ __html: html }} />
  }

  if (!isOpen) return null

  return (
    <CrModal
      isOpen={isOpen}
      onClose={handleSkip}
      scrimOnClick={handleSkip}
      title={loading ? 'Welcome to CHIRP Radio' : currentStep?.title || 'Welcome'}
      size="default"
      showCloseButton={!loading}
    >
      <div className="cr-modal__body">
        <div className="onboarding-tour">
          {loading && (
            <div className="onboarding-tour__loading">
              <p>Loading your tour...</p>
            </div>
          )}

          {error && (
            <div className="onboarding-tour__error">
              <p>{error}</p>
              <CrButton variant="solid" color="secondary" onClick={handleSkip}>
                Continue
              </CrButton>
            </div>
          )}

          {!loading && !error && currentStep && (
            <>
              {/* Progress Indicator */}
              <div className="onboarding-tour__progress">
                <div className="onboarding-tour__progress-bar">
                  <div
                    className="onboarding-tour__progress-fill"
                    style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <p className="onboarding-tour__progress-text">
                  Step {currentStepIndex + 1} of {steps.length}
                </p>
              </div>

              {/* Step Media */}
              {currentStep.media && (
                <div className="onboarding-tour__media">
                  <img
                    src={currentStep.media.url}
                    alt={currentStep.media.alt || currentStep.title}
                    className="onboarding-tour__image"
                  />
                </div>
              )}

              {/* Step Content */}
              <div className="onboarding-tour__content">
                {renderDescription(currentStep.description)}
              </div>

              {/* Navigation Actions */}
              <div className="onboarding-tour__actions">
                <div className="onboarding-tour__actions-left">
                  {!isFirstStep && (
                    <CrButton variant="outline" color="default" onClick={handlePrevious}>
                      Previous
                    </CrButton>
                  )}
                </div>
                <div className="onboarding-tour__actions-right">
                  <CrButton variant="ghost" color="default" onClick={handleSkip}>
                    Skip Tour
                  </CrButton>
                  <CrButton variant="solid" color="secondary" onClick={handleNext}>
                    {currentStep.ctaText || (isLastStep ? 'Get Started' : 'Next')}
                  </CrButton>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </CrModal>
  )
}
