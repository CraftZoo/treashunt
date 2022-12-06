import type { Puzzle } from '@prisma/client'
import { db } from '~/db.server'

export type { Puzzle } from '@prisma/client'

export const getPuzzle = (puzzleId: Puzzle['id']) =>
  db.puzzle.findUnique({
    select: { id: true, slug: true, question: true, answer: true },
    where: { id: puzzleId },
  })

export const getPuzzleListItems = () =>
  db.puzzle.findMany({
    select: { id: true, slug: true, question: true, answer: true },
    orderBy: { updatedAt: 'desc' },
  })

export const createPuzzle = ({
  slug,
  question,
  answer,
  authorId,
}: Pick<Puzzle, 'slug' | 'question' | 'answer' | 'authorId'>) =>
  db.puzzle.create({
    data: {
      slug,
      question,
      answer,
      author: { connect: { id: authorId } },
    },
  })

export const updatePuzzle = ({
  id,
  slug,
  question,
  answer,
}: Pick<Puzzle, 'id' | 'slug' | 'question' | 'answer'>) =>
  db.puzzle.update({
    where: { id },
    data: { slug, question, answer },
  })

export const deletePuzzle = ({ id }: Pick<Puzzle, 'id'>) =>
  db.puzzle.delete({ where: { id } })
