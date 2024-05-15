/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  theme:{
    colors:{
      blue: {
        light:'#627CD9',
        default:'#5B72C3',
        dark: '#3D53A0',
      }
    }
  },
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
