import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={{
      '@font-face': {
        fontFamily: 'Enchanted Land',
        fontStyle: 'normal',
        fontDisplay: 'swap',
        src: `url('/fonts/Enchanted Land.woff2') format('woff2'),
              url('/fonts/Enchanted Land.woff') format('woff'),
              url('/fonts/Enchanted Land.otf') format('truetype')`,
        unicodeRange:
          'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
      },
    }}
  />
)

export default Fonts
