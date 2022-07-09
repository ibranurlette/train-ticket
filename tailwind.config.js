/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "375px",
      // => @media (min-width: 640px) { ... }

      md: "760px",
      // => @media (min-width: 768px) { ... }

      lg: "1000px",
      // => @media (min-width: 1024px) { ... }
      xl: "1600px",
      // => @media (min-width: 1024px) { ... }
    },
  },
  plugins: [],
};
