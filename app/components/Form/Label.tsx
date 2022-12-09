import type { FormLabelProps } from '@chakra-ui/react'
import { FormLabel as ChakraFormLabel } from '@chakra-ui/react'

const Label = (props: FormLabelProps) => (
  <ChakraFormLabel
    fontSize="sm"
    lineHeight="7"
    mb="1"
    fontWeight="semibold"
    {...props}
  />
)

export default Label
