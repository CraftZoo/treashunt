import { chakra, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'

import CardSubtitle from '../atoms/CardSubtitle'
import Link from '../atoms/Link'

import PuzzleActionMenu from './PuzzleActionMenu'

export { action } from './PuzzleActionMenu'

interface PuzzleItemProps {
  puzzle: Pick<
    Puzzle,
    'id' | 'title' | 'subtitle' | 'slug' | 'question' | 'answer'
  >
}

const PuzzleItem = ({ puzzle }: PuzzleItemProps) => {
  const { id, title, subtitle, slug, question, answer } = puzzle

  const link = `/puzzles/${slug}`

  return (
    <Card as="article" bg="white" borderRadius="sm" shadow="sm">
      <CardHeader
        as="header"
        display="flex"
        justifyContent="space-between"
        pb={3}
      >
        <chakra.hgroup overflow="hidden">
          <Heading
            as="h3"
            fontSize="2rem"
            letterSpacing="0.02em"
            color="darkpurple"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {title}
          </Heading>

          {subtitle ? (
            <Heading
              as="h4"
              fontSize="l"
              fontFamily="body"
              color="gray.500"
              fontWeight="bold"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              overflow="hidden"
            >
              {subtitle}
            </Heading>
          ) : null}
        </chakra.hgroup>

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
