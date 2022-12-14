import type { FormEvent } from 'react'
import { useEffect } from 'react'

import { Button } from '@chakra-ui/react'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import Fieldset from '../atoms/Fieldset'
import Form from '../atoms/Form'

import EditorContent from './EditorContent'

export const PuzzleUpsertFormSchema = () =>
  z.object({
    question: z.string().min(1, 'Ce champ est requis'),
    slug: z.string().min(1, 'Ce champ est requis'),
    answer: z.string().min(1, 'Ce champ est requis'),
  })

export type PuzzleUpsertFormSchemaData = z.infer<
  ReturnType<typeof PuzzleUpsertFormSchema>
>

export type PuzzleUpsertFormProps = {
  puzzleId: string
  onSubmit?: (value: HTMLFormElement) => void
  defaultValues: PuzzleUpsertFormSchemaData
}

const PuzzleUpsertForm = ({
  puzzleId,
  onSubmit,
  defaultValues,
}: PuzzleUpsertFormProps) => {
  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
    reset,
  } = useForm<PuzzleUpsertFormSchemaData>({
    resolver: zodResolver(PuzzleUpsertFormSchema()),
    defaultValues,
  })

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  const _onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement
    handleSubmit(async () => await onSubmit?.(form))(event)
  }

  return (
    <Form method="post" onSubmit={_onSubmit}>
      <Fieldset>
        <Controller
          name="question"
          control={control}
          render={({ field: { ...rest } }) => (
            <EditorContent defaultValue={defaultValues.question} {...rest} />
          )}
        />

        <Controller
          name="answer"
          control={control}
          render={({ field: { ...rest } }) => (
            <EditorContent defaultValue={defaultValues.answer} {...rest} />
          )}
        />
        <Controller
          name="slug"
          control={control}
          render={({ field: { ...rest } }) => (
            <input type="hidden" required readOnly {...rest} />
          )}
        />
        <input
          name="id"
          type="hidden"
          required
          readOnly
          defaultValue={puzzleId}
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
      </Fieldset>
    </Form>
  )
}

export default PuzzleUpsertForm
