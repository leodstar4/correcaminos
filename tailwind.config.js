/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "green-primary": "#2A6B4F",
        "green-dark": "#1E4F3A",
        "green-light": "#3D8B65",
        "teal-brand": "#1A8A7B",
        "teal-light": "#26A99A",
        "orange-brand": "#E07B20",
        "orange-light": "#F09440",
        "orange-dark": "#C0661A",
        cream: "#F5F0E8",
        "cream-dark": "#EAE3D2",
        "cream-darker": "#D9CEB8",
        "earth-dark": "#1C1C1C",
        "earth-brown": "#5C4A2A",
        "earth-tan": "#8A7560",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'Inter'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 16px rgba(42,107,79,0.10), 0 1px 4px rgba(0,0,0,0.05)",
        "card-hover": "0 8px 36px rgba(42,107,79,0.18), 0 2px 8px rgba(0,0,0,0.08)",
        orange: "0 4px 20px rgba(224,123,32,0.30)",
        "green-glow": "0 0 0 3px rgba(42,107,79,0.15)",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
        "spin-slow": "spin 3s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
