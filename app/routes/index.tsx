import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { NavLink, useLoaderData } from '@remix-run/react'
import { getUser } from '~/session.server'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request)

  return json({ user })
}

const IndexRoute = () => {
  const { user } = useLoaderData()

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
        {user ? (
          <section>
            <article>
              <h2>Énigme 1</h2>
              <p>Question : Ceci est la question 1</p>
              <p>Réponse : Cela est la réponse 1</p>
            </article>
            <article>
              <h2>Énigme 2</h2>
              <p>Question : Ceci est la question 2</p>
              <p>Réponse : Cela est la réponse 2</p>
            </article>
            <article>
              <h2>Énigme 3</h2>
              <p>Question : Ceci est la question 3</p>
              <p>Réponse : Cela est la réponse 3</p>
            </article>
          </section>
        ) : null}
      </main>
    </div>
  )
}

export default IndexRoute
