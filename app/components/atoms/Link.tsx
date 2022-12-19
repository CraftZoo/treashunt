import { forwardRef } from 'react'

import type { LinkProps as RemixLinkProps } from '@remix-run/react'
import { Link as RemixLink } from '@remix-run/react'

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { Link as ChakraLink } from '@chakra-ui/react'

export type LinkProps = ChakraLinkProps & RemixLinkProps

const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, ...rest }, ref) => {
    return (
      <ChakraLink ref={ref} as={RemixLink} {...rest}>
        {children}
      </ChakraLink>
    )
  }
)

Link.displayName = 'Link'

export default Link
