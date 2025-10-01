// CrAccountSettingsPage.tsx
import React, { useState } from 'react';
import CrSettingsToggles from './CrSettingsToggles';
import CrButton from './CrButton';
import { PiPaperclip, PiNotepad } from 'react-icons/pi';
import './CrAccountSettingsPage.css';

interface CrAccountSettingsPageProps {
  isLoggedIn?: boolean;
  userEmail?: string;
  streamingQuality?: string;
  onStreamingQualityChange?: (quality: string) => void;
  pushNotifications?: boolean;
  onPushNotificationsChange?: (checked: boolean) => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onSignUp?: () => void;
  onForgotPassword?: () => void;
  onShareApp?: () => void;
  onLikeAppStore?: () => void;
  onAppSupport?: () => void;
  onTermsPrivacy?: () => void;
}

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
}: CrAccountSettingsPageProps) {

  return (
    <div className="cr-account-settings-page" {...props}>
      <div className="cr-account-settings-page__content">
        {/* Header */}
        <h1 className="cr-account-settings-page__title">Account Settings</h1>

        {/* Settings Sections */}
        <div className="cr-account-settings-page__settings">
          <CrSettingsToggles
            streamingQuality={streamingQuality}
            onStreamingQualityChange={onStreamingQualityChange}
            pushNotifications={pushNotifications}
            onPushNotificationsChange={onPushNotificationsChange}
          />
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