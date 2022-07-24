module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      gray: "#bbb",
      "light-gray": "#eee",
      "dark-gray": "#888",
      red: "#f77",
      "main-color": "#232C93",
      "sub-color": "#C1C5FE",
      "trans-black": "hsla(0,0%,0%,.6)",
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
