import type { MetaFunction } from '@remix-run/node'

import PuzzlePrint from '~/components/organisms/PuzzlePrint'

export { loader } from '~/components/organisms/PuzzlePrint'

export const meta: MetaFunction = () => ({
  title: 'Liste des énigmes · TreasHunt',
})

const PuzzlesPrintRoute = () => {
  return <PuzzlePrint />
}

export default PuzzlesPrintRoute
