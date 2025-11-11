# CHIRP Radio - Pre-Launch QA Checklist

**Version:** 1.0
**Last Updated:** 2025-01-08
**Purpose:** Comprehensive testing guide for all platforms before beta/production launch

---

## Testing Environment Setup

### Prerequisites

- [ ] Test user account created with all permissions (Listener, DJ, Volunteer)
- [ ] CMS populated with test content (articles, events, podcasts, etc.)
- [ ] Production CMS API URL configured
- [ ] Network conditions tested (WiFi, cellular, poor connection)

### Test Devices Needed

- [ ] Desktop browser (Chrome, Safari, Firefox)
- [ ] iPhone (iOS 14+)
- [ ] Android phone (Android 10+)
- [ ] CarPlay-enabled vehicle or simulator
- [ ] Android Auto-enabled vehicle or simulator
- [ ] Apple Watch (if Watch app implemented)

---

## 1. Web App (Desktop/Mobile Browser)

### 1.1 Audio Streaming & Playback

#### Basic Playback

- [ ] Stream starts playing when play button clicked
- [ ] Audio plays without interruption for 10+ minutes
- [ ] Pause button stops playback
- [ ] Play/pause button states sync correctly
- [ ] Volume control adjusts audio level
- [ ] Mute button works correctly

#### Stream Quality

- [ ] 128kbps stream loads and plays (default)
- [ ] 64kbps stream loads and plays (quality toggle)
- [ ] Quality toggle switches stream without stopping playback
- [ ] No audio gaps when switching quality
- [ ] Stream quality persists after page reload

#### Now Playing Metadata

- [ ] Track title displays correctly
- [ ] Artist name displays correctly
- [ ] Album name displays correctly
- [ ] Label/record company displays correctly
- [ ] DJ name displays correctly
- [ ] Show name displays correctly
- [ ] Album art loads and displays
- [ ] Album art updates when track changes (within 5-10 seconds)
- [ ] "LOCAL" badge shows for local artists
- [ ] Metadata updates automatically during playback

### 1.2 Navigation & Page Loading

#### Main Navigation

- [ ] Logo links to home page
- [ ] All nav menu items load correct pages
- [ ] Active page indicator shows current location
- [ ] Mobile hamburger menu opens/closes
- [ ] Mobile menu items navigate correctly

#### Page Performance

- [ ] Home page loads in under 3 seconds
- [ ] Listen page loads in under 2 seconds
- [ ] All pages load without console errors
- [ ] Images lazy-load properly
- [ ] No layout shift during page load
- [ ] Back button navigates to previous page
- [ ] Browser history works correctly

#### Routing

- [ ] Direct URL navigation works for all pages
- [ ] 404 page shows for invalid URLs
- [ ] Redirects work (if configured in CMS)
- [ ] Deep links work correctly

### 1.3 Content Display

#### Home Page

- [ ] Current DJ card displays with correct info
- [ ] Current DJ profile image loads
- [ ] "On-Air" status shows when appropriate
- [ ] Featured content carousel works
- [ ] All content cards load images
- [ ] Links navigate to correct detail pages

#### Schedule Page

- [ ] Weekly schedule displays all time slots
- [ ] Current show is highlighted
- [ ] DJ names link to profile pages
- [ ] Show times display correctly (12-hour format)
- [ ] Schedule updates reflect CMS changes

#### DJ Profiles

- [ ] DJ list page displays all DJs with images
- [ ] DJ profile pages load with bio/description
- [ ] Social media links work (Facebook, Instagram, Twitter, TikTok, LinkedIn, Bluesky)
- [ ] Excerpt displays correctly
- [ ] Profile images load

#### Articles/Events/Podcasts

- [ ] List pages show all published items
- [ ] Detail pages display full content
- [ ] Categories filter correctly
- [ ] Dates display correctly
- [ ] Featured images load
- [ ] External links open in new tab
- [ ] Share buttons work

#### Shop

- [ ] All products display with images
- [ ] Product details load correctly
- [ ] Purchase links work
- [ ] Inventory status shows (if implemented)

### 1.4 User Account Features

#### Authentication

- [ ] Sign up form creates new account
- [ ] Login form authenticates existing user
- [ ] Email validation works
- [ ] Password requirements enforced
- [ ] "Forgot password" flow works
- [ ] Sign out clears session

#### Profile Management

- [ ] Profile page loads user data
- [ ] Edit profile form pre-fills data
- [ ] First/last name can be updated
- [ ] Email can be changed (with verification)
- [ ] Location can be updated
- [ ] Profile image can be uploaded and cropped
- [ ] Image cropper works correctly
- [ ] Cropped image saves and displays
- [ ] Social media links can be added/edited
- [ ] All social platforms save correctly (Facebook, Instagram, Twitter, TikTok, LinkedIn, Bluesky)
- [ ] Profile updates persist after reload

#### DJ-Specific Features (if DJ role)

- [ ] DJ name displays
- [ ] Show name displays
- [ ] DJ excerpt can be edited (65-180 chars)
- [ ] DJ bio can be edited (180-1000 chars)
- [ ] DJ donation link can be added
- [ ] Character counters work correctly
- [ ] "View DJ Profile" button navigates correctly

#### Volunteer Features (if Volunteer role)

- [ ] Volunteer form displays
- [ ] Primary phone required validation
- [ ] Zip code required validation
- [ ] Emergency contact fields save
- [ ] Shirt size saves
- [ ] Volunteer interests save

#### Settings

- [ ] Streaming quality toggle works (128kbps/64kbps)
- [ ] Dark mode toggle works (light/dark/device)
- [ ] Dark mode persists after reload
- [ ] Push notification toggle works (mobile only)

#### Recently Played

- [ ] "Add to Recently Played" button works during playback
- [ ] Tracks are added to history
- [ ] Recently played list displays correctly
- [ ] Album art shows in history
- [ ] List persists after page reload
- [ ] History survives 6 months (check timestamp)

### 1.5 Responsive Design

#### Mobile Browser (375px width)

- [ ] All pages display correctly
- [ ] Text is readable without zoom
- [ ] Buttons are tappable (44x44px min)
- [ ] Images scale properly
- [ ] No horizontal scroll
- [ ] Music player is usable

#### Tablet (768px width)

- [ ] Layout adapts correctly
- [ ] Sidebar displays when appropriate
- [ ] Music player maintains functionality

#### Desktop (1440px+ width)

- [ ] Content is centered/max-width applied
- [ ] Images don't stretch
- [ ] Whitespace is balanced

### 1.6 Accessibility

#### Keyboard Navigation

- [ ] Tab key navigates all interactive elements
- [ ] Focus indicators are visible
- [ ] Enter/Space activates buttons
- [ ] Escape closes modals

#### Screen Reader

- [ ] Alt text on all images
- [ ] ARIA labels on icon buttons
- [ ] Form inputs have labels
- [ ] Error messages are announced

#### Color Contrast

- [ ] Text meets WCAG AA standards (4.5:1)
- [ ] Links are distinguishable
- [ ] Focus indicators are visible

### 1.7 Performance

#### Load Times

- [ ] First contentful paint < 2s
- [ ] Time to interactive < 4s
- [ ] No memory leaks during extended use
- [ ] No excessive console errors/warnings

#### Network Conditions

- [ ] Works on slow 3G
- [ ] Offline fallbacks work
- [ ] CMS content caches properly (24hr TTL)
- [ ] Stale-while-revalidate updates work

---

## 2. iOS Native App

### 2.1 App Installation & Launch

#### First Launch

- [ ] App icon displays correctly on home screen
- [ ] Splash screen displays
- [ ] Onboarding screens display (if implemented)
- [ ] App doesn't crash on first open
- [ ] Permissions requested appropriately

#### App Updates

- [ ] App updates from TestFlight/App Store
- [ ] User data persists after update
- [ ] Settings persist after update

### 2.2 Audio Streaming & Playback

#### Basic Playback

- [ ] Stream plays when tapping play button
- [ ] Audio continues when phone locks
- [ ] Audio continues when switching apps
- [ ] Audio continues with screen off
- [ ] Pause button stops playback
- [ ] App doesn't crash during extended playback (30+ mins)

#### Quality & Performance

- [ ] 128kbps stream plays smoothly
- [ ] 64kbps stream plays smoothly
- [ ] Quality toggle works while playing
- [ ] No audio dropouts on WiFi
- [ ] No audio dropouts on cellular
- [ ] Handles poor network gracefully (buffering indicator)

#### Background Audio

- [ ] Audio continues in background
- [ ] Phone calls pause audio automatically
- [ ] Audio resumes after phone call ends
- [ ] Siri interruptions handled correctly
- [ ] Timer/alarm interruptions handled correctly
- [ ] Other media apps interrupt correctly

### 2.3 Lock Screen & Control Center

#### Media Controls

- [ ] Lock screen media controls appear when playing
- [ ] Play/pause button works from lock screen
- [ ] Track title displays on lock screen
- [ ] Artist name displays on lock screen
- [ ] Album name displays on lock screen
- [ ] Album art displays on lock screen
- [ ] Control Center media widget works
- [ ] Play/pause syncs between app and lock screen

#### Metadata Updates

- [ ] Metadata updates when track changes
- [ ] Album art updates when track changes
- [ ] Updates happen within 5-10 seconds
- [ ] No stale metadata after phone wakes from sleep
- [ ] Metadata shows immediately when returning to app

### 2.4 iOS-Specific Features

#### Notifications

- [ ] Push notifications work (if enabled)
- [ ] Notification permissions requested
- [ ] Notifications display correctly
- [ ] Tapping notification opens app

#### App Icon Customization (iOS 10.3+)

- [ ] App icon selector displays (if in /app routes)
- [ ] Icon options show preview
- [ ] Changing icon updates home screen
- [ ] Selected icon persists

#### Dark Mode

- [ ] App respects system dark mode setting
- [ ] "Device" setting follows system
- [ ] "Light" setting forces light mode
- [ ] "Dark" setting forces dark mode
- [ ] Mode persists after app restart

#### Gestures

- [ ] Swipe gestures work (if implemented)
- [ ] Pull-to-refresh works (if implemented)
- [ ] Pinch-to-zoom works where appropriate

### 2.5 Navigation & UI

#### Tab Bar / Bottom Navigation

- [ ] All tabs navigate correctly
- [ ] Active tab indicator shows
- [ ] Tab bar visible on all appropriate screens

#### Status Bar

- [ ] Status bar displays correctly
- [ ] Status bar color matches app theme
- [ ] Safe area insets respected (notch/Dynamic Island)

#### Modals & Overlays

- [ ] Modals display correctly
- [ ] Dismiss gestures work
- [ ] Modals don't cover critical UI

### 2.6 Performance

#### Memory & Battery

- [ ] No memory leaks during extended use
- [ ] Battery drain is reasonable (<5% per hour)
- [ ] App doesn't overheat device
- [ ] No excessive background activity

#### Network

- [ ] Offline mode works (cached content)
- [ ] Network switch (WiFi ↔ cellular) handled gracefully
- [ ] No data loss on poor connection

---

## 3. Android Native App

### 3.1 App Installation & Launch

#### First Launch

- [ ] App icon displays correctly on launcher
- [ ] Splash screen displays
- [ ] Onboarding screens display (if implemented)
- [ ] App doesn't crash on first open
- [ ] Runtime permissions requested appropriately

#### App Updates

- [ ] App updates from Play Store
- [ ] User data persists after update
- [ ] Settings persist after update

### 3.2 Audio Streaming & Playback

#### Basic Playback

- [ ] Stream plays when tapping play button
- [ ] Audio continues when phone locks
- [ ] Audio continues when switching apps
- [ ] Audio continues with screen off
- [ ] Pause button stops playback
- [ ] App doesn't crash during extended playback (30+ mins)

#### Quality & Performance

- [ ] 128kbps stream plays smoothly
- [ ] 64kbps stream plays smoothly
- [ ] Quality toggle works while playing
- [ ] No audio dropouts on WiFi
- [ ] No audio dropouts on cellular (4G/5G)
- [ ] Handles poor network gracefully (buffering indicator)

#### Background Audio

- [ ] Audio continues in background
- [ ] Phone calls pause audio automatically
- [ ] Audio resumes after phone call ends
- [ ] Google Assistant interruptions handled correctly
- [ ] Alarm interruptions handled correctly
- [ ] Other media apps interrupt correctly

### 3.3 Lock Screen & Notification Controls

#### Media Controls

- [ ] Lock screen media controls appear when playing
- [ ] Play/pause button works from lock screen
- [ ] Track title displays on lock screen
- [ ] Artist name displays on lock screen
- [ ] Album name displays on lock screen
- [ ] Album art displays on lock screen
- [ ] Notification media controls work
- [ ] Play/pause syncs between app and lock screen/notification

#### Metadata Updates

- [ ] Metadata updates when track changes
- [ ] Album art updates when track changes
- [ ] Updates happen within 5-10 seconds
- [ ] No stale metadata after phone wakes from sleep
- [ ] Metadata shows immediately when returning to app

### 3.4 Android-Specific Features

#### Notifications

- [ ] Notification channel created
- [ ] Media notification displays while playing
- [ ] Notification actions work (play/pause)
- [ ] Notification clears when playback stops
- [ ] Push notifications work (if enabled)

#### Material Design

- [ ] UI follows Material Design guidelines
- [ ] Ripple effects work on tappable elements
- [ ] Elevation/shadows display correctly
- [ ] Motion/transitions are smooth

#### Dark Mode

- [ ] App respects system dark mode setting
- [ ] "Device" setting follows system
- [ ] "Light" setting forces light mode
- [ ] "Dark" setting forces dark mode
- [ ] Mode persists after app restart

#### Back Button

- [ ] Back button navigates correctly
- [ ] Back button exits app from home screen
- [ ] Back gesture works (Android 10+)

### 3.5 Navigation & UI

#### Navigation Drawer / Bottom Nav

- [ ] Navigation opens/closes correctly
- [ ] All menu items navigate correctly
- [ ] Active item indicator shows
- [ ] Navigation visible on all appropriate screens

#### Status Bar

- [ ] Status bar displays correctly
- [ ] Status bar color matches app theme
- [ ] Notch/cutout handled correctly

### 3.6 Performance

#### Memory & Battery

- [ ] No memory leaks during extended use
- [ ] Battery drain is reasonable (<5% per hour)
- [ ] App doesn't overheat device
- [ ] No excessive background activity
- [ ] Battery optimization doesn't kill audio

#### Network

- [ ] Offline mode works (cached content)
- [ ] Network switch (WiFi ↔ cellular) handled gracefully
- [ ] No data loss on poor connection

---

## 4. CarPlay

### 4.1 Connection & Setup

#### Initial Connection

- [ ] App appears in CarPlay launcher
- [ ] App icon displays correctly in CarPlay
- [ ] App opens when tapped in CarPlay

#### Disconnect/Reconnect

- [ ] App state persists when reconnecting
- [ ] Playback continues when reconnecting
- [ ] Settings persist across connections

### 4.2 Audio Playback

#### Basic Playback

- [ ] Stream starts when play button tapped
- [ ] Audio plays through car speakers
- [ ] Pause button stops playback
- [ ] Play/pause button states sync correctly
- [ ] Volume controlled by car volume knob

#### Now Playing Screen

- [ ] Track title displays
- [ ] Artist name displays
- [ ] Album art displays (square format)
- [ ] Album art updates when track changes
- [ ] DJ/show info displays (if space allows)

#### Playback Control Sync

- [ ] Play/pause from CarPlay syncs to phone app
- [ ] Play/pause from phone syncs to CarPlay
- [ ] Starting playback on phone continues in CarPlay
- [ ] Metadata updates sync between devices

### 4.3 CarPlay UI

#### Layout & Design

- [ ] UI follows CarPlay design guidelines
- [ ] Text is readable at a glance
- [ ] Touch targets are appropriately sized
- [ ] No unnecessary UI elements (minimize distraction)

#### Navigation

- [ ] Back button returns to previous screen
- [ ] Home button returns to CarPlay launcher
- [ ] Tab bar works (if multiple screens)

### 4.4 Safety & Compliance

#### Driver Distraction

- [ ] No video content plays while driving
- [ ] No text input while driving
- [ ] Minimal interaction required
- [ ] Audio feedback for actions

#### Focus Management

- [ ] Siri interruptions handled correctly
- [ ] Phone calls interrupt playback
- [ ] Navigation app audio ducking works
- [ ] Playback resumes after interruptions

---

## 5. Android Auto

### 5.1 Connection & Setup

#### Initial Connection

- [ ] App appears in Android Auto launcher
- [ ] App icon displays correctly
- [ ] App opens when tapped

#### Disconnect/Reconnect

- [ ] App state persists when reconnecting
- [ ] Playback continues when reconnecting
- [ ] Settings persist across connections

### 5.2 Audio Playback

#### Basic Playback

- [ ] Stream starts when play button tapped
- [ ] Audio plays through car speakers
- [ ] Pause button stops playback
- [ ] Play/pause button states sync correctly
- [ ] Volume controlled by car volume knob

#### Now Playing Screen

- [ ] Track title displays
- [ ] Artist name displays
- [ ] Album art displays
- [ ] Album art updates when track changes
- [ ] DJ/show info displays (if space allows)

#### Playback Control Sync

- [ ] Play/pause from Android Auto syncs to phone app
- [ ] Play/pause from phone syncs to Android Auto
- [ ] Starting playback on phone continues in Android Auto
- [ ] Metadata updates sync between devices

### 5.3 Android Auto UI

#### Layout & Design

- [ ] UI follows Android Auto design guidelines
- [ ] Text is readable at a glance
- [ ] Touch targets are appropriately sized
- [ ] Day/night mode adapts to car settings

#### Navigation

- [ ] Back button returns to previous screen
- [ ] Home button returns to Android Auto launcher

### 5.4 Safety & Compliance

#### Driver Distraction

- [ ] No video content plays while driving
- [ ] No text input while driving
- [ ] Minimal interaction required
- [ ] Audio feedback for actions

#### Focus Management

- [ ] Google Assistant interruptions handled correctly
- [ ] Phone calls interrupt playback
- [ ] Navigation app audio ducking works
- [ ] Playback resumes after interruptions

---

## 6. Apple Watch (If Implemented)

### 6.1 Watch App Installation

- [ ] Watch app installs with iOS app
- [ ] Watch app icon displays on watch face
- [ ] Watch app opens correctly

### 6.2 Basic Functionality

- [ ] Play/pause button works
- [ ] Now playing info displays (track, artist)
- [ ] Album art displays (watch face size)
- [ ] Volume control works

### 6.3 Complications (If Implemented)

- [ ] Watch face complication shows current track
- [ ] Complication updates when track changes
- [ ] Tapping complication opens app

### 6.4 Notifications

- [ ] Show start notifications work (if implemented)
- [ ] Tapping notification opens app on watch

---

## 7. Cross-Platform Testing

### 7.1 Multi-Device Sync

- [ ] User login syncs across devices
- [ ] Recently played syncs across devices
- [ ] Settings sync across devices (if cloud-backed)
- [ ] Profile changes sync across devices

### 7.2 Handoff Between Platforms

- [ ] Starting playback on web continues on mobile
- [ ] Starting playback on mobile continues on web
- [ ] Playback state syncs within 5 seconds
- [ ] Quality settings persist across platforms

### 7.3 Content Consistency

- [ ] Same content displays on all platforms
- [ ] CMS updates reflect on all platforms
- [ ] Images load correctly on all platforms
- [ ] Links work correctly on all platforms

---

## 8. Edge Cases & Error Handling

### 8.1 Network Issues

- [ ] Graceful degradation on slow connection
- [ ] Error message on no connection
- [ ] Retry mechanism works
- [ ] Cached content loads when offline
- [ ] Stream reconnects after network restoration

### 8.2 API Failures

- [ ] CMS API failure shows error message
- [ ] Mock data fallback works (if implemented)
- [ ] App doesn't crash on API error
- [ ] User can retry failed requests

### 8.3 Authentication Errors

- [ ] Expired session handled gracefully
- [ ] Invalid credentials show clear error
- [ ] Password reset link works
- [ ] Account locked shows appropriate message

### 8.4 Media Errors

- [ ] Stream URL failure shows error
- [ ] Album art load failure shows placeholder
- [ ] Missing metadata handled gracefully
- [ ] Corrupt audio stream handled

---

## 9. Security & Privacy

### 9.1 Authentication Security

- [ ] Passwords are hashed (never stored plain text)
- [ ] HTTPS used for all API calls
- [ ] Session tokens expire appropriately
- [ ] "Remember me" is secure

### 9.2 User Data Privacy

- [ ] Privacy policy is accessible
- [ ] Terms of service are accessible
- [ ] User can delete account
- [ ] User data is not shared without consent

### 9.3 App Permissions

- [ ] Only necessary permissions requested
- [ ] Permission rationale provided
- [ ] App functions without optional permissions

---

## 10. Production Readiness

### 10.1 Configuration

- [ ] Production API URLs configured
- [ ] Analytics tracking enabled (if implemented)
- [ ] Error reporting enabled (if implemented)
- [ ] Feature flags set correctly

### 10.2 Performance Monitoring

- [ ] No console errors in production
- [ ] No console warnings in production
- [ ] Load times meet targets
- [ ] Memory usage is reasonable

### 10.3 Legal & Compliance

- [ ] Copyright notices in place
- [ ] Third-party licenses included
- [ ] GDPR compliance (if applicable)
- [ ] COPPA compliance (if applicable)

---

## Testing Sign-Off

### Test Phases

- [ ] **Alpha Testing** - Internal team testing (all platforms)
- [ ] **Beta Testing** - Limited external users (iOS TestFlight, Android Internal Testing)
- [ ] **Production Testing** - Smoke tests after deployment

### Sign-Off Required From:

- [ ] Product Owner
- [ ] Lead Developer
- [ ] QA Lead
- [ ] Stakeholder

---

## Notes & Issues

### Critical Issues

_Document any critical issues found during testing:_

- Issue #1: [Description]
- Issue #2: [Description]

### Known Issues (Non-Blocking)

_Document known issues that are acceptable for launch:_

- Issue #1: [Description]
- Issue #2: [Description]

### Future Enhancements

_Features to consider post-launch:_

- Enhancement #1: [Description]
- Enhancement #2: [Description]

---

**Document Version:** 1.0
**Last Reviewed:** 2025-01-08
**Next Review:** Before production launch
