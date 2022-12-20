import type { LoaderArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Box, Heading, Container } from '@chakra-ui/react'

import { HTMLSanitizer } from '~/utils'

import { getPuzzlePublic } from '../models/puzzle.server'

export const loader = async ({ params }: LoaderArgs) => {
  const { puzzleSlug } = params

  if (!puzzleSlug)
    throw new Response('puzzleSlug not provided', {
      status: 500,
    })

  const puzzle = await getPuzzlePublic(puzzleSlug)

  if (!puzzle)
    throw new Response('Not Found', {
      status: 404,
    })

  return json({ puzzle })
}

const PuzzleSlugRoute = () => {
  const { puzzle } = useLoaderData<typeof loader>()

  const { title, subtitle, question } = puzzle
  return (
    <Box h="full">
      <Box as="header" bg="background.dark" py={2}>
        <Container>
          <Heading
            as="h1"
            fontSize="2rem"
            letterSpacing="0.02em"
            color="white"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            {title}
          </Heading>
        </Container>
      </Box>
      <Container as="main">
        {subtitle ? (
          <Heading
            as="h2"
            fontSize="l"
            fontFamily="body"
            color="americanpurple.400"
            fontWeight="bold"
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
            my={3}
          >
            {subtitle}
          </Heading>
        ) : null}
        <Box
          dangerouslySetInnerHTML={{ __html: HTMLSanitizer(question || '') }}
        />
      </Container>
    </Box>
  )
}

export default PuzzleSlugRoute
