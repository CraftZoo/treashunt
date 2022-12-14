import { HStack } from '@chakra-ui/react'

import AppLogo from '../atoms/AppLogo'
import LogoutButton from '../atoms/LogoutButton'

const Header = () => {
  return (
    <HStack
      as="header"
      bg="darkpurple"
      color="white"
      justify="space-between"
      p={4}
      display={{ base: 'flex', sm: 'none' }}
    >
      <AppLogo />
      <LogoutButton variant="icon-button" />
    </HStack>
  )
}

export default Header
