import type { LinkProps as RemixLinkProps } from '@remix-run/react'
import { Link as RemixLink } from '@remix-run/react'

import type {
  ChakraComponent,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'

type LinkComponent = ChakraComponent<'a', {}>

const Link = (({ children, ...rest }: ChakraLinkProps & RemixLinkProps) => {
  return (
    <ChakraLink as={RemixLink} {...rest}>
      {children}
    </ChakraLink>
  )
}) as LinkComponent

export default Link
