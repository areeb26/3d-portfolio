/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        n8n: {
          purple: '#7B3FF2',
          pink: '#FF6D5A',
          blue: '#00C0FF',
        }
      }
    },
  },
  plugins: [],
}
