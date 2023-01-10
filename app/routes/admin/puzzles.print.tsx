import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Box, Grid } from '@chakra-ui/react'

import { motion } from 'framer-motion'
import QRCode from 'qrcode'

import PuzzlePrintHeader from '~/components/molecules/PuzzlePrint/PuzzlePrintHeader'
import PuzzleQRCode from '~/components/molecules/PuzzlePrint/PuzzleQRCode'
import { getPuzzleListItems } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

export const loader = async ({ request, context }: LoaderArgs) => {
  const user = await getUser(request)

  if (!user)
    throw new Response('Not Found', {
      status: 404,
    })

  const puzzles = await getPuzzleListItems()

  const host = request.headers.get('host')

  const puzzlesWithQRCode = await Promise.all(
    puzzles.map(async puzzle => ({
      ...puzzle,
      qrCode: await QRCode.toDataURL(`${host}/${puzzle.slug}`, {
        margin: 2,
      }),
    }))
  )

  return json({ user, puzzles: puzzlesWithQRCode })
}

const PuzzlePrintRoute = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  return (
    <Grid w="full" py={{ base: 5, sm: 4 }} px={{ base: 4, sm: 8 }} gap={8}>
      <PuzzlePrintHeader />
      <Box
        as={motion.section}
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
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        {puzzles.map(puzzle => (
          <PuzzleQRCode key={puzzle.id} data={puzzle} />
        ))}
      </Box>
    </Grid>
  )
}

export default PuzzlePrintRoute
