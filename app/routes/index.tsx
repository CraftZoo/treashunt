import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { useActionData, useSearchParams, useTransition } from '@remix-run/react'

import { Alert, Form, Input } from '~/components'
import { login } from '~/models/user.server'
import { createUserSession, getUserId } from '~/session.server'
import { safeRedirect } from '~/utils'

const validateUsername = (username: unknown) => {
  if (typeof username !== 'string' || username.length < 3)
    return `Usernames must be at least 3 characters long`
}

const validatePassword = (password: unknown) => {
  if (typeof password !== 'string' || password.length < 6)
    return `Passwords must be at least 6 characters long`
}

const badRequest = (data: any) => json(data, { status: 400 })

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
      formError: `Form not submitted correctly.`,
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
      formError: `Username/Password combination is incorrect`,
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
  const actionData = useActionData()
  const [searchParams] = useSearchParams()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  return (
    <div>
      <h1>Connexion</h1>
      <Form.Root method="post">
        <fieldset disabled={isSubmitting}>
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get('redirectTo') ?? undefined}
          />

          <Form.Control isInvalid={actionData?.fieldErrors?.username}>
            <Form.Label>Nom d'utilisateur :</Form.Label>
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
          <Form.Control>
            <Form.Label>Mot de passe :</Form.Label>
            <Input
              name="password"
              required
              defaultValue={actionData?.fields?.password}
              type="password"
              aria-invalid={
                Boolean(actionData?.fieldErrors?.password) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.password ? 'password-error' : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <Form.ValidationMessage>
                {actionData.fieldErrors.password}
              </Form.ValidationMessage>
            ) : null}
          </Form.Control>
          <div id="form-error-message">
            {actionData?.formError ? (
              <Alert status="error"> {actionData.formError}</Alert>
            ) : null}
          </div>
          <button type="submit">
            {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </fieldset>
      </Form.Root>
    </div>
  )
}

export default IndexRoute
