import type { Coordinates } from '~/models/puzzle.server'

export const coordinatesToString = (coordinates: Coordinates) =>
  `${coordinates.lat};${coordinates.lng}`

export const stringToCoordinates = (string: string): Coordinates => {
  const [lat, lng] = string.split(';').map(point => Number(point))

  return { lat, lng }
}
