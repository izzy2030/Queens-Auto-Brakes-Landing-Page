/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "90rem",
      },
      fontFamily: {
        sans: ['Rethink Sans', 'sans-serif'],
        heading: ['Cal Sans', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
