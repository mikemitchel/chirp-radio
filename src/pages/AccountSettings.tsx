// src/pages/AccountSettings.tsx
import React from 'react';

export default function AccountSettings() {
  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Account Settings</h1>
        <p>Manage your CHIRP Radio account preferences</p>
      </div>

      <div className="page-section">
        <h2>Profile</h2>
        <div className="settings-placeholder">
          <p>User profile settings</p>
        </div>
      </div>

      <div className="page-section">
        <h2>Notifications</h2>
        <div className="settings-placeholder">
          <p>Notification preferences</p>
        </div>
      </div>

      <div className="page-section">
        <h2>App Settings</h2>
        <div className="settings-placeholder">
          <p>Audio quality, offline mode, etc.</p>
        </div>
      </div>
    </div>
  );
}
