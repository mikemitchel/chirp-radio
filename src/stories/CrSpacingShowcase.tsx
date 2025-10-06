// CrSpacingShowcase.tsx
import React from 'react'

export default function CrSpacingShowcase() {
  return React.createElement('div', { className: 'sg-section' }, [
    React.createElement('h2', { key: 'title' }, 'Spacing System'),

    // Spacing Introduction
    React.createElement('div', { key: 'intro', className: 'sg-card sg-margin-bottom-lg' }, [
      React.createElement('h3', { key: 'intro-title' }, 'Spacing System Overview'),
      React.createElement('div', { key: 'intro-content', className: 'sg-card-content' }, [
        React.createElement(
          'p',
          { key: 'intro-text', className: 'cr-body-reg sg-margin-bottom' },
          'CHIRP Radio uses a consistent 4px base spacing unit to create harmonious layouts. All spacing values are multiples of this base unit, ensuring visual rhythm and consistency across the interface.'
        ),
        React.createElement('p', { key: 'base-info', className: 'cr-body-reg' }, [
          React.createElement('strong', { key: 'base-strong' }, 'Base Unit:'),
          ' 4px • ',
          React.createElement('strong', { key: 'scale-strong' }, 'Scale:'),
          ' Exponential progression for optimal visual hierarchy',
        ]),
      ]),
    ]),

    // Spacing Scale
    React.createElement('div', { key: 'spacing-scale', className: 'sg-spacing-section' }, [
      React.createElement('h2', { key: 'scale-title' }, 'Spacing Scale'),

      React.createElement('div', { key: 'scale-grid', className: 'sg-component-grid' }, [
        // Numeric Scale
        React.createElement('div', { key: 'numeric', className: 'sg-example-card' }, [
          React.createElement('h3', { key: 'numeric-title' }, 'Numeric Scale'),
          React.createElement('div', { key: 'numeric-grid', className: 'sg-spacing-grid' }, [
            React.createElement('div', { key: 'space-1', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-1'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-xs',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '4px'),
            ]),
            React.createElement('div', { key: 'space-2', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-2'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-sm',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '8px'),
            ]),
            React.createElement('div', { key: 'space-3', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-3'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-3',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '12px'),
            ]),
            React.createElement('div', { key: 'space-4', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-4'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-md',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '16px'),
            ]),
            React.createElement('div', { key: 'space-6', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-6'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-lg',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '24px'),
            ]),
            React.createElement('div', { key: 'space-8', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-8'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-xl',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '32px'),
            ]),
            React.createElement('div', { key: 'space-12', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-12'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-2xl',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '48px'),
            ]),
            React.createElement('div', { key: 'space-16', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label' },
                'cr-space-16'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar sg-spacing-bar-3xl',
              }),
              React.createElement('span', { key: 'value', className: 'sg-spacing-value' }, '64px'),
            ]),
          ]),
        ]),

        // Semantic Scale
        React.createElement('div', { key: 'semantic', className: 'sg-example-card' }, [
          React.createElement('h3', { key: 'semantic-title' }, 'Semantic Scale'),
          React.createElement('div', { key: 'semantic-grid', className: 'sg-spacing-grid' }, [
            React.createElement('div', { key: 'space-xs', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label-wide' },
                'cr-space-xs'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar-secondary sg-spacing-bar-xs',
              }),
              React.createElement(
                'span',
                { key: 'value', className: 'sg-spacing-value' },
                '4px - Tight spacing'
              ),
            ]),
            React.createElement('div', { key: 'space-sm', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label-wide' },
                'cr-space-sm'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar-secondary sg-spacing-bar-sm',
              }),
              React.createElement(
                'span',
                { key: 'value', className: 'sg-spacing-value' },
                '8px - Small spacing'
              ),
            ]),
            React.createElement('div', { key: 'space-md', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label-wide' },
                'cr-space-md'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar-secondary sg-spacing-bar-md',
              }),
              React.createElement(
                'span',
                { key: 'value', className: 'sg-spacing-value' },
                '16px - Medium spacing'
              ),
            ]),
            React.createElement('div', { key: 'space-lg', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label-wide' },
                'cr-space-lg'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar-secondary sg-spacing-bar-lg',
              }),
              React.createElement(
                'span',
                { key: 'value', className: 'sg-spacing-value' },
                '24px - Large spacing'
              ),
            ]),
            React.createElement('div', { key: 'space-xl', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label-wide' },
                'cr-space-xl'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar-secondary sg-spacing-bar-xl',
              }),
              React.createElement(
                'span',
                { key: 'value', className: 'sg-spacing-value' },
                '32px - Extra large'
              ),
            ]),
            React.createElement('div', { key: 'space-2xl', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label-wide' },
                'cr-space-2xl'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar-secondary sg-spacing-bar-2xl',
              }),
              React.createElement(
                'span',
                { key: 'value', className: 'sg-spacing-value' },
                '48px - 2X large'
              ),
            ]),
            React.createElement('div', { key: 'space-3xl', className: 'sg-spacing-row' }, [
              React.createElement(
                'span',
                { key: 'label', className: 'sg-spacing-label-wide' },
                'cr-space-3xl'
              ),
              React.createElement('div', {
                key: 'bar',
                className: 'sg-spacing-bar-secondary sg-spacing-bar-3xl',
              }),
              React.createElement(
                'span',
                { key: 'value', className: 'sg-spacing-value' },
                '64px - 3X large'
              ),
            ]),
          ]),
        ]),
      ]),
    ]),

    // Spacing Applications
    React.createElement('div', { key: 'spacing-applications', className: 'sg-spacing-section' }, [
      React.createElement('h2', { key: 'applications-title' }, 'Spacing Applications'),

      React.createElement('div', { key: 'applications-grid', className: 'sg-component-grid' }, [
        // Padding Examples
        React.createElement('div', { key: 'padding', className: 'sg-example-card' }, [
          React.createElement('h3', { key: 'padding-title' }, 'Padding Examples'),
          React.createElement(
            'div',
            { key: 'padding-examples', className: 'sg-spacing-examples' },
            [
              React.createElement('div', { key: 'small-gap', className: 'sg-spacing-example' }, [
                React.createElement(
                  'div',
                  { key: 'eyebrow', className: 'sg-eyebrow' },
                  'Small Gap (8px)'
                ),
                React.createElement(
                  'div',
                  {
                    key: 'demo',
                    className: 'sg-flex-row sg-gap-sm sg-padding-sm sg-bg-secondary-light',
                  },
                  [
                    React.createElement(
                      'div',
                      {
                        key: 'item1',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 1'
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'item2',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 2'
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'item3',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 3'
                    ),
                  ]
                ),
              ]),

              React.createElement('div', { key: 'medium-gap', className: 'sg-spacing-example' }, [
                React.createElement(
                  'div',
                  { key: 'eyebrow', className: 'sg-eyebrow' },
                  'Medium Gap (16px)'
                ),
                React.createElement(
                  'div',
                  {
                    key: 'demo',
                    className: 'sg-flex-row sg-gap-md sg-padding-sm sg-bg-secondary-light',
                  },
                  [
                    React.createElement(
                      'div',
                      {
                        key: 'item1',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 1'
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'item2',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 2'
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'item3',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 3'
                    ),
                  ]
                ),
              ]),

              React.createElement('div', { key: 'large-gap', className: 'sg-spacing-example' }, [
                React.createElement(
                  'div',
                  { key: 'eyebrow', className: 'sg-eyebrow' },
                  'Large Gap (24px)'
                ),
                React.createElement(
                  'div',
                  {
                    key: 'demo',
                    className: 'sg-flex-row sg-gap-lg sg-padding-sm sg-bg-secondary-light',
                  },
                  [
                    React.createElement(
                      'div',
                      {
                        key: 'item1',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 1'
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'item2',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 2'
                    ),
                    React.createElement(
                      'div',
                      {
                        key: 'item3',
                        className: 'sg-spacing-demo-box sg-flex-item',
                      },
                      'Item 3'
                    ),
                  ]
                ),
              ]),
            ]
          ),
        ]),
      ]),
    ]),

    // Usage Guidelines
    React.createElement('div', { key: 'guidelines', className: 'sg-card sg-margin-top-lg' }, [
      React.createElement('h2', { key: 'guidelines-title' }, 'Spacing Usage Guidelines'),
      React.createElement('div', { key: 'guidelines-content', className: 'sg-card-content' }, [
        React.createElement('div', { key: 'guidelines-grid', className: 'sg-component-grid' }, [
          React.createElement('div', { key: 'guidelines-left' }, [
            React.createElement(
              'div',
              {
                key: 'component-padding',
                className: 'cr-body-reg sg-margin-bottom',
              },
              [
                React.createElement('strong', { key: 'strong1' }, 'Component Padding:'),
                ' Use --cr-space-md (16px) for standard component internal spacing',
              ]
            ),

            React.createElement(
              'div',
              {
                key: 'element-margins',
                className: 'cr-body-reg sg-margin-bottom',
              },
              [
                React.createElement('strong', { key: 'strong2' }, 'Element Margins:'),
                ' Use --cr-space-lg (24px) for spacing between related components',
              ]
            ),

            React.createElement('div', { key: 'section-gaps', className: 'cr-body-reg' }, [
              React.createElement('strong', { key: 'strong3' }, 'Section Gaps:'),
              ' Use --cr-space-2xl (48px) for major section divisions',
            ]),
          ]),

          React.createElement('div', { key: 'guidelines-right' }, [
            React.createElement(
              'div',
              {
                key: 'button-groups',
                className: 'cr-body-reg sg-margin-bottom',
              },
              [
                React.createElement('strong', { key: 'strong4' }, 'Button Groups:'),
                ' Use --cr-space-3 (12px) gap between related buttons',
              ]
            ),

            React.createElement(
              'div',
              {
                key: 'form-fields',
                className: 'cr-body-reg sg-margin-bottom',
              },
              [
                React.createElement('strong', { key: 'strong5' }, 'Form Fields:'),
                ' Use --cr-space-4 (16px) margin between form elements',
              ]
            ),

            React.createElement('div', { key: 'text-spacing', className: 'cr-body-reg' }, [
              React.createElement('strong', { key: 'strong6' }, 'Text Spacing:'),
              ' Use --cr-space-2 to --cr-space-4 for text element margins',
            ]),
          ]),
        ]),

        React.createElement('div', { key: 'tip', className: 'sg-tip-box sg-margin-top-lg' }, [
          React.createElement('div', { key: 'tip-text', className: 'cr-body-sm sg-tip-text' }, [
            React.createElement('strong', { key: 'tip-strong' }, 'Pro Tip:'),
            ' Always use spacing variables instead of hardcoded pixel values. This ensures consistency and makes it easy to adjust spacing globally across the design system.',
          ]),
        ]),
      ]),
    ]),
  ])
}
