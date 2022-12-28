import type { Coordinate, Puzzle as PrismaPuzzle } from '@prisma/client'

import shortUUID from 'short-uuid'

import { db } from '~/db.server'
import { HTMLSanitizer } from '~/utils/'

export type CoordinatePoints = Pick<Coordinate, 'lat' | 'lng'>

export interface Puzzle extends PrismaPuzzle {
  coordinate: CoordinatePoints | null
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
      coordinate: {
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
    orderBy: { updatedAt: 'desc' },
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
      coordinate: {
        select: { lat: true, lng: true },
      },
    },
    orderBy: { updatedAt: 'desc' },
  })

export type CreatePuzzle = Pick<
  Puzzle,
  'title' | 'subtitle' | 'question' | 'answer' | 'authorId' | 'coordinate'
>

export const createPuzzle = ({
  title,
  subtitle,
  question,
  answer,
  authorId,
  coordinate,
}: CreatePuzzle) =>
  db.puzzle.create({
    data: {
      title,
      subtitle,
      question: HTMLSanitizer(question),
      answer: HTMLSanitizer(answer),
      slug: shortUUID().generate(),
      author: { connect: { id: authorId } },
      ...(coordinate && {
        coordinate: {
          create: coordinate,
        },
      }),
    },
  })

export type UpdatePuzzle = Pick<
  Puzzle,
  'title' | 'subtitle' | 'id' | 'question' | 'answer' | 'coordinate'
>

export const updatePuzzle = ({
  id,
  title,
  subtitle,
  question,
  answer,
  coordinate,
}: UpdatePuzzle) =>
  db.puzzle.update({
    where: { id },
    data: {
      title,
      subtitle,
      question: HTMLSanitizer(question),
      answer: HTMLSanitizer(answer),
      ...(coordinate
        ? {
            coordinate: {
              update: coordinate,
            },
          }
        : {
            coordinate: {
              delete: true,
            },
          }),
    },
  })

export const deletePuzzle = (id: Puzzle['id']) =>
  db.puzzle.delete({ where: { id } })
