/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryBgColor: '#181820',
        secondaryBgColor: '#21212b',
      }
    },
  },
  plugins: [
    require("daisyui"),
  ],
}

