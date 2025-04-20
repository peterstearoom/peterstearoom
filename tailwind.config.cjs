// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    fontFamily: {
      sans: ['"Inter"', 'sans-serif'],
      serif: ['"Playfair Display"', 'serif']
    },
    colors: {
      tea: {
        light: '#f3f0e8',
        DEFAULT: '#eae7de',
        dark: '#d6d2c4',
      },
      accent: '#4caf50',
    }
  }
}
  plugins: [],
}
