import { Box, Heading } from '@chakra-ui/react'
import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import ConnectedPuzzleUpsertForm, {
  ConnectedPuzzleUpsertFormAction,
} from '~/components/organisms/ConnectedPuzzleUpsertForm'

import { getPuzzle } from '~/models/puzzle.server'

export const action: ActionFunction = async params => {
  return ConnectedPuzzleUpsertFormAction(params)
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
  console.log(puzzle)

  return (
    <Box py={4} px={6}>
      <Heading mb={8}>Modifier une enigme</Heading>
      <ConnectedPuzzleUpsertForm puzzle={puzzle} />
    </Box>
  )
}

export default PuzzleIdRoute
