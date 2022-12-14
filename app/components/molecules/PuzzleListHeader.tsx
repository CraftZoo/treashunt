import { Button, Heading, HStack, Spacer } from '@chakra-ui/react'

import { Plus } from 'lucide-react'

import Link from '../atoms/Link'

const PuzzleListHeader = () => (
  <HStack width="full" justifyContent="space-between">
    <Heading>Liste des énigmes</Heading>
    <Button as={Link} to="/admin/puzzles/add">
      <Plus />
      <Spacer width={2} />
      Ajouter une nouvelle énigme
    </Button>
  </HStack>
)

export default PuzzleListHeader
