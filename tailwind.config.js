/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#0E76FD',
          dark: '#0A57B3',
          soft: '#E8F2FF'
        },
        text: '#0f172a'
      },
      boxShadow: {
        card: '0 6px 20px rgba(14,118,253,0.08)'
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px'
      }
    }
  },
  plugins: []
};