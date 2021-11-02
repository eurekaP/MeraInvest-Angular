const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    enabled: process.env.WEBPACK_DEV_SERVER === 'true' && process.argv.join(' ').indexOf('build') !== -1,
    content: [
      "./src/**/*.{html,ts}",
      "./projects/**/*.{html,ts}"
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'water': '#F3F3F3',
        'blue-1200': '#152864',
        'icono': '#eef0f4',
        'contact': '#fafafa',
      }),
      backgroundImage: theme => ({
        'hero': "url('https://cdn.filestackcontent.com/NfmPbN7RGe3mAoSXpUbC')",
        'watermark': "url('https://cdn.filestackcontent.com/WnHCHs2cSFKNYy0CjWWM')",
        'grid-promo': "url('https://cdn.filestackcontent.com/Wv8PbvUCSeGNYyBFm1mI')",
        'about': "url('https://cdn.filestackcontent.com/Ln7KwIdZQRAnoI33ufMg')",
      }),
      backgroundPosition: {
        'watermark-right': 'right bottom -10rem',
      },
      borderColor: theme => ({
        'emblem-grad': '#f8f8f8',
        'icono': '#dfe2ea',
      }),
      borderWidth: {
        '1': '1px',
        '10': '10px',
        '20': '20px',
      },
      colors: {
        sky: colors.sky,
        cyan: colors.cyan,
      },
      fontSize: {
        'xss': '0.65rem',
      },
      gridColumn: {
        'span-13': 'span 13 / span 16',
        'span-14': 'span 14 / span 16',
        'span-15': 'span 15 / span 16',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 18',
      },
      gridTemplateColumns: {
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
      },
      height:{
        'hero-full': '715px',
        'hero-md': '399px',
        'hero-sm': '333px',
        'hero-xs': '198px',
        'card': '444px',
      },
      inset: {
        '-50': '-12.5rem'
      },
      margin: {
        'hero-emblem-lg': '-10.25rem',
        'hero-emblem-md': '-8rem',
        'hero-emblem-sm': '-7rem',
        '-5.3': '-1.3rem',
      },
      maxHeight: {
        'card-cover': '188px',
      },
      minHeight: {
        'card': '486px'
      },
      maxWidth: {
        'body-box': '1369px',
        'card-cover': '361px',
      },
      padding: {
        '6.5': '1.55rem',
        'card-cover': '52.08%',
        'card': '123.82%',
      },
      width: {
        'hero-emblem-xs': '15',
        '2.5/12': '22%',
        '84': '21rem',
        '88': '22rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ],
}
