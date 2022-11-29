import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, NavLink, useLoaderData } from '@remix-run/react'
import Puzzle from '~/components/Puzzle'
import { getPuzzleListItems } from '~/models/puzzle.server'
import { getUser } from '~/session.server'

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request)
  const puzzles = await getPuzzleListItems()

  return json({ user, puzzles })
}

const IndexRoute = () => {
  const { user, puzzles } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <header>
        <nav>
          <ul>
            <li>
              {!user ? (
                <NavLink to="login">Connexion</NavLink>
              ) : (
                <form action="/logout" method="post">
                  <button type="submit" className="button">
                    Déconnexion
                  </button>
                </form>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <h1>Bienvenue sur TreasApp</h1>
        <Link to="/puzzles/create">Créer une nouvelle énigme</Link>
        {user ? (
          <section>
            {puzzles.map((puzzle, index) => {
              const { id, slug, question, answer } = puzzle

              return (
                <Puzzle
                  key={id}
                  slug={slug}
                  question={question}
                  answer={answer}
                  index={index + 1}
                />
              )
            })}
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default IndexRoute
