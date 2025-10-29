// src/utils/deviceDetection.ts

interface IOSVersionInfo {
  isIOS: boolean
  version: number | null
  supportsAlternateIcons: boolean
}

/**
 * Detects if the user is on iOS and returns version information
 * @returns Object containing iOS detection and version info
 */
export function getIOSVersion(): IOSVersionInfo {
  const userAgent = window.navigator.userAgent

  // Check if the device is iOS (iPhone, iPad, iPod)
  interface WindowWithMSStream extends Window {
    MSStream?: unknown;
  }
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !(window as WindowWithMSStream).MSStream

  if (!isIOS) {
    return {
      isIOS: false,
      version: null,
      supportsAlternateIcons: false,
    }
  }

  // Extract iOS version from user agent
  // User agent format: "... OS 14_5_1 ..." or "... OS 14_5 ..."
  const versionMatch = userAgent.match(/OS (\d+)_?(\d+)?_?(\d+)?/)

  if (!versionMatch) {
    return {
      isIOS: true,
      version: null,
      supportsAlternateIcons: false,
    }
  }

  const majorVersion = parseInt(versionMatch[1], 10)
  const minorVersion = versionMatch[2] ? parseInt(versionMatch[2], 10) : 0

  // Create a comparable version number (e.g., 10.3 becomes 10.3)
  const version = majorVersion + minorVersion / 10

  // Alternate app icons require iOS 10.3+
  const supportsAlternateIcons = version >= 10.3

  return {
    isIOS: true,
    version,
    supportsAlternateIcons,
  }
}

/**
 * Check if the current device supports alternate app icons
 * @returns true if device supports alternate icons (iOS 10.3+)
 */
export function supportsAlternateIcons(): boolean {
  return getIOSVersion().supportsAlternateIcons
}

/**
 * Check if running in a Capacitor native app context
 * @returns true if running in Capacitor
 */
export function isCapacitorApp(): boolean {
  interface WindowWithCapacitor extends Window {
    Capacitor?: unknown;
  }
  return !!(window as WindowWithCapacitor).Capacitor
}

/**
 * Check if the app icon selector should be shown
 * Requires iOS 10.3+ and Capacitor native context
 * @returns true if icon selector should be shown
 */
export function shouldShowIconSelector(): boolean {
  return isCapacitorApp() && supportsAlternateIcons()
}
