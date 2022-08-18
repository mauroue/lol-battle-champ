/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ash-grey': '#b5c2b7',
        'cool-grey': '#8c93a8',
        'english-violet': '#62466b',
        'raisin-black': '#2d2327'
      }
    },
  },
  plugins: [],
}
