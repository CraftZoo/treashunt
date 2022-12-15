import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
    _hover: {
      boxShadow: 'md',
    },
    fontWeight: 600,
  },
  variants: {
    secondary: {
      bg: 'secondary',
      color: 'primary',
      fontWeight: 600,
      _hover: {
        bg: 'pinklace',
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
