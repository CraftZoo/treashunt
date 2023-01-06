import PuzzlesMap from '~/components/organisms/PuzzlesMap'

import { useOverviewPuzzles } from '../puzzles'

const PuzzlesMapRoute = () => {
  const { puzzles } = useOverviewPuzzles()

  return <PuzzlesMap puzzles={puzzles} />
}

export default PuzzlesMapRoute
