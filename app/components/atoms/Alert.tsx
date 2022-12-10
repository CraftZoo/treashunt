import type { AlertProps as ChakraAlertProps } from '@chakra-ui/react'
import {
  Alert as ChakraAlert,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react'

interface AlertProps {
  children: React.ReactNode
  status: ChakraAlertProps['status']
}

const Alert = ({ children, status }: AlertProps) => (
  <ChakraAlert status={status} borderRadius="lg" transition="2s ease">
    <AlertIcon aria-hidden="true" />
    <AlertDescription as="p">{children}</AlertDescription>
  </ChakraAlert>
)

export default Alert
