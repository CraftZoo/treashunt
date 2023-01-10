import { Box, Text, Image } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

interface PuzzleQRCodeProps {
  data: Pick<Puzzle, 'id' | 'title' | 'slug'> & { qrCode: string }
}

const PuzzleQRCode = ({ data }: PuzzleQRCodeProps) => {
  const { title, qrCode } = data

  return (
    <Box
      as="article"
      w="full"
      position="relative"
      sx={{
        '@media print': {
          position: 'relative',
          _after: {
            content: '""',
            position: 'absolute',
            top: -2,
            bottom: -2,
            left: -2,
            right: -2,
            borderStyle: 'dashed',
            borderColor: 'black',
            borderWidth: 0,
            borderBottomWidth: '2px',
          },
          ':nth-of-type(3n -1)': {
            _after: {
              borderRightWidth: '2px',
              borderLeftWidth: '2px',
            },
          },
        },
      }}
    >
      <Text
        fontWeight={600}
        ml={3}
        mb={2}
        sx={{
          '@media print': {
            mb: 0,
            fontWeight: 400,
          },
        }}
      >
        {title}
      </Text>
      <Image w="full" borderRadius="sm" src={qrCode} />
    </Box>
  )
}

export default PuzzleQRCode
