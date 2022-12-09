import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useSearchParams, useTransition } from '@remix-run/react'
import {
  Alert,
  Box,
  Button,
  Container,
  Form,
  Input,
  PasswordInput,
  VisuallyHidden,
} from '~/components'
import { login } from '~/models/user.server'
import { createUserSession, getUserId } from '~/session.server'
import { safeRedirect } from '~/utils'

const validateUsername = (username: unknown) => {
  if (typeof username !== 'string' || username.length < 3)
    return "L'identifiant doit contenir au moins 3 caractères"
}

const validatePassword = (password: unknown) => {
  if (typeof password !== 'string' || password.length < 6)
    return 'Le mot de passe doit contenir au moins 6 caractères'
}

const badRequest = (data: any) => json(data, { status: 400 })

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

export const action = async ({ request }: ActionArgs) => {
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

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request)

  if (userId) return redirect('/admin/puzzles')
  return json({})
}

export const meta: MetaFunction = () => ({
  title: 'Connexion à TreasApp',
})

const IndexRoute = () => {
  const actionData = useActionData<ActionData>()
  const [searchParams] = useSearchParams()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  const hasFormError = actionData?.formError
  const hasInvalidUsername = Boolean(actionData?.fieldErrors?.username)
  const hasInvalidPassword = Boolean(actionData?.fieldErrors?.password)

  return (
    <Box
      bgImage="url('/images/background.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      height="full"
      position="relative"
      _before={{
        content: '""',
        bgColor: 'darkpurple',
        opacity: 0.8,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Container
        height="full"
        p={16}
        bgColor="white"
        position="relative"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <VisuallyHidden>
          <h1>Connexion</h1>
        </VisuallyHidden>
        <Form.Root method="post">
          <Form.Fieldset
            disabled={isSubmitting}
            display="flex"
            flexDirection="column"
            gap={6}
          >
            <input
              type="hidden"
              name="redirectTo"
              value={searchParams.get('redirectTo') ?? undefined}
            />
            <Form.Control isInvalid={hasInvalidUsername}>
              <Form.Label>Identifiant</Form.Label>
              <Input
                type="text"
                name="username"
                required
                minLength={3}
                defaultValue={actionData?.fields?.username}
              />
              {actionData?.fieldErrors?.username ? (
                <Form.ValidationMessage>
                  {actionData.fieldErrors.username}
                </Form.ValidationMessage>
              ) : null}
            </Form.Control>

            <Form.Control isInvalid={hasInvalidPassword}>
              <Form.Label>Mot de passe</Form.Label>
              <PasswordInput
                name="password"
                required
                minLength={6}
                defaultValue={actionData?.fields?.password}
              />
              {actionData?.fieldErrors?.password ? (
                <Form.ValidationMessage>
                  {actionData.fieldErrors.password}
                </Form.ValidationMessage>
              ) : null}
            </Form.Control>

            {hasFormError ? (
              <Alert status="error">{actionData.formError}</Alert>
            ) : null}

            <Button type="submit" mt={4}>
              {isSubmitting ? 'Connexion en cours...' : 'Me connecter'}
            </Button>
          </Form.Fieldset>
        </Form.Root>
      </Container>
    </Box>
  )
}

export default IndexRoute
