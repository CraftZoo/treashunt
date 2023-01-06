import type { ReactNode } from 'react'

import { Box } from '@chakra-ui/react'

import { Popup } from 'react-leaflet'

interface MarkerPopupProps {
  children: ReactNode
}

const MarkerPopup = ({ children }: MarkerPopupProps) => {
  return (
    <Box ml={3} as={Popup}>
      {children}
    </Box>
  )
}

export default MarkerPopup
