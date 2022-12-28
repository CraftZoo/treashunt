import { Box, Text } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'
import { getCenter, triangulate } from '~/utils/map'

import ClientOnly from '../atoms/ClientOnly'
import Map from '../atoms/Map.client'
import Marker from '../atoms/Marker.client'
import MarkerPopup from '../atoms/MarkerPopup.client'
import Skeleton from '../atoms/Skeleton'

interface PuzzleMapProps {
  puzzles: Pick<Puzzle, 'id' | 'title' | 'coordinate'>[]
}

const PuzzlesMap = ({ puzzles }: PuzzleMapProps) => {
  const puzzleWithCoordinates = puzzles.filter(puzzle => puzzle.coordinate)
  const triangles = triangulate(
    puzzleWithCoordinates.map(puzzle => ({
      lat: puzzle.coordinate?.lat || 0,
      lng: puzzle.coordinate?.lng || 0,
    }))
  )
  const center = getCenter(triangles)

  return (
    <Box h="full">
      <ClientOnly fallback={<Skeleton />}>
        {() => (
          <Map
            key={`coordinate`}
            position={{
              lat: center.lat,
              lng: center.lng,
            }}
          >
            {puzzleWithCoordinates.map(puzzle => {
              const { id, title, coordinate } = puzzle
              return (
                <Marker
                  key={id}
                  position={{
                    lat: Number(coordinate?.lat),
                    lng: Number(coordinate?.lng),
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
