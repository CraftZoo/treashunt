import { Grid, GridItem } from '@chakra-ui/react'
import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import Sidebar from '~/components/organisms/Sidebar'

import { getPuzzleListItemsId } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request)

  if (!user)
    throw new Response('Not Found', {
      status: 404,
    })

  const puzzles = await getPuzzleListItemsId()

  return json({ user, puzzles })
}

const AdminRoute = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  return (
    <Grid
      gridTemplateAreas={`
      "sidebar main"
    `}
      gridTemplateColumns="300px 1fr"
      h="full"
    >
      <GridItem gridArea="sidebar">
        <Sidebar puzzles={puzzles} />
      </GridItem>
      <GridItem gridArea="main">
        <Outlet />
      </GridItem>
    </Grid>
  )
}

export default AdminRoute
