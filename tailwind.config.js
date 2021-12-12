const colors = require('tailwindcss/colors')

const plugin = require('tailwindcss/plugin')

const focusSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant('focus-sibling', ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:focus + .focus-sibling\\:${rule.selector.slice(1)}`
    })
  })
})

const checkedSiblingPlugin = plugin(function ({ addVariant, e }) {
  addVariant('checked-sibling', ({ container }) => {
    container.walkRules((rule) => {
      rule.selector = `:checked + .checked-sibling\\:${rule.selector.slice(1)}`
    })
  })
})

module.exports = {
  purge: ['./src/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      lineHeight: {
        skinny: '0.3',
      },
      minHeight: {
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
      },
      maxHeight: {
        '80vh': '80vh',
        '85vh': '85vh',
        '90vh': '90vh',
        '95vh': '95vh',
      },
      inset: {
        '1/5': '20%',
        '2/5': '40%',
        '3/5': '60%',
        '4/5': '80%',
      },
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
      },
    },
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      gray: colors.coolGray,
      bluegray: colors.blueGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      sky: colors.sky,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'focus-sibling', 'checked-sibling'],
      textColor: ['active', 'focus-sibling', 'checked-sibling'],
    },
  },
  plugins: [focusSiblingPlugin, checkedSiblingPlugin],
}
