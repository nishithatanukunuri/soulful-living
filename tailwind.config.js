/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
        serif: ['"Playfair Display"', ...defaultTheme.fontFamily.serif],
      },
      colors: {
        'warm-ivory': '#F5F1E6',
        'serene-white': '#F9F8F6',
        'charcoal': '#2E2D2B',
        'earth-tone': '#C3B8AA',
        'earth-tone-dark': '#A39689',
        'sage-green': '#A3B18A',
        'forest-green': '#3A4A3A',
        'accent': '#8B7D6B',
        'gold-star': '#F59E0B',
        'transparent': 'transparent',
        'white': '#FFFFFF',
        'black': '#000000',
        'red-500': '#EF4444',
        'green-600': '#16A34A',
      },
    },
  },
  plugins: [],
};