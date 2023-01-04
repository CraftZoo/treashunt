import PuzzlesList from '~/components/organisms/PuzzlesList'

import { useOverviewPuzzles } from '../puzzles'

const PuzzlesListRoute = () => {
  const { puzzles } = useOverviewPuzzles()

  return <PuzzlesList puzzles={puzzles} />
}

export default PuzzlesListRoute
