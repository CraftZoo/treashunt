import { VStack } from '@chakra-ui/react'

import PuzzleListHeader from '~/components/molecules/PuzzleListHeader'
import PuzzleList from '~/components/organisms/PuzzleList'

export { action, loader } from '~/components/organisms/PuzzleList'

const PuzzlesRoute = () => {
  return (
    <VStack height="full" py={10} px={8} gap={8} bg="aliceblue">
      <PuzzleListHeader />
      <PuzzleList />
    </VStack>
  )
}

export default PuzzlesRoute
