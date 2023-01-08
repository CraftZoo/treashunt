import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Icon,
  Spacer,
  VisuallyHidden,
  Text,
} from '@chakra-ui/react'

import { ArrowLeft, Printer } from 'lucide-react'
import QRCode from 'qrcode'

import Link from '~/components/atoms/Link'
import PuzzleQRCode from '~/components/molecules/Puzzle/PuzzleQRCode'
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
        <Button leftIcon={<Icon as={Printer} />} onClick={() => window.print()}>
          Imprimer
        </Button>
        <Button as={Link} to="/admin/puzzles">
          <Icon as={ArrowLeft} />
          <Text display={{ base: 'none', md: 'initial' }}>
            Retour à la liste des énigmes
          </Text>
          <VisuallyHidden display={{ base: 'initial', md: 'none' }}>
            Retour à la liste des énigmes
          </VisuallyHidden>
        </Button>
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

export default PuzzlePrintRoute
