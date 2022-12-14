import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Grid } from '@chakra-ui/react'

import { getPuzzleListItems } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

import PuzzleItem from '../molecules/PuzzleItem'

export { action } from '../molecules/PuzzleItem'

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
  const numberOfPuzzles = puzzles.length

  return (
    <Grid
      as="section"
      gap={{ base: 3, sm: 6 }}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      width="full"
    >
      {puzzles.map((puzzle, index) => {
        const { id, slug, question, answer } = puzzle

        return (
          <PuzzleItem
            key={id}
            id={id}
            slug={slug}
            question={question}
            answer={answer}
            index={numberOfPuzzles - index}
          />
        )
      })}
    </Grid>
  )
}

export default PuzzleList
