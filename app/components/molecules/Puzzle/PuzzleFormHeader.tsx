import { Button, Heading, HStack, Spacer } from '@chakra-ui/react'

import { ArrowLeft } from 'lucide-react'

import Link from '~/components/atoms/Link'

interface PuzzleFormHeaderProps {
  mode: 'update' | 'creation'
}

const PuzzleFormHeader = ({ mode }: PuzzleFormHeaderProps) => {
  const action = mode === 'creation' ? 'Ajouter' : 'Modifier'
  return (
    <HStack width="full" justifyContent="space-between">
      <Heading>{action} une énigme</Heading>
      <Button as={Link} to="/admin/puzzles">
        <ArrowLeft />
        <Spacer width={2} />
        Retour à la liste des énigmes
      </Button>
    </HStack>
  )
}

export default PuzzleFormHeader
