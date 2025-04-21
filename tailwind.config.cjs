// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        tea: {
          light: '#f3f0e8',
          DEFAULT: '#eae7de',
          dark: '#d6d2c4',
        },
        accent: '#4caf50',
      },
      fontSize: {
        xxl: '2.25rem',
        mega: '3rem',
      },
      padding: {
        big: '1.25rem',
        huge: '2rem',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        heavy: '0 6px 20px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'tea-gradient': 'linear-gradient(to bottom right, #f3f0e8, #eae7de)',
      }
    },
  },
  plugins: [],
}
