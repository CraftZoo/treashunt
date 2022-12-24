import { Box, Flex } from '@chakra-ui/react'

import AppLogo from '~/components/atoms/AppLogo'
import LogoutButton from '~/components/atoms/LogoutButton'
import SidebarMenu from '~/components/molecules/Sidebar/SidebarMenu'
import type { Puzzle } from '~/models/puzzle.server'

export type SidebarProps = {
  puzzles: Array<Pick<Puzzle, 'id' | 'title'>>
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
      <Box w="full" mt="auto">
        <LogoutButton />
      </Box>
    </Flex>
  )
}

export default Sidebar
