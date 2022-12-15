import type { Puzzle } from '@prisma/client'

import shortUUID from 'short-uuid'

import { db } from '~/db.server'

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
      slug: shortUUID().generate(),
      question,
      answer,
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
    data: { title, subtitle, question, answer },
  })

export const deletePuzzle = ({ id }: Pick<Puzzle, 'id'>) =>
  db.puzzle.delete({ where: { id } })
