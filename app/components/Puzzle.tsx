import { Form, Link } from '@remix-run/react'
import { Trash2 } from 'lucide-react'
import type { Puzzle as IPuzzle } from '~/models/puzzle.server'
import VisuallyHidden from './VisuallyHidden'

type PuzzleProps = Pick<IPuzzle, 'id' | 'slug' | 'question' | 'answer'> & {
  index: number
}

const Puzzle = ({ id, slug, question, answer, index }: PuzzleProps) => {
  const link = `/puzzles/${slug}`

  return (
    <article>
      <h2>Énigme {index}</h2>
      <p>Question : {question}</p>
      <p>Réponse : {answer}</p>
      <p>
        Lien : <Link to={link}>{link}</Link>
      </p>
      <Form method="delete" action="/admin/puzzles">
        <input type="hidden" name="id" value={id} />
        <button type="submit" title="Supprimer l'énigme">
          <Trash2 />
          <VisuallyHidden>Supprimer l'énigme</VisuallyHidden>
        </button>
      </Form>
    </article>
  )
}

export default Puzzle
