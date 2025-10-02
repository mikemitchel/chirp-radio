// CrSettingsToggles.tsx
import React, { useState, useEffect } from 'react'
import CrToggle from './CrToggle'
import './CrSettingsToggles.css'

interface CrSettingsTogglesProps {
  streamingQuality?: string
  onStreamingQualityChange?: (quality: string) => void
  pushNotifications?: boolean
  onPushNotificationsChange?: (checked: boolean) => void
  darkMode?: boolean
  onDarkModeChange?: (checked: boolean) => void
  className?: string
}

export default function CrSettingsToggles({
  streamingQuality = '128',
  onStreamingQualityChange,
  pushNotifications = false,
  onPushNotificationsChange,
  darkMode = false,
  onDarkModeChange,
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

  const handleDarkModeChange = (checked: boolean) => {
    setLocalDarkMode(checked)
    if (onDarkModeChange) {
      onDarkModeChange(checked)
    }
  }

  return (
    <div className={`cr-settings-toggles ${className}`}>
      {/* Dark Mode */}
      <div className="cr-settings-toggles__setting">
        <div className="cr-settings-toggles__setting-info">
          <span className="cr-settings-toggles__setting-label">Dark Mode</span>
        </div>
        <div className="cr-settings-toggles__setting-control">
          <CrToggle
            variant="boolean"
            leftLabel="OFF"
            rightLabel="ON"
            checked={localDarkMode}
            onChange={handleDarkModeChange}
            aria-label="Toggle dark mode"
            size="large"
          />
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
            size="large"
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="cr-settings-toggles__setting">
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
            size="large"
          />
        </div>
      </div>
    </div>
  )
}
