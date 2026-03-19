import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#faf8f5",
          100: "#f5f0e8",
          200: "#ebe0cc",
          300: "#dccba8",
          400: "#c9ae80",
          500: "#b8945f",
        },
        walnut: {
          50: "#fdf8f3",
          100: "#f8edd9",
          200: "#f0d5a8",
          300: "#e6b86e",
          400: "#d9954a",
          500: "#c4762d",
          600: "#a85e24",
          700: "#8a4920",
          800: "#703b1f",
          900: "#5c311c",
          950: "#341609",
        },
        sage: {
          50: "#f4f7f4",
          100: "#e3ebe3",
          200: "#c7d7c8",
          300: "#9cbb9e",
          400: "#6d9870",
          500: "#4a7a4e",
          600: "#38623c",
          700: "#2e4f31",
          800: "#273f29",
          900: "#213523",
        },
      },
      fontFamily: {
        playfair: ["'Playfair Display'", "serif"],
        lato: ["'Lato'", "sans-serif"],
        cormorant: ["'Cormorant Garamond'", "serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-in-left": "slideInLeft 0.6s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-30px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
