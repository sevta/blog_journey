const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1280px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "640px" },
      xs: { max: "450px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "Arial", "Helvetica", ...fontFamily.sans],
        caveat: ["Caveat"],
        nunito: ["Nunito"],
        inter: ["Inter"],
        comforter: ["Comforter Brush"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui"), require("@tailwindcss/aspect-ratio")],
};
