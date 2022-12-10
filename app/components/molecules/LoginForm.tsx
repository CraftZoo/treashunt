import {
  Box,
  Button,
  Fade,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import PasswordInput from '../atoms/PasswordInput'
import Form from '../atoms/Form'
import Alert from '../atoms/Alert'
import { useActionData, useSearchParams, useTransition } from '@remix-run/react'
import Fieldset from '../atoms/Fieldset'
import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect, json } from '@remix-run/node'
import { createUserSession, getUserId } from '~/session.server'
import { login } from '~/models/user.server'
import { safeRedirect } from '~/utils'

interface ActionData {
  fields?: {
    username?: string
    password?: string
  }
  fieldErrors?: {
    username?: string
    password?: string
  }
  formError?: string
}

const validateUsername = (username: string) => {
  if (typeof username !== 'string' || username.length < 3)
    return "L'identifiant doit contenir au moins 3 caractères"
}

const validatePassword = (password: string) => {
  if (typeof password !== 'string' || password.length < 6)
    return 'Le mot de passe doit contenir au moins 6 caractères'
}

const badRequest = (data: any) => json(data, { status: 400 })

export const LoginFormAction = async ({ request }: ActionArgs) => {
  const formData = await request.formData()
  const username = formData.get('username')
  const password = formData.get('password')
  const redirectTo = safeRedirect(formData.get('redirectTo'))

  if (
    typeof username !== 'string' ||
    typeof password !== 'string' ||
    typeof redirectTo !== 'string'
  )
    return badRequest({
      formError: "Une erreur est survenue lors de l'envoi du formulaire",
    })

  const fields = { username, password }
  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  }

  if (Object.values(fieldErrors).some(Boolean))
    return badRequest({ fieldErrors, fields })

  const user = await login({ username, password })

  if (!user)
    return badRequest({
      fields,
      formError: 'Identifiant ou mot de passe incorrect',
    })

  return createUserSession({
    userId: user.id,
    request,
    redirectTo,
  })
}

export const LoginFormLoader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request)

  if (userId) return redirect('/admin/puzzles')
  return json({})
}

const LoginForm = () => {
  const actionData = useActionData<ActionData>()
  const [searchParams] = useSearchParams()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  const hasFormError = actionData?.formError
  const hasInvalidUsername = Boolean(actionData?.fieldErrors?.username)
  const hasInvalidPassword = Boolean(actionData?.fieldErrors?.password)
  return (
    <Form method="post">
      <Fieldset disabled={isSubmitting} gap={6}>
        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get('redirectTo') ?? undefined}
        />
        <FormControl isInvalid={hasInvalidUsername}>
          <FormLabel fontWeight="600">Identifiant</FormLabel>
          <Input
            type="text"
            name="username"
            required
            minLength={3}
            defaultValue={actionData?.fields?.username}
          />
          {actionData?.fieldErrors?.username ? (
            <FormErrorMessage>
              {actionData.fieldErrors.username}
            </FormErrorMessage>
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
          {actionData?.fieldErrors?.password ? (
            <FormErrorMessage>
              {actionData.fieldErrors.password}
            </FormErrorMessage>
          ) : null}
        </FormControl>

        <Button type="submit" mt={5} w="full">
          {isSubmitting ? 'Connexion en cours...' : 'Me connecter'}
        </Button>

        <Fade in={!!hasFormError}>
          <Alert status="error">{actionData?.formError}</Alert>
        </Fade>
      </Fieldset>
    </Form>
  )
}

export default LoginForm
