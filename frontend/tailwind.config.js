/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff7a00",
        secondary: "#ffb703",
        dark: "#1f2937",
      },
    },
  },
  plugins: [],
};
