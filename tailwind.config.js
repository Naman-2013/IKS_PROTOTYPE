/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        meadow: {
          sky: '#8eb5a8',
          'sky-light': '#a5c9be',
          'sky-dark': '#64887b',
          cloud: '#fefae0',
          'cloud-warm': '#f3f6d7',
          'cloud-shadow': '#d2e2c5',
          grass: '#7a9a3b',
          'grass-light': '#90b348',
          'grass-dark': '#557327',
          hill: '#3d5225',
          deep: '#233217',
          earth: '#1b2612',
          wood: '#8c5936',
          terracotta: '#a85834',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'art-card': '0 8px 30px -4px rgba(35, 50, 23, 0.08), 0 2px 8px -1px rgba(35, 50, 23, 0.04)',
        'art-card-dark': '0 12px 35px -6px rgba(10, 16, 8, 0.4), 0 2px 8px -1px rgba(122, 154, 59, 0.15)',
        'art-button': '0 4px 12px rgba(85, 115, 39, 0.25)',
      },
    },
  },
  plugins: [],
}
