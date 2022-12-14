import { Box, Flex } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

import AppLogo from '../atoms/AppLogo'
import LogoutButton from '../atoms/LogoutButton'
import SidebarMenu from '../molecules/SidebarMenu'

export type SidebarProps = {
  puzzles: Pick<Puzzle, 'id'>[]
}

const Sidebar = ({ puzzles }: SidebarProps) => {
  return (
    <Flex
      h="full"
      bg="background.dark"
      as="aside"
      alignItems="self-start"
      px={4}
      py={4}
      ml={-300}
      width={300}
      flexDirection="column"
      color="white"
      gap={8}
      position="fixed"
      height="100vh"
      display={{ base: 'none', sm: 'flex' }}
    >
      <AppLogo />
      <SidebarMenu puzzles={puzzles} />
      <Box as="nav" w="full" mt="auto">
        <LogoutButton />
      </Box>
    </Flex>
  )
}

export default Sidebar
