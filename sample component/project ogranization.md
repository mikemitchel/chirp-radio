my-app/
├── public/ # Static assets
│ └── favicon.svg
├── src/
│ ├── assets/ # Images, fonts, etc.
│ │ └── logo.svg
│ ├── components/ # Reusable UI components
│ │ └── Button/
│ │ ├── Button.tsx
│ │ ├── Button.css
│ │ ├── Button.test.tsx
│ │ └── Button.stories.tsx
│ ├── layouts/ # App/page layouts
│ │ └── RootLayout.tsx
│ ├── pages/ # Top-level routed pages
│ │ └── HomePage.tsx
│ ├── routes/ # React Router definitions
│ │ └── AppRoutes.tsx
│ ├── hooks/ # Reusable custom hooks
│ │ └── useWindowSize.ts
│ ├── utils/ # Helper functions and constants
│ │ └── formatTime.ts
│ ├── styles/ # Global styles and resets
│ │ ├── globals.css
│ │ └── reset.css
│ ├── App.tsx # Root React component
│ ├── main.tsx # Entry point
│ └── vite-env.d.ts # Vite type declarations
├── .storybook/ # Storybook config
│ ├── main.ts
│ ├── preview.ts
│ └── tsconfig.json
├── .eslintrc.cjs # ESLint config
├── .prettierrc # Prettier config
├── jest.config.ts # Jest config
├── tsconfig.json # TypeScript config
├── tsconfig.node.json # TypeScript for node tools
├── vite.config.ts # Vite config
├── package.json
└── README.md

Button/
├── Button.tsx # Component implementation
├── Button.css # Styling (standard CSS)
├── Button.test.tsx # Jest unit test
└── Button.stories.tsx # Storybook story
