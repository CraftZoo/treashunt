import { createCookieSessionStorage, redirect } from '@remix-run/node'

import type { User } from '~/models/user.server'
import { getUserById } from '~/models/user.server'

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set')
}

const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secrets: [sessionSecret],
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
})

const getSession = async (request: Request) => {
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

const USER_SESSION_KEY = 'userId'
export const getUserId = async (
  request: Request
): Promise<User['id'] | undefined> => {
  const session = await getSession(request)
  const userId = session.get(USER_SESSION_KEY)

  return userId
}

export const getUser = async (request: Request) => {
  const userId = await getUserId(request)
  if (!userId) return null

  const user = await getUserById(userId)
  if (user) return user

  throw await logout(request)
}

export const requireUserId = async (
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) => {
  const userId = await getUserId(request)
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw redirect(`/login?${searchParams}`)
  }
  return userId
}

export const requireUser = async (request: Request) => {
  const userId = await requireUserId(request)

  const user = await getUserById(userId)
  if (user) return user

  throw await logout(request)
}

type CreateUserSession = {
  request: Request
  userId: string
}
export const createUserSession = async ({
  request,
  userId,
}: CreateUserSession) => {
  const session = await getSession(request)
  session.set(USER_SESSION_KEY, userId)

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session),
    },
  })
}

export const logout = async (request: Request) => {
  const session = await getSession(request)

  return redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}
