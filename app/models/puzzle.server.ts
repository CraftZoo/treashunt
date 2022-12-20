import type { Puzzle } from '@prisma/client'

import shortUUID from 'short-uuid'

import { db } from '~/db.server'
import { HTMLSanitizer } from '~/utils'

export type { Puzzle } from '@prisma/client'

export const getPuzzle = (puzzleId: Puzzle['id']) =>
  db.puzzle.findUnique({
    select: {
      id: true,
      title: true,
      subtitle: true,
      slug: true,
      question: true,
      answer: true,
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
    },
    orderBy: { updatedAt: 'desc' },
  })

export const createPuzzle = ({
  title,
  subtitle,
  question,
  answer,
  authorId,
}: Pick<Puzzle, 'title' | 'subtitle' | 'question' | 'answer' | 'authorId'>) =>
  db.puzzle.create({
    data: {
      title,
      subtitle,
      question: HTMLSanitizer(question),
      answer: HTMLSanitizer(answer),
      slug: shortUUID().generate(),
      author: { connect: { id: authorId } },
    },
  })

export const updatePuzzle = ({
  id,
  title,
  subtitle,
  question,
  answer,
}: Pick<Puzzle, 'title' | 'subtitle' | 'id' | 'question' | 'answer'>) =>
  db.puzzle.update({
    where: { id },
    data: {
      title,
      subtitle,
      question: HTMLSanitizer(question),
      answer: HTMLSanitizer(answer),
    },
  })

export const deletePuzzle = ({ id }: Pick<Puzzle, 'id'>) =>
  db.puzzle.delete({ where: { id } })
