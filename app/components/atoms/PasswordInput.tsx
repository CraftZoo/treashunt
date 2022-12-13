import { useReducer } from 'react'

import type { InputProps } from '@chakra-ui/react'
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  VisuallyHidden,
} from '@chakra-ui/react'

import { Eye, EyeOff } from 'lucide-react'

const PasswordInput = (props: InputProps) => {
  const [show, toggle] = useReducer(bool => !bool, false)

  return (
    <InputGroup>
      <Input
        type={show ? 'text' : 'password'}
        pr="14"
        sx={{
          '&[type="password"]': { fontFamily: 'monospace' },
        }}
        {...props}
      />
      <InputRightElement height="full" width="14">
        <Button
          size="sm"
          onClick={toggle}
          color="gray.400"
          variant="ghost"
          p="0"
          _hover={{ bg: 'transparent', color: 'text' }}
        >
          {show ? (
            <Eye strokeWidth={1.5} />
          ) : (
            <EyeOff strokeWidth={1.5} transform="scale(-1, 1)" />
          )}
          <VisuallyHidden>{show ? 'Masquer' : 'Afficher'}</VisuallyHidden>
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

export default PasswordInput
