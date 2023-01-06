import PuzzleForm from '~/components/molecules/Puzzle/PuzzleForm'
import type { UpdatePuzzle } from '~/models/puzzle.server'

export { action } from '~/components/molecules/Puzzle/PuzzleForm'

type PuzzleProps = {
  puzzle: UpdatePuzzle
}

const PuzzleUpdate = ({ puzzle }: PuzzleProps) => {
  return <PuzzleForm puzzle={puzzle} mode="update" />
}

export default PuzzleUpdate
