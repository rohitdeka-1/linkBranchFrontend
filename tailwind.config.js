/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "pulse-glow": "pulseGlow 6s ease-in-out infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
            backgroundSize: "100% 100%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
            backgroundSize: "120% 120%",
          },
        },
      },
    },
  },
}
