import { Menu, MenuButton, IconButton, MenuList } from '@chakra-ui/react'
import { Heading } from 'lucide-react'
import type { ReactNode } from 'react'

export type EditorOptionMenuProps = {
  children: ReactNode
}

const EditorOptionMenu = ({ children }: EditorOptionMenuProps) => {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<Heading />}
        variant="outline"
        px={2}
      />
      <MenuList>{children}</MenuList>
    </Menu>
  )
}

export default EditorOptionMenu
