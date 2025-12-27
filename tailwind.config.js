/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-slate': {
          50: '#F0F3F6',
          100: '#D9E1EC',
          200: '#B3C3D8',
          300: '#8CA5C4',
          400: '#6687B0',
          500: '#4A5A6F',
          600: '#3A4A5C',
          700: '#2D3E50',
          800: '#1F2835',
          900: '#121820',
        },
        'terracotta': {
          50: '#FEF5F0',
          100: '#FBEBE1',
          200: '#F7D7C3',
          300: '#F3C3A5',
          400: '#E6a47e',
          500: '#D97560',
          600: '#C76C47',
          700: '#B8653F',
          800: '#A25A38',
          900: '#764230',
        },
      },
    },
  },
  plugins: [],
};
