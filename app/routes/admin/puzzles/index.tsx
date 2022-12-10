import { Button } from '@chakra-ui/button'
import { VisuallyHidden } from '@chakra-ui/react'
import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useLoaderData, useTransition } from '@remix-run/react'
import { Edit3, Loader, Trash2 } from 'lucide-react'

import type { Puzzle } from '~/models/puzzle.server'
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
  const numberOfPuzzles = puzzles.length

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.4' }}>
      <header>
        <nav>
          <ul>
            <li>
              <form action="/logout" method="post">
                <button type="submit">Déconnexion</button>
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

            const isCurrentPuzzle =
              transition.submission?.formData.get('id') === id
            const isLoading = isSubmitting && isCurrentPuzzle

            return (
              <PuzzleItem
                key={id}
                id={id}
                slug={slug}
                question={question}
                answer={answer}
                index={numberOfPuzzles - index}
                isLoading={isLoading}
              />
            )
          })}
        </section>
      </main>
    </div>
  )
}

type PuzzleItemProps = Pick<Puzzle, 'id' | 'slug' | 'question' | 'answer'> & {
  index: number
  isLoading: boolean
}

const PuzzleItem = ({
  id,
  slug,
  question,
  answer,
  index,
  isLoading,
}: PuzzleItemProps) => {
  const link = `/puzzles/${slug}`

  return (
    <article>
      <h2>Énigme {index}</h2>
      <p>Question : {question}</p>
      <p>Réponse : {answer}</p>
      <p>
        Lien : <Link to={link}>{link}</Link>
      </p>
      <Form method="delete">
        <input type="hidden" name="id" value={id} readOnly />
        <Button type="submit" title="Supprimer l'énigme" disabled={isLoading}>
          {isLoading ? <Loader /> : <Trash2 />}
          <VisuallyHidden>
            {isLoading
              ? "Suppression de l'énigme en cours"
              : "Supprimer l'énigme"}
          </VisuallyHidden>
        </Button>
      </Form>
      <Link to={`/admin/puzzles/${id}`}>
        <Edit3 />
        <VisuallyHidden>Modifier l'énigme</VisuallyHidden>
      </Link>
    </article>
  )
}

export default PuzzlesRoute
