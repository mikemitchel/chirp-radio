# CHIRP Radio Project - Claude Instructions

## Project Overview

**Purpose:** Non-profit low-band FM and streaming radio station web application

**Tech Stack:**
- React 19.1.1
- Capacitor.js v7 (wraps web app for iOS/Android distribution)
- Storybook 9.1
- PayloadCMS (separate `chirp-cms` repo)
- Strict TypeScript (awaiting clarification on exact standards)
- Vitest (unit tests)
- Playwright (e2e tests)

**Value Proposition:** One codebase for web, iOS, and Android
- Single location for bug fixes
- Synchronized versions across platforms
- Consistent look and feel across all digital products

---

## Current Status: BETA PREPARATION

**Goal:** Ship with feature parity to current product

**Priority Tasks (All Equal Priority):**
- Apple CarPlay integration
- Apple Watch streaming controls
- Android Auto setup (may need new player component)
- CMS webhook for content updates (research needed)
- Album art accuracy (API polling issue with fallback images)
- Cached API content strategy
- Mobile-specific CMS collections for page content

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

## Styling Architecture

**Philosophy:** Centralized design system with minimal component-specific styles

- `src/styles/index.css` - Design system foundation (CSS custom properties, typography, colors)
- `src/styles/layout.css` - **ALL layout styles belong here**
- Component CSS files - Only component-unique styles that don't fit in design system
- Storybook components - Amazing component library with consistent styling

---

## Code Standards

### TypeScript
- Use strict TypeScript types (exact standards TBD - awaiting clarification)
- Types must be synced between Radio and CMS repos (manual sync for now)
- Both real and mocked data must match CMS schema

### React
- **Rules of Hooks** - MUST follow all React Hooks rules
  - Claude should know these and explain as needed
- Function components (implied)
- camelCase naming convention

### Code Quality
- **No unused variables** (linting enforced)
- Follow all linting rules
- Pre-commit hooks enforce formatting, type checking, linting
  - Both Radio and CMS repos use identical standards

### Temporary Workarounds
- `// eslint-disable-next-line` comments OK while figuring things out
- **MUST remove these before committing** - fix underlying code instead
- Leaving ignore comments is "kicking the can down the road" - unacceptable long-term

---

## Testing Strategy

### Test Commands
- `npm test` - Vitest unit tests
- `npm run test:ui` - Vitest UI
- `npm run test:e2e` - Playwright e2e tests
- `npm run test:e2e:ui` - Playwright UI
- `npm run test:e2e:headed` - Playwright headed mode

### Test Location
- Unit tests: Throughout codebase as `.test.tsx` files
- E2E tests: `/e2e/` directory (`.spec.ts` files)

### Testing Requirements
- Check for tests periodically
- Focus on functional tests (easier, low-hanging fruit)
- Integration tests planned for future when app is more stable

### Physical Testing
- **iOS/CarPlay:** iPhone + CarPlay setup (owner has)
- **Android/Android Auto:** Borrowed device + neighbor's car for Android Auto
- **Emulators:** Xcode and Android Studio for initial testing

---

## Environment & Data

### Mock vs Real Data
- `sample.env` → rename to `.env` to configure
- `VITE_USE_CMS_API=true` - Fetch from dev CMS
- `VITE_USE_CMS_API=false` (or absent) - Use mock JSON data
- `.env` is gitignored and safe for local development

### CMS Integration
- Separate repo: `chirp-cms`
- Types manually synced between repos
- Radio and CMS `main` branches are both source of truth
- Data shapes may have been modified (Lexical conventions) - needs reconciliation

### Known Issues
- **Capacitor 3 + Lexicon** requires older React version for CMS only (doesn't affect Radio app)
- **Album art polling:** `https://chirpradio.appspot.com/api/current_playlist` causes fallback image flashes

---

## Git Workflow

### Branching
- Main branch: `main`
- **New branch for each feature** (required)
- No direct commits to main

### Commits
- **Ask before committing** (don't commit automatically)
- Run tests before committing when appropriate
- Pre-commit hooks will enforce quality standards
- Follow existing commit message style (check `git log`)

### Cross-Repo Coordination
- Changes may need coordination between `chirp-radio` and `chirp-cms`
- Outline what needs to change in both repos before starting work

---

## Claude Workflow Guidelines

### Problem-Solving Approach
- **DO NOT go down rabbit holes**
- Simple solutions are better than complex ones
- When encountering errors:
  1. Propose 2-3 simple solutions with pros/cons
  2. Explain what each might break
  3. Note performance implications
  4. Let user choose approach

### Refactoring
- **Ask before architectural changes or refactoring**
- Avoid partial fixes that leave code in broken state

### Communication Style
- **DO NOT say "this is perfect" or "everything is working"**
- Claude cannot test or see the actual app
- Instead: "Ready for review - let me know if you see any errors"
- Comments: Keep as bullet points
- Explanations: Include tradeoffs and implications

### Code Changes
- Use strict TypeScript types (see standards below)
- Follow Rules of Hooks
- No unused variables
- Remove all lint-ignore comments before committing

---

## TypeScript Standards

### 1. `any` vs `unknown` Types
- **Generally avoid `any` types**
- Use `unknown` when receiving data from APIs with uncertain structure
- OK to use `any` temporarily while figuring things out
- **Before committing:** Replace `any` with actual types and verify nothing broke

### 2. Return Type Inference
- **Allow TypeScript to infer return types** when it makes sense
- No need for explicit return types on all functions
- Use explicit types when inference would be unclear

### 3. Null Checking & Type Safety
- Goal: Explicit types for everything in production code
- OK to bypass TypeScript temporarily while working things out
- **Critical:** Front-end and CMS types must stay synced
- If types diverge, create a middle layer to transform them
- Both repos should use the same types wherever possible

### 4. Type Assertions (`as Type`)
- **Use sparingly** when necessary
- Prefer type guards and proper typing over assertions

### 5. API/CMS Response Types
- **All API calls must have explicit TypeScript interfaces/types**
- Define expected response shapes before implementation
- Maintain type definitions as API evolves
- Front-end and CMS must share compatible types

### Summary
- Temporary `any`: OK during development
- Production `any`: Replace with proper types before commit
- API responses: Always typed
- Type sync: Front-end ↔ CMS types must match
- Testing: Check for breakage before committing type changes

---

## Updates & Learning

This file should be updated as we learn more about:
- CarPlay/Android Auto implementation details
- CMS webhook strategy
- Album art polling solution
- Any new patterns or conventions discovered

**Purpose:** Maintain somewhat persistent memory across conversations
