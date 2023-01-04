import type { Coordinates, Puzzle as PrismaPuzzle } from '@prisma/client'

import shortUUID from 'short-uuid'

import { db } from '~/db.server'
import { HTMLSanitizer } from '~/utils/'

export type CoordinatePoints = Pick<Coordinates, 'lat' | 'lng'>

export interface Puzzle extends PrismaPuzzle {
  coordinates: CoordinatePoints | null
}

export const getPuzzle = (puzzleId: Puzzle['id']) =>
  db.puzzle.findUnique({
    select: {
      id: true,
      title: true,
      subtitle: true,
      slug: true,
      question: true,
      answer: true,
      coordinates: {
        select: { lat: true, lng: true },
      },
    },
    where: { id: puzzleId },
  })

export const getPuzzlePublic = (puzzleSlug: Puzzle['slug']) =>
  db.puzzle.findUnique({
    select: {
      title: true,
      subtitle: true,
      question: true,
    },
    where: { slug: puzzleSlug },
  })

export const getPuzzleListItemsId = () =>
  db.puzzle.findMany({
    select: { id: true },
    orderBy: { createdAt: 'desc' },
  })

export const getPuzzleListItems = () =>
  db.puzzle.findMany({
    select: {
      id: true,
      title: true,
      subtitle: true,
      slug: true,
      question: true,
      answer: true,
      coordinates: {
        select: { lat: true, lng: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

export type CreatePuzzle = Pick<
  Puzzle,
  'title' | 'subtitle' | 'question' | 'answer' | 'authorId' | 'coordinates'
>

export const createPuzzle = ({
  title,
  subtitle,
  question,
  answer,
  authorId,
  coordinates,
}: CreatePuzzle) =>
  db.puzzle.create({
    data: {
      title,
      subtitle,
      question: HTMLSanitizer(question),
      answer: HTMLSanitizer(answer),
      slug: shortUUID().generate(),
      author: { connect: { id: authorId } },
      ...(coordinates && {
        coordinates: {
          create: coordinates,
        },
      }),
    },
  })

export type UpdatePuzzle = Pick<
  Puzzle,
  'title' | 'subtitle' | 'id' | 'question' | 'answer' | 'coordinates'
>

export const updatePuzzle = ({
  id,
  title,
  subtitle,
  question,
  answer,
  coordinates,
}: UpdatePuzzle) => {
  return db.puzzle.update({
    where: { id },
    data: {
      title,
      subtitle,
      question: HTMLSanitizer(question),
      answer: HTMLSanitizer(answer),
      ...(coordinates
        ? {
            coordinates: {
              upsert: {
                create: coordinates,
                update: coordinates,
              },
            },
          }
        : {
            coordinates: {
              delete: true,
            },
          }),
    },
  })
}

export const deletePuzzle = (id: Puzzle['id']) =>
  db.puzzle.delete({ where: { id } })
