import type { LoaderArgs } from '@remix-run/node'
import { json, redirect } from '@remix-run/node'
import { NavLink } from '@remix-run/react'
import { getUserId } from '~/session.server'

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request)

  if (userId) return redirect('/admin/puzzles')
  return json({})
}

const IndexRoute = () => (
  <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
    <header>
      <nav>
        <ul>
          <li>
            <NavLink to="login">Connexion</NavLink>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <h1>Bienvenue sur TreasApp</h1>
    </main>
  </div>
)

export default IndexRoute
