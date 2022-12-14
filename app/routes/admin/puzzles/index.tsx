import { VStack } from '@chakra-ui/react'

import PuzzleListHeader from '~/components/molecules/PuzzleListHeader'
import PuzzleList from '~/components/organisms/PuzzleList'

export { action, loader } from '~/components/organisms/PuzzleList'

const PuzzlesRoute = () => {
  return (
    <VStack
      height="full"
      py={{ base: 5, sm: 10 }}
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
