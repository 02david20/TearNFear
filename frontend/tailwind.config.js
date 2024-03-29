/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
      colors: {
        darkblue: '#0288D1',
        lightblue: '#00BCD4',
        fadeblue: '#B3E5FC',
        black: '#212121',
        darkgray: '#757575',
        lightgray: '#BDBDBD',
        white: '#FFFFFF',
        primary: '#007AFF',
        secondary: '#03A9F4'
      },
    },
    fontSize: {
      sm: 12,
      base: 14,
      xl: 20,
      heading: 24,
      title: 30,
    }
  },
  plugins: [],
}

