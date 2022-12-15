import { Button, VisuallyHidden } from '@chakra-ui/react'

import { LogOut } from 'lucide-react'

import Form from './Form'

interface LogoutButtonProps {
  variant?: 'button' | 'icon-button'
}

const LogoutButton = ({ variant = 'button' }: LogoutButtonProps) => {
  const label = 'Déconnexion'

  const isIconButton = variant === 'icon-button'

  return (
    <Form action="/logout" method="post">
      <Button
        size="md"
        type="submit"
        w="full"
        gap={2}
        bg="americanpurple.700"
        textTransform="uppercase"
        _hover={{
          bg: 'brillantlavender.400',
          color: 'grape.500',
        }}
      >
        {isIconButton ? (
          <>
            <LogOut />
            <VisuallyHidden>{label}</VisuallyHidden>
          </>
        ) : (
          label
        )}
      </Button>
    </Form>
  )
}

export default LogoutButton
