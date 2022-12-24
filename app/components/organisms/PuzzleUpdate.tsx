import PuzzleForm from '~/components/molecules/Puzzle/PuzzleForm'
import type { Puzzle } from '~/models/puzzle.server'

export { action } from '~/components/molecules/Puzzle/PuzzleForm'

type PuzzleProps = {
  puzzle: Pick<
    Puzzle,
    'id' | 'title' | 'subtitle' | 'question' | 'answer' | 'slug' | 'coordinates'
  >
}

const PuzzleUpdate = ({ puzzle }: PuzzleProps) => {
  return <PuzzleForm puzzle={puzzle} mode="update" />
}

export default PuzzleUpdate
