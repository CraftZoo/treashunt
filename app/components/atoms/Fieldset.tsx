import type { StackProps } from '@chakra-ui/react'
import { Flex } from '@chakra-ui/react'
import type { HTMLProps } from 'react'

const Fieldset = ({
  children,
  ...rest
}: HTMLProps<HTMLDivElement> & StackProps) => {
  return (
    <Flex flexDirection="column" as="fieldset" gap={4} {...rest}>
      {children}
    </Flex>
  )
}

export default Fieldset
