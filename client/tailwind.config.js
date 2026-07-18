/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f9f0',
          100: '#dbf0db',
          200: '#b9e2b9',
          300: '#8acd8a',
          400: '#5cb35c',
          500: '#3d8b3d',
          600: '#2f6f2f',
          700: '#275927',
          800: '#224722',
          900: '#1d3c1d',
        },
        secondary: {
          50: '#fef7ec',
          100: '#fce9ca',
          200: '#f8d090',
          300: '#f4b257',
          400: '#f1942e',
          500: '#e97416',
          600: '#ce5610',
          700: '#ab3c11',
          800: '#893014',
          900: '#702914',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      }
    },
  },
  plugins: [],
}