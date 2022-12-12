import { defineStyleConfig } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {
    borderRadius: 'full',
    _hover: {
      boxShadow: 'lg',
    },
    fontWeight: 600,
  },
  defaultProps: {
    size: 'lg',
    colorScheme: 'grape',
  },
})
