import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useSubmit } from '@remix-run/react'
import { useMemo } from 'react'
import type { Puzzle } from '~/models/puzzle.server'
import { updatePuzzle } from '~/models/puzzle.server'
import type { PuzzleUpsertFormSchemaData } from '../molecules/PuzzleUpsertForm'
import PuzzleUpsertForm from '../molecules/PuzzleUpsertForm'

export const ConnectedPuzzleUpsertFormAction: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData()

  const { id, question, answer, slug } = Object.fromEntries(formData)

  if (typeof question !== 'string')
    return json(
      { errors: { question: "La question n'est pas valide" } },
      { status: 400 }
    )

  if (typeof answer !== 'string')
    return json(
      { errors: { answer: "La réponse n'est pas valide" } },
      { status: 400 }
    )

  if (typeof slug !== 'string' || slug.length < 8 || typeof id !== 'string')
    return json(
      { formError: "Une erreur est survenue lors de l'envoi du formulaire" },
      { status: 400 }
    )

  await updatePuzzle({ id, question, answer, slug })
  return json({ success: `L'enigme a bien ete mise à jour` })
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

  const onSubmit = (form: HTMLFormElement) => {
    submit(form)
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
