import type { LinkProps as RemixLinkProps } from '@remix-run/react'
import { Link as RemixLink } from '@remix-run/react'

import type {
  ChakraComponent,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'

export type LinkProps = ChakraLinkProps & RemixLinkProps
type LinkComponent = ChakraComponent<'a', {}>

const Link = (({ children, ...rest }: LinkProps) => {
  return (
    <ChakraLink as={RemixLink} {...rest}>
      {children}
    </ChakraLink>
  )
}) as LinkComponent

export default Link
