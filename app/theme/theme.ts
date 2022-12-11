import { extendTheme } from '@chakra-ui/react'

import colors from './colors'
import components from './components'

const fonts = {
  heading: 'Enchanted Land, sans-serif',
  body: 'Source Sans Pro, sans-serif',
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
      background: '#F1FAFF',
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

const semanticTokens = {
  colors: {
    primary: { default: 'grape.500' },
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
  components,
})

export default theme
