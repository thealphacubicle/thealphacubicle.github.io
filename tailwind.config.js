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
          deep: "#2f0c0c",
          DEFAULT: "#7b2d3a",
          light: "#b54a5a",
          sand: "#f4ede1",
          cream: "#fbf6ee",
          muted: "#b39a8f",
          accent: "#e9c46a",
          ink: "#1c1a1a"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        heading: ["'Poppins'", "'Inter'", "sans-serif"]
      },
      boxShadow: {
        glow: "0 24px 45px -20px rgba(123, 45, 58, 0.4)",
        card: "0 18px 35px -25px rgba(31, 6, 8, 0.65)"
      }
    }
  },
  plugins: []
};
