/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Warm stone scale — warmer and more human than cool zinc grays.
        ink: {
          black: "#1A1714",
          900: "#262320",
          700: "#4B453E",
          500: "#7D746A",
          300: "#DAD4CB",
          100: "#F5F2EC",
          white: "#FFFFFF"
        },
        // Clay/terracotta — one confident, human accent (links, active nav, sparkline).
        accent: {
          DEFAULT: "#B4522E",
          muted: "#C9805F",
          dark: "#8F3F22"
        }
      },
      fontFamily: {
        sans: ["'Inter'", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      borderRadius: {
        DEFAULT: "6px",
        card: "6px"
      },
      maxWidth: {
        content: "1200px"
      },
      spacing: {
        section: "96px"
      }
    }
  },
  plugins: []
};
