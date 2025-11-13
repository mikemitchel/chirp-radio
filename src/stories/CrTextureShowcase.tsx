// CrTextureShowcase.tsx
import React from 'react'

export default function CrTextureShowcase() {
  return React.createElement('div', { className: 'sg-section' }, [
    React.createElement('h2', { key: 'title' }, 'Background Textures'),

    // Texture Introduction
    React.createElement('div', { key: 'intro', className: 'sg-card sg-margin-bottom-lg' }, [
      React.createElement('h3', { key: 'intro-title' }, 'Texture System Overview'),
      React.createElement('div', { key: 'intro-content', className: 'sg-card-content' }, [
        React.createElement(
          'p',
          { key: 'intro-text', className: 'cr-body-reg sg-margin-bottom' },
          'CHIRP Radio uses three distinct texture overlays to add visual depth and tactile quality to backgrounds. Each texture can be applied over any brand color to create rich, layered surfaces.'
        ),
      ]),
    ]),

    // Natural Texture
    React.createElement('section', { key: 'natural', className: 'sg-texture-group' }, [
      React.createElement('h3', { key: 'natural-title' }, 'Natural Texture'),
      React.createElement('div', { key: 'natural-swatches', className: 'sg-texture-swatches' }, [
        // Primary colors
        React.createElement('div', { key: 'natural-p900', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-p900',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural P900'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-p900'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'natural-p100', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-p100',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural P100'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-p100'
            ),
          ]),
        ]),

        // Secondary colors
        React.createElement('div', { key: 'natural-s900', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-s900',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural S900'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-s900'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'natural-s100', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-s100',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural S100'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-s100'
            ),
          ]),
        ]),

        // Accent colors
        React.createElement('div', { key: 'natural-a800', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-a800',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural A800'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-a800'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'natural-a500', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-a500',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural A500'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-a500'
            ),
          ]),
        ]),

        // Default colors
        React.createElement('div', { key: 'natural-d900', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-d900',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural D900'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-d900'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'natural-d100', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-d100 sg-border-light',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural D100'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-d100'
            ),
          ]),
        ]),

        // Surface colors
        React.createElement('div', { key: 'natural-dark', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-dark',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural Dark'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-dark'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'natural-light', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-natural-light sg-border-light',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement(
              'div',
              { key: 'name', className: 'sg-texture-name' },
              'Natural Light'
            ),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-natural-light'
            ),
          ]),
        ]),
      ]),

      // Note about accent colors
      React.createElement(
        'div',
        { key: 'natural-note', className: 'sg-tip-box sg-margin-top-lg' },
        [
          React.createElement('div', { key: 'note-text', className: 'cr-body-sm sg-tip-text' }, [
            React.createElement('strong', { key: 'note-strong' }, 'Note:'),
            ' The Accent color background textures, do NOT toggle in Dark mode. This is the only exception to textures not toggling.',
          ]),
        ]
      ),
    ]),

    // Rice Texture
    React.createElement('section', { key: 'rice', className: 'sg-texture-group' }, [
      React.createElement('h3', { key: 'rice-title' }, 'Rice Texture'),
      React.createElement('div', { key: 'rice-swatches', className: 'sg-texture-swatches' }, [
        React.createElement('div', { key: 'rice-d900', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-rice-d900',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement('div', { key: 'name', className: 'sg-texture-name' }, 'Rice D900'),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-rice-d900'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'rice-d100', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-rice-d100',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement('div', { key: 'name', className: 'sg-texture-name' }, 'Rice D100'),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-rice-d100'
            ),
          ]),
        ]),
      ]),
    ]),

    // Dust Texture
    React.createElement('section', { key: 'dust', className: 'sg-texture-group' }, [
      React.createElement('h3', { key: 'dust-title' }, 'Dust Texture'),
      React.createElement('div', { key: 'dust-swatches', className: 'sg-texture-swatches' }, [
        React.createElement('div', { key: 'dust-d900', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-dust-d900',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement('div', { key: 'name', className: 'sg-texture-name' }, 'Dust D900'),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-dust-d900'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'dust-d300', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-dust-d300',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement('div', { key: 'name', className: 'sg-texture-name' }, 'Dust D300'),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-dust-d300'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'dust-d100', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-dust-d100',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement('div', { key: 'name', className: 'sg-texture-name' }, 'Dust D100'),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-dust-d100'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'dust-dark', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-dust-dark',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement('div', { key: 'name', className: 'sg-texture-name' }, 'Dust Dark'),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-dust-dark'
            ),
          ]),
        ]),
        React.createElement('div', { key: 'dust-light', className: 'sg-texture-swatch' }, [
          React.createElement('div', {
            key: 'box',
            className: 'sg-texture-rectangle cr-bg-textured cr-bg-dust-light sg-border-light',
          }),
          React.createElement('div', { key: 'info', className: 'sg-texture-info' }, [
            React.createElement('div', { key: 'name', className: 'sg-texture-name' }, 'Dust Light'),
            React.createElement(
              'div',
              { key: 'value', className: 'sg-texture-value' },
              'cr-bg-dust-light'
            ),
          ]),
        ]),
      ]),
    ]),

    // Usage Example
    React.createElement('div', { key: 'usage', className: 'sg-card sg-margin-bottom-lg' }, [
      React.createElement('h3', { key: 'usage-title' }, 'Implementation Example'),
      React.createElement('div', { key: 'usage-content', className: 'sg-card-content' }, [
        React.createElement(
          'p',
          { key: 'usage-intro', className: 'cr-body-reg sg-margin-bottom' },
          'To use textured backgrounds in your HTML:'
        ),
        React.createElement('div', { key: 'code', className: 'sg-code-box' }, [
          '<div class="cr-bg-textured cr-bg-natural-p900">',
          React.createElement('br', { key: 'br1' }),
          '  <h3>Content with Natural Primary 900 Texture</h3>',
          React.createElement('br', { key: 'br2' }),
          '</div>',
        ]),
        React.createElement('p', { key: 'production-note', className: 'cr-body-sm text-muted' }, [
          React.createElement('strong', { key: 'note-strong' }, 'Production Note:'),
          ' Replace the CSS texture URLs with actual exported texture images from Figma for the final implementation.',
        ]),
      ]),
    ]),

    // Texture Randomness
    React.createElement('div', { key: 'randomness', className: 'sg-card' }, [
      React.createElement('h3', { key: 'randomness-title' }, 'Texture Randomness'),
      React.createElement('div', { key: 'randomness-content', className: 'sg-card-content' }, [
        React.createElement(
          'p',
          { key: 'randomness-intro', className: 'cr-body-reg sg-margin-bottom' },
          'To prevent repetitive patterns when multiple textured elements appear side-by-side, use texture offset utility classes. These shift the texture position to create visual variety.'
        ),
        React.createElement(
          'h4',
          { key: 'randomness-classes-title', className: 'cr-nav-support sg-margin-bottom' },
          'Available Offset Classes:'
        ),
        React.createElement(
          'div',
          { key: 'randomness-list', className: 'cr-body-sm sg-margin-bottom' },
          [
            React.createElement('div', { key: 'offset-classes', className: 'sg-code-example' }, [
              React.createElement('pre', { key: 'pre' }, [
                'cr-texture-offset-1  →  X: 15px,  Y: 23px',
                React.createElement('br', { key: 'br1' }),
                'cr-texture-offset-2  →  X: -27px, Y: 41px',
                React.createElement('br', { key: 'br2' }),
                'cr-texture-offset-3  →  X: 53px,  Y: -19px',
                React.createElement('br', { key: 'br3' }),
                'cr-texture-offset-4  →  X: -38px, Y: -62px',
                React.createElement('br', { key: 'br4' }),
                'cr-texture-offset-5  →  X: 71px,  Y: 8px',
                React.createElement('br', { key: 'br5' }),
                'cr-texture-offset-6  →  X: -12px, Y: 94px',
                React.createElement('br', { key: 'br6' }),
                'cr-texture-offset-7  →  X: 46px,  Y: -35px',
                React.createElement('br', { key: 'br7' }),
                'cr-texture-offset-8  →  X: -65px, Y: 17px',
              ]),
            ]),
          ]
        ),
        React.createElement(
          'h4',
          { key: 'randomness-usage-title', className: 'cr-nav-support sg-margin-bottom' },
          'Usage:'
        ),
        React.createElement(
          'div',
          { key: 'randomness-code', className: 'sg-code-box sg-margin-bottom' },
          [
            '<div class="cr-bg-textured cr-bg-natural-light cr-texture-offset-1">',
            React.createElement('br', { key: 'br1' }),
            '  <h3>Card 1</h3>',
            React.createElement('br', { key: 'br2' }),
            '</div>',
            React.createElement('br', { key: 'br3' }),
            React.createElement('br', { key: 'br4' }),
            '<div class="cr-bg-textured cr-bg-natural-light cr-texture-offset-2">',
            React.createElement('br', { key: 'br5' }),
            '  <h3>Card 2</h3>',
            React.createElement('br', { key: 'br6' }),
            '</div>',
          ]
        ),
        React.createElement('div', { key: 'randomness-tip', className: 'sg-tip-box' }, [
          React.createElement('div', { key: 'tip-text', className: 'cr-body-sm sg-tip-text' }, [
            React.createElement('strong', { key: 'tip-strong' }, 'Automatic Randomness:'),
            ' The CrCardBanner and CrAnnouncement components automatically apply a random offset class based on the title/headline text. This ensures consistent but varied texture positioning across cards.',
          ]),
        ]),
      ]),
    ]),
  ])
}
