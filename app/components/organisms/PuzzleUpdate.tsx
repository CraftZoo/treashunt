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
  return <PuzzleForm puzzle={puzzle} mode="update" />
}

export default PuzzleUpdate
