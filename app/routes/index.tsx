import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'

import { Box, Stack } from '@chakra-ui/react'

import {
  LoginFormAction,
  LoginFormLoader,
} from '~/components/molecules/LoginForm'
import Login from '~/components/organisms/Login'

export const loader = async (loader: LoaderArgs) => {
  return LoginFormLoader(loader)
}

export const action = async (actionParams: ActionArgs) => {
  return LoginFormAction(actionParams)
}

export const meta: MetaFunction = () => ({
  title: 'Connexion à TreasHunt',
})

const IndexRoute = () => {
  return (
    <Box
      bgImage="url('/images/background.jpg')"
      bgPosition="center"
      bgRepeat="no-repeat"
      height="full"
      position="relative"
      _before={{
        content: '""',
        bgColor: 'darkpurple',
        opacity: 0.8,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
      }}
    >
      <Stack height="full" ml={{ md: '15vw' }}>
        <Login />
      </Stack>
    </Box>
  )
}

export default IndexRoute
