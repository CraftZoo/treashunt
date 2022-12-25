import { Box, Text } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

import ClientOnly from '../atoms/ClientOnly'
import Map from '../atoms/Map.client'
import Marker from '../atoms/Marker.client'
import MarkerPopup from '../atoms/MarkerPopup.client'
import Skeleton from '../atoms/Skeleton'

type Coordinate = {
  lat: number
  lng: number
}

function triangulate(vertices: Coordinate[]): Coordinate[][] {
  const triangles: Coordinate[][] = []

  while (vertices.length > 3) {
    // Trouvez un sommet qui forme un triangle convexe avec ses deux voisins
    let earFound = false
    for (let i = 0; i < vertices.length; i++) {
      const a = vertices[i]
      const b = vertices[(i + 1) % vertices.length]
      const c = vertices[(i + 2) % vertices.length]

      // Vérifiez si le triangle est convexe en utilisant le produit vectoriel
      if (isConvex(a, b, c)) {
        earFound = true

        // Découpez le triangle en enlevant le segment de droite reliant le sommet à l'un de ses voisins
        triangles.push([a, b, c])
        vertices.splice(i + 1, 1)
        break
      }
    }

    // Si aucun sommet ne forme un triangle convexe, cela signifie que le polygone est concave et ne peut pas être triangulé
    if (!earFound) {
      return []
    }
  }

  // Ajoutez le dernier triangle restant
  triangles.push(vertices)
  return triangles
}

function isConvex(a: Coordinate, b: Coordinate, c: Coordinate): boolean {
  // Calcul de la norme du produit vectoriel
  const crossProduct =
    (b.lng - a.lng) * (c.lat - a.lat) - (b.lat - a.lat) * (c.lng - a.lng)
  return crossProduct > 0
}

function getCenter(triangles: Coordinate[][]): Coordinate {
  let latTotal = 0
  let lngTotal = 0

  for (const triangle of triangles) {
    for (const coordinate of triangle) {
      latTotal += coordinate.lat
      lngTotal += coordinate.lng
    }
  }

  const latMean = latTotal / (triangles.length * 3)
  const lngMean = lngTotal / (triangles.length * 3)

  return { lat: latMean, lng: lngMean }
}

interface PuzzleMapProps {
  puzzles: Pick<Puzzle, 'id' | 'title' | 'coordinates'>[]
}

const PuzzlesMap = ({ puzzles }: PuzzleMapProps) => {
  const puzzleWithCoordinates = puzzles.filter(puzzle => puzzle.coordinates)
  const triangles = triangulate(
    puzzleWithCoordinates.map(puzzle => ({
      lat: Number(puzzle.coordinates?.latitude),
      lng: Number(puzzle.coordinates?.longitude),
    }))
  )
  const center = getCenter(triangles)

  return (
    <Box h="full">
      <ClientOnly fallback={<Skeleton />}>
        {() => (
          <Map
            key={`coordinates`}
            position={{
              lat: center.lat,
              lng: center.lng,
            }}
          >
            {puzzleWithCoordinates.map(puzzle => {
              const { id, title, coordinates } = puzzle
              return (
                <Marker
                  key={id}
                  position={{
                    lat: Number(coordinates?.latitude),
                    lng: Number(coordinates?.longitude),
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
