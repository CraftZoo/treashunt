import type { Puzzle } from '@prisma/client'

import { VStack } from '@chakra-ui/react'

import { Focus, Puzzle as PuzzleIcon } from 'lucide-react'

import SidebarLink from './SidebarLink'

export type SidebarMenuProps = {
  puzzles: Array<Pick<Puzzle, 'id' | 'title'>>
}

const SidebarMenu = ({ puzzles }: SidebarMenuProps) => {
  return (
    <VStack
      as="nav"
      px={2}
      alignItems="self-start"
      width="full"
      overflow="auto"
    >
      <SidebarLink
        to="/admin/puzzles"
        icon={PuzzleIcon}
        fontWeight={600}
        position="sticky"
        top={0}
        backgroundColor="darkpurple"
        zIndex={0}
        end
      >
        Liste des énigmes
      </SidebarLink>
      <VStack
        position="relative"
        paddingInlineStart={4}
        marginLeft={3}
        alignItems="left"
        width="full"
        _before={{
          content: '""',
          position: 'absolute',
          height: 'full',
          borderLeftWidth: '1px',
          borderLeftColor: 'gray.400',
          left: 4,
        }}
      >
        {puzzles.length > 0 &&
          puzzles.map(puzzle => {
            const { id, title } = puzzle
            const link = `/admin/puzzles/${id}`

            return (
              <SidebarLink to={link} key={id} icon={Focus}>
                {title}
              </SidebarLink>
            )
          })}
      </VStack>
    </VStack>
  )
}

export default SidebarMenu
