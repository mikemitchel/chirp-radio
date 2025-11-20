# Firebase App Distribution - Android Debug Build Process

## Build & Deploy Process

1. **Build React app**

   ```bash
   npm run build
   ```

2. **Sync Capacitor**

   ```bash
   npx cap sync android
   ```

3. **Build Debug APK**

   ```bash
   cd android
   ./gradlew assembleDebug
   ```

4. **Deploy to Firebase**
   ```bash
   # From android/ directory
   firebase appdistribution:distribute \
     app/build/outputs/apk/debug/app-debug.apk \
     --app 1:864618990995:android:478d2b0020b71f59efec66 \
     --groups testers \
     --project chirp-radio---testing
   ```

## Key Info

- **Project ID:** chirp-radio---testing
- **Project Number:** 864618990995
- **App ID:** 1:864618990995:android:478d2b0020b71f59efec66
- **APK Location:** `android/app/build/outputs/apk/debug/app-debug.apk`
- **Tester Group:** testers
- **Build Type:** Debug (unsigned, for testing only)
- **Service Account:** firebase-adminsdk-fbsvc@chirp-radio---testing.iam.gserviceaccount.com
- **Service Account Key:** `/Users/ryanwilson/Documents/Clients/CHIRP Radio/firebase/chirp-radio---testing-firebase-adminsdk-fbsvc-66b6c20275.json`

## Common Issues

- **403 Permission Error:** Account needs App Distribution permissions in Firebase Console
- **APK not found:** Verify you're in the correct directory (android/ vs root)
- **No active project:** Add `--project chirp-radio---testing` flag
- **CLI Upload Intermittent Failures:** The CLI upload can fail with 403 or "could not find your app" errors even when all permissions are correct. This appears to be an intermittent Firebase issue. When this happens, use the manual upload fallback.

## Manual Upload Fallback

If CLI fails, upload manually at:
https://console.firebase.google.com/project/chirp-radio---testing/appdistribution

Drag and drop the APK file from: `android/app/build/outputs/apk/debug/app-debug.apk`
