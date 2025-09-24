/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0f172a",
          DEFAULT: "#0ea5e9",
          light: "#38bdf8",
          accent: "#f97316",
          muted: "#94a3b8"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        heading: ["'Poppins'", "'Inter'", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 40px -20px rgba(14, 165, 233, 0.45)"
      }
    }
  },
  plugins: []
};
