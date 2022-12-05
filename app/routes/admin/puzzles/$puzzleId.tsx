import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useLoaderData } from '@remix-run/react'
import GoBackButton from '~/components/GoBackButton'
import { getPuzzle, updatePuzzle } from '~/models/puzzle.server'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const { id, question, answer, slug } = Object.fromEntries(formData)

  if (typeof question !== 'string')
    return json(
      { errors: { question: "La question n'est pas valide" } },
      { status: 400 }
    )

  if (typeof answer !== 'string')
    return json(
      { errors: { answer: "La réponse n'est pas valide" } },
      { status: 400 }
    )

  if (typeof slug !== 'string' || slug.length < 8 || typeof id !== 'string')
    return json(
      { formError: "Une erreur est survenue lors de l'envoi du formulaire" },
      { status: 400 }
    )

  await updatePuzzle({ id, question, answer, slug })
  return redirect('/')
}

export const loader = async ({ params }: LoaderArgs) => {
  const { puzzleId } = params
  if (!puzzleId)
    throw new Response('puzzleId not provided', {
      status: 500,
    })

  const puzzle = await getPuzzle(puzzleId)

  if (!puzzle)
    throw new Response('Not Found', {
      status: 404,
    })

  return json({ puzzle })
}

const PuzzleIdRoute = () => {
  const { puzzle } = useLoaderData<typeof loader>()

  const { id, slug, answer, question } = puzzle

  const actionData = useActionData()

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
        <h1>Modifier une énigme</h1>
        <GoBackButton>Retour à la liste des énigmes</GoBackButton>
        <Form method="put" action={`/admin/puzzles/${id}`}>
          <label>
            Question
            <input
              name="question"
              type="text"
              defaultValue={actionData?.fields?.question || question}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.question) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.question ? 'question-error' : undefined
              }
            />
            {actionData?.fieldErrors?.question ? (
              <p role="alert" id="question-error">
                {actionData.fieldErrors.question}
              </p>
            ) : null}
          </label>
          <label>
            Réponse
            <textarea
              name="answer"
              defaultValue={actionData?.fields?.answer || answer}
              aria-invalid={
                Boolean(actionData?.fieldErrors?.answer) || undefined
              }
              aria-errormessage={
                actionData?.fieldErrors?.answer ? 'answer-error' : undefined
              }
            />
            {actionData?.fieldErrors?.answer ? (
              <p role="alert" id="answer-error">
                {actionData.fieldErrors.answer}
              </p>
            ) : null}
          </label>
          <input
            name="slug"
            type="hidden"
            minLength={8}
            required
            readOnly
            defaultValue={slug}
          />
          <input name="id" type="hidden" required readOnly defaultValue={id} />
          <button type="submit">Modifier</button>
          <div id="form-error-message">
            {actionData?.formError ? (
              <p role="alert">{actionData.formError}</p>
            ) : null}
          </div>
        </Form>
      </main>
    </div>
  )
}

export default PuzzleIdRoute
