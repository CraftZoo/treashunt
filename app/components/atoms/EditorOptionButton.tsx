import type { ButtonProps, IconButtonProps } from '@chakra-ui/react'
import { forwardRef, IconButton } from '@chakra-ui/react'

import type { LucideProps } from 'lucide-react'

type EditorOptionButtonProps = {
  isActive?: boolean
  icon: LucideProps
} & ButtonProps &
  IconButtonProps

const EditorOptionButton = forwardRef<EditorOptionButtonProps, 'button'>(
  ({ children, isActive, icon, ...rest }, ref) => {
    return (
      <IconButton
        ref={ref}
        aria-pressed={isActive}
        icon={icon}
        minW="unset"
        borderRadius="md"
        p={1}
        boxSize={7}
        bg="transparent"
        color="text"
        transition="all 200ms"
        _hover={{
          bg: 'secondary',
          color: 'text',
        }}
        _active={{
          bg: 'primary',
          color: 'white',
        }}
        _pressed={{
          bg: 'grape.300',
          color: 'white',
        }}
        {...rest}
      >
        {children}
      </IconButton>
    )
  }
)

export default EditorOptionButton
