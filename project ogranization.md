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

```ts
// src/components/Button/Button.tsx
import React from "react";
import "./Button.css";

export type ButtonProps = {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

export default function Button({
  label,
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  return (
    <button className="btn" type={type} disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}
```

```css
/* src/components/Button/Button.css */

.btn {
  padding: 0.5rem 1rem;
  background-color: #1d4ed8; /* blue-700 */
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn:hover:not(:disabled) {
  background-color: #2563eb; /* blue-600 */
}

.btn:disabled {
  background-color: #9ca3af; /* gray-400 */
  cursor: not-allowed;
}
```

```ts
// src/components/Button/Button.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  test("renders with label", () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("is disabled when `disabled` prop is true", () => {
    render(<Button label="Disabled" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});

// src/components/Button/Button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    label: "Click Me",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithClick: Story = {
  args: {
    onClick: () => alert("Clicked!"),
  },
};
```
