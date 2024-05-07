/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D83A3E', 
        secondary: '#FDEDEE',
        fast: '#1E2023',
      },
    },
  },
  plugins: [],
}
