import {
  Box,
  Heading,
  HStack,
  Stack,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react'
import LoginForm from '../molecules/LoginForm'

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
      <HStack justifyContent="center" gap={2} ml="-5">
        <Image maxW="24" src="/images/chest.png" alt="logo app" />
        <Heading as="h1" size="3xl">
          TreasHunt
        </Heading>
      </HStack>
      <Box>
        <VisuallyHidden>
          <h1>Connexion</h1>
        </VisuallyHidden>
        <LoginForm />
      </Box>
      <Box />
    </Stack>
  )
}

export default Login
