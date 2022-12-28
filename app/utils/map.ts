import type { CoordinatePoints } from '~/models/puzzle.server'

export const coordinatesToString = (coordinate: CoordinatePoints) =>
  `${coordinate.lat};${coordinate.lng}`

export const stringToCoordinates = (string: string): CoordinatePoints => {
  const [lat, lng] = string.split(';').map(point => Number(point))

  return { lat, lng }
}

export const triangulate = (
  vertices: CoordinatePoints[]
): CoordinatePoints[][] => {
  const triangles: CoordinatePoints[][] = []

  while (vertices.length > 3) {
    let earFound = false
    for (let i = 0; i < vertices.length; i++) {
      const a = vertices[i]
      const b = vertices[(i + 1) % vertices.length]
      const c = vertices[(i + 2) % vertices.length]

      if (isConvex(a, b, c)) {
        earFound = true

        triangles.push([a, b, c])
        vertices.splice(i + 1, 1)
        break
      }
    }

    if (!earFound) {
      return []
    }
  }

  triangles.push(vertices)
  return triangles
}

const isConvex = (
  a: CoordinatePoints,
  b: CoordinatePoints,
  c: CoordinatePoints
): boolean => {
  const crossProduct =
    (b.lng - a.lng) * (c.lat - a.lat) - (b.lat - a.lat) * (c.lng - a.lng)
  return crossProduct > 0
}

export const getCenter = (
  triangles: CoordinatePoints[][]
): CoordinatePoints => {
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
