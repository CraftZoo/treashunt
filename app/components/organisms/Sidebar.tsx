import { Link } from '@remix-run/react'

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
      width={300}
      position="fixed"
      height="100vh"
    >
      <HStack as={Link} to="/admin/puzzles">
        <Image maxW="12" src="/images/chest.png" aria-hidden="true" />
        <Heading as="h1" size="xl">
          TreasHunt
        </Heading>
      </HStack>
      <SidebarMenu puzzles={puzzles} />
      <Box as="nav" w="full" mt="auto">
        <Form action="/logout" method="post">
          <Button
            size="md"
            type="submit"
            w="full"
            gap={2}
            bg="americanpurple"
            textTransform="uppercase"
            _hover={{
              bg: 'brillantlavender',
              color: 'grape.500',
            }}
          >
            Déconnexion
          </Button>
        </Form>
      </Box>
    </Flex>
  )
}

export default Sidebar
