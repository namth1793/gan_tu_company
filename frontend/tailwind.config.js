/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
          hover: '#388e3c',
          50: '#f1f8f1',
          100: '#dcf0dc',
          200: '#b8e0b8',
          300: '#86c986',
          400: '#4caf50',
          500: '#2e7d32',
          600: '#2e7d32',
          700: '#256427',
          800: '#1b5e20',
          900: '#144d19',
        },
        accent: '#f57c00',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
