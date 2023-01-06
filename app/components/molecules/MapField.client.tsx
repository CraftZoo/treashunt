import { useState } from 'react'

import { Box } from '@chakra-ui/react'

import type { LatLngLiteral } from 'leaflet'

import type { Coordinates } from '~/models/puzzle.server'

import Map from '../atoms/Map.client'
import Marker from '../atoms/Marker.client'

interface MapFieldProps {
  defaultCoordinates: Coordinates
  name?: HTMLInputElement['name']
}

const MapField = ({ defaultCoordinates, name }: MapFieldProps) => {
  const [position, setPosition] = useState<LatLngLiteral>({
    lat: defaultCoordinates?.lat || 0,
    lng: defaultCoordinates?.lng || 0,
  })

  return (
    <Box
      border="1px solid"
      borderRadius="xl"
      boxShadow="sm"
      borderColor="gray.100"
      _hover={{
        borderColor: 'grape.200',
      }}
    >
      <input
        name={name}
        type="hidden"
        value={`${position.lat};${position.lng}`}
      />
      <Map coordinates={[position]}>
        <Marker draggable position={position} onChange={setPosition} />
      </Map>
    </Box>
  )
}

MapField.displayName = 'MapField'

export default MapField
