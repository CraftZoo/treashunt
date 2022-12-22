import type { ActionArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useTransition } from '@remix-run/react'

import { Prisma } from '@prisma/client'

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
import { getUserId, setMessage } from '~/session.server'
import type { inferSafeParseErrors } from '~/utils'
import { coordinatesToString, stringToCoordinates } from '~/utils'

import ClientOnly from '../atoms/ClientOnly'
import Fieldset from '../atoms/Fieldset'
import Form from '../atoms/Form'
import Link from '../atoms/Link'
import Skeleton from '../atoms/Skeleton'
import ValidationMessages from '../atoms/ValidationMessages'

import Editor from './Editor'
import MapField from './MapField.client'
import PuzzleFormHeader from './PuzzleFormHeader'

const PuzzleSchema = z.object({
  title: z.string().min(1, 'Ce champ est requis'),
  subtitle: z.string(),
  question: z.string(),
  answer: z.string(),
  coordinates: z.string(),
})
type PuzzleFields = z.infer<typeof PuzzleSchema> & Pick<Puzzle, 'id'>
type PuzzleFieldsErrors = inferSafeParseErrors<typeof PuzzleSchema>

type ActionData = PuzzleFieldsErrors & {
  fields: PuzzleFields
}

type FormDataEntries = PuzzleFields & { _mode: Mode }

const defaultCoordinates: Puzzle['coordinates'] = {
  latitude: new Prisma.Decimal(47.042991),
  longitude: new Prisma.Decimal(-1.185087),
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const { _mode, id, ...fields } = Object.fromEntries(
    formData.entries()
  ) as FormDataEntries
  const result = PuzzleSchema.safeParse(fields)

  if (!result.success) {
    const headers = await setMessage(request, {
      status: 'error',
      title: 'Erreur',
      description:
        "Une erreur est survenue pendant la modification de l'énigme",
    })
    return json({ fields, ...result.error.flatten() }, { status: 400, headers })
  }

  const coordinates = stringToCoordinates(fields.coordinates)

  if (_mode === 'update') {
    const puzzle = await updatePuzzle({
      ...fields,
      id,
      coordinates,
    })

    const headers = await setMessage(request, {
      status: 'success',
      title: 'Énigme modifiée',
    })
    return json({ puzzle }, { headers })
  }

  const authorId = await getUserId(request)
  if (!authorId)
    return json(
      { formError: 'Vous devez être connecté pour ajouter une énigme' },
      { status: 400 }
    )

  const puzzle = await createPuzzle({ ...fields, authorId, coordinates })
  const headers = await setMessage(request, {
    status: 'success',
    title: 'Énigme ajoutée',
  })
  return redirect(`/admin/puzzles/${puzzle.id}`, { headers })
}

type Mode = 'creation' | 'update'
type PuzzleFormProps =
  | {
      mode: 'update'
      puzzle: Pick<
        Puzzle,
        | 'id'
        | 'title'
        | 'subtitle'
        | 'question'
        | 'answer'
        | 'slug'
        | 'coordinates'
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
    coordinates: coordinatesToString(puzzle?.coordinates || defaultCoordinates),
  }

  const values: PuzzleFields = {
    id: actionData?.fields?.id || defaultValues.id,
    title: actionData?.fields?.title || defaultValues.title,
    subtitle: actionData?.fields?.subtitle || defaultValues.subtitle,
    answer: actionData?.fields?.answer || defaultValues.answer,
    question: actionData?.fields?.question || defaultValues.question,
    coordinates: actionData?.fields?.coordinates || defaultValues.coordinates,
  }

  const hasFormError = Boolean(actionData?.formError)
  const hasInvalidTitle = Boolean(actionData?.fieldErrors?.title?.length)
  const hasInvalidSubtitle = Boolean(actionData?.fieldErrors?.subtitle?.length)
  const hasInvalidQuestion = Boolean(actionData?.fieldErrors?.question?.length)
  const hasInvalidAnswer = Boolean(actionData?.fieldErrors?.answer?.length)

  const submitLabel = isUpdate ? 'Sauvegarder' : 'Ajouter'
  const submittingLabel = isUpdate
    ? 'Sauvegarde en cours...'
    : 'Ajout en cours...'

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
            <ClientOnly fallback={<Skeleton height="232px" />}>
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
            <ClientOnly fallback={<Skeleton height="232px" />}>
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

          <FormControl>
            <FormLabel>Coordonnées</FormLabel>
            <ClientOnly fallback={<Skeleton height="450px" />}>
              {() => (
                <MapField
                  key={`${values.id}-coordinates`}
                  name="coordinates"
                  defaultCoordinates={stringToCoordinates(values.coordinates)}
                />
              )}
            </ClientOnly>
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
                  {submittingLabel}
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </HStack>
          <Fade in={hasFormError}>
            {actionData?.formError ? (
              <Alert status="error">{actionData?.formError}</Alert>
            ) : null}
          </Fade>
        </Fieldset>
      </Form>
    </Box>
  )
}

export default PuzzleForm
