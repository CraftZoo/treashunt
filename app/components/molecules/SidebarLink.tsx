import { Icon } from '@chakra-ui/react'

import type { Icon as LucideIcon } from 'lucide-react'

import type { LinkProps } from '../atoms/Link'
import Link from '../atoms/Link'

type SidebarLinkProps = {
  icon: LucideIcon
} & LinkProps

const SidebarLink = ({ children, icon, ...rest }: SidebarLinkProps) => {
  return (
    <Link display="flex" gap="2" alignItems="center" role="group" {...rest}>
      <Icon
        as={icon}
        transition=".2s ease-in-out"
        css={{
          'backface-visibility': 'hidden',
          '-webkit-backface-visibility': 'hidden',
        }}
        _groupHover={{
          transform: 'scale(1.05) translate(-1px, -1px)',
        }}
      />
      {children}
    </Link>
  )
}

export default SidebarLink
