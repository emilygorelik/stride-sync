/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        spotify: '#1db954',
        'spotify-accent': '#127836',
      },
    },
  },
  daisyui: {
    themes: ['night'],
  },
  plugins: [require('daisyui')],
};
