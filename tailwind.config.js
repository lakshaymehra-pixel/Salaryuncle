/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#608D4B',
        'primary-dark': '#4a6e39',
        'primary-light': '#7aad5e',
        'primary-50': '#f0f7eb',
        'primary-100': '#d9edcc',
        'primary-200': '#b3db99',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
