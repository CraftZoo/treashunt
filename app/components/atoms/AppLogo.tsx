import { Heading, HStack, Image } from '@chakra-ui/react'

import Link from './Link'

const AppLogo = () => (
  <HStack as={Link} to="/admin/puzzles">
    <Image maxW="12" src="/images/chest.png" aria-hidden="true" />
    <Heading as="h1" size="xl">
      TreasHunt
    </Heading>
  </HStack>
)

export default AppLogo
