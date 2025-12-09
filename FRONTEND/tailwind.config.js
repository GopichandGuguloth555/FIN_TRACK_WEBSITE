/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#4F3BA9",
          purpleDark: "#3C2E87",
          purpleLight: "#E8E4FF",

          sidebar: "#D1CDE0",
          sidebarDark: "#B5B0CC",

          text: "#1C1C1C",
          textMuted: "#6B6B6B",
        }
      },

      boxShadow: {
        soft: "0px 2px 5px rgba(0,0,0,0.08)",
        card: "0px 4px 10px rgba(0,0,0,0.12)",
      }
    },
  },
  plugins: [],
};
