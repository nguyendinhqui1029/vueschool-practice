module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
      'min-width': 'min-w',
    }},
  },
  plugins: [],
};