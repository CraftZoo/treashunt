import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { useActionData, useTransition } from '@remix-run/react'

import { Button, Fade, FormControl, FormLabel, Input } from '@chakra-ui/react'

import { z } from 'zod'

import { login } from '~/models/user.server'
import { createUserSession, getUserId } from '~/session.server'
import type { inferSafeParseErrors } from '~/utils'

import Alert from '../atoms/Alert'
import Fieldset from '../atoms/Fieldset'
import Form from '../atoms/Form'
import PasswordInput from '../atoms/PasswordInput'
import ValidationMessages from '../atoms/ValidationMessages'

const LoginFields = z.object({
  username: z.string().min(3, 'Ce champ est requis'),
  password: z.string().min(6, 'Ce champ est requis'),
})
type LoginFields = z.infer<typeof LoginFields>
type LoginFieldsErrors = inferSafeParseErrors<typeof LoginFields>

type ActionData = LoginFieldsErrors & {
  fields: LoginFields
}

const badRequest = (data: any) => json(data, { status: 400 })

export const LoginFormAction = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const fields = Object.fromEntries(formData.entries()) as LoginFields
  const result = LoginFields.safeParse(fields)

  if (!result.success) {
    return badRequest({
      fields,
      ...result.error.flatten(),
    })
  }

  const user = await login(fields)

  if (!user)
    return badRequest({
      fields,
      formError: 'Identifiant ou mot de passe incorrect',
    })

  return createUserSession({ userId: user.id, request })
}

export const LoginFormLoader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request)

  if (userId) return redirect('/admin/puzzles')
  return json({})
}

const LoginForm = () => {
  const actionData = useActionData<ActionData>()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  const hasFormError = Boolean(actionData?.formError)
  const hasInvalidUsername = Boolean(actionData?.fieldErrors?.username?.length)
  const hasInvalidPassword = Boolean(actionData?.fieldErrors?.password?.length)

  return (
    <Form method="post">
      <Fieldset disabled={isSubmitting} gap={6}>
        <FormControl isInvalid={hasInvalidUsername}>
          <FormLabel fontWeight="600">Identifiant</FormLabel>
          <Input
            type="text"
            name="username"
            required
            minLength={3}
            defaultValue={actionData?.fields?.username}
          />
          {actionData?.fieldErrors?.username?.length ? (
            <ValidationMessages errors={actionData.fieldErrors.username} />
          ) : null}
        </FormControl>

        <FormControl isInvalid={hasInvalidPassword}>
          <FormLabel fontWeight="600">Mot de passe</FormLabel>
          <PasswordInput
            name="password"
            isRequired
            minLength={6}
            defaultValue={actionData?.fields?.password}
          />
          {actionData?.fieldErrors?.password?.length ? (
            <ValidationMessages errors={actionData.fieldErrors.password} />
          ) : null}
        </FormControl>

        <Button type="submit" mt={5} w="full">
          {isSubmitting ? 'Connexion en cours...' : 'Me connecter'}
        </Button>

        <Fade in={hasFormError}>
          <Alert status="error">{actionData?.formError}</Alert>
        </Fade>
      </Fieldset>
    </Form>
  )
}

export default LoginForm
