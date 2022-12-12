import type { ChakraComponent, FlexProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'

type FieldsetComponent = ChakraComponent<'fieldset', {}>

const Fieldset = (({ children, ...rest }: FlexProps) => {
  return (
    <Flex flexDirection="column" as="fieldset" gap={4} {...rest}>
      {children}
    </Flex>
  )
}) as FieldsetComponent

export default Fieldset
