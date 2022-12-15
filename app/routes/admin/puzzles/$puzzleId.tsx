import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Box, Heading } from '@chakra-ui/react'

import { PuzzleUpdateFormAction } from '~/components/molecules/PuzzleUpdateForm'
import PuzzleDetails from '~/components/organisms/PuzzleDetails'
import { getPuzzle } from '~/models/puzzle.server'

export const action: ActionFunction = async params => {
  return PuzzleUpdateFormAction(params)
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

  return (
    <Box py={4} px={6}>
      <PuzzleDetails puzzle={puzzle} />
    </Box>
  )
}

export default PuzzleIdRoute
