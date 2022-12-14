import type { HeadingProps } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'

const CardSubtitle = (props: HeadingProps) => (
  <Heading
    as="h4"
    textTransform="uppercase"
    fontFamily="body"
    fontSize="xs"
    fontWeight="bold"
    mt={3}
    color="gray.500"
    {...props}
  />
)

export default CardSubtitle
