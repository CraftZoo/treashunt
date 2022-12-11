import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Form from '../atoms/Form'
import EditorContent from './EditorContent'
import { Button } from '@chakra-ui/react'
import Fieldset from '../atoms/Fieldset'
import type { FormEvent } from 'react'
import { Loader } from 'lucide-react'

const PuzzleUpsertFormSchema = () =>
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
  } = useForm<PuzzleUpsertFormSchemaData>({
    resolver: zodResolver(PuzzleUpsertFormSchema()),
    defaultValues,
  })

  const _onSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.target as HTMLFormElement
    handleSubmit(() => onSubmit?.(form))(event)
  }

  return (
    <Form method="post" onSubmit={_onSubmit}>
      <Fieldset>
        <Controller
          name="question"
          control={control}
          render={({ field: { ...rest } }) => <EditorContent {...rest} />}
        />

        <Controller
          name="answer"
          control={control}
          render={({ field: { ...rest } }) => <EditorContent {...rest} />}
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
