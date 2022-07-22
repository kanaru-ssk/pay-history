/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    colors: {
      white: "#fff",
      "trans-white": "hsla(0,0%,100%,.8)",
      black: "#000",
      gray: "#bbb",
      "light-gray": "#eee",
      "dark-gray": "#888",
      red: "#b00",
      "main-color": "#232C93",
      "sub-color": "#C1C5FE",
    },
    fontFamily: {
      sans: [
        "Nunito Sans",
        "Helvetica Neue",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
    },
  },
};
