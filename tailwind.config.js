const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.tsx', './pages/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    flex: {
      1: '1 1 0%',
      auto: '1 1 auto',
      initial: '0 1 auto',
      none: 'none',
      2: '2 2 0%',
      3: '3 3 0%',
      4: '4 4 0%',
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
      lightblue: colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
    },
    lineHeight: {
      skinny: '0.3',
    },
    minHeight: {
      0: '0',
      full: '100%',
      '80vh': '80vh',
      screen: '100vh',
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [],
}
