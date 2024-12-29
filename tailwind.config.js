/** @type {import('tailwindcss').Config} */
const a = require("daisyui/src/theming/themes")["dark"];
export default {
  content: ["./index.html", "./src/**/*.{vue,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],

  daisyui: {
    themes: true,
  },
};
