/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      display: ["Roboto", "Helvetica", "Arial", "sans-serif"],
      body: ["Roboto", "Helvetica", "Arial", "sans-serif"],
    },
  },
  plugins: [],
}
