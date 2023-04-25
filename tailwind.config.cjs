/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["DM Sans"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
