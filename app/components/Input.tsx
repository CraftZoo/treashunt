import type { InputProps as ChakraInputProps } from '@chakra-ui/react'
import { Input as ChakraButton } from '@chakra-ui/react'

export interface InputProps extends ChakraInputProps {
  required: boolean
}

const Input = (props: InputProps) => (
  <ChakraButton
    variant="outline"
    size="lg"
    borderRadius="full"
    bg="ghostwhite"
    borderColor="gray.200"
    _placeholder={{ color: 'gray.400' }}
    _focus={{ bg: 'white' }}
    {...props}
  />
)

export default Input
