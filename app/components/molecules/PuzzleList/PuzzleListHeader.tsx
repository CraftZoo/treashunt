import { Link } from '@remix-run/react'

import { Heading, HStack } from '@chakra-ui/react'

import { Plus } from 'lucide-react'

import Button from '~/components/atoms/Button'

const PuzzleListHeader = () => (
  <HStack width="full" justifyContent="space-between">
    <Heading>Liste des énigmes</Heading>
    <Button as={Link} to="/admin/puzzles/add">
      <Plus />
      Nouvelle énigme
    </Button>
  </HStack>
)

export default PuzzleListHeader
