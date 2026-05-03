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
        "earth-tan": "#A8885A",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(42,107,79,0.12), 0 1px 6px rgba(42,107,79,0.08)",
        "card-hover": "0 8px 40px rgba(42,107,79,0.2), 0 2px 10px rgba(42,107,79,0.12)",
        orange: "0 4px 20px rgba(224,123,32,0.25)",
      },
    },
  },
  plugins: [],
};
