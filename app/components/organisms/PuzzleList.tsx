import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData, useTransition } from '@remix-run/react'

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

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  return (
    <Grid
      as="section"
      gap={6}
      gridTemplateColumns="repeat(auto-fit, minmax(344px, 1fr))"
      width="full"
    >
      {puzzles.map((puzzle, index) => {
        const { id, slug, question, answer } = puzzle

        const isCurrentPuzzle = transition.submission?.formData.get('id') === id
        const isLoading = isSubmitting && isCurrentPuzzle

        return (
          <PuzzleItem
            key={id}
            id={id}
            slug={slug}
            question={question}
            answer={answer}
            index={numberOfPuzzles - index}
            isLoading={isLoading}
          />
        )
      })}
    </Grid>
  )
}

export default PuzzleList
