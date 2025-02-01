/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./*.{js,jsx,html}"
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
}