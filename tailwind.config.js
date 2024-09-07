/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "purple" : "#611BD0",
        "blue" : "#F5F3FF",
        "blue-secondary" : "#F9F9F9",
        "primaryBG" : "#FCFCFC",
        "black" : "#191C1B",
        "black-font" : "#000",
        "secondary-font" : "#3D3D3D",
        "white-font" : "#FFF",
        "btn-primary" : "#611BD0",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

