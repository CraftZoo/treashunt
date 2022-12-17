import { Box, Heading } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

import PuzzleForm from '../molecules/PuzzleForm'

export { action } from '~/components/molecules/PuzzleForm'

type PuzzleProps = {
  puzzle: Pick<
    Puzzle,
    'id' | 'title' | 'subtitle' | 'question' | 'answer' | 'slug'
  >
}

const PuzzleUpdate = ({ puzzle }: PuzzleProps) => {
  return (
    <Box py={4} px={6}>
      <Heading mb={8}>Modifier une énigme</Heading>
      <PuzzleForm puzzle={puzzle} mode="update" />
    </Box>
  )
}

export default PuzzleUpdate
