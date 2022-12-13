import { Box, Button, Image, Heading, HStack, Flex } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

import Form from '../atoms/Form'
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
      flexDirection="column"
      color="white"
      gap={8}
    >
      <HStack>
        <Image maxW="12" src="/images/chest.png" aria-hidden="true" />
        <Heading as="h1" size="xl">
          TreasHunt
        </Heading>
      </HStack>
      <SidebarMenu puzzles={puzzles} />
      <Box as="nav" w="full" mt="auto">
        <Form action="/logout" method="post">
          <Button size="md" type="submit" w="full">
            Déconnexion
          </Button>
        </Form>
      </Box>
    </Flex>
  )
}

export default Sidebar
