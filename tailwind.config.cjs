const defaultTheme = require('tailwindcss/defaultTheme')
const formPlugin = require('@tailwindcss/forms')

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Kumbh Sans', ...defaultTheme.fontFamily.sans],
      },
      minHeight: {
        swatch: '135px',
      },
      minWidth: {
        button: '105px',
      },
      transitionTimingFunction: {
        ease: 'cubic-bezier(.25, 0, .5, 1)',
        elastic: 'cubic-bezier(.5, .75, .75, 1.25)',
      },
      transitionDuration: {
        350: '350ms',
        400: '400ms',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
      },
    },
  },
  plugins: [formPlugin],
}
