import type { ChakraProps } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'

interface FieldsetProps extends ChakraProps {
  disabled?: boolean
  children?: React.ReactNode
}

const Fieldset = (props: FieldsetProps) => <chakra.fieldset {...props} />

export default Fieldset
