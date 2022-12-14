import { Form as FormRemix } from '@remix-run/react'

import type { BoxProps, ChakraComponent } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'

type FormComponent = ChakraComponent<'form', {}>

const Form = ((props: BoxProps) => {
  return <Box as={FormRemix} {...props} />
}) as FormComponent

export default Form
