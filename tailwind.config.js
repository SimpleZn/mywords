/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: [
    "./public/**/*.html",
    "./src/**/*.tsx", // Adjust file extension if needed
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
