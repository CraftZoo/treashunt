import { chakra, Card, CardBody, CardHeader, Heading } from '@chakra-ui/react'

import type { Puzzle } from '~/models/puzzle.server'
import { HTMLSanitizer } from '~/utils'

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
  const { title, subtitle, question, answer } = puzzle

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

        <PuzzleActionMenu puzzle={puzzle} />
      </CardHeader>
      <CardBody as="main" pt={0}>
        <CardSubtitle>Question</CardSubtitle>
        <div dangerouslySetInnerHTML={{ __html: HTMLSanitizer(question) }} />
        <CardSubtitle>Réponse</CardSubtitle>
        <div dangerouslySetInnerHTML={{ __html: HTMLSanitizer(answer) }} />
      </CardBody>
    </Card>
  )
}

export default PuzzleItem
