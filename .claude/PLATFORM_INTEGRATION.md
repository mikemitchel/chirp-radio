# Platform Integration Reference

Reference documentation for CarPlay and Android Auto implementations. Code is complete, waiting for external dependencies.

---

## CarPlay Integration

### Status: ✅ Code Complete - Waiting for Apple Approval

**Files:**
- `ios/App/App/Info.plist` - CarPlay scene configuration
- `ios/App/App/App.entitlements` - `com.apple.developer.playable-content` entitlement
- `ios/App/App/CarPlayBridge.swift` - CarPlay UI bridge (Now Playing template)
- `ios/App/App/NativeAudioPlayer.swift` - Native audio player with CarPlay support
- `ios/App/App/SceneDelegate.swift` - Plugin registration
- `src/contexts/AudioPlaybackContext.tsx` - Singleton pattern for iOS playback

**Features:**
- Native AVPlayer with external playback enabled
- Singleton pattern prevents multiple initializations
- Play/pause sync between phone and CarPlay
- Now Playing metadata with album art
- Lock screen controls
- Background audio playback
- Remote command center integration

### Post-Approval Steps

1. **Check for approval email** from Apple Developer Program
   - Subject: "CarPlay Audio App Entitlement Request - Approved"

2. **Update provisioning profiles:**
   - Go to Apple Developer Portal → Certificates, Identifiers & Profiles
   - Select App ID (com.ryanwilson.chirpradio)
   - Verify "CarPlay Audio" capability enabled
   - Regenerate provisioning profiles
   - Download new profiles

3. **Install profiles in Xcode:**
   - Xcode preferences → Accounts
   - Select Apple ID
   - Click "Download Manual Profiles"

4. **Clean and rebuild:**
   ```bash
   cd ios/App
   xcodebuild clean
   # Rebuild in Xcode (Cmd+B)
   ```

5. **Test in CarPlay Simulator:**
   - Xcode → Open Developer Tool → Simulator
   - Run app
   - I/O → External Displays → CarPlay
   - Verify app appears in CarPlay grid

### Testing Checklist

**CarPlay Simulator:**
- [ ] App appears in CarPlay grid
- [ ] Tapping app shows Now Playing interface
- [ ] Album art displays correctly
- [ ] Track metadata shows (song, artist, album)
- [ ] Play/pause buttons work
- [ ] Play/pause syncs with phone app
- [ ] Now Playing shows "CHIRP Radio" when idle

**Real CarPlay:**
- [ ] App appears in vehicle CarPlay
- [ ] Audio plays through car speakers
- [ ] Play/pause works from CarPlay
- [ ] Play/pause works from steering wheel controls
- [ ] Lock screen controls work
- [ ] Switching apps doesn't stop playback
- [ ] Incoming call pauses/resumes correctly

### Troubleshooting

**"Unable to connect" after approval:**
- Verify provisioning profile includes CarPlay entitlement
- Check Xcode console for CarPlay logs (🚗 emoji)
- Ensure Now Playing info is set
- Verify audio session is active

**Common Issues:**
- No CarPlay scene connection → Entitlement not approved yet
- App appears but can't connect → Provisioning profile needs regeneration
- No play/pause sync → Remote command center not configured

---

## Android Auto Integration

### Status: ✅ Code Complete - Tested in Emulator, Needs Physical Device Testing

**Files:**
- `android/app/src/main/AndroidManifest.xml` - MediaBrowserService declaration
- `android/app/src/main/java/org/chirpradio/app/ChirpMediaService.kt` - MediaBrowserService
- `android/app/src/main/java/org/chirpradio/app/NativeAudioPlayer.kt` - ExoPlayer streaming
- `android/app/src/main/java/org/chirpradio/app/NativeAudioBridgePlugin.kt` - Capacitor plugin
- `android/app/src/main/java/org/chirpradio/app/MediaSessionManager.kt` - MediaSession management
- `android/app/src/main/java/org/chirpradio/app/MainActivity.java` - Plugin registration
- `src/plugins/NativeAudioBridge.ts` - TypeScript wrapper
- `src/contexts/AudioPlaybackContext.tsx` - React context with native playback sync

**Features:**
- Native ExoPlayer for reliable streaming
- MediaBrowserService for Android Auto discovery
- Play/pause sync between app UI and Android Auto
- Now Playing metadata with album art
- Lock screen controls
- Notification media controls
- Background audio playback
- Audio focus management (disabled in ExoPlayer to prevent conflicts)

### Emulator Setup

```bash
# List available emulators
~/Library/Android/sdk/emulator/emulator -list-avds

# Launch Android Automotive emulator
~/Library/Android/sdk/emulator/emulator -avd Automotive_ARM64 -no-snapshot-load

# Build and install APK
cd android
./gradlew assembleDebug
~/Library/Android/sdk/platform-tools/adb -s emulator-5554 install -r app/build/outputs/apk/debug/app-debug.apk

# Monitor logs
~/Library/Android/sdk/platform-tools/adb -s emulator-5554 logcat | grep -E "NativeAudioBridge|ChirpMediaService"
```

### Emulator Testing ✅ Verified

- [x] App appears in Android Auto media apps
- [x] Tapping app shows Now Playing interface
- [x] Album art displays correctly
- [x] Track metadata shows (song, artist, label)
- [x] Play/pause buttons work
- [x] Play/pause syncs between app and Android Auto controls
- [x] Lock screen controls work
- [x] Notification controls work
- [x] No flicker when switching controls

### Physical Device Testing (TODO)

- [ ] Install APK on physical Android device
- [ ] Verify notification media controls (play/pause sync)
- [ ] Verify lock screen controls (play/pause sync)
- [ ] Test background playback (switching apps, screen off)
- [ ] If Android Auto available:
  - [ ] App appears in Android Auto
  - [ ] Audio plays through car speakers/phone
  - [ ] Play/pause from Android Auto controls
  - [ ] Play/pause from steering wheel controls (if in vehicle)
  - [ ] Play/pause from app UI syncs with Android Auto
  - [ ] Album art and metadata display correctly
  - [ ] Switching apps doesn't stop playback
  - [ ] Incoming call pauses/resumes correctly

### Troubleshooting

**Play/pause out of sync:**
- Ensure audio focus is disabled in ExoPlayer (`handleAudioFocus = false`)

**Immediate pause after play:**
- Check for audio focus conflicts in logcat (`grep "audio focus"`)

**App not appearing in Android Auto:**
- Verify MediaBrowserService is declared in AndroidManifest.xml

**No audio playback:**
- Check ExoPlayer initialization and stream URL validity

### Debugging Commands

```bash
# Check app version
~/Library/Android/sdk/platform-tools/adb shell "pm dump org.chirpradio.app | grep versionName"

# Monitor all app logs
~/Library/Android/sdk/platform-tools/adb logcat | grep "org.chirpradio"

# Monitor audio-specific logs
~/Library/Android/sdk/platform-tools/adb logcat | grep -E "NativeAudioBridge|ChirpMediaService|NativeAudioPlayer"
```
