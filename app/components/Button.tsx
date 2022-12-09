import type { ButtonProps } from '@chakra-ui/react'
import { Button as ChakraButton } from '@chakra-ui/react'

const Button = (props: ButtonProps) => (
  <ChakraButton
    color="white"
    bg="primary"
    borderRadius="full"
    _hover={{ boxShadow: 'lg', bg: '#8744d4' }}
    {...props}
  />
)

export default Button
