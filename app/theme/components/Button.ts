import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
    _hover: {
      boxShadow: 'lg',
    },
    fontWeight: 600,
  },
  variants: {
    secondary: {
      bg: 'secondary',
      color: 'primary',
      fontWeight: 600,
      _hover: {
        boxShadow: 'md',
      },
    },
    link: {
      p: 2,
      minWidth: 'revert',
      borderRadius: 'xl',
    },
  },
  defaultProps: {
    size: 'lg',
    colorScheme: 'grape',
  },
})
