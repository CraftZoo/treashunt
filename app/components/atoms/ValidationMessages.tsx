import { chakra, FormErrorMessage } from '@chakra-ui/react'

interface ValidationMessagesProps {
  errors: Array<string>
}
const ValidationMessages = ({ errors }: ValidationMessagesProps) => (
  <FormErrorMessage>
    <chakra.ul listStyleType="none">
      {errors.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </chakra.ul>
  </FormErrorMessage>
)

export default ValidationMessages
