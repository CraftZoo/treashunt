import type { ButtonProps, IconButtonProps } from '@chakra-ui/react'
import { Button, forwardRef, IconButton } from '@chakra-ui/react'

import type { LucideProps } from 'lucide-react'

type EditorOptionButtonProps = {
  isActive?: boolean
  icon?: LucideProps
} & ButtonProps &
  IconButtonProps

const EditorOptionButton = forwardRef<EditorOptionButtonProps, 'button'>(
  ({ children, isActive, icon, ...rest }, ref) => {
    return (
      <Button
        as={icon ? IconButton : Button}
        ref={ref}
        bg={isActive ? 'gray.300' : 'transparent'}
        color="inherit"
        h={6}
        p={2}
        icon={icon}
        _hover={{
          bg: 'whiteAlpha.300',
        }}
        {...rest}
      >
        {children}
      </Button>
    )
  }
)

export default EditorOptionButton
