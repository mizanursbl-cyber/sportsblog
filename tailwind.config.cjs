/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}" // keep this if you still have some src paths
  ],
  theme: {
    extend: {}
  },
  plugins: [require("tailwindcss-animate")]
};
