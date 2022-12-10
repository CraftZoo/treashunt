import type { BoxProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Form as FormRemix } from '@remix-run/react'
import type { FormProps as FormRemixProps } from '@remix-run/react'

type FormProps = BoxProps & Omit<FormRemixProps, 'color'>

const Form = (props: FormProps) => <Box as={FormRemix} {...props} />

export default Form
