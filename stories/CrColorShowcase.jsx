// CrColorShowcase.jsx
import React from 'react';

export default function CrColorShowcase() {
  return (
    React.createElement('div', { className: 'sg-section' }, [
      
      // Primary Colors
      React.createElement('section', { key: 'primary', className: 'sg-color-group' }, [
        React.createElement('h2', { key: 'primary-title' }, 'Primary'),
        React.createElement('div', { key: 'primary-swatches', className: 'sg-color-swatches' }, [
          React.createElement('div', { key: 'primary-100', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-primary-100)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Primary 100'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-primary-100')
            ])
          ]),
          React.createElement('div', { key: 'primary-300', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-primary-300)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Primary 300'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-primary-300')
            ])
          ]),
          React.createElement('div', { key: 'primary-500', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-primary-500)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Primary 500'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-primary-500')
            ])
          ]),
          React.createElement('div', { key: 'primary-700', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-primary-700)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Primary 700'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-primary-700')
            ])
          ]),
          React.createElement('div', { key: 'primary-900', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-primary-900)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Primary 900'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-primary-900')
            ])
          ])
        ])
      ]),

      // Secondary Colors
      React.createElement('section', { key: 'secondary', className: 'sg-color-group' }, [
        React.createElement('h2', { key: 'secondary-title' }, 'Secondary'),
        React.createElement('div', { key: 'secondary-swatches', className: 'sg-color-swatches' }, [
          React.createElement('div', { key: 'secondary-100', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-secondary-100)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Secondary 100'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-secondary-100')
            ])
          ]),
          React.createElement('div', { key: 'secondary-300', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-secondary-300)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Secondary 300'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-secondary-300')
            ])
          ]),
          React.createElement('div', { key: 'secondary-500', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-secondary-500)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Secondary 500'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-secondary-500')
            ])
          ]),
          React.createElement('div', { key: 'secondary-700', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-secondary-700)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Secondary 700'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-secondary-700')
            ])
          ]),
          React.createElement('div', { key: 'secondary-900', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-secondary-900)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Secondary 900'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-secondary-900')
            ])
          ])
        ])
      ]),

      // Accent Colors
      React.createElement('section', { key: 'accent', className: 'sg-color-group' }, [
        React.createElement('h2', { key: 'accent-title' }, 'Accent'),
        React.createElement('div', { key: 'accent-swatches', className: 'sg-color-swatches' }, [
          React.createElement('div', { key: 'accent-100', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-accent-100)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Accent 100'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-accent-100')
            ])
          ]),
          React.createElement('div', { key: 'accent-500', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-accent-500)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Accent 500'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-accent-500')
            ])
          ]),
          React.createElement('div', { key: 'accent-800', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-accent-800)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Accent 800'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-accent-800')
            ])
          ])
        ])
      ]),

      // Neutral/Default Colors
      React.createElement('section', { key: 'neutral', className: 'sg-color-group' }, [
        React.createElement('h2', { key: 'neutral-title' }, 'Neutral'),
        React.createElement('div', { key: 'neutral-swatches', className: 'sg-color-swatches' }, [
          React.createElement('div', { key: 'default-100', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle sg-border-light', style: { backgroundColor: 'var(--cr-default-100)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Default 100'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-default-100')
            ])
          ]),
          React.createElement('div', { key: 'default-300', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-default-300)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Default 300'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-default-300')
            ])
          ]),
          React.createElement('div', { key: 'default-500', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-default-500)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Default 500'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-default-500')
            ])
          ]),
          React.createElement('div', { key: 'default-700', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-default-700)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Default 700'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-default-700')
            ])
          ]),
          React.createElement('div', { key: 'default-900', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-default-900)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Default 900'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-default-900')
            ])
          ])
        ])
      ]),

      // Surface Colors
      React.createElement('section', { key: 'surface', className: 'sg-color-group' }, [
        React.createElement('h2', { key: 'surface-title' }, 'Surface Colors'),
        React.createElement('div', { key: 'surface-swatches', className: 'sg-color-swatches' }, [
          React.createElement('div', { key: 'paper', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle sg-border-light', style: { backgroundColor: 'var(--cr-paper)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Paper'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-paper')
            ])
          ]),
          React.createElement('div', { key: 'ink', className: 'sg-color-swatch' }, [
            React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-ink)' } }),
            React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
              React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Ink'),
              React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-ink')
            ])
          ])
        ])
      ]),

      // Support Colors - Updated with both background and foreground colors
      React.createElement('section', { key: 'support', className: 'sg-color-group' }, [
        React.createElement('h2', { key: 'support-title' }, 'Support Colors'),
        
        // Info Colors
        React.createElement('div', { key: 'info-group' }, [
          React.createElement('h3', { key: 'info-subtitle', className: 'sg-color-subtitle' }, 'Info'),
          React.createElement('div', { key: 'info-swatches', className: 'sg-color-swatches' }, [
            React.createElement('div', { key: 'info-bg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-info-bg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Info Background'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-info-bg')
              ])
            ]),
            React.createElement('div', { key: 'info-fg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-info-fg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Info Foreground'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-info-fg')
              ])
            ])
          ])
        ]),

        // Success Colors
        React.createElement('div', { key: 'success-group' }, [
          React.createElement('h3', { key: 'success-subtitle', className: 'sg-color-subtitle' }, 'Success'),
          React.createElement('div', { key: 'success-swatches', className: 'sg-color-swatches' }, [
            React.createElement('div', { key: 'success-bg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-success-bg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Success Background'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-success-bg')
              ])
            ]),
            React.createElement('div', { key: 'success-fg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-success-fg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Success Foreground'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-success-fg')
              ])
            ])
          ])
        ]),

        // Warning Colors
        React.createElement('div', { key: 'warning-group' }, [
          React.createElement('h3', { key: 'warning-subtitle', className: 'sg-color-subtitle' }, 'Warning'),
          React.createElement('div', { key: 'warning-swatches', className: 'sg-color-swatches' }, [
            React.createElement('div', { key: 'warning-bg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-warning-bg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Warning Background'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-warning-bg')
              ])
            ]),
            React.createElement('div', { key: 'warning-fg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-warning-fg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Warning Foreground'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-warning-fg')
              ])
            ])
          ])
        ]),

        // Error Colors
        React.createElement('div', { key: 'error-group' }, [
          React.createElement('h3', { key: 'error-subtitle', className: 'sg-color-subtitle' }, 'Error'),
          React.createElement('div', { key: 'error-swatches', className: 'sg-color-swatches' }, [
            React.createElement('div', { key: 'error-bg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-error-bg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Error Background'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-error-bg')
              ])
            ]),
            React.createElement('div', { key: 'error-fg', className: 'sg-color-swatch' }, [
              React.createElement('div', { key: 'rect', className: 'sg-color-rectangle', style: { backgroundColor: 'var(--cr-support-error-fg)' } }),
              React.createElement('div', { key: 'info', className: 'sg-color-info' }, [
                React.createElement('div', { key: 'name', className: 'sg-color-name' }, 'Error Foreground'),
                React.createElement('div', { key: 'value', className: 'sg-color-value' }, '--cr-support-error-fg')
              ])
            ])
          ])
        ])
      ])
    ])
  );
}