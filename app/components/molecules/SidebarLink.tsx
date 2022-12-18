import type { NavLinkProps } from '@remix-run/react'
import { NavLink } from '@remix-run/react'

import { Icon } from '@chakra-ui/react'

import type { Icon as LucideIcon } from 'lucide-react'

import type { LinkProps } from '../atoms/Link'
import Link from '../atoms/Link'

type SidebarLinkProps = {
  icon: LucideIcon
} & LinkProps &
  NavLinkProps

const SidebarLink = ({ children, icon, ...rest }: SidebarLinkProps) => {
  return (
    <Link
      as={NavLink}
      display="flex"
      gap="2"
      alignItems="center"
      role="group"
      height="40px"
      width="full"
      flexShrink="0"
      paddingLeft="3"
      sx={{
        '&.active': {
          color: 'primary',
          backgroundColor: 'secondary',
          fontWeight: 'bold',
        },
      }}
      {...rest}
    >
      <Icon
        as={icon}
        transition="250ms ease-in-out"
        css={{
          backfaceVisibility: 'hidden',
        }}
        _groupHover={{
          transform: 'scale(1.05)',
          transformOrigin: 'center',
        }}
      />
      {children}
    </Link>
  )
}

export default SidebarLink
