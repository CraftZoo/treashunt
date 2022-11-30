import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useSearchParams } from '@remix-run/react'
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

  if (userId) return redirect('/')
  return json({})
}

export const meta: MetaFunction = () => ({
  title: 'Connexion',
})

const LoginRoute = () => {
  const actionData = useActionData()
  const [searchParams] = useSearchParams()

  return (
    <div>
      <form method="post">
        <h1>Login</h1>

        <input
          type="hidden"
          name="redirectTo"
          value={searchParams.get('redirectTo') ?? undefined}
        />

        <label>
          Username:
          <input
            type="text"
            name="username"
            required
            minLength={3}
            defaultValue={actionData?.fields?.username}
            aria-invalid={Boolean(actionData?.fieldErrors?.username)}
            aria-errormessage={
              actionData?.fieldErrors?.username ? 'username-error' : undefined
            }
          />
          {actionData?.fieldErrors?.username ? (
            <p role="alert" id="username-error">
              {actionData.fieldErrors.username}
            </p>
          ) : null}
        </label>
        <label>
          Password
          <input
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
            <p role="alert" id="password-error">
              {actionData.fieldErrors.password}
            </p>
          ) : null}
        </label>
        <div id="form-error-message">
          {actionData?.formError ? (
            <p className="text-red-500" role="alert">
              {actionData.formError}
            </p>
          ) : null}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginRoute
