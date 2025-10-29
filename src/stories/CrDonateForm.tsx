// CrDonateForm.tsx - Only frequency selection changed
import { useState } from 'react'
import CrButtonGroup from './CrButtonGroup'
import CrDonateAmount from './CrDonateAmount' // Keep using original CrDonateAmount
import CrCard from './CrCard'
import CrButton from './CrButton'
import { PiArrowRight, PiCaretRight, PiVinylRecord } from 'react-icons/pi'
import './CrDonateForm.css'

interface CrDonateFormProps {
  variant?: string
  title?: string
  description?: string
  showCompanyMatching?: boolean
  companyMatchingDescription?: string
  companyMatchingButtonText?: string
  showVinylCircle?: boolean
  vinylCircleTitle?: string
  vinylCircleDescription?: string
  vinylCircleButtonText?: string
  showDedicationOption?: boolean
  onSubmit?: (formData: any) => void
  onCompanyMatchingClick?: (employerName: string) => void
  onVinylCircleClick?: () => void
  onSwitchToDefault?: () => void
  className?: string
}

export default function CrDonateForm({
  variant = 'default',
  title,
  description,
  showCompanyMatching = true,
  companyMatchingDescription = 'Many companies match charitable contributions by their employees. Make your gift go twice as far by checking to see if your employer will match your donation to CHIRP.',
  companyMatchingButtonText = 'CHECK IF MY EMPLOYER MATCHES',
  showVinylCircle = true,
  vinylCircleTitle = 'Join the Vinyl Circle!',
  vinylCircleDescription = "Become a member of our major donor program, CHIRP's Vinyl Circle, with a tax-deductible donation and you'll join a network of people who are committed to keeping volunteer-driven, local radio a vibrant part of our community. You can find a list of giving levels and benefits here.",
  vinylCircleButtonText = 'Please join us!',
  showDedicationOption = true,
  onSubmit,
  onCompanyMatchingClick,
  onVinylCircleClick,
  onSwitchToDefault,
  className = '',
}: CrDonateFormProps) {
  const [selectedFrequency, setSelectedFrequency] = useState('one-time')
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isDedicated, setIsDedicated] = useState(false)
  const [dedicationName, setDedicationName] = useState('')
  const [employerName, setEmployerName] = useState('')

  const componentClasses = ['cr-donate-form', `cr-donate-form--${variant}`, className]
    .filter(Boolean)
    .join(' ')

  const isVinylCircle = variant === 'vinylCircle'

  const defaultContent = {
    eyebrowText: 'Donate to CHIRP',
    title: 'Donate to Chirp',
    description:
      'You helped make our year amazing! Your support let us upgrade both our studios, double our workspace, and launch a new event, Chicago Independent Day. We have even more big plans in 2025, including rebuilding our website and app! Your belief and support are essential to everything we do. Please make a tax-deductible year-end gift today. Get a limited edition CHIRP logo notebook and stylus pen when you give $100 or more!',
    amounts: [10, 20, 60, 120, 180, 240, 365, 500],
  }

  const vinylCircleContent = {
    eyebrowText: 'Donate to CHIRP',
    title: 'The Vinyl Circle',
    description:
      'CHIRP is excited to announce The Vinyl Circle, our NEW major donor club. Listeners like you have always been the force that keeps our local community radio station strong. We want to recognize your contribution with some special benefits that show off your CHIRP allegiance and make you an even more integral part of the CHIRP family.',
    amounts: [
      { label: 'Single', amount: 365 },
      { label: 'EP', amount: 500 },
      { label: 'LP', amount: 1000 },
      { label: 'Double LP', amount: 2500 },
      { label: 'Box Set', amount: 5000 },
    ],
  }

  const content = isVinylCircle ? vinylCircleContent : defaultContent

  const frequencyOptions = [
    { value: 'one-time', label: 'Make a One-Time Donation' },
    { value: 'monthly', label: 'Give a Monthly Sustaining Gift' },
  ]

  const isFormValid = () => {
    const hasAmount = selectedAmount !== null && selectedAmount !== undefined
    const hasCustomAmount =
      selectedAmount === 'other' && customAmount && parseFloat(customAmount) > 0
    return hasAmount && (selectedAmount !== 'other' || hasCustomAmount)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!isFormValid()) return

    const formData = {
      frequency: selectedFrequency,
      amount: selectedAmount === 'other' ? parseFloat(customAmount) : selectedAmount,
      isDedicated,
      dedicationName: isDedicated ? dedicationName : '',
      employerName,
      variant,
    }

    if (onSubmit) {
      onSubmit(formData)
    }
  }

  const handleCompanyMatchingClick = () => {
    if (onCompanyMatchingClick) {
      onCompanyMatchingClick(employerName)
    }
  }

  return (
    <div className={componentClasses}>
      <CrCard
        variant="article"
        showCardDetails={false}
        showTicketButton={false}
        showShareButton={false}
        textLayout="stacked"
        bannerHeight="tall"
        bannerBackgroundColor="none"
        preheader={content.eyebrowText}
        title={title || content.title}
        titleTag="h1"
        titleSize="xl"
        content={description || content.description}
      />

      <form className="cr-donate-form__form" onSubmit={handleSubmit}>
        {/* Frequency Selection - Only this changed */}
        <div className="cr-donate-form__section">
          <CrButtonGroup
            options={frequencyOptions}
            selectedValue={selectedFrequency}
            onSelectionChange={setSelectedFrequency}
            layout="horizontal"
            variant="donation-frequency"
            size="medium"
          />
        </div>

        {/* Amount Selection - UNCHANGED, uses original CrDonateAmount */}
        <div className="cr-donate-form__section">
          <CrDonateAmount
            selectedAmount={selectedAmount}
            onAmountChange={setSelectedAmount}
            customAmount={customAmount}
            onCustomAmountChange={setCustomAmount}
            amounts={isVinylCircle ? content.amounts.map((item) => item.amount) : content.amounts}
            amountLabels={isVinylCircle ? content.amounts : null}
          />
        </div>

        {showDedicationOption && (
          <div className="cr-donate-form__dedication">
            <label className="form-label checkbox-label">
              <input
                type="checkbox"
                checked={isDedicated}
                onChange={(e) => setIsDedicated(e.target.checked)}
                className="form-checkbox"
              />
              <span>Dedicate my donation in honor or in memory of someone</span>
            </label>

            {isDedicated && (
              <div className="form-group" style={{ marginTop: 'var(--cr-space-3)' }}>
                <label htmlFor="dedication-name" className="form-label">
                  Name for dedication
                </label>
                <input
                  type="text"
                  id="dedication-name"
                  placeholder="Enter name here"
                  value={dedicationName}
                  onChange={(e) => setDedicationName(e.target.value)}
                  className="form-input"
                />
              </div>
            )}
          </div>
        )}

        <div className="cr-donate-form__submit">
          <CrButton
            type="submit"
            variant="solid"
            color="default"
            size="large"
            rightIcon={<PiArrowRight />}
            disabled={!isFormValid()}
          >
            NEXT
          </CrButton>
        </div>
      </form>

      {showCompanyMatching && !isVinylCircle && (
        <div className="cr-donate-form__company-matching">
          <h2 className="cr-donate-form__section-title">Check if your Company Matches</h2>
          <p className="cr-donate-form__section-description">{companyMatchingDescription}</p>
          <div className="cr-donate-form__employer-check">
            <label htmlFor="employer-name" className="form-label">
              See if your employer will match your donation!
            </label>
            <div className="cr-donate-form__employer-input-group">
              <input
                type="text"
                id="employer-name"
                placeholder="Company Name"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
                className="form-input"
              />
              <CrButton
                variant="outline"
                color="secondary"
                size="medium"
                rightIcon={<PiCaretRight />}
                onClick={handleCompanyMatchingClick}
                disabled={!employerName.trim()}
              >
                {companyMatchingButtonText}
              </CrButton>
            </div>
          </div>
        </div>
      )}

      {showVinylCircle && !isVinylCircle && (
        <div className="cr-donate-form__vinyl-circle">
          <h2 className="cr-donate-form__section-title-large">{vinylCircleTitle}</h2>
          <p className="cr-donate-form__section-description">{vinylCircleDescription}</p>
          <div className="cr-donate-form__section-action">
            <CrButton
              variant="outline"
              color="secondary"
              size="large"
              leftIcon={<PiVinylRecord />}
              onClick={onVinylCircleClick}
            >
              {vinylCircleButtonText}
            </CrButton>
          </div>
        </div>
      )}

      {isVinylCircle && (
        <div className="cr-donate-form__switch-section">
          <h2 className="cr-donate-form__section-title">Looking for a smaller donation?</h2>
          <p className="cr-donate-form__section-description">
            Not ready for the Vinyl Circle? You can still make a regular donation to support CHIRP
            Radio.
          </p>
          <div className="cr-donate-form__section-action">
            <CrButton
              variant="text"
              color="default"
              size="medium"
              rightIcon={<PiArrowRight />}
              onClick={onSwitchToDefault}
            >
              Make a Regular Donation
            </CrButton>
          </div>
        </div>
      )}
    </div>
  )
}
