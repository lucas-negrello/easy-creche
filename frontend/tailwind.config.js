/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss-primeui'),
    require('tailwind-scrollbar')({nocompatible: true}),
  ],
}
