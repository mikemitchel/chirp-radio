# CHIRP Radio Project - Claude Instructions

## Important rules

1. Never commit to main - always branch before committing
2. Always commit to origin and mitch
3. Make clear, detailed commit messages to both repos
4. Do NOT commit until changes have been tested first
5. Always ask before committing - confirm with user first
6. When creating branches, use descriptive names (feat/, fix/, docs/, etc.)
7. For documentation-only changes in .claude/, still create a branch (no exceptions)
8. After branching, verify you're not on main before committing (git branch --show-current)
9. Please do not add "🤖 Generated with [Claude Code](https://claude.com/claude-code)" to your commit messages
10. Origin and mitch will have different merge commit SHAs when PRs are merged separately on GitHub. This is normal - the file contents remain identical. Don't force push to sync them.

## Project Overview

Non-profit low-band FM and streaming radio station web application

**Tech Stack:** React 19.1.1 • Capacitor.js v7 • PayloadCMS (separate repo) • Storybook 10.0.4 • TypeScript • Vitest • Playwright

**Value:** One codebase for web, iOS, and Android

**Remaining Tasks / To Do List:** remaining-tasks.md

**Platform Integration:** PLATFORM_INTEGRATION.md

**QA Checklist:** QA_CHECKLIST.md

**Android Firebase Build Instructions:** firebase-testing.md

---

## File Structure

```
src/
├── assets/          # Images, logos, textures, app icons
├── components/      # React components (minimal component-specific CSS)
├── contexts/        # React contexts
├── data/            # Mock data (synced with CMS types)
├── hooks/           # Custom React hooks
├── layouts/         # Layout components
├── pages/           # Page components
├── plugins/         # Capacitor/custom plugins
├── stories/         # Storybook stories
├── styles/          # Global styles
│   ├── index.css       # Design system (CSS vars, typography, colors)
│   ├── layout.css      # ALL layout patterns - keep everything here
│   ├── style-guide.css
│   ├── accessibility.css
│   └── android-auto.css
├── test/            # Test utilities
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

---

## Code Standards

### TypeScript

- Strict types (no `any` in production)
- Types synced between chirp-radio and chirp-cms repos
- All API responses must have explicit interfaces
- Real and mocked data must match CMS schema

### React

- **Rules of Hooks** (always)
- Function components
- camelCase naming

### Code Quality

- No unused variables
- Remove `// eslint-disable` comments before committing
- Pre-commit hooks enforce formatting, type checking, linting

---

## Styling Architecture

**Centralized design system with minimal component-specific styles**

- `src/styles/index.css` - Design system foundation
- `src/styles/layout.css` - **ALL layout styles belong here**
- Component CSS - Only component-unique styles
- Storybook - Consistent component library

---

## Testing

### Commands

- `npm test` - Vitest unit tests
- `npm run test:e2e` - Playwright e2e
- `npm run test:storybook` - Build Storybook (catches provider errors)

### Storybook Provider Setup

All stories wrapped with providers in `.storybook/preview.ts`:

- HelmetProvider, BrowserRouter, UserProvider, CMSProvider, AuthProvider, NotificationProvider
- **Important:** Add new contexts here or stories will fail

---

## Environment & CMS

### Mock vs Real Data

- `VITE_USE_CMS_API=true` - Fetch from dev CMS (localhost:3000)
- `VITE_USE_CMS_API=false` - Use mock JSON data
- `.env` gitignored (safe for local dev)

### CMS Integration

- Separate repo: `chirp-cms`
- Types manually synced between repos
- Both `main` branches are source of truth

### Known Issues

- Capacitor 3 + Lexicon requires older React for CMS only (doesn't affect Radio app)
- Album art polling causes fallback image flashes

---

## Git Workflow

### Branching

- Main branch: `main`
- **New branch for each feature** (required)
- No direct commits to main

### Commits

- **Ask before committing**
- Run tests when appropriate
- Follow existing commit message style (`git log`)

### Cross-Repo

- Changes may need coordination between `chirp-radio` and `chirp-cms`
- Outline what needs to change in both repos before starting

---

## Claude Workflow

### Problem-Solving

- Simple solutions over complex ones
- When encountering errors:
  1. Propose 2-3 simple solutions with pros/cons
  2. Explain what each might break
  3. Note performance implications
  4. Let user choose

### Communication

- **Don't say** "this is perfect" or "everything is working"
- **Instead:** "Ready for review - let me know if you see any errors"
- Keep comments as bullet points
- Include tradeoffs and implications

### Refactoring

- **Ask before architectural changes**
- Avoid partial fixes that leave code broken

---

## TypeScript Standards

1. **`any` vs `unknown`**
   - Avoid `any` in production
   - OK temporarily, but replace before committing

2. **Return Type Inference**
   - Let TypeScript infer when it makes sense
   - Use explicit types when unclear

3. **Type Safety**
   - Explicit types for everything in production
   - Front-end ↔ CMS types must stay synced

4. **Type Assertions**
   - Use sparingly
   - Prefer type guards

5. **API Response Types**
   - All API calls must have explicit interfaces
   - Define shapes before implementation

---

## Pre-Launch Testing Checklist

### Android

- [ ] Lock screen media controls appear when playing
- [ ] Play/pause works from lock screen
- [ ] Metadata shows on lock screen
- [ ] Play/Pause in sync with media player

### Android Auto

- [ ] App works as expected
- [ ] Media Player works & artist content is there
- [ ] Play/Pause in sync with media player
- [ ] Play/Pause in sync with phone (and vice versa)

### iOS

- [ ] Lock screen media controls appear when playing
- [ ] Play/pause works from lock screen
- [ ] Metadata shows on lock screen
- [ ] Play/Pause in sync with media player

### CarPlay

- [ ] App works as expected
- [ ] Play/Pause in sync from phone to CarPlay (and vice versa)

---

## Beta Testing & Distribution Strategy

### Firebase App Distribution (Current)

**Use for internal testing:**

- Debug APKs (unsigned, fast iteration)
- No Google Play review delays
- Easy distribution to small tester groups
- Good for catching bugs before wider release

**Build process:** See `firebase-testing.md`

### Google Play Console (Future Beta)

**Move to Google Play when:**

- Internal Firebase testing is stable
- Ready for broader audience
- Need feedback from real Google Play infrastructure
- Preparing for production launch

**Testing tracks available:**

- **Internal testing:** Up to 100 testers, no review required
- **Closed testing:** Unlimited testers, requires review
- **Open testing:** Public beta, requires review

**Before moving to Google Play:**

1. **Switch from APK to AAB** - Google Play requires Android App Bundles
2. **Set up signing** - Need release keystore (not debug key)
3. **Configure app signing** - Google Play can manage signing keys
4. **Fill out store listing** - Screenshots, descriptions, privacy policy
5. **Complete content rating questionnaire**
6. **Set up pricing & distribution**

**Key difference:** Firebase uses debug APKs for speed; Google Play requires signed release AABs and goes through review process.

---

## Reference Docs

- **Platform Integration:** See `.claude/PLATFORM_INTEGRATION.md` for CarPlay/Android Auto details
- **Prelaunch Checklist:** See previous versions of this file for detailed acceptance criteria

**Purpose:** Maintain somewhat persistent memory across conversations
