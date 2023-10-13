/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      boxShadow: {
        '3xl': ' rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;',
      },
      screens: {
        'md-custom': '725px',
        'sm-custom':'408px' // Define your custom media query here
      },
    },
  },
  plugins: [],
}