import type { CoordinatePoints } from '~/models/puzzle.server'

export const coordinatesToString = (coordinates: CoordinatePoints) =>
  `${coordinates.lat};${coordinates.lng}`

export const stringToCoordinates = (string: string): CoordinatePoints => {
  const [lat, lng] = string.split(';').map(point => Number(point))

  return { lat, lng }
}
