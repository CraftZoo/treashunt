import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  Box,
  Button,
  VStack,
  Grid,
  Heading,
  HStack,
  Spacer,
} from '@chakra-ui/react'

import PuzzleQRCode from '~/components/molecules/Puzzle/PuzzleQRCode'
import { getPuzzleListItems } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request)

  if (!user)
    throw new Response('Not Found', {
      status: 404,
    })

  const puzzles = await getPuzzleListItems()

  return json({ user, puzzles })
}

const PuzzlePrint = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  return (
    <Grid w="full" p={8} gap={8}>
      <HStack
        sx={{
          '@media print': {
            display: 'none',
          },
        }}
      >
        <Heading>Exportation des QRCodes</Heading>
        <Spacer />
        <Button onClick={() => window.print()}>Imprimer</Button>
      </HStack>
      <Box
        display="grid"
        gridTemplateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(auto-fill, 250px)',
        }}
        gap={{
          base: 4,
          md: 8,
        }}
        justifyContent="space-between"
        sx={{
          '@media print': {
            w: 'full',
            p: 0,
            gridTemplateColumns: 'repeat(3, 1fr)',
          },
        }}
      >
        {puzzles.map(puzzle => (
          <PuzzleQRCode key={puzzle.id} data={puzzle} />
        ))}
      </Box>
    </Grid>
  )
}

export default PuzzlePrint
