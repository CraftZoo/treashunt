import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { json, redirect, Response } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import shortUUID from 'short-uuid'

import GoBackButton from '~/components/GoBackButton'
import { createPuzzle } from '~/models/puzzle.server'
import { getUserId } from '~/session.server'

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await getUserId(request)

  if (!userId)
    throw new Response('Not Found', {
      status: 404,
    })

  return json({})
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const question = formData.get('question')
  const answer = formData.get('answer')
  const slug = formData.get('slug')
  const authorId = await getUserId(request)

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

  if (typeof slug !== 'string' || slug.length < 8)
    return json(
      { formError: "Une erreur est survenue lors de l'envoi du formulaire" },
      { status: 400 }
    )

  if (!authorId)
    return json(
      { formError: 'Vous devez être connecté pour ajouter une énigme' },
      { status: 400 }
    )

  await createPuzzle({ question, answer, slug, authorId })
  return redirect('/')
}

const AddPuzzleRoute = () => {
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
        <h1>Ajouter une nouvelle énigme</h1>
        <GoBackButton>Retour à la liste des énigmes</GoBackButton>
        <Form method="post">
          <label>
            Question
            <input
              name="question"
              type="text"
              defaultValue={actionData?.fields?.question}
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
              defaultValue={actionData?.fields?.answer}
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
            defaultValue={actionData?.fields?.slug || shortUUID().generate()}
          />
          <button type="submit">Ajouter</button>
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

export default AddPuzzleRoute
