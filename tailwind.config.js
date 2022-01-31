module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
 
    fontFamily: {
      sans: ['Frank', 'sans-serif'],
      serif: ['DMSerif', 'serif'],
      farmer: ['TheFarmer', 'farmer']
    },

    extend: {
      backgroundImage: {
        'landing-slider-one': "url('/images/landing.jpg')",
        'landing-slider-two': "url('/images/me.jpg')"
      },
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
  plugins: [],
}
