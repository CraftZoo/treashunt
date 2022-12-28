import {
  Box,
  Heading,
  HStack,
  Stack,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react'

import LoginForm from '~/components/molecules/Login/LoginForm'

const Login = () => {
  return (
    <Stack
      w={{ md: 'xl' }}
      h={{ base: '1/2', md: 'full' }}
      mx={{ base: '4', sm: '16', md: 'unset' }}
      my="auto"
      p={{ base: 8, md: 16 }}
      gap={4}
      borderRadius={{ base: 'xl', md: 'unset' }}
      bgColor="white"
      position="relative"
      flexDirection="column"
      justifyContent="center"
    >
      <HStack as="header" justifyContent="center" gap={2}>
        <Image maxW="24" src="/images/chest.png" aria-hidden="true" />
        <Heading as="h1" size="3xl">
          TreasHunt
        </Heading>
      </HStack>
      <Box as="main">
        <VisuallyHidden>
          <h2>Connexion</h2>
        </VisuallyHidden>
        <LoginForm />
      </Box>
    </Stack>
  )
}

export default Login
