module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      'xxs': '280px',
      // => @media (min-width: 320px) { ... }

      'xs': '450px',

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
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
      },
      colors: {
        'theme-blue': '#180F2E'
      }
    }
  },
  plugins: [],
}
