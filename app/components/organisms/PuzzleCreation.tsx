import { Prisma } from '@prisma/client'

import PuzzleForm from '~/components/molecules/Puzzle/PuzzleForm'

export { action } from '~/components/molecules/Puzzle/PuzzleForm'

const PuzzleCreation = () => {
  return (
    <PuzzleForm
      mode="creation"
      puzzle={{
        answer: '',
        authorId: '',
        coordinates: {
          latitude: new Prisma.Decimal(1),
          longitude: new Prisma.Decimal(1),
        },
        question: '',
        subtitle: '',
        title: '',
      }}
    />
  )
}

export default PuzzleCreation
