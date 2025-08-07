/** @type {import('tailwindcss').Config} */

import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        garamond: ["Cormorant Garamond", "serif"],
      },
    },
    plugins: [
      scrollbar({ nocompatible: true }), // use true for `scrollbar-thin` support
    ],
  },
  plugins: [],
};
