import type { Colors } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: 'Inter, sans-serif',
  body: 'Inter, sans-serif',
}

const breakpoints = {
  xs: '30em',
  sm: '48em',
  md: '62em',
  lg: '80em',
  xl: '96em',
}

const styles = {
  global: {
    'html, body': {
      height: '100%',
      background: 'white',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale',
      overscrollBehavior: 'none',
      color: 'arsenic',
    },
  },
}

export const mediaBreakpoints = {
  xs: `(min-width: ${480 / 16}rem)`,
  sm: `(min-width: ${768 / 16}rem)`,
  md: `(min-width: ${992 / 16}rem)`,
  lg: `(min-width: ${1280 / 16}rem)`,
  xl: `(min-width: ${1536 / 16}rem)`,
}

const colors: Colors = {
  white: 'hsl(0 0% 100%)',
  ghostwhite: 'hsl(206 100% 99%)',
  aliceblue: 'hsl(201 100% 97%)',
  pinklace: 'hsl(282 100% 93%)',
  brillantlavender: 'hsl(296 97% 87%)',
  grape: 'hsl(270 63% 44%)',
  americanpurple: 'hsl(295 33% 22%)',
  darkpurple: 'hsl(295 31% 16%)',
  arsenic: 'hsl(0 0% 26%)',
}

const semanticTokens = {
  colors: {
    primary: { default: 'grape' },
    secondary: { default: 'brillantlavender' },
    text: { default: 'arsenic' },
    heading: { default: 'darkpurple' },
    'background.dark': { default: 'darkpurple' },
    'background.light': { default: 'aliceblue' },
  },
}

const theme = extendTheme({
  fonts,
  breakpoints,
  styles,
  colors,
  semanticTokens,
})

export default theme
