import type { ActionFunction, LoaderArgs } from '@remix-run/node'
import { json, redirect, Response } from '@remix-run/node'
import { Form, Link, useActionData, useTransition } from '@remix-run/react'

import shortUUID from 'short-uuid'

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
  const { title, subtitle, question, answer, slug } =
    Object.fromEntries(formData)

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

  if (typeof title !== 'string')
    return json(
      { errors: { title: "Le titre n'est pas valide" } },
      { status: 400 }
    )

  if (typeof subtitle !== 'string')
    return json(
      { errors: { subtitle: "Le sous-titre n'est pas valide" } },
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

  await createPuzzle({ title, subtitle, question, answer, slug, authorId })
  return redirect('/')
}

const AddPuzzleRoute = () => {
  const actionData = useActionData()

  const transition = useTransition()
  const isSubmitting = transition.state === 'submitting'

  return (
    <main>
      <h1>Ajouter une nouvelle énigme</h1>
      <Link to="/admin/puzzles">Retour à la liste des énigmes</Link>
      <Form method="post" action="/admin/puzzles/add">
        <label>
          Titre
          <input
            name="title"
            type="text"
            defaultValue={actionData?.fields?.title}
            aria-invalid={Boolean(actionData?.fieldErrors?.title) || undefined}
            aria-errormessage={
              actionData?.fieldErrors?.title ? 'title-error' : undefined
            }
          />
          {actionData?.fieldErrors?.title ? (
            <p role="alert" id="title-error">
              {actionData.fieldErrors.title}
            </p>
          ) : null}
        </label>
        <label>
          Sous-titre
          <input
            name="subtitle"
            type="text"
            defaultValue={actionData?.fields?.subtitle}
            aria-invalid={
              Boolean(actionData?.fieldErrors?.subtitle) || undefined
            }
            aria-errormessage={
              actionData?.fieldErrors?.subtitle ? 'subtitle-error' : undefined
            }
          />
          {actionData?.fieldErrors?.subtitle ? (
            <p role="alert" id="subtitle-error">
              {actionData.fieldErrors.subtitle}
            </p>
          ) : null}
        </label>
        <fieldset disabled={isSubmitting}>
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
            readOnly
            defaultValue={actionData?.fields?.slug || shortUUID().generate()}
          />
          <button type="submit">
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter'}
          </button>
          <div id="form-error-message">
            {actionData?.formError ? (
              <p role="alert">{actionData.formError}</p>
            ) : null}
          </div>
        </fieldset>
      </Form>
    </main>
  )
}

export default AddPuzzleRoute
