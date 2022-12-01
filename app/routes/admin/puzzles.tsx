import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import Puzzle from '~/components/Puzzle'

import { deletePuzzle, getPuzzleListItems } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const puzzleId = formData.get('id')

  if (typeof puzzleId !== 'string') return json({}, { status: 400 }) // TODO: toast error management

  await deletePuzzle({ id: puzzleId })
  return json({})
}

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request)

  if (!user)
    throw new Response('Not Found', {
      status: 404,
    })

  const puzzles = await getPuzzleListItems()

  return json({ user, puzzles })
}

const PuzzlesRoute = () => {
  const { puzzles } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <header>
        <nav>
          <ul>
            <li>
              <form action="/logout" method="post">
                <button type="submit" className="button">
                  Déconnexion
                </button>
              </form>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Bienvenue sur TreasApp</h1>
        <Link to="/admin/puzzles/add">Ajouter une nouvelle énigme</Link>
        <section>
          {puzzles.map((puzzle, index) => {
            const { id, slug, question, answer } = puzzle

            return (
              <Puzzle
                key={id}
                id={id}
                slug={slug}
                question={question}
                answer={answer}
                index={index + 1}
              />
            )
          })}
        </section>
      </main>
    </div>
  )
}

export default PuzzlesRoute
