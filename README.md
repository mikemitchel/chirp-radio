# CHIRP Radio

Web application for CHIRP Radio, built with React, TypeScript, and Vite.

> **Mobile Development**: This project supports iOS and Android apps via Capacitor. If you need to test or deploy mobile apps, see the [Mobile Development Guide](./MOBILE_DEVELOPMENT.md) for additional setup requirements.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## CMS Integration

The app can fetch content from the Payload CMS or use local mock data for development.

**Using Mock Data (default):**

- No configuration needed
- Mock data is loaded from `src/data/*.json` files
- Perfect for development without running the CMS server

**Using CMS API:**

1. Copy the sample environment file:
   ```bash
   cp sample.env .env
   ```
2. Start the CMS server (see [chirp-cms](../chirp-cms) repository)
3. The frontend will now fetch live content from the CMS

See `sample.env` for available configuration options.

## Project Structure

- **Web App**: React + TypeScript + Vite
- **Testing**: Vitest (unit), Playwright (e2e)
- **Storybook**: Component development and documentation

> **Note**: Mobile apps (iOS/Android) are supported via Capacitor. See [MOBILE_DEVELOPMENT.md](./MOBILE_DEVELOPMENT.md) for mobile-specific setup.

## Available Scripts

### Development

- `npm run dev` - Start Vite development server
- `npm run build` - Build web app for production
- `npm run preview` - Preview production build locally

### Testing

- `npm run test` - Run unit tests
- `npm run test:ui` - Run tests with UI
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:e2e:ui` - Run e2e tests with UI

### Code Quality

- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run typecheck` - Run TypeScript type checking

### Storybook

- `npm run storybook` - Start Storybook dev server
- `npm run build-storybook` - Build Storybook for production

## Technology Stack

- **Framework**: React 19
- **Language**: TypeScript 5.8
- **Build Tool**: Vite 7
- **Routing**: React Router 7
- **Testing**: Vitest, Playwright
- **Linting**: ESLint, Prettier
- **Component Dev**: Storybook

### Mobile Support (Optional)

- **Mobile Framework**: Capacitor 7 - See [MOBILE_DEVELOPMENT.md](./MOBILE_DEVELOPMENT.md)

## Development Utilities

### Logger

The project includes a development-only logger utility (`src/utils/logger.ts`) that provides console logging that automatically gets stripped out in production builds.

#### Usage

```typescript
import { createLogger } from '../utils/logger'

const log = createLogger('ComponentName')

// Use like console.log, but only logs in development
log.log('Debug message:', someData)
log.error('Error occurred:', error)
log.warn('Warning:', warning)
```

#### When Logs Appear

**Development Mode** (logs visible):

- `npm run dev` - Web development server
- `npm run cap:ios` - iOS simulator testing
- `npm run cap:android` - Android emulator testing
- `npm run storybook` - Storybook development

**Production Mode** (logs removed):

- `npm run build` - Production web build
- `npm run build:mobile` - Production mobile builds
- Any production deployment

The logger uses Vite's `import.meta.env.DEV` flag and tree-shaking to completely remove all logging code from production builds, ensuring zero performance impact.

## Contributing

Please ensure all code passes linting and formatting checks before committing:

```bash
npm run lint
npm run format
npm run typecheck
npm run test
```

Pre-commit hooks are configured via Husky to automatically run linting and formatting.
