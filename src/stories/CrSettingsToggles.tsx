// CrSettingsToggles.tsx
import React, { useState, useEffect } from 'react'
import CrToggle from './CrToggle'
import './CrSettingsToggles.css'

interface CrSettingsTogglesProps {
  streamingQuality?: string
  onStreamingQualityChange?: (quality: string) => void
  pushNotifications?: boolean
  onPushNotificationsChange?: (checked: boolean) => void
  darkMode?: 'light' | 'dark' | 'device'
  onDarkModeChange?: (mode: 'light' | 'dark' | 'device') => void
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export default function CrSettingsToggles({
  streamingQuality = '128',
  onStreamingQualityChange,
  pushNotifications = false,
  onPushNotificationsChange,
  darkMode = 'device',
  onDarkModeChange,
  size = 'large',
  className = '',
}: CrSettingsTogglesProps) {
  const [localStreamingQuality, setLocalStreamingQuality] = useState(streamingQuality)
  const [localPushNotifications, setLocalPushNotifications] = useState(pushNotifications)
  const [localDarkMode, setLocalDarkMode] = useState(darkMode)

  // Sync props with local state when they change
  useEffect(() => {
    setLocalDarkMode(darkMode)
  }, [darkMode])

  useEffect(() => {
    setLocalStreamingQuality(streamingQuality)
  }, [streamingQuality])

  useEffect(() => {
    setLocalPushNotifications(pushNotifications)
  }, [pushNotifications])

  const handleStreamingQualityChange = (isHigh: boolean) => {
    const quality = isHigh ? '128' : '64'
    setLocalStreamingQuality(quality)
    if (onStreamingQualityChange) onStreamingQualityChange(quality)
  }

  const handlePushNotificationsChange = (checked: boolean) => {
    setLocalPushNotifications(checked)
    if (onPushNotificationsChange) onPushNotificationsChange(checked)
  }

  const handleDarkModeChange = (mode: 'light' | 'dark' | 'device') => {
    setLocalDarkMode(mode)
    if (onDarkModeChange) {
      onDarkModeChange(mode)
    }
  }

  return (
    <div className={`cr-settings-toggles ${className}`}>
      {/* Dark Mode */}
      <div className="cr-settings-toggles__setting">
        <div className="cr-settings-toggles__setting-info">
          <span className="cr-settings-toggles__setting-label">Dark Mode</span>
        </div>
        <div className={`form-radio-group form-radio-group--${size}`}>
          <label className={`form-radio-item form-radio-item--${size}`}>
            <input
              type="radio"
              name="dark-mode"
              value="light"
              checked={localDarkMode === 'light'}
              onChange={() => handleDarkModeChange('light')}
            />
            Light
          </label>
          <label className={`form-radio-item form-radio-item--${size}`}>
            <input
              type="radio"
              name="dark-mode"
              value="dark"
              checked={localDarkMode === 'dark'}
              onChange={() => handleDarkModeChange('dark')}
            />
            Dark
          </label>
          <label className={`form-radio-item form-radio-item--${size}`}>
            <input
              type="radio"
              name="dark-mode"
              value="device"
              checked={localDarkMode === 'device'}
              onChange={() => handleDarkModeChange('device')}
            />
            Device
          </label>
        </div>
      </div>

      {/* Streaming Quality */}
      <div className="cr-settings-toggles__setting">
        <div className="cr-settings-toggles__setting-info">
          <span className="cr-settings-toggles__setting-label">Streaming Quality</span>
          <span className="cr-settings-toggles__setting-unit">(kbps)</span>
        </div>
        <div className="cr-settings-toggles__setting-control">
          <CrToggle
            variant="selection"
            leftLabel="128"
            rightLabel="64"
            checked={localStreamingQuality === '128'}
            onChange={handleStreamingQualityChange}
            aria-label="Streaming quality selection"
            size={size}
          />
        </div>
      </div>

      {/* Push Notifications - Hidden until email notification feature is implemented */}
      {/* <div className="cr-settings-toggles__setting">
        <div className="cr-settings-toggles__setting-info">
          <span className="cr-settings-toggles__setting-label">Push Notifications</span>
        </div>
        <div className="cr-settings-toggles__setting-control">
          <CrToggle
            variant="boolean"
            leftLabel="OFF"
            rightLabel="ON"
            checked={localPushNotifications}
            onChange={handlePushNotificationsChange}
            aria-label="Toggle push notifications"
            size={size}
          />
        </div>
      </div> */}
    </div>
  )
}
