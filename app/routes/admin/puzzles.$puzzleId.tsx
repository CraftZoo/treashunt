import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import PuzzleUpdate from '~/components/organisms/PuzzleUpdate'
import { getPuzzle } from '~/models/puzzle.server'

export { action } from '~/components/organisms/PuzzleUpdate'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data)
    return {
      title: 'Énigme inconnue · TreasHunt',
    }

  const { puzzle } = data
  return {
    title: `Modifier l'énigme "${puzzle.title}" · TreasHunt`,
  }
}

export const loader = async ({ params }: LoaderArgs) => {
  const { puzzleId } = params

  if (!puzzleId)
    throw new Response('puzzleId not provided', {
      status: 500,
    })

  const puzzle = await getPuzzle(puzzleId)

  if (!puzzle)
    throw new Response('Not Found', {
      status: 404,
    })

  return json({ puzzle })
}

const PuzzleIdRoute = () => {
  const { puzzle } = useLoaderData<typeof loader>()

  return <PuzzleUpdate puzzle={puzzle} />
}

export default PuzzleIdRoute
