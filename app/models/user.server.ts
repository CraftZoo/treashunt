import type { User } from '@prisma/client'
import bcrypt from 'bcryptjs'
import { db } from '~/db.server'

export type { User } from '@prisma/client'

export const getUserById = async (id: User['id']) =>
  db.user.findUnique({ where: { id } })

type Login = {
  username: string
  password: string
}
export const login = async ({ username, password }: Login) => {
  const user = await db.user.findUnique({
    where: { username },
    include: { password: true },
  })
  if (!user?.password) return null

  const isCorrectPassword = await bcrypt.compare(password, user.password.hash)
  if (!isCorrectPassword) return null

  return { id: user.id, username }
}
