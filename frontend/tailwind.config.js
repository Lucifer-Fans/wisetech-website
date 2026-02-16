const { transform } = require('framer-motion');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        blue: "#364a73",
        red: "#9e312c",
        gray:"#8d8e90",
        gray1:"#9FA0A2",
        gray2:"#B1B2B4",
        gray3:"#C3C4C6",
        gray4:"#D5D6D7",
      },
      animation: {
        marquee: "marquee 30s linear infinite"
      },
      keyframes: {
        marquee: {
          "0%": {transform: "translateX(0%)"},
          "100%": {transform: "translateX(-50%)"}
        }
      }
    },
  },
  plugins: [],
};
