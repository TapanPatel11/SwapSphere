/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif", "system-ui"],
        serif: ["Montserrat", "ui-serif", "Georgia"],
      },
    },
  },
  plugins: [],
};
