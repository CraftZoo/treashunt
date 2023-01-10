import { Heading, Stack, HStack, Button, Text, Icon } from '@chakra-ui/react'

import { Printer, ArrowLeft } from 'lucide-react'

import Link from '~/components/atoms/Link'

const PuzzlePrintHeader = () => (
  <Stack
    direction={{
      base: 'column',
      md: 'row',
    }}
    width="full"
    justifyContent="space-between"
    sx={{
      '@media print': {
        display: 'none',
      },
    }}
  >
    <Heading>Exportation des QRCodes</Heading>
    <HStack>
      <Button leftIcon={<Icon as={Printer} />} onClick={() => window.print()}>
        Imprimer
      </Button>
      <Button as={Link} to="/admin/puzzles" gap={1}>
        <Icon as={ArrowLeft} />
        <Text>Retour</Text>
      </Button>
    </HStack>
  </Stack>
)

export default PuzzlePrintHeader
