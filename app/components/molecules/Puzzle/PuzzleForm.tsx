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

import ClientOnly from '~/components/atoms/ClientOnly'
import Fieldset from '~/components/atoms/Fieldset'
import Form from '~/components/atoms/Form'
import Link from '~/components/atoms/Link'
import Skeleton from '~/components/atoms/Skeleton'
import ValidationMessages from '~/components/atoms/ValidationMessages'
import Editor from '~/components/molecules/Editor'
import MapField from '~/components/molecules/MapField.client'
import { createPuzzle, updatePuzzle } from '~/models/puzzle.server'
import type { Puzzle, CreatePuzzle, UpdatePuzzle } from '~/models/puzzle.server'
import { getUserId, setMessage } from '~/session.server'
import type { inferSafeParseErrors } from '~/utils'
import { coordinatesToString, stringToCoordinates } from '~/utils/map'

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
  lat: 47.042991,
  lng: -1.185087,
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
        "Une erreur est survenue pendant la modification de l'??nigme",
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
      title: '??nigme modifi??e',
    })
    return json({ puzzle }, { headers })
  }

  const authorId = await getUserId(request)
  if (!authorId)
    return json(
      { formError: 'Vous devez ??tre connect?? pour ajouter une ??nigme' },
      { status: 400 }
    )

  const puzzle = await createPuzzle({ ...fields, authorId, coordinates })
  const headers = await setMessage(request, {
    status: 'success',
    title: '??nigme ajout??e',
  })
  return redirect(`/admin/puzzles/${puzzle.id}`, { headers })
}

type Mode = 'creation' | 'update'
type PuzzleFormProps =
  | {
      mode: 'update'
      puzzle: UpdatePuzzle
    }
  | { mode: 'creation'; puzzle?: CreatePuzzle }

const PuzzleForm = ({ puzzle, mode }: PuzzleFormProps) => {
  const actionData = useActionData<ActionData>()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  const isUpdate = mode === 'update'

  const defaultValues: PuzzleFields = {
    id: mode === 'update' ? puzzle.id : '',
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
    <Box py={{ base: 5, sm: 4 }} px={{ base: 4, sm: 8 }}>
      <PuzzleFormHeader mode={mode} />

      <Form method="post" mt={8}>
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
            <FormLabel>R??ponse</FormLabel>
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
            <FormLabel>Coordonn??es</FormLabel>
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
