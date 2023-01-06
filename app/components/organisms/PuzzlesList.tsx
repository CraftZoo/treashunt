import { Grid } from '@chakra-ui/react'

import { motion } from 'framer-motion'

import type { PuzzleItemProps } from '~/components/molecules/PuzzleList/PuzzleItem'
import PuzzleItem from '~/components/molecules/PuzzleList/PuzzleItem'

export { action } from '~/components/molecules/PuzzleList/PuzzleItem'

interface PuzzleListProps {
  puzzles: PuzzleItemProps['puzzle'][]
}

const PuzzleList = ({ puzzles }: PuzzleListProps) => {
  return (
    <Grid
      as={motion.section}
      gap={{ base: 3, sm: 6 }}
      gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))"
      width="full"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      {puzzles.map(puzzle => {
        const { id } = puzzle

        return <PuzzleItem key={id} puzzle={puzzle} />
      })}
    </Grid>
  )
}

export default PuzzleList
