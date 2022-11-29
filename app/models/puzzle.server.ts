import type { Puzzle, User } from '@prisma/client'
import { db } from '~/db.server'

export type { Puzzle } from '@prisma/client'

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
}: Pick<Puzzle, 'slug' | 'question' | 'answer' | 'authorId'> & {
  userId: User['id']
}) =>
  db.puzzle.create({
    data: {
      slug,
      question,
      answer,
      author: { connect: { id: authorId } },
    },
  })

export const deletePuzzle = ({ id }: Pick<Puzzle, 'id'>) =>
  db.puzzle.delete({ where: { id } })
