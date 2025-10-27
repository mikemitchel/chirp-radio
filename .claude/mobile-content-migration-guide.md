# Mobile Page Content - CMS Migration Guide

## Overview

We've created two new CMS collections to manage mobile app content:

1. **Mobile Page Content** - Page-specific content for each mobile screen
2. **Mobile App Settings** (Global) - Shared content used across the entire app

## Existing Static Content to Migrate

### 1. Make a Request Page (`/app/request`)

**Current Static Content in `src/pages/MakeRequest.tsx`:**

**Page Header:**
- Title: "Make a Song Request"
- Eyebrow: "CHIRP Radio"

**Not Logged In State (lines 76-78):**
```
"You need to be logged in to make a song request. This helps us know who the request is
coming from and ensures a better experience for everyone."
```

**Hint Text:**
- Currently hardcoded in form component: "Keep it friendly and respectful"

**CMS Entry to Create:**
```
Page Identifier: make-request
Page Title: Make a Song Request
Intro Content: (leave blank for now)
Form Hint Text: Keep it friendly and respectful
Is Login Required: true
Custom Not Logged In Message: (leave blank - will use global)
Is Active: true
```

---

### 2. Global App Settings

**Not Logged In Message (used across all pages):**

**Current in `MakeRequest.tsx` (lines 76-78):**
```
Title: (none - just paragraph text)
Message: "You need to be logged in to make a song request. This helps us know who the
request is coming from and ensures a better experience for everyone."
Login Button: "Log In"
Signup Button: "Sign Up"
```

**CMS Entry to Create:**
```
Mobile App Settings > Authentication Tab:

Not Logged In Message:
  Title: Login Required
  Message: You need to be logged in to access this feature. This helps us provide a better
           experience and keep track of your preferences.
  Login Button Text: Log In
  Signup Button Text: Sign Up
```

---

### 3. First Launch Welcome (TODO - design needed)

**Suggested Content:**
```
Mobile App Settings > First Launch Tab:

First Launch Welcome:
  Is Enabled: true
  Title: Welcome to CHIRP Radio
  Subtitle: Chicago's Independent Radio, Now in Your Pocket
  Content: Listen to CHIRP Radio anytime, anywhere. Save your favorite tracks, make song
           requests, and stay connected with Chicago's independent music scene.
  CTA Button Text: Get Started
```

---

### 4. Terms Acceptance (TODO - legal review needed)

**Suggested Setup:**
```
Mobile App Settings > Terms & Legal Tab:

Terms Acceptance:
  Is Required: false (for now)
  Title: Terms and Conditions
  Content: (Add actual terms when ready)
  Acceptance Text: I agree to the Terms and Conditions
  Terms URL: https://chirpradio.org/terms
  Privacy Policy URL: https://chirpradio.org/privacy
```

---

### 5. Error Messages

**Suggested Defaults:**
```
Mobile App Settings > Error Messages Tab:

Error Messages:
  Network Error: Unable to connect. Please check your internet connection.
  Server Error: Something went wrong. Please try again later.
  Authentication Error: Your session has expired. Please log in again.
  Not Found Error: Content not found.
  Permission Error: You don't have permission to access this content.
```

---

## Implementation Status

### ✅ Completed (Backend)
- [x] Create MobilePageContent collection in CMS
- [x] Create MobileAppSettings global in CMS
- [x] Add TypeScript types to Radio app
- [x] Update CMSContext to fetch mobile content
- [x] Create hooks: `useMobilePageByIdentifier()`, `useMobileAppSettings()`

### ⏳ Pending (Frontend Integration)
- [x] Update MakeRequest page to use CMS content
- [ ] Update other mobile pages (Now Playing, Recently Played, My Collection, Account Settings)
- [ ] Add First Launch Welcome screen
- [ ] Add Terms Acceptance flow
- [ ] Implement global error message handler

### ⏳ Pending (CMS Data Entry)
- [ ] Restart CMS server to create new collections
- [ ] Enter Make Request page content
- [ ] Enter global not-logged-in message
- [ ] Design and enter First Launch Welcome
- [ ] Add Terms & Conditions (pending legal review)
- [ ] Configure error messages

---

## Next Steps

1. **Restart CMS** - Collections won't appear until server restarts
2. **Enter Content** - Use this guide to populate the CMS
3. **Test** - Verify content loads correctly in the app
4. **Repeat** - Migrate other pages one by one

---

## Example: How to Update MakeRequest Page

**Before (hardcoded):**
```tsx
<p className="cr-profile-card__not-logged-in-description">
  You need to be logged in to make a song request...
</p>
```

**After (CMS-driven):**
```tsx
const { data: pageContent } = useMobilePageByIdentifier('make-request')
const { data: appSettings } = useMobileAppSettings()

const notLoggedInMessage =
  pageContent?.customNotLoggedInMessage ||
  appSettings?.notLoggedInMessage?.message ||
  'Please log in to continue'

<div dangerouslySetInnerHTML={{ __html: notLoggedInMessage }} />
```

---

## Files Changed

**CMS Repo (`chirp-cms`):**
- `src/collections/MobilePageContent.ts` (new)
- `src/globals/MobileAppSettings.ts` (new)
- `payload.config.ts` (updated)

**Radio Repo (`chirp-radio`):**
- `src/types/cms.ts` (updated - new interfaces)
- `src/contexts/CMSContext.tsx` (updated - fetch functions)
- `src/hooks/useData.ts` (updated - new hooks)

---

## Questions?

Refer to:
- CMS collection schemas for available fields
- TypeScript interfaces in `src/types/cms.ts` for type definitions
- Existing hooks in `src/hooks/useData.ts` for usage examples
