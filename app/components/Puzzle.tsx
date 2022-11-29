import { Link } from '@remix-run/react'
import type { Puzzle as IPuzzle } from '~/models/puzzle.server'

type PuzzleProps = Pick<IPuzzle, 'slug' | 'question' | 'answer'> & {
  index: number
}

const Puzzle = ({ slug, question, answer, index }: PuzzleProps) => {
  const link = `/puzzles/${slug}`

  return (
    <article>
      <h2>Énigme {index}</h2>
      <p>Question : {question}</p>
      <p>Réponse : {answer}</p>
      <p>
        Lien : <Link to={link}>{link}</Link>
      </p>
    </article>
  )
}

export default Puzzle
