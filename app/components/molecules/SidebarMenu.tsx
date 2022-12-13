import { VStack, Text } from '@chakra-ui/react'

import { Focus, Puzzle as PuzzleIcon } from 'lucide-react'

import type { Puzzle } from '~/models/puzzle.server'

import SidebarLink from '../atoms/SidebarLink'

export type SidebarMenuProps = {
  puzzles: Pick<Puzzle, 'id'>[]
}

const SidebarMenu = ({ puzzles }: SidebarMenuProps) => {
  return (
    <VStack px={2} alignItems="self-start">
      <SidebarLink to="/admin/puzzles" icon={PuzzleIcon}>
        <Text fontWeight={600}>Liste</Text>
      </SidebarLink>
      <VStack
        position="relative"
        paddingInlineStart={4}
        _before={{
          content: '""',
          position: 'absolute',
          height: 'full',
          borderLeftWidth: '1px',
          borderLeftColor: 'gray.400',
          left: 1,
        }}
      >
        {puzzles.length > 0 &&
          puzzles.map((puzzle, index) => {
            const { id } = puzzle
            const link = `/admin/puzzles/${id}`
            const number = index + 1

            return (
              <SidebarLink to={link} key={id} icon={Focus}>
                <Text>Énigme {number}</Text>
              </SidebarLink>
            )
          })}
      </VStack>
    </VStack>
  )
}

export default SidebarMenu
