import { Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

import CardSubtitle from '../atoms/CardSubtitle'
import Link from '../atoms/Link'

import PuzzleActionMenu from './PuzzleActionMenu'

export { action } from './PuzzleActionMenu'

type PuzzleItemProps = Pick<Puzzle, 'id' | 'slug' | 'question' | 'answer'> & {
  index: number
}

const PuzzleItem = ({ id, slug, question, answer, index }: PuzzleItemProps) => {
  const link = `/puzzles/${slug}`

  return (
    <Card as="article" bg="white" borderRadius="sm" shadow="sm">
      <CardHeader
        as="header"
        display="flex"
        justifyContent="space-between"
        pb={3}
      >
        <Heading
          as="h3"
          fontSize="2rem"
          letterSpacing="0.02em"
          color="darkpurple"
        >
          Intitulé énigme {index}
        </Heading>

        <PuzzleActionMenu puzzleId={id} />
      </CardHeader>
      <CardBody as="main" pt={0}>
        <CardSubtitle>Question</CardSubtitle>
        <p>{question}</p>
        <CardSubtitle>Réponse</CardSubtitle>
        <p>{answer}</p>
        <CardSubtitle>Lien</CardSubtitle>
        <p>
          <Link to={link}>{link}</Link>
        </p>
      </CardBody>
    </Card>
  )
}

export default PuzzleItem
