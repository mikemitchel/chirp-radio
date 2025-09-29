// CrAccountSettingsPage.jsx
import React, { useState } from 'react';
import CrToggle from './CrToggle';
import CrButton from './CrButton';
import { PiPaperclip, PiNotepad } from 'react-icons/pi';
import './CrAccountSettingsPage.css';

export default function CrAccountSettingsPage({
  isLoggedIn = false,
  userEmail = 'account@gmail.com',
  streamingQuality = '128',
  onStreamingQualityChange,
  pushNotifications = false,
  onPushNotificationsChange,
  onLogin,
  onLogout,
  onSignUp,
  onForgotPassword,
  onShareApp,
  onLikeAppStore,
  onAppSupport,
  onTermsPrivacy,
  ...props
}) {
  // Local state for demo purposes
  const [localStreamingQuality, setLocalStreamingQuality] = useState(streamingQuality);
  const [localPushNotifications, setLocalPushNotifications] = useState(pushNotifications);
  const [localDarkMode, setLocalDarkMode] = useState(false);

  const handleStreamingQualityChange = (isHigh) => {
    const quality = isHigh ? '128' : '64';
    setLocalStreamingQuality(quality);
    if (onStreamingQualityChange) onStreamingQualityChange(quality);
  };

  const handlePushNotificationsChange = (checked) => {
    setLocalPushNotifications(checked);
    if (onPushNotificationsChange) onPushNotificationsChange(checked);
  };

  const handleDarkModeChange = (checked) => {
    setLocalDarkMode(checked);
    // Just update local state - don't actually change the page theme
    // This is a placeholder for when used in the actual app
  };

  return (
    <div className="cr-account-settings-page" {...props}>
      <div className="cr-account-settings-page__content">
        {/* Header */}
        <h1 className="cr-account-settings-page__title">Account Settings</h1>

        {/* Settings Sections */}
        <div className="cr-account-settings-page__settings">
          
          {/* Dark Mode */}
          <div className="cr-account-settings-page__setting">
            <div className="cr-account-settings-page__setting-info">
              <span className="cr-account-settings-page__setting-label">Dark Mode</span>
            </div>
            <div className="cr-account-settings-page__setting-control">
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
          <div className="cr-account-settings-page__setting">
            <div className="cr-account-settings-page__setting-info">
              <span className="cr-account-settings-page__setting-label">Streaming Quality</span>
              <span className="cr-account-settings-page__setting-unit">(kbps)</span>
            </div>
            <div className="cr-account-settings-page__setting-control">
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
          <div className="cr-account-settings-page__setting">
            <div className="cr-account-settings-page__setting-info">
              <span className="cr-account-settings-page__setting-label">Push Notifications</span>
            </div>
            <div className="cr-account-settings-page__setting-control">
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

        {/* Account Section */}
        <div className="cr-account-settings-page__account-section">
          <div className="cr-account-settings-page__account-header">
            <span className="cr-account-settings-page__account-label">Account</span>
            {isLoggedIn ? (
              <span className="cr-account-settings-page__user-email">{userEmail}</span>
            ) : (
              <CrButton
                variant="text"
                color="default"
                size="xsmall"
                onClick={onForgotPassword}
              >
                forgot password
              </CrButton>
            )}
          </div>
          <div className="cr-account-settings-page__account-action">
            {isLoggedIn ? (
              <CrButton
                variant="outline"
                color="default"
                size="medium"
                onClick={onLogout}
              >
                log out
              </CrButton>
            ) : (
              <CrButton
                variant="solid"
                color="primary"
                size="medium"
                onClick={onLogin}
              >
                log in
              </CrButton>
            )}
          </div>
        </div>

        {/* Sign Up Section - only shown when not logged in */}
        {!isLoggedIn && (
          <div className="cr-account-settings-page__signup-section">
            <h2 className="cr-account-settings-page__signup-title">
              Don't have a Chirp Radio Account?
            </h2>
            <p className="cr-account-settings-page__signup-description">
              A profile allows you to interact with the site in all sorts of helpful ways:
            </p>
            <ul className="cr-account-settings-page__signup-benefits">
              <li>You can add songs to your collection that you hear across our web and mobile applications so you don't forget them</li>
              <li>Your can save your information for store purchases and donations</li>
              <li>Your profile settings will be saved between your mobile and web experiences</li>
            </ul>
            <p className="cr-account-settings-page__signup-cta">
              So create your profile today, and start getting the maximum benefit from CHIRPradio.org!
            </p>
            <CrButton
              variant="solid"
              color="secondary"
              size="medium"
              onClick={onSignUp}
            >
              sign up
            </CrButton>
          </div>
        )}

        {/* App Promotion Section */}
        <div className="cr-account-settings-page__app-section">
          <h3 className="cr-account-settings-page__app-title">
            Like the CHIRP Radio App?
          </h3>
          <div className="cr-account-settings-page__app-actions">
            <CrButton
              variant="outline"
              color="default"
              size="small"
              onClick={onShareApp}
            >
              share app on social media
            </CrButton>
            <CrButton
              variant="outline"
              color="default"
              size="small"
              onClick={onLikeAppStore}
            >
              like on app store
            </CrButton>
          </div>
        </div>

        {/* Footer Links */}
        <div className="cr-account-settings-page__footer-links">
          <CrButton
            variant="text"
            color="default"
            size="large"
            leftIcon={<PiPaperclip />}
            onClick={onAppSupport}
          >
            app support & feedback
          </CrButton>
          <CrButton
            variant="text"
            color="default"
            size="large"
            leftIcon={<PiNotepad />}
            onClick={onTermsPrivacy}
          >
            terms & privacy
          </CrButton>
        </div>
      </div>
    </div>
  );
}