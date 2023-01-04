import { VisuallyHidden } from '@chakra-ui/react'

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
      <button
        type="submit"
        className="btn btn-md w-full bg-americanpurple-700 uppercase hover:bg-brillantlavender-400 hover:text-grape-500"
      >
        {isIconButton ? (
          <>
            <LogOut />
            <VisuallyHidden>{label}</VisuallyHidden>
          </>
        ) : (
          label
        )}
      </button>
    </Form>
  )
}

export default LogoutButton
