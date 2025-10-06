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
    React.createElement('div', { key: 'usage', className: 'sg-card' }, [
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
  ])
}
