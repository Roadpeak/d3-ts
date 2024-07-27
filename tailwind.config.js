/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF9700', 
        secondary: '#FDEDEE',
        fast: '#1E2023',
        third: '#FF9021'
      },
    },
  },
  plugins: [],
}
