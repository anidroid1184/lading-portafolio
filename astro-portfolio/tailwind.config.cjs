module.exports = {
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sv-black': '#0b0b0f',
        'sv-purple': '#6f2dbd',
        'sv-pink': '#ff2d95',
        'sv-blue': '#00a8ff'
      },
      fontFamily: {
        graffiti: ['Bangers', 'Permanent Marker', 'cursive'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [],
}
