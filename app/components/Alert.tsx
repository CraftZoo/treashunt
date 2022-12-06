import type { AlertProps as AlertWrapperProps } from '@chakra-ui/react'
import {
  Alert as AlertWrapper,
  AlertDescription,
  AlertIcon,
} from '@chakra-ui/react'

interface AlertProps {
  children: React.ReactNode
  status: AlertWrapperProps['status']
}

const Alert = ({ children, status }: AlertProps) => (
  <AlertWrapper status={status}>
    <AlertIcon aria-hidden="true" />
    <AlertDescription as="p">{children}</AlertDescription>
  </AlertWrapper>
)

export default Alert
