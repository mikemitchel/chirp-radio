// src/utils/devTools.ts
// Development tools for testing - attach functions to window object

import type { UserRole } from '../hooks/useAuth';

// Define the devTools that will be available in the console
export const devTools = {
  switchProfile: (role: UserRole) => {
    // Dispatch a custom event that the app can listen to
    window.dispatchEvent(new CustomEvent('chirp-switch-profile', { detail: role }));
  },

  logout: () => {
    // Dispatch a custom event to log out
    window.dispatchEvent(new CustomEvent('chirp-logout'));
  },

  showProfiles: () => {
    console.log(`
🎭 Available Test Profiles
==========================

Commands:
  switchProfile('listener')   - Regular listener (no volunteer button)
  switchProfile('volunteer')  - Volunteer (has volunteer dropdown)
  switchProfile('dj')         - DJ (volunteer dropdown + DJ permissions)
  logout()                    - Log out (show logged out state)

Profiles:
  • Listener:  Jane Listener   (listener@chirpradio.org)
  • Volunteer: Sam Volunteer   (volunteer@chirpradio.org)
  • DJ:        DJ Awesome      (dj@chirpradio.org)

Example usage:
  switchProfile('volunteer')
  logout()
    `);
  }
};

// Attach to window in development mode
if (process.env.NODE_ENV === 'development') {
  (window as any).switchProfile = devTools.switchProfile;
  (window as any).logout = devTools.logout;
  (window as any).showProfiles = devTools.showProfiles;

  console.log('🎭 DevTools loaded! Type showProfiles() for help');
}

export default devTools;
