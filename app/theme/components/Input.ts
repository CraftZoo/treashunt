import { defineStyleConfig, theme } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {},
  variants: {
    outline: props => ({
      ...theme.components.Input.variants?.outline(props),
      field: {
        borderRadius: 'xl',
        bg: 'ghostwhite',
        borderColor: 'gray.200',
        _placeholder: { color: 'gray.400' },
        _focus: { bg: 'white', borderColor: 'grape.300' },
        _hover: {
          boxShadow: 'sm',
          borderColor: 'grape.200',
        },
      },
    }),
  },
  defaultProps: {
    size: 'lg',
    variant: 'outline',
    colorScheme: 'grape',
  },
})
