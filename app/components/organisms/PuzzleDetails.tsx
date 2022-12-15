import { Box, Heading } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

import PuzzleUpdateForm from '../molecules/PuzzleUpdateForm'

type PuzzleProps = {
  puzzle: Pick<Puzzle, 'id' | 'question' | 'answer' | 'slug'>
}

const PuzzleDetails = ({ puzzle }: PuzzleProps) => {
  return (
    <Box>
      <Heading mb={8}>Modifier une enigme</Heading>
      <PuzzleUpdateForm puzzle={puzzle} />
    </Box>
  )
}

export default PuzzleDetails
