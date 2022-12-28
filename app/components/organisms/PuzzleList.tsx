import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Grid } from '@chakra-ui/react'

import PuzzleItem from '~/components/molecules/PuzzleList/PuzzleItem'
import { getPuzzleListItems } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

export { action } from '~/components/molecules/PuzzleList/PuzzleItem'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request)

  if (!user)
    throw new Response('Not Found', {
      status: 404,
    })

  const puzzles = await getPuzzleListItems()

  return json({ user, puzzles })
}

const PuzzleList = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  return (
    <Grid
      as="section"
      gap={{ base: 3, sm: 6 }}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      width="full"
    >
      {puzzles.map(puzzle => {
        const { id } = puzzle

        return <PuzzleItem key={id} puzzle={puzzle} />
      })}
    </Grid>
  )
}

export default PuzzleList
