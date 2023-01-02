import { useEffect, useState } from 'react'

import { Box, Text, Image, Skeleton } from '@chakra-ui/react'

import QRCode from 'qrcode'

import type { Puzzle } from '~/models/puzzle.server'

const generateQr = async (slug: string) => {
  return await QRCode.toDataURL(`${window.location.host}/${slug}`, {
    margin: 2,
  })
}

interface PuzzleQRCodeProps {
  data: Pick<Puzzle, 'id' | 'title' | 'slug'>
}

const PuzzleQRCode = ({ data }: PuzzleQRCodeProps) => {
  const [src, setSrc] = useState<string | undefined>()
  const { title, slug } = data

  useEffect(() => {
    const loadQrCode = async () => {
      const data = await generateQr(slug)
      setSrc(data)
    }

    loadQrCode()
  }, [slug])

  return (
    <Box
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
          ':nth-child(3n -1)': {
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
      {src ? (
        <Image w="full" borderRadius="md" src={src} />
      ) : (
        <Skeleton borderRadius="md" height="232px" />
      )}
    </Box>
  )
}

export default PuzzleQRCode
