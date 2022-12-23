import { Prisma } from '@prisma/client'

import type { z } from 'zod'

import type { Puzzle } from './models/puzzle.server'

export type inferSafeParseErrors<
  T extends z.ZodType<any, any, any>,
  U = string
> = {
  formError: U
  fieldErrors: {
    [P in keyof z.infer<T>]?: U[]
  }
}

export { sanitize as HTMLSanitizer } from 'isomorphic-dompurify'

export const coordinatesToString = (
  coordinates: Pick<Puzzle['coordinates'], 'latitude' | 'longitude'>
) => `${coordinates.latitude};${coordinates.longitude}`
export const stringToCoordinates = (string: string) => {
  const [latitude, longitude] = string
    .split(';')
    .map(point => new Prisma.Decimal(point))

  return { latitude, longitude }
}
