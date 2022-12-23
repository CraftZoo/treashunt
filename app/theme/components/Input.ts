import { defineStyleConfig, theme } from '@chakra-ui/react'

export default defineStyleConfig({
  baseStyle: {},
  variants: {
    outline: props => ({
      ...theme.components.Input.variants?.outline(props),
      field: {
        borderRadius: 'xl',
        bg: 'ghostwhite',
        borderColor: 'gray.100',
        boxShadow: 'sm',
        _placeholder: { color: 'gray.400' },
        _focus: { bg: 'white', borderColor: 'grape.200' },
        _hover: {
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
