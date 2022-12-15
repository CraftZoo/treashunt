import React from 'react'

import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useTransition } from '@remix-run/react'

import { Alert, Button, Fade, FormControl, FormLabel } from '@chakra-ui/react'

import { Loader } from 'lucide-react'
import { z } from 'zod'

import type { Puzzle } from '~/models/puzzle.server'
import { updatePuzzle } from '~/models/puzzle.server'
import type { inferSafeParseErrors } from '~/utils'

import Fieldset from '../atoms/Fieldset'
import Form from '../atoms/Form'
import ValidationMessages from '../atoms/ValidationMessages'

import Editor from './Editor'

export const PuzzleSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

export type PuzzleFields = z.infer<typeof PuzzleSchema> &
  Pick<Puzzle, 'id' | 'slug'>

type PuzzleFieldsErrors = inferSafeParseErrors<typeof PuzzleSchema>

type ActionData = PuzzleFieldsErrors & {
  fields: PuzzleFields
}

const badRequest = (data: any) => json(data, { status: 400 })

export const PuzzleUpdateFormAction = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData.entries()) as PuzzleFields
  const result = PuzzleSchema.safeParse(fields)

  if (!result.success) {
    return badRequest({
      fields,
      ...result.error.flatten(),
    })
  }

  return updatePuzzle(fields)
}

type PuzzleUpdateFormProps = {
  puzzle: Pick<Puzzle, 'id' | 'question' | 'answer' | 'slug'>
}

const PuzzleUpdateForm = ({ puzzle }: PuzzleUpdateFormProps) => {
  const defaultValues: PuzzleFields = {
    ...puzzle,
    answer: puzzle.answer || '',
    question: puzzle.question || '',
  }

  const actionData = useActionData<ActionData>()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  const hasFormError = Boolean(actionData?.formError)
  const hasInvalidQuestion = Boolean(actionData?.fieldErrors?.question?.length)
  const hasInvalidAnswer = Boolean(actionData?.fieldErrors?.answer?.length)

  return (
    <Form method="post">
      <Fieldset gap={6}>
        <FormControl isInvalid={hasInvalidQuestion}>
          <FormLabel fontWeight="600">Question</FormLabel>
          <Editor
            name="question"
            defaultValue={
              actionData?.fields?.question || defaultValues.question
            }
            placeholder=""
          />
          {actionData?.fieldErrors?.question?.length ? (
            <ValidationMessages errors={actionData.fieldErrors.question} />
          ) : null}
        </FormControl>

        <FormControl isInvalid={hasInvalidAnswer}>
          <FormLabel fontWeight="600">Answer</FormLabel>
          <Editor
            name="answer"
            defaultValue={actionData?.fields?.answer || defaultValues.answer}
            placeholder=""
          />
          {actionData?.fieldErrors?.answer?.length ? (
            <ValidationMessages errors={actionData.fieldErrors.answer} />
          ) : null}
        </FormControl>
        <input
          name="id"
          type="hidden"
          required
          readOnly
          defaultValue={defaultValues.id}
        />
        <input
          name="slug"
          type="hidden"
          required
          readOnly
          defaultValue={defaultValues.slug}
        />
        <Button type="submit" variant="secondary" w="min-content">
          {isSubmitting ? (
            <>
              <Loader />
              Sauvegarde en cours
            </>
          ) : (
            'Sauvegarder'
          )}
        </Button>
        <Fade in={hasFormError}>
          <Alert status="error">{actionData?.formError}</Alert>
        </Fade>
      </Fieldset>
    </Form>
  )
}

export default PuzzleUpdateForm
