/** @type {import('tailwindcss').Config} */

module.exports = {
  purge: [
    "./public/**/*.html",
    "./src/**/*.tsx", // Adjust file extension if needed
  ],
  darkMode: false, // or 'media' or 'class'
  extend: {
    colors: {
      "hover-blue": "#197096", // hover-blue
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
