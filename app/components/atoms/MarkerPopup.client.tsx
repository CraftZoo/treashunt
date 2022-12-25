import type { ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

import { Popup } from 'react-leaflet'

interface MarkerPopup {
  children: ReactNode
}

const MarkerPopup = ({ children }: MarkerPopup) => {
  return (
    <Box ml={3} as={Popup}>
      {children}
    </Box>
  )
}

export default MarkerPopup
