// CrIconsShowcase.tsx
import React, { useState } from 'react';
import { 
  PiHandHeartLight,
  PiCaretLeft,
  PiCaretRight,
  PiCaretDown,
  PiUserCircle,
  PiGearSix,
  PiDotsThreeOutlineVerticalFill,
  PiPlayFill,
  PiPauseFill,
  PiChatCircleTextLight,
  PiMusicNotes,
  PiGearLight,
  PiPaperclip,
  PiNotepad
} from 'react-icons/pi';
import {
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLinkedin
} from 'react-icons/fa';
import { SiBluesky } from 'react-icons/si';

export default function CrIconsShowcase() {
  const [selectedSize, setSelectedSize] = useState(24);
  const [selectedColor, setSelectedColor] = useState('default');

  // All React Icons used in CHIRP components
  const icons = [
    {
      name: 'PiHandHeartLight',
      component: PiHandHeartLight,
      usage: 'Used in buttons for community/volunteer actions, sidebar donate button',
      components: ['CrButton', 'CrSelectButtonInteraction', 'CrSidebar']
    },
    {
      name: 'PiCaretLeft',
      component: PiCaretLeft,
      usage: 'Left arrow icon for navigation buttons and controls',
      components: ['CrButton']
    },
    {
      name: 'PiCaretRight',
      component: PiCaretRight,
      usage: 'Right arrow icon for navigation buttons and breadcrumbs',
      components: ['CrButton', 'CrBreadcrumb']
    },
    {
      name: 'PiCaretDown',
      component: PiCaretDown,
      usage: 'Dropdown arrow icon for select button interactions',
      components: ['CrSelectButtonInteraction']
    },
    {
      name: 'PiUserCircle',
      component: PiUserCircle,
      usage: 'User account and profile related interactions',
      components: ['CrSelectButtonInteraction']
    },
    {
      name: 'PiGearSix',
      component: PiGearSix,
      usage: 'Settings and configuration menus',
      components: ['CrSelectButtonInteraction']
    },
    {
      name: 'PiDotsThreeOutlineVerticalFill',
      component: PiDotsThreeOutlineVerticalFill,
      usage: 'Main navigation menu toggle button',
      components: ['CrMainNav']
    },
    {
      name: 'PiPlayFill',
      component: PiPlayFill,
      usage: 'Play button in streaming music player (imported but using custom SVG)',
      components: ['CrStreamingMusicPlayer']
    },
    {
      name: 'PiPauseFill',
      component: PiPauseFill,
      usage: 'Pause button in streaming music player (imported but using custom SVG)',
      components: ['CrStreamingMusicPlayer']
    },
    {
      name: 'PiChatCircleTextLight',
      component: PiChatCircleTextLight,
      usage: 'Request button in sidebar for user interactions',
      components: ['CrSidebar']
    },
    {
      name: 'PiMusicNotes',
      component: PiMusicNotes,
      usage: 'Your Collection link in sidebar footer',
      components: ['CrSidebar']
    },
    {
      name: 'PiGearLight',
      component: PiGearLight,
      usage: 'Account Settings link in sidebar footer',
      components: ['CrSidebar']
    },
    {
      name: 'PiPaperclip',
      component: PiPaperclip,
      usage: 'App Support & Feedback button icon',
      components: ['CrAccountSettingsPage']
    },
    {
      name: 'PiNotepad',
      component: PiNotepad,
      usage: 'Terms & Privacy button icon',
      components: ['CrAccountSettingsPage']
    },
    {
      name: 'SiBluesky',
      component: SiBluesky,
      usage: 'Bluesky social media link in footer',
      components: ['CrFooter']
    }
  ];

  // Social media icons (Font Awesome from react-icons/fa)
  const socialIcons = [
    {
      name: 'FaFacebookSquare',
      component: FaFacebookSquare,
      usage: 'Facebook social media link in footer',
      components: ['CrFooter']
    },
    {
      name: 'FaInstagram',
      component: FaInstagram,
      usage: 'Instagram social media link in footer',
      components: ['CrFooter']
    },
    {
      name: 'FaTwitterSquare',
      component: FaTwitterSquare,
      usage: 'Twitter social media link in footer',
      components: ['CrFooter']
    },
    {
      name: 'FaLinkedin',
      component: FaLinkedin,
      usage: 'LinkedIn social media link in footer',
      components: ['CrFooter']
    }
  ];

  const sizeOptions = [16, 20, 24, 32, 48, 64];
  const colorOptions = [
    { name: 'Default', value: 'default', color: 'var(--cr-ink)' },
    { name: 'Primary', value: 'primary', color: 'var(--cr-primary-700)' },
    { name: 'Secondary', value: 'secondary', color: 'var(--cr-secondary-700)' },
    { name: 'Muted', value: 'muted', color: 'var(--cr-default-500)' },
    { name: 'Current', value: 'current', color: 'currentColor' }
  ];

  const getIconColor = () => {
    const colorOption = colorOptions.find(opt => opt.value === selectedColor);
    return colorOption ? colorOption.color : 'var(--cr-ink)';
  };

  return React.createElement('div', { 
    key: 'main-container',
    className: 'sg-container'
  }, [

    // Header
    React.createElement('div', { 
      key: 'header', 
      className: 'sg-header sg-margin-bottom-xl' 
    }, [
      React.createElement('h1', { 
        key: 'title',
        className: 'sg-title'
      }, 'Icons Documentation'),
      React.createElement('p', { 
        key: 'description',
        className: 'sg-description'
      }, [
        'Complete documentation of React Icons used in the CHIRP Radio WebApp project. ',
        'All icons are from the ',
        React.createElement('code', { 
          key: 'code-inline',
          style: { 
            backgroundColor: 'var(--cr-default-100)', 
            padding: '2px 6px', 
            borderRadius: '4px',
            fontFamily: 'Monaco, monospace',
            fontSize: '0.875em',
            color: 'var(--cr-primary-700)'
          }
        }, 'react-icons'),
        ' library (Phosphor Icons and Font Awesome).'
      ])
    ]),

    // Controls
    React.createElement('div', { 
      key: 'controls', 
      className: 'sg-card sg-margin-bottom-lg' 
    }, [
      React.createElement('h3', { 
        key: 'controls-title',
        className: 'sg-card-title'
      }, 'Preview Controls'),
      React.createElement('div', { 
        key: 'controls-content', 
        className: 'sg-card-content'
      }, [
        React.createElement('div', { 
          key: 'controls-wrapper',
          className: 'sg-icon-controls'
        }, [
          
          // Size Control
          React.createElement('div', { key: 'size-group', className: 'sg-control-group' }, [
            React.createElement('label', { key: 'size-label', className: 'sg-control-label' }, 'Size'),
            React.createElement('div', { 
              key: 'size-buttons', 
              style: { display: 'flex', gap: 'var(--cr-space-1)', flexWrap: 'wrap' }
            }, 
              sizeOptions.map(size => 
                React.createElement('button', {
                  key: `size-${size}`,
                  style: {
                    padding: 'var(--cr-space-1) var(--cr-space-2)',
                    backgroundColor: selectedSize === size ? 'var(--cr-primary-700)' : 'var(--cr-default-100)',
                    color: selectedSize === size ? 'white' : 'var(--cr-ink)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  },
                  onClick: () => setSelectedSize(size)
                }, `${size}px`)
              )
            )
          ]),

          // Color Control
          React.createElement('div', { key: 'color-group', className: 'sg-control-group' }, [
            React.createElement('label', { key: 'color-label', className: 'sg-control-label' }, 'Color'),
            React.createElement('div', { 
              key: 'color-buttons', 
              style: { display: 'flex', gap: 'var(--cr-space-1)', flexWrap: 'wrap' }
            }, 
              colorOptions.map(colorOption => 
                React.createElement('button', {
                  key: `color-${colorOption.value}`,
                  style: {
                    padding: 'var(--cr-space-1) var(--cr-space-2)',
                    backgroundColor: selectedColor === colorOption.value ? 'var(--cr-primary-700)' : 'var(--cr-default-100)',
                    color: selectedColor === colorOption.value ? 'white' : 'var(--cr-ink)',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '600'
                  },
                  onClick: () => setSelectedColor(colorOption.value)
                }, colorOption.name)
              )
            )
          ])

        ])
      ])
    ]),

    // Phosphor Icons Grid
    React.createElement('div', { key: 'phosphor-section' }, [
      React.createElement('h2', { 
        key: 'phosphor-title',
        style: { 
          font: 'var(--cr-nav2)', 
          color: 'var(--cr-ink)', 
          marginBottom: 'var(--cr-space-4)',
          fontWeight: '600'
        }
      }, 'Phosphor Icons (react-icons/pi)'),
      
      React.createElement('div', { 
        key: 'phosphor-grid',
        className: 'sg-icon-grid'
      },
        icons.map((icon, index) => {
          const IconComponent = icon.component;
          return React.createElement('div', { 
            key: `icon-${index}`, 
            className: 'sg-card'
          }, [
            
            // Icon Preview
            React.createElement('div', { 
              key: 'preview', 
              className: 'sg-icon-preview',
              style: { color: getIconColor() }
            }, 
              React.createElement(IconComponent, { size: selectedSize })
            ),
            
            // Icon Name
            React.createElement('div', { 
              key: 'name', 
              className: 'sg-card-title',
              style: { fontSize: '16px', fontWeight: '600' }
            }, icon.name),
            
            // Usage Description
            React.createElement('p', { 
              key: 'usage', 
              className: 'cr-body-sm',
              style: { 
                color: 'var(--cr-default-700)', 
                marginBottom: 'var(--cr-space-3)',
                lineHeight: '1.5'
              }
            }, icon.usage),
            
            // Components Used In
            React.createElement('div', { key: 'components-section', style: { marginBottom: 'var(--cr-space-3)' } }, [
              React.createElement('div', { 
                key: 'components-label', 
                className: 'sg-eyebrow',
                style: { marginBottom: 'var(--cr-space-2)' }
              }, 'Used in:'),
              React.createElement('div', { 
                key: 'component-tags', 
                style: { display: 'flex', gap: 'var(--cr-space-1)', flexWrap: 'wrap' }
              }, 
                icon.components.map(comp => 
                  React.createElement('span', { 
                    key: `tag-${comp}`,
                    style: {
                      backgroundColor: 'var(--cr-primary-100)',
                      color: 'var(--cr-primary-700)',
                      padding: 'var(--cr-space-xs) var(--cr-space-2)',
                      borderRadius: 'var(--cr-space-xs)',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em'
                    }
                  }, comp)
                )
              )
            ]),
            
            // Code Example
            React.createElement('div', { key: 'code-section' }, [
              React.createElement('div', { 
                key: 'code-label', 
                className: 'sg-eyebrow',
                style: { marginBottom: 'var(--cr-space-2)' }
              }, 'Import & Usage:'),
              React.createElement('pre', { 
                key: 'code-block', 
                className: 'sg-code-box',
                style: { 
                  margin: 0, 
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }
              }, 
`import { ${icon.name} } from 'react-icons/pi';

<${icon.name} size={${selectedSize}} />`
              )
            ])
            
          ]);
        })
      )
    ]),

    // Social Media Icons Grid (Font Awesome)
    React.createElement('div', { key: 'social-section', style: { marginTop: 'var(--cr-space-8)' } }, [
      React.createElement('h2', { 
        key: 'social-title',
        style: { 
          font: 'var(--cr-nav2)', 
          color: 'var(--cr-ink)', 
          marginBottom: 'var(--cr-space-4)',
          fontWeight: '600'
        }
      }, 'Social Media Icons (react-icons/fa)'),
      
      React.createElement('div', { 
        key: 'social-grid',
        className: 'sg-icon-grid'
      },
        socialIcons.map((icon, index) => {
          const IconComponent = icon.component;
          return React.createElement('div', { 
            key: `social-icon-${index}`, 
            className: 'sg-card'
          }, [
            
            // Icon Preview
            React.createElement('div', { 
              key: 'preview', 
              className: 'sg-icon-preview',
              style: { color: getIconColor() }
            }, 
              React.createElement(IconComponent, { size: selectedSize })
            ),
            
            // Icon Name
            React.createElement('div', { 
              key: 'name', 
              className: 'sg-card-title',
              style: { fontSize: '16px', fontWeight: '600' }
            }, icon.name),
            
            // Usage Description
            React.createElement('p', { 
              key: 'usage', 
              className: 'cr-body-sm',
              style: { 
                color: 'var(--cr-default-700)', 
                marginBottom: 'var(--cr-space-3)',
                lineHeight: '1.5'
              }
            }, icon.usage),
            
            // Components Used In
            React.createElement('div', { key: 'components-section', style: { marginBottom: 'var(--cr-space-3)' } }, [
              React.createElement('div', { 
                key: 'components-label', 
                className: 'sg-eyebrow',
                style: { marginBottom: 'var(--cr-space-2)' }
              }, 'Used in:'),
              React.createElement('div', { 
                key: 'component-tags', 
                style: { display: 'flex', gap: 'var(--cr-space-1)', flexWrap: 'wrap' }
              }, 
                icon.components.map(comp => 
                  React.createElement('span', { 
                    key: `tag-${comp}`,
                    style: {
                      backgroundColor: 'var(--cr-primary-100)',
                      color: 'var(--cr-primary-700)',
                      padding: 'var(--cr-space-xs) var(--cr-space-2)',
                      borderRadius: 'var(--cr-space-xs)',
                      fontSize: '11px',
                      fontWeight: '600',
                      textTransform: 'uppercase',
                      letterSpacing: '0.025em'
                    }
                  }, comp)
                )
              )
            ]),
            
            // Code Example
            React.createElement('div', { key: 'code-section' }, [
              React.createElement('div', { 
                key: 'code-label', 
                className: 'sg-eyebrow',
                style: { marginBottom: 'var(--cr-space-2)' }
              }, 'Import & Usage:'),
              React.createElement('pre', { 
                key: 'code-block', 
                className: 'sg-code-box',
                style: { 
                  margin: 0, 
                  fontSize: '12px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }
              }, 
                icon.name === 'SiBluesky' 
                  ? `import { ${icon.name} } from 'react-icons/si';\n\n<${icon.name} size={${selectedSize}} />`
                  : `import { ${icon.name} } from 'react-icons/fa';\n\n<${icon.name} size={${selectedSize}} />`
              )
            ])
            
          ]);
        })
      )
    ]),

    // Usage Guidelines
    React.createElement('div', { key: 'guidelines', className: 'sg-card sg-margin-top-lg' }, [
      React.createElement('h2', { 
        key: 'guidelines-title', 
        className: 'sg-card-title',
        style: { fontSize: '20px', textAlign: 'center' }
      }, 'Usage Guidelines'),
      React.createElement('div', { key: 'guidelines-content', className: 'sg-card-content' }, [
        
        // Import Instructions
        React.createElement('div', { key: 'import-section', style: { marginBottom: 'var(--cr-space-5)' } }, [
          React.createElement('h3', { 
            key: 'import-title', 
            style: { 
              font: 'var(--cr-nav2)', 
              color: 'var(--cr-ink)', 
              marginBottom: 'var(--cr-space-3)',
              fontWeight: '600'
            }
          }, 'Import Instructions'),
          React.createElement('pre', { 
            key: 'import-code', 
            className: 'sg-code-box',
            style: { fontSize: '13px' }
          }, 
`// Import Phosphor icons from react-icons/pi
import { 
  PiHandHeartLight,
  PiCaretLeft,
  PiCaretRight,
  PiCaretDown,
  PiPaperclip,
  PiNotepad
} from 'react-icons/pi';

// Import Font Awesome icons from react-icons/fa
import { 
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
  FaLinkedin 
} from 'react-icons/fa';`
          )
        ]),

        // Sizing Standards
        React.createElement('div', { key: 'sizing-section', style: { marginBottom: 'var(--cr-space-5)' } }, [
          React.createElement('h3', { 
            key: 'sizing-title', 
            style: { 
              font: 'var(--cr-nav2)', 
              color: 'var(--cr-ink)', 
              marginBottom: 'var(--cr-space-3)',
              fontWeight: '600'
            }
          }, 'Sizing Standards'),
          React.createElement('ul', { 
            key: 'sizing-list', 
            style: { 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            } 
          }, [
            React.createElement('li', { 
              key: 'size-16-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'size-16-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, '16px: '), 
              'Small inline icons, form controls'
            ]),
            React.createElement('li', { 
              key: 'size-20-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'size-20-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, '20px: '), 
              'Navigation icons, small buttons'
            ]),
            React.createElement('li', { 
              key: 'size-24-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'size-24-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, '24px: '), 
              'Standard button icons, menu items (most common)'
            ]),
            React.createElement('li', { 
              key: 'size-32-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'size-32-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, '32px: '), 
              'Large buttons, prominent actions'
            ]),
            React.createElement('li', { 
              key: 'size-48-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'size-48-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, '48px: '), 
              'Hero buttons, main actions'
            ]),
            React.createElement('li', { 
              key: 'size-64-item', 
              style: { 
                padding: 'var(--cr-space-2) 0',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'size-64-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, '64px: '), 
              'Large displays, special cases'
            ])
          ])
        ]),

        // Color Usage
        React.createElement('div', { key: 'color-section', style: { marginBottom: 'var(--cr-space-5)' } }, [
          React.createElement('h3', { 
            key: 'color-title', 
            style: { 
              font: 'var(--cr-nav2)', 
              color: 'var(--cr-ink)', 
              marginBottom: 'var(--cr-space-3)',
              fontWeight: '600'
            }
          }, 'Color Usage'),
          React.createElement('ul', { 
            key: 'color-list', 
            style: { 
              listStyle: 'none', 
              padding: 0, 
              margin: 0 
            } 
          }, [
            React.createElement('li', { 
              key: 'color-ink-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'color-ink-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, 'var(--cr-ink): '), 
              'Default text color, primary icon color'
            ]),
            React.createElement('li', { 
              key: 'color-primary-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'color-primary-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, 'var(--cr-primary-700): '), 
              'Active states, primary actions'
            ]),
            React.createElement('li', { 
              key: 'color-secondary-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'color-secondary-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, 'var(--cr-secondary-700): '), 
              'Secondary actions, accents'
            ]),
            React.createElement('li', { 
              key: 'color-default-item', 
              style: { 
                padding: 'var(--cr-space-2) 0', 
                borderBottom: '1px solid var(--cr-default-200)',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'color-default-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, 'var(--cr-default-700): '), 
              'Muted icons, secondary information'
            ]),
            React.createElement('li', { 
              key: 'color-current-item', 
              style: { 
                padding: 'var(--cr-space-2) 0',
                lineHeight: '1.6'
              } 
            }, [
              React.createElement('strong', { 
                key: 'color-current-strong', 
                style: { color: 'var(--cr-primary-700)' } 
              }, 'currentColor: '), 
              'Inherit color from parent element'
            ])
          ])
        ]),

        // Best Practices
        React.createElement('div', { key: 'practices-section' }, [
          React.createElement('h3', { 
            key: 'practices-title', 
            style: { 
              font: 'var(--cr-nav2)', 
              color: 'var(--cr-ink)', 
              marginBottom: 'var(--cr-space-3)',
              fontWeight: '600'
            }
          }, 'Best Practices'),
          React.createElement('ul', { 
            key: 'practices-list', 
            style: { 
              listStyle: 'disc', 
              paddingLeft: 'var(--cr-space-5)',
              margin: 0 
            } 
          }, [
            React.createElement('li', { 
              key: 'practice-1-item', 
              style: { 
                padding: 'var(--cr-space-1) 0',
                lineHeight: '1.6'
              } 
            }, 'Always use consistent sizing within the same component context'),
            React.createElement('li', { 
              key: 'practice-2-item', 
              style: { 
                padding: 'var(--cr-space-1) 0',
                lineHeight: '1.6'
              } 
            }, 'Prefer CSS variables for colors to maintain theme consistency'),
            React.createElement('li', { 
              key: 'practice-3-item', 
              style: { 
                padding: 'var(--cr-space-1) 0',
                lineHeight: '1.6'
              } 
            }, 'Use semantic naming for icon imports to improve code readability'),
            React.createElement('li', { 
              key: 'practice-4-item', 
              style: { 
                padding: 'var(--cr-space-1) 0',
                lineHeight: '1.6'
              } 
            }, 'Include appropriate aria-labels for accessibility when icons convey meaning')
          ])
        ])
      ])
    ])

  ]);
}