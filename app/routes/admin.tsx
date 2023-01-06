import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { Box } from '@chakra-ui/react'

import Header from '~/components/organisms/Header'
import Sidebar from '~/components/organisms/Sidebar'
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

const AdminRoute = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  return (
    <Box pl={{ sm: 300 }} h="full">
      <Header />
      <Sidebar puzzles={puzzles} />
      <Outlet />
    </Box>
  )
}

export default AdminRoute
