/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wilom: {
          navy: '#0f172a',
          red: '#dc2626',
          lightGray: '#f8fafc'
        }
      }
    },
  },
  plugins: [],
}