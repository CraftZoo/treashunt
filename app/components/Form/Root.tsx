import type { ChakraProps } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/react'
import type { FormProps } from '@remix-run/react'
import { Form } from '@remix-run/react'

type RootProps = ChakraProps & Omit<FormProps, 'color'>

const Root = (props: RootProps) => <chakra.form as={Form} {...props} />

export default Root
