import { Button, Heading, HStack, Spacer } from '@chakra-ui/react'

import { Plus } from 'lucide-react'

import Link from '~/components/atoms/Link'

const PuzzleListHeader = () => (
  <HStack width="full" justifyContent="space-between">
    <Heading>Liste des énigmes</Heading>
    <Button as={Link} to="/admin/puzzles/add">
      <Plus />
      <Spacer width={2} />
      Nouvelle énigme
    </Button>
  </HStack>
)

export default PuzzleListHeader
