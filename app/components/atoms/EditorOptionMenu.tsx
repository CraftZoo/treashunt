import type { ReactNode } from 'react'

import { Menu, MenuButton, IconButton, MenuList } from '@chakra-ui/react'

import { Heading } from 'lucide-react'

export type EditorOptionMenuProps = {
  children: ReactNode
  isActive?: boolean
}

const EditorOptionMenu = ({ children, isActive }: EditorOptionMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<Heading />}
        variant="ghost"
        borderRadius="none"
        px={2}
        py={0}
        h="full"
        aria-pressed={isActive}
        _hover={{
          bg: 'secondary',
          color: 'text',
        }}
        _active={{
          bg: 'primary',
          color: 'white',
        }}
        _pressed={{
          bg: 'primary',
          color: 'white',
        }}
      />
      <MenuList color="text">{children}</MenuList>
    </Menu>
  )
}

export default EditorOptionMenu
