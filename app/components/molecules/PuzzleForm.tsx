import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useTransition } from '@remix-run/react'

import {
  Alert,
  Box,
  Button,
  Fade,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from '@chakra-ui/react'

import { Loader } from 'lucide-react'
import { z } from 'zod'

import type { Puzzle } from '~/models/puzzle.server'
import { createPuzzle, updatePuzzle } from '~/models/puzzle.server'
import { getUserId } from '~/session.server'
import type { inferSafeParseErrors } from '~/utils'

import ClientOnly from '../atoms/ClientOnly'
import EditorSkeleton from '../atoms/EditorSkeleton'
import Fieldset from '../atoms/Fieldset'
import Form from '../atoms/Form'
import Link from '../atoms/Link'
import ValidationMessages from '../atoms/ValidationMessages'

import Editor from './Editor'
import PuzzleFormHeader from './PuzzleFormHeader'

const PuzzleSchema = z.object({
  title: z.string().min(1, 'Ce champ est requis'),
  subtitle: z.string(),
  question: z.string(),
  answer: z.string(),
})
type PuzzleFields = z.infer<typeof PuzzleSchema> & Pick<Puzzle, 'id'>
type PuzzleFieldsErrors = inferSafeParseErrors<typeof PuzzleSchema>

type ActionData = PuzzleFieldsErrors & {
  fields: PuzzleFields
}

type FormDataEntries = PuzzleFields & { _mode: Mode }

const badRequest = (data: any) => json(data, { status: 400 })

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const { _mode, id, ...fields } = Object.fromEntries(
    formData.entries()
  ) as FormDataEntries
  const result = PuzzleSchema.safeParse(fields)

  if (!result.success) {
    return badRequest({
      fields,
      ...result.error.flatten(),
    })
  }

  if (_mode === 'update') return await updatePuzzle({ id, ...fields })

  const authorId = await getUserId(request)
  if (!authorId)
    return json(
      { formError: 'Vous devez être connecté pour ajouter une énigme' },
      { status: 400 }
    )

  return await createPuzzle({ authorId, ...fields })
}

type Mode = 'creation' | 'update'
type PuzzleFormProps =
  | {
      mode: 'update'
      puzzle: Pick<
        Puzzle,
        'id' | 'title' | 'subtitle' | 'question' | 'answer' | 'slug'
      >
    }
  | { mode: 'creation'; puzzle?: never }

const PuzzleForm = ({ puzzle, mode }: PuzzleFormProps) => {
  const actionData = useActionData<ActionData>()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  const isUpdate = mode === 'update'

  const defaultValues: PuzzleFields = {
    id: puzzle?.id || '',
    title: puzzle?.title || '',
    subtitle: puzzle?.subtitle || '',
    answer: puzzle?.answer || '',
    question: puzzle?.question || '',
  }

  const values: PuzzleFields = {
    id: actionData?.fields?.id || defaultValues.id,
    title: actionData?.fields?.title || defaultValues.title,
    subtitle: actionData?.fields?.subtitle || defaultValues.subtitle,
    answer: actionData?.fields?.answer || defaultValues.answer,
    question: actionData?.fields?.question || defaultValues.question,
  }

  const hasFormError = Boolean(actionData?.formError)
  const hasInvalidTitle = Boolean(actionData?.fieldErrors?.title?.length)
  const hasInvalidSubtitle = Boolean(actionData?.fieldErrors?.subtitle?.length)
  const hasInvalidQuestion = Boolean(actionData?.fieldErrors?.question?.length)
  const hasInvalidAnswer = Boolean(actionData?.fieldErrors?.answer?.length)

  return (
    <Box py={{ base: 5, sm: 10 }} px={{ base: 4, sm: 8 }}>
      <PuzzleFormHeader mode={mode} />

      <Form method="post">
        <input type="hidden" name="_mode" value={mode} />
        {isUpdate ? <input type="hidden" name="id" value={values.id} /> : null}

        <Fieldset gap={6}>
          <FormControl isInvalid={hasInvalidTitle}>
            <FormLabel>Titre</FormLabel>
            <Input
              key={`${values.id}-title`}
              type="text"
              name="title"
              required
              defaultValue={values.title}
              size="md"
            />
          </FormControl>
          <FormControl isInvalid={hasInvalidSubtitle}>
            <FormLabel>Sous-titre</FormLabel>
            <Input
              key={`${values.id}-subtitle`}
              type="text"
              name="subtitle"
              defaultValue={values.subtitle}
              size="md"
            />
          </FormControl>
          <FormControl isInvalid={hasInvalidQuestion}>
            <FormLabel>Question</FormLabel>
            <ClientOnly fallback={<EditorSkeleton />}>
              {() => (
                <Editor
                  name="question"
                  defaultValue={values.question}
                  placeholder=""
                />
              )}
            </ClientOnly>
            {actionData?.fieldErrors?.question?.length ? (
              <ValidationMessages errors={actionData.fieldErrors.question} />
            ) : null}
          </FormControl>

          <FormControl isInvalid={hasInvalidAnswer}>
            <FormLabel>Réponse</FormLabel>
            <ClientOnly fallback={<EditorSkeleton />}>
              {() => (
                <Editor
                  name="answer"
                  defaultValue={values.answer}
                  placeholder=""
                />
              )}
            </ClientOnly>
            {actionData?.fieldErrors?.answer?.length ? (
              <ValidationMessages errors={actionData.fieldErrors.answer} />
            ) : null}
          </FormControl>

          <HStack ml="auto">
            <Button
              as={Link}
              variant="outline"
              to="/admin/puzzles"
              w="min-content"
            >
              Annuler
            </Button>
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
          </HStack>
          <Fade in={hasFormError}>
            <Alert status="error">{actionData?.formError}</Alert>
          </Fade>
        </Fieldset>
      </Form>
    </Box>
  )
}

export default PuzzleForm