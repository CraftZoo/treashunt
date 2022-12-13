import type { LinkProps as RemixLinkProps } from '@remix-run/react'
import { Link as RemixLink } from '@remix-run/react'

import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { Icon, Link as ChakraLink } from '@chakra-ui/react'

import type { Icon as LucideIcon } from 'lucide-react'

type SidebarLinkProps = {
  icon: LucideIcon
} & ChakraLinkProps &
  RemixLinkProps

const SidebarLink = ({ children, icon, ...rest }: SidebarLinkProps) => {
  return (
    <ChakraLink
      as={RemixLink}
      {...rest}
      display="flex"
      gap="2"
      alignItems="center"
      role="group"
    >
      <Icon
        as={icon}
        transition=".2s ease-in-out"
        css={{
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        }}
        _groupHover={{
          transform: 'scale(1.05)',
        }}
      />
      {children}
    </ChakraLink>
  )
}

export default SidebarLink
