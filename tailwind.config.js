/** @type {import('tailwindcss').Config} */

const colors = {
  white: 'hsl(0 0% 100%)',
  ghostwhite: 'hsl(206 100% 99%)',
  aliceblue: 'hsl(201 100% 97%)',
  pinklace: 'hsl(282 100% 93%)',
  brillantlavender: {
    50: 'hsl(296 47% 97%)',
    100: 'hsl(296 57% 95%)',
    200: 'hsl(296 67% 93%)',
    300: 'hsl(296 77% 91%)',
    400: 'hsl(296 87% 89%)',
    500: 'hsl(296 97% 87%)',
    600: 'hsl(296 97% 77%)',
    700: 'hsl(296 97% 67%)',
    800: 'hsl(296 97% 57%)',
    900: 'hsl(296 97% 47%)',
  },
  grape: {
    50: 'hsl(274, 100%, 95%)',
    100: 'hsl(269, 73%, 86%)',
    200: 'hsl(270, 65%, 75%)',
    300: 'hsl(269, 64%, 65%)',
    400: 'hsl(270, 63%, 55%)',
    500: 'hsl(270, 63%, 45%)',
    600: 'hsl(270, 64%, 35%)',
    700: 'hsl(269, 64%, 25%)',
    800: 'hsl(269, 69%, 15%)',
    900: 'hsl(273, 80%, 6%)',
  },
  americanpurple: {
    50: 'hsl(295, 33%, 92%)',
    100: 'hsl(295, 33%, 82%)',
    200: 'hsl(295, 33%, 72%)',
    300: 'hsl(295, 33%, 62%)',
    400: 'hsl(295, 33%, 52%)',
    500: 'hsl(295, 33%, 42%)',
    600: 'hsl(295, 33%, 32%)',
    700: 'hsl(295, 33%, 22%)',
    800: 'hsl(295, 33%, 12%)',
    900: 'hsl(295, 33%, 4%)',
  },
  darkpurple: 'hsl(295 31% 16%)',
  arsenic: 'hsl(0 0% 26%)',
}

const semanticColors = {
  primary: colors.grape[500],
  secondary: colors.brillantlavender[500],
  text: colors.arsenic,
  heading: colors.darkpurple,
}

module.exports = {
  content: ['./app/**/*.{ts,tsx,jsx,js}'],
  theme: {
    extend: {
      colors: { ...colors, ...semanticColors },
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        serif: ['Enchanted Land', 'serif'],
      },
      screens: {
        xs: `(min-width: ${480 / 16}rem)`,
        sm: `(min-width: ${768 / 16}rem)`,
        md: `(min-width: ${992 / 16}rem)`,
        lg: `(min-width: ${1280 / 16}rem)`,
        xl: `(min-width: ${1536 / 16}rem)`,
      },
    },
    minHeight: ({ theme }) => theme('height'),
  },
  plugins: [],
}
