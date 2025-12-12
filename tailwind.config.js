/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        moonlit: {
          50: '#F0F3F7',
          100: '#E1E7EF',
          200: '#C3CFE0',
          300: '#A5B4C7',
          400: '#8B9CB5',
          500: '#7C8EA6',
          600: '#6B7FA3',
          700: '#556687',
          800: '#404D6B',
          900: '#2C3549',
        },
      },
    },
  },
  plugins: [],
};
