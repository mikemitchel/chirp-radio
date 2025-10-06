import type { Preview } from '@storybook/react-vite'
import type { Decorator } from '@storybook/react'
import '../src/styles/index.css'
import '../src/styles/style-guide.css'
import '../src/styles/accessibility.css'

const withTheme: Decorator = (Story, context) => {
  if (typeof document !== 'undefined') {
    const checkTheme = () => {
      // Target the specific element that changes background
      const storyElement = document.querySelector('#anchor--components-crchip--primary .docs-story') ||
                          document.querySelector('.docs-story') ||
                          document.querySelector('[class*="docs-story"]');

      if (storyElement) {
        const bg = getComputedStyle(storyElement).backgroundColor;

        // Check if the background is dark
        const isDark = bg.includes('51, 51, 51') ||
                      bg.includes('33, 33, 33') ||
                      bg.includes('42, 42, 42') ||
                      bg.includes('rgb(0, 0, 0)') ||
                      bg === 'rgb(51, 51, 51)' ||
                      bg === 'rgb(33, 33, 33)' ||
                      bg === 'rgb(42, 42, 42)';

        const theme = isDark ? 'dark' : 'light';
        const currentTheme = document.documentElement.getAttribute('data-theme');

        if (currentTheme !== theme) {
          document.documentElement.setAttribute('data-theme', theme);
        }
      }
    };

    const interval = setInterval(checkTheme, 200);
    checkTheme();

    setTimeout(() => clearInterval(interval), 30000);
  }

  return Story();
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    },

    options: {
      storySort: {
        order: ['Style Guide', 'Atoms', 'Molecules', 'Organisms', 'Templates'],
      },
    },
  },
  decorators: [withTheme],
};

export default preview;