import { FormErrorMessage } from '@chakra-ui/react'

interface FormValidationMessageProps {
  children: React.ReactNode
}

const FormValidationMessage = ({ children }: FormValidationMessageProps) => (
  <FormErrorMessage as="p">{children}</FormErrorMessage>
)

export default FormValidationMessage
