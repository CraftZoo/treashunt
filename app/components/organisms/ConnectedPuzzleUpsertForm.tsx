import { useMemo } from 'react'

import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useSubmit } from '@remix-run/react'

import type { Puzzle } from '~/models/puzzle.server'
import { updatePuzzle } from '~/models/puzzle.server'

import type { PuzzleUpsertFormSchemaData } from '../molecules/PuzzleUpsertForm'
import PuzzleUpsertForm, {
  PuzzleUpsertFormSchema,
} from '../molecules/PuzzleUpsertForm'

export const ConnectedPuzzleUpsertFormAction: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData()

  const { id, question, answer, slug } = Object.fromEntries(formData)

  const schema = PuzzleUpsertFormSchema()

  const result = schema.safeParse({ question, answer, slug })

  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          question,
          answer,
          slug,
        },
      },
      { status: 400 }
    )
  }

  const values = {
    id: String(id),
    question: result.data.question,
    answer: result.data.answer,
    slug: result.data.slug,
  }

  await updatePuzzle(values)

  return json({ success: "L'énigme a été mise à jour" })
}

type ConnectedPuzzleUpsertFormProps = {
  puzzle: Pick<Puzzle, 'id' | 'question' | 'answer' | 'slug'>
}

const ConnectedPuzzleUpsertForm = ({
  puzzle,
}: ConnectedPuzzleUpsertFormProps) => {
  const submit = useSubmit()

  const defaultValues: PuzzleUpsertFormSchemaData = useMemo(() => {
    return {
      question: puzzle.question || '',
      answer: puzzle.answer || '',
      slug: puzzle.slug || '',
    }
  }, [puzzle])

  const onSubmit = async (form: HTMLFormElement) => {
    await submit(form)
  }

  return (
    <PuzzleUpsertForm
      puzzleId={puzzle.id}
      defaultValues={defaultValues}
      onSubmit={onSubmit}
    />
  )
}

export default ConnectedPuzzleUpsertForm
