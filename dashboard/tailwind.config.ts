import lineClamp from '@tailwindcss/line-clamp'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
        openans: ["Open Sans", 'sans-seri']
      },
    },
    colors: {
      primary: "#4f46e5",
      secondary: "#334155",
      accent: "#ec4899",
    },
    borderRadius: {
      xl: "12px",
      "2xl": "16px",
    },
  },
  plugins: [lineClamp],
}