import '../frontend/src/app/[lang]/index.css';
import '../frontend/src/app/[lang]/style-guide.css';
import '../frontend/src/app/[lang]/accessibility.css';

const withTheme = (Story, context) => {
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
          // console.log('Theme changed to:', theme, 'Story element bg:', bg);
        }
      }
    };
    
    const interval = setInterval(checkTheme, 200);
    checkTheme();
    
    setTimeout(() => clearInterval(interval), 30000);
  }
  
  return Story();
};

export const decorators = [withTheme];

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: "todo"
    },
    options: {
      storySort: {
        order: ['Style Guide', 'Atoms', 'Molecules', 'Organisms', 'Templates', '*'],
      },
    },
  },
};

export default preview;