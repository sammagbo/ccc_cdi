/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notebook: {
          beige: '#fdfaf3',
          lines: '#e2e8f0',
          red: '#fecaca',
          pencil: '#334155',
          paper: '#ffffff'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
        hand: ['Shadows Into Light', 'cursive'],
      }
    },
  },
  plugins: [],
}
