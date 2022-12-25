import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from '@chakra-ui/react'

import PuzzleListHeader from '~/components/molecules/PuzzleList/PuzzleListHeader'
import PuzzlesList from '~/components/organisms/PuzzlesList'
import PuzzlesMap from '~/components/organisms/PuzzlesMap'
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

const PuzzlesRoute = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  return (
    <VStack
      height="full"
      py={{ base: 5, sm: 4 }}
      px={{ base: 4, sm: 8 }}
      gap={{ base: 4, sm: 8 }}
      bg="aliceblue"
    >
      <PuzzleListHeader />
      <Tabs w="full" h="full" isLazy>
        <TabList>
          <Tab>Liste</Tab>
          <Tab>Carte</Tab>
        </TabList>
        <TabPanels h="calc(100% - 30px)">
          <TabPanel>
            <PuzzlesList puzzles={puzzles} />
          </TabPanel>
          <TabPanel h="full">
            <PuzzlesMap puzzles={puzzles} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </VStack>
  )
}

export default PuzzlesRoute
