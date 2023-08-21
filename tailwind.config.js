module.exports = {
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './bloks/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
    safelist: ['text-yellow-900'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '340px',
      },
      borderRadius: {
        DEFAULT: '0.313rem',
        xl: '0.625rem',
      },
      fontFamily: {
        sequel: ['Sequel Sans', 'Open Sans'],
      },
      saturate: {
        70: '.7',
      },
      opacity: {
        75: '.75',
      },
      scale: {
        102: '1.05',
      },
      margin: {
        '-half-screen': '-50vw',
        '65/100': '65%',
      },
      spacing: {
        104: '28rem',
        128: '32rem',
        160: '40rem',
        180: '45rem',
      },
      height: {
        15: '3.75rem',
        18: '4.375rem',
        128: '32rem',
        160: '40rem',
        180: '45rem',
        'full-2': '200%',
        'full-3': '300%',
        home: '1750px',
        'home-xl': '2200px',
      },
      minHeight: {
        96: '24rem',
        56: '14rem',
        248: '62rem',
      },
      transitionDuration: {
        400: '400ms',
        250: '250ms',
      },
      maxHeight: {
        116: '28rem',
        128: '32rem',
        160: '40rem',
        240: '62.5rem',
      },
      maxWidth: {
        50: '12.5rem',
        '3xl': '45.625rem',
        '4xl': '58.125rem',
      },
      width: {
        13: '3.313rem',
        18: '4.375rem',
        88: '22.25rem',
        215: '48.75rem',
        230: '52.5rem',
      },
      minWidth: {
        35: '8.75rem',
      },
      // container: {
      //   padding: {
      //     sm: '1rem',
      //     md: '1.5rem',
      //     lg: '2rem',
      //     xl: '2rem',
      //     '2xl': '2rem',
      //   },
      //   center: true,
      //   screens: {
      //     sm: '400px',
      //     md: '700px',
      //     lg: '1024px',
      //     xl: '1200px',
      //   }
      // },
      screens: {
        '3xl': '1728px',
      },
      fontSize: {
        xxs: ['10px'],
        xs: ['12px'],
        sm: ['14px'],
        base: ['16px'],
        lg: ['18px'],
        xl: ['20px'],
        '2xl': ['24px'],
        '3xl': ['30px'],
        '4xl': ['36px'],
        '5xl': ['48px'],
        '6xl': ['52px'],
        '6xlplus': ['60px'],
        '7xl': ['72px'],
      },
      blur: {
        '4xl': '104px',
      },
      colors: {
        'black/82': 'rgba(0,0,0,0.82)',
        yellow: {
          50: '#FDAB0E',
          100: '#FDAB0E',
          200: '#FDAB0E',
          300: '#FDAB0E',
          400: '#FDAB0E',
          500: '#FDAB0E',
          600: '#FDAB0E',
          700: '#FDAB0E',
          800: '#FDAB0E',
          900: '#FDAB0E',
          1000: '#F1A004', // keep for hover
        },
        blue: {
          400: '#3197ff',
        },
        gray: {
          // '50': '',
          // '100': '',
          200: '#F5F6F7',
          250: '#EFF2F3',
          275: '#E1E1E1',
          300: '#C4C4C4',
          // '400': '',
          500: '#999EAB',
          600: '#676C7A',
          650: '#474950',
          700: '#353535',
          800: '#232320',
          900: '#111113',
          1000: '#E6E7EA', // new color, keep it for highlight
        },
        screens: {
          'hover-hover': { raw: '(hover: hover)' },
        },
      },
      brightness: {
        175: '1.75',
      },
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
      scale: ['group-hover'],
      opacity: ['group-hover'],
      saturate: ['group-hover'],
      padding: ['first', 'last', 'odd', 'even'],
      margin: ['first', 'last', 'odd', 'even'],
      translate: ['first', 'last', 'odd', 'even'],
      transform: ['first', 'last', 'odd', 'even'],
      borderWidth: ['first', 'last', 'odd', 'even'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
