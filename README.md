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

## Contributing

Please ensure all code passes linting and formatting checks before committing:

```bash
npm run lint
npm run format
npm run typecheck
npm run test
```

Pre-commit hooks are configured via Husky to automatically run linting and formatting.
