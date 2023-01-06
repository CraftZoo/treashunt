import type { MetaFunction } from '@remix-run/node'

import PuzzleCreation from '~/components/organisms/PuzzleCreation'

export { action } from '~/components/organisms/PuzzleCreation'

export const meta: MetaFunction = () => ({
  title: 'Ajouter une énigme · TreasHunt',
})

const AddPuzzleRoute = () => {
  return <PuzzleCreation />
}

export default AddPuzzleRoute
