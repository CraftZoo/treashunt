import { Link } from '@remix-run/react'

import { Heading, HStack, Text, VisuallyHidden } from '@chakra-ui/react'

import { ArrowLeft } from 'lucide-react'

import Button from '~/components/atoms/Button'

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
        <Text display={{ base: 'none', md: 'initial' }} aria-hidden>
          Retour à la liste des énigmes
        </Text>
        <VisuallyHidden>Retour à la liste des énigmes</VisuallyHidden>
      </Button>
    </HStack>
  )
}

export default PuzzleFormHeader
