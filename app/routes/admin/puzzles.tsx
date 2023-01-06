import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Outlet,
  useLoaderData,
  useMatches,
  useOutletContext,
} from '@remix-run/react'

import { Tab, TabList, TabPanels, Tabs, VStack } from '@chakra-ui/react'

import Link from '~/components/atoms/Link'
import PuzzleListHeader from '~/components/molecules/PuzzleList/PuzzleListHeader'
import type { Puzzle } from '~/models/puzzle.server'
import { getPuzzleListItems } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

export { action } from '~/components/organisms/PuzzlesList'

export const meta: MetaFunction = () => ({
  title: 'Liste des énigmes · TreasHunt',
})

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request)

  if (!user)
    throw new Response('Not Found', {
      status: 404,
    })

  const puzzles = await getPuzzleListItems()

  return json({ user, puzzles })
}

type ContextType = { puzzles: Puzzle[] }

export const useOverviewPuzzles = () => {
  return useOutletContext<ContextType>()
}

const tabs = [
  {
    label: 'Liste',
    pathname: '/admin/puzzles/',
  },
  {
    label: 'Carte',
    pathname: '/admin/puzzles/map',
  },
]

const PuzzlesRoute = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  const matches = useMatches()
  const currentRoute = matches[matches.length - 1]
  const defaultIndex = tabs.findIndex(
    tab => tab.pathname === currentRoute.pathname
  )

  return (
    <VStack
      height="full"
      py={{ base: 5, sm: 4 }}
      px={{ base: 4, sm: 8 }}
      gap={{ base: 4, sm: 8 }}
      bg="aliceblue"
    >
      <PuzzleListHeader />
      <Tabs defaultIndex={defaultIndex} w="full" h="full">
        <TabList>
          {tabs.map(tab => (
            <Tab key={tab.pathname} as={Link} to={tab.pathname}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels mt={4} h="calc(100% - 60px)">
          <Outlet context={{ puzzles }} />
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default PuzzlesRoute
