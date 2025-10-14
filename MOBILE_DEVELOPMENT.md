# Mobile Development Guide

This guide covers developing, testing, and deploying the CHIRP Radio mobile apps for iOS and Android using Capacitor.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Initial Setup](#initial-setup)
- [Development Workflow](#development-workflow)
  - [Debugging Mobile Apps](#debugging-mobile-apps)
- [Testing in Emulators](#testing-in-emulators)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software

#### macOS System Requirements

- macOS 12.0 or later
- Xcode 15.0 or later (for iOS development)
- Command Line Tools for Xcode

#### Package Manager

- [Homebrew](https://brew.sh/) - macOS package manager

### Install Development Tools

```bash
# Install Node.js (via fnm, nvm, or directly)
brew install node

# Install CocoaPods (for iOS dependencies)
brew install cocoapods

# Install Java 21 (required for Android builds with Capacitor 7.x)
brew install --cask zulu@21

# Install Android Studio (for Android development)
brew install --cask android-studio

# Install Android Command Line Tools
brew install --cask android-commandlinetools
```

### Android Studio Setup

1. **Open Android Studio** after installation
2. **Install SDK Components**:
   - Go to `Settings > Appearance & Behavior > System Settings > Android SDK`
   - Install:
     - Android SDK Platform 34 or later
     - Android SDK Build-Tools
     - Android SDK Platform-Tools
     - Android Emulator
3. **Create an Android Virtual Device (AVD)**:
   - Go to `Tools > Device Manager`
   - Click "Create Device"
   - Select a device definition (e.g., Pixel 6)
   - Select a system image (e.g., API 34)
   - Click "Finish"

### Xcode Setup

1. **Install Xcode** from the Mac App Store
2. **Open Xcode** and accept the license agreement
3. **Install iOS Simulator**:
   - Go to `Xcode > Settings > Platforms`
   - Ensure iOS simulators are installed
4. **Install Command Line Tools**:
   ```bash
   xcode-select --install
   ```

### Verify Installation

```bash
# Verify Node.js
node --version

# Verify Java (should be version 21)
java -version

# Verify CocoaPods
pod --version

# Verify Android tools
which adb

# Verify Xcode
xcodebuild -version
```

## Initial Setup

### Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd chirp-radio

# Install npm dependencies
npm install

# Build the web app
npm run build

# Sync Capacitor (copies web assets to native projects)
npm run cap:sync
```

### iOS Setup

```bash
# Install iOS pods
cd ios/App
pod install
cd ../..
```

### Android Setup

The Android Gradle wrapper should be ready to use. Verify with:

```bash
cd android
./gradlew tasks
cd ..
```

## Development Workflow

### Standard Development Cycle

1. **Develop the React app** using the Vite dev server:

   ```bash
   npm run dev
   ```

2. **Make your changes** to the React codebase in `src/`

3. **Test in browser** at `http://localhost:5173`

4. **Build and sync to mobile platforms**:
   ```bash
   npm run build:mobile
   ```
   This runs `npm run build && npx cap sync` to build the web app and copy assets to both iOS and Android.

### Platform-Specific Sync

If you only need to sync to one platform:

```bash
# Sync to iOS only
npm run build:ios

# Sync to Android only
npm run build:android
```

### Manual Sync

If you've already built the web app and just need to sync:

```bash
npm run cap:sync
```

### Debugging Mobile Apps

#### Development Logger

The project includes a development-only logger utility that provides console logging for debugging. Logs automatically appear when running in development mode and are stripped from production builds.

**Viewing Logs:**

**iOS (Safari Web Inspector):**

1. Enable Developer menu in Safari: `Safari > Settings > Advanced > Show features for web developers`
2. Run your app: `npm run cap:ios`
3. In Safari: `Develop > [Your Device Name] > [App Name]`
4. Open the Console tab to see logs

**Android (Chrome DevTools):**

1. Run your app: `npm run cap:android`
2. In Chrome, navigate to: `chrome://inspect`
3. Click "Inspect" under your app
4. Open the Console tab to see logs

**Log Examples:**

```
[AudioPlayerContext] Fetching now playing...
[AudioPlayerContext] isNative: true
[AudioPlayerContext] Parsed track data: { artist: "...", track: "..." }
[MobileApp] Preloading data...
```

All debug logs are automatically prefixed with their source component name (e.g., `[AudioPlayerContext]`, `[MobileApp]`) to make debugging easier.

**Note:** These logs will NOT appear in production builds (created via Xcode Archive or `./gradlew assembleRelease`).

## Testing in Emulators

### iOS Simulator

**Quick Launch:**

```bash
npm run cap:ios
```

This will:

1. Open Xcode
2. Launch the iOS Simulator
3. Install and run the app

**Manual Testing:**

1. Open Xcode:
   ```bash
   npm run cap:open:ios
   ```
2. Select a simulator from the device dropdown (e.g., "iPhone 15 Pro")
3. Click the "Play" button or press `Cmd+R`

**Available Simulators:**

```bash
# List available simulators
xcrun simctl list devices
```

### Android Emulator

**Quick Launch:**

```bash
npm run cap:android
```

This will:

1. Launch Android Studio
2. Start the selected emulator
3. Install and run the app

**Manual Testing:**

1. Start an Android emulator:
   - Open Android Studio
   - Go to `Tools > Device Manager`
   - Click the "Play" button next to your AVD

2. Build and install the app:
   ```bash
   npm run cap:open:android
   ```
   Then click "Run" in Android Studio

**Command Line Alternative:**

```bash
cd android
./gradlew installDebug
cd ..

# Or run directly
./gradlew installDebug && adb shell am start -n org.chirpradio.app/.MainActivity
```

## Building for Production

### iOS Production Build

1. **Open Xcode**:

   ```bash
   npm run cap:open:ios
   ```

2. **Configure Code Signing**:
   - Select the "App" target
   - Go to "Signing & Capabilities"
   - Select your development team
   - Configure bundle identifier if needed

3. **Archive the App**:
   - In Xcode menu: `Product > Archive`
   - Wait for the archive to complete
   - The Organizer window will open

4. **Choose Distribution Method**:
   - **App Store**: For App Store submission
   - **Ad Hoc**: For testing on registered devices
   - **Development**: For local testing

### Android Production Build

#### Build Release APK

```bash
cd android

# Build release APK (for side-loading)
./gradlew assembleRelease

# Output: android/app/build/outputs/apk/release/app-release.apk
```

#### Build App Bundle (for Google Play)

```bash
cd android

# Build release bundle
./gradlew bundleRelease

# Output: android/app/build/outputs/bundle/release/app-release.aab
```

**Note:** You'll need to configure signing in `android/app/build.gradle` for production builds. See [Android Signing Documentation](https://developer.android.com/studio/publish/app-signing).

## Deployment

### iOS Deployment

#### TestFlight (Beta Testing)

1. **Archive the app** (see Building for Production)
2. In Organizer, select "Distribute App"
3. Choose "App Store Connect"
4. Follow the wizard to upload to TestFlight
5. Add testers in App Store Connect

#### App Store Release

1. **Create an App Store Connect record**
2. **Archive and upload** (same as TestFlight)
3. In App Store Connect:
   - Fill in app metadata
   - Add screenshots
   - Submit for review

#### Ad Hoc Distribution

1. **Archive the app**
2. Choose "Ad Hoc" distribution
3. Export the IPA file
4. Distribute to testers via:
   - Email/file sharing
   - Third-party services (e.g., TestFlight alternatives)

### Android Deployment

#### Google Play Store

1. **Create a Google Play Console account**
2. **Create a new app** in the console
3. **Generate a signing key**:
   ```bash
   keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
   ```
4. **Configure signing** in `android/app/build.gradle`
5. **Build the app bundle**:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
6. **Upload to Google Play Console**:
   - Go to "Release > Production"
   - Upload the AAB file from `android/app/build/outputs/bundle/release/`
   - Fill in release notes and submit for review

#### Side-loading (APK Distribution)

1. **Build release APK**:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
2. **Sign the APK** (if not already configured)
3. **Distribute the APK** from `android/app/build/outputs/apk/release/`
4. Users can install by:
   - Enabling "Install from Unknown Sources"
   - Opening the APK file

## Troubleshooting

### Common Issues

#### iOS Build Fails - "No such module 'Capacitor'"

**Solution:**

```bash
cd ios/App
pod install
cd ../..
```

#### Android Build Fails - "invalid source release: 21"

**Cause:** Java 17 is installed but Java 21 is required.

**Solution:**

```bash
# Install Java 21
brew install --cask zulu@21

# Verify Java 21 is configured in android/gradle.properties
grep "org.gradle.java.home" android/gradle.properties
```

Should show:

```properties
org.gradle.java.home=/Library/Java/JavaVirtualMachines/zulu-21.jdk/Contents/Home
```

#### Android Emulator Won't Start

**Solution:**

1. Open Android Studio
2. Go to `Tools > Device Manager`
3. Delete the AVD and create a new one
4. Ensure virtualization is enabled in BIOS

#### iOS Simulator Not Found

**Solution:**

```bash
# List available simulators
xcrun simctl list devices

# Boot a specific simulator
xcrun simctl boot "iPhone 15 Pro"

# Or use the generic run command
npm run cap:ios
```

#### Changes Not Reflected in Mobile App

**Cause:** Forgot to sync after building.

**Solution:**

```bash
# Always build AND sync
npm run build:mobile

# Or manually
npm run build
npm run cap:sync
```

#### Debugging API or Data Issues

**Symptoms:** App runs but data doesn't load, or features don't work as expected.

**Solution:**

1. **Check the development logs** using Safari Web Inspector (iOS) or Chrome DevTools (Android):
   - See the "Debugging Mobile Apps" section above for setup instructions
   - Look for error messages or failed network requests
   - Check for messages like:
     ```
     [AudioPlayerContext] Fetching now playing...
     [AudioPlayerContext] Response status: 200
     [AudioPlayerContext] Parsed track data: { artist: "...", track: "..." }
     ```

2. **Common log indicators:**
   - `Response status: 200` = API call succeeded
   - `Response status: 404` or `500` = API call failed
   - `isNative: true` = App correctly detects it's running on mobile
   - `fetchUrl: https://...` = App is using the correct API endpoint

3. **If logs aren't appearing:**
   - Ensure you're running in development mode (`npm run cap:ios` or `npm run cap:android`)
   - Check that Safari Web Inspector or Chrome DevTools is properly connected
   - Rebuild the app: `npm run build:mobile`

#### CocoaPods Installation Fails

**Solution:**

```bash
# Update CocoaPods
brew upgrade cocoapods

# Clear cache
cd ios/App
rm -rf Pods Podfile.lock
pod install --repo-update
```

#### Gradle Build Fails - "Could not find or load main class"

**Cause:** Missing gradle-wrapper.jar

**Solution:**

```bash
# Download the wrapper jar
curl -L https://raw.githubusercontent.com/gradle/gradle/v8.11.1/gradle/wrapper/gradle-wrapper.jar -o android/gradle/wrapper/gradle-wrapper.jar
```

### Getting Help

- **Capacitor Docs**: https://capacitorjs.com/docs
- **iOS Development**: https://developer.apple.com/documentation/
- **Android Development**: https://developer.android.com/docs
- **Project Issues**: Open an issue in the repository

## Quick Reference

### Useful Commands

```bash
# Development
npm run dev                    # Start Vite dev server
npm run build                  # Build web app
npm run build:mobile           # Build + sync to both platforms

# Mobile Commands
npm run cap:sync               # Sync web assets to native projects
npm run cap:ios                # Run on iOS simulator (with debug logs)
npm run cap:android            # Run on Android emulator (with debug logs)
npm run cap:open:ios           # Open Xcode
npm run cap:open:android       # Open Android Studio

# Debugging
# iOS: Safari > Develop > [Device] > [App] (Console tab)
# Android: chrome://inspect (Console tab)

# Testing
npm run test                   # Run unit tests
npm run test:e2e              # Run end-to-end tests
npm run lint                   # Run linter
npm run format                 # Format code

# Android Commands
cd android && ./gradlew assembleDebug       # Build debug APK
cd android && ./gradlew assembleRelease     # Build release APK
cd android && ./gradlew bundleRelease       # Build release bundle
cd android && ./gradlew clean               # Clean build

# iOS Commands (from ios/App directory)
pod install                    # Install CocoaPods dependencies
pod update                     # Update CocoaPods dependencies
```

### Project Structure

```
chirp-radio/
├── src/                       # React source code
├── dist/                      # Built web app (generated)
├── ios/                       # iOS native project
│   └── App/
│       ├── App.xcworkspace   # Open this in Xcode
│       ├── Podfile           # iOS dependencies
│       └── App/
│           └── Info.plist    # iOS app configuration
├── android/                   # Android native project
│   ├── app/
│   │   ├── build.gradle      # App-level build config
│   │   └── src/main/
│   │       ├── AndroidManifest.xml
│   │       └── java/         # Native Android code
│   ├── build.gradle          # Project-level build config
│   ├── gradle.properties     # Gradle configuration
│   └── gradlew              # Gradle wrapper
├── capacitor.config.ts       # Capacitor configuration
└── package.json              # npm scripts and dependencies
```

### Configuration Files

- **capacitor.config.ts**: Main Capacitor configuration
- **ios/App/App/Info.plist**: iOS app settings, permissions, capabilities
- **android/app/src/main/AndroidManifest.xml**: Android app settings, permissions
- **android/gradle.properties**: Java/Gradle configuration
- **android/variables.gradle**: Android SDK versions

## Additional Resources

- [Capacitor iOS Documentation](https://capacitorjs.com/docs/ios)
- [Capacitor Android Documentation](https://capacitorjs.com/docs/android)
- [Apple Developer Portal](https://developer.apple.com/)
- [Google Play Console](https://play.google.com/console)
