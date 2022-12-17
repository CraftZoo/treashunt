import { Box, Heading } from '@chakra-ui/react'

import PuzzleForm from '../molecules/PuzzleForm'

export { action } from '~/components/molecules/PuzzleForm'

const PuzzleCreation = () => {
  return (
    <Box py={4} px={6}>
      <Heading mb={8}>Ajouter une énigme</Heading>
      <PuzzleForm mode="creation" />
    </Box>
  )
}

export default PuzzleCreation
