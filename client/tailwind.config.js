/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        glow: "0 4px 30px rgba(0, 200, 255, 0.5)",
      },
    },
  },
  darkMode: "class", // Enables manual theme switching
  plugins: [],
};
