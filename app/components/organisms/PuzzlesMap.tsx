import { Box, Text } from '@chakra-ui/react'

import type { LatLngExpression } from 'leaflet'

import ClientOnly from '~/components/atoms/ClientOnly'
import Map from '~/components/atoms/Map.client'
import Marker from '~/components/atoms/Marker.client'
import MarkerPopup from '~/components/atoms/MarkerPopup.client'
import Skeleton from '~/components/atoms/Skeleton'
import type { Puzzle } from '~/models/puzzle.server'

interface PuzzleMapProps {
  puzzles: Pick<Puzzle, 'id' | 'title' | 'coordinates'>[]
}

const PuzzlesMap = ({ puzzles }: PuzzleMapProps) => {
  const puzzleWithCoordinates = puzzles.filter(puzzle => puzzle.coordinates)

  const coordinates = puzzleWithCoordinates.map(
    puzzle => puzzle.coordinates as LatLngExpression
  )

  return (
    <Box h="full">
      <ClientOnly fallback={<Skeleton />}>
        {() => (
          <Map key={`coordinates`} coordinates={coordinates}>
            {puzzleWithCoordinates.map(puzzle => {
              const { id, title, coordinates } = puzzle
              return (
                <Marker
                  key={id}
                  position={{
                    lat: Number(coordinates?.lat),
                    lng: Number(coordinates?.lng),
                  }}
                >
                  <MarkerPopup>
                    <Text>{title}</Text>
                  </MarkerPopup>
                </Marker>
              )
            })}
          </Map>
        )}
      </ClientOnly>
    </Box>
  )
}

export default PuzzlesMap
