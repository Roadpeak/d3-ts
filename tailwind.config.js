/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F24E51', 
        secondary: '#FDEDEE',
        fast: '#1E2023',
      },
    },
  },
  plugins: [],
}
