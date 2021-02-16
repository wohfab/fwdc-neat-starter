module.exports = {
  purge: {
    mode: 'all',
    content: ['./**/*.html'],
    options: {
      whitelist: [],
    },
  },
  darkMode: 'class',
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {},
      width: {
        '1px': '1px',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            strong: {
              color: theme('colors.pink.600'),
            },
            em: {
              color: theme('colors.pink.700'),
            },
          },
        },
        light: {
          css: [
            {
              color: theme('colors.gray.400'),
              '[class~="lead"]': {
                color: theme('colors.gray.300'),
              },
              a: {
                color: theme('colors.gray.200'),
              },
              strong: {
                color: theme('colors.pink.500'),
              },
              em: {
                color: theme('colors.pink.500'),
              },
              'ol > li::before': {
                color: theme('colors.gray.400'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.600'),
              },
              hr: {
                borderColor: theme('colors.gray.200'),
              },
              blockquote: {
                color: theme('colors.gray.200'),
                borderLeftColor: theme('colors.gray.600'),
              },
              h1: {
                color: theme('colors.white'),
              },
              h2: {
                color: theme('colors.white'),
              },
              h3: {
                color: theme('colors.white'),
              },
              h4: {
                color: theme('colors.white'),
              },
              'figure figcaption': {
                color: theme('colors.gray.400'),
              },
              code: {
                color: theme('colors.white'),
              },
              'a code': {
                color: theme('colors.white'),
              },
              pre: {
                color: theme('colors.gray.200'),
                backgroundColor: theme('colors.gray.800'),
              },
              thead: {
                color: theme('colors.white'),
                borderBottomColor: theme('colors.gray.400'),
              },
              'tbody tr': {
                borderBottomColor: theme('colors.gray.600'),
              },
              footer: {
                color: theme('colors.pink.600'),
              },
              'footer a': {
                color: theme('colors.pink.600'),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark', 'responsive'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
