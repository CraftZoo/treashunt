import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import shortUUID from 'short-uuid'

const db = new PrismaClient()

const seed = async () => {
  const username = 'CraftZoo'

  // cleanup the existing database
  await db.user.delete({ where: { username } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  // CraftZoo is a default user with the password 'Sunsept'
  const hashedPassword = await bcrypt.hash('Sunsept', 10)
  const defaultUser = await db.user.create({
    data: {
      username,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
    },
  })

  await Promise.all(
    puzzles.map((puzzle, index) => {
      const data = {
        ...puzzle,
        authorId: defaultUser.id,
        slug: shortUUID.generate(),
      }

      return db.puzzle.create({ data })
    })
  )

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

const puzzles = [
  {
    question:
      "Toute chose, il dévore. Il ronge le fer, fait disparaître l'acier et réduit les pierres en poussière. Qui est-ce ?",
    answer: 'Le temps',
  },
  {
    question: 'Quelle est la lettre la plus tranchante ?',
    answer: 'La H',
  },
  {
    question: 'Quelle lettre peut-on lancer dans tous les sens ?',
    answer: 'Le D',
  },
  {
    question: 'Qui a deux branches, mais pas de feuilles ?',
    answer: 'Les lunettes',
  },
  {
    question: 'Qui a deux aiguilles, mais ne pique pas ?',
    answer: 'Une montre',
  },
]
