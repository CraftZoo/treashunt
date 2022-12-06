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
      background: '#F5F5F5',
      webkitFontSmoothing: 'antialiased',
      mozOsxFontSmoothing: 'grayscale',
      overscrollBehavior: 'none',
    },
  },
}

export const mediaBreakpoints = {
  xs: '(min-width: 480px)',
  sm: '(min-width: 768px)',
  md: '(min-width: 992px)',
  lg: '(min-width: 1280px)',
  xl: '(min-width: 1536px)',
}

const theme = extendTheme({
  fonts,
  breakpoints,
  styles,
})

export default theme
