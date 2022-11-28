import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const db = new PrismaClient()

const seed = async () => {
  const username = 'CraftZoo'

  // cleanup the existing database
  await db.user.delete({ where: { username } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  // CraftZoo is a default user with the password 'Sunsept'
  const hashedPassword = await bcrypt.hash('Sunsept', 10)
  await db.user.create({
    data: {
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  console.log(`Database has been seeded. 🌱`)
}
seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
