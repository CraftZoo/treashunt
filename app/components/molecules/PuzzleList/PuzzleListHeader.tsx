import { Button, Heading, Stack, Spacer, HStack, Icon } from '@chakra-ui/react'

import { Plus } from 'lucide-react'

import Link from '~/components/atoms/Link'

const PuzzleListHeader = () => (
  <Stack
    direction={{
      base: 'column',
      md: 'row',
    }}
    width="full"
    justifyContent="space-between"
  >
    <Heading>Liste des énigmes</Heading>
    <HStack>
      <Button width="fit-content" as={Link} to="/admin/puzzles/print">
        <Spacer width={2} />
        Exporter les énigmes
      </Button>
      <Button width="fit-content" as={Link} to="/admin/puzzles/add">
        <Icon
          as={Plus}
          boxSize={{
            base: 4,
            md: 5,
          }}
        />
        <Spacer width={2} />
        Nouvelle énigme
      </Button>
    </HStack>
  </Stack>
)

export default PuzzleListHeader
