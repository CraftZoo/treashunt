import { Form } from '@remix-run/react'
import { FormControl, FormLabel } from '@chakra-ui/react'

import ValidationMessage from './ValidationMessage'

export default {
  Root: Form,
  Label: FormLabel,
  Control: FormControl,
  ValidationMessage,
}
