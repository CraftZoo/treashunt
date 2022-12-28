import type { MetaFunction } from '@remix-run/node'

import { VStack } from '@chakra-ui/react'

import PuzzleListHeader from '~/components/molecules/PuzzleList/PuzzleListHeader'
import PuzzleList from '~/components/organisms/PuzzleList'

export { action, loader } from '~/components/organisms/PuzzleList'

export const meta: MetaFunction = () => ({
  title: 'Liste des énigmes · TreasHunt',
})

const PuzzlesRoute = () => {
  return (
    <VStack
      height="full"
      py={{ base: 5, sm: 4 }}
      px={{ base: 4, sm: 8 }}
      gap={{ base: 4, sm: 8 }}
      bg="aliceblue"
    >
      <PuzzleListHeader />
      <PuzzleList />
    </VStack>
  )
}

export default PuzzlesRoute
