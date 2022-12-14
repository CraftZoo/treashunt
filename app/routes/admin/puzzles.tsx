import { Outlet } from '@remix-run/react'

import { Box } from '@chakra-ui/react'

const PuzzlesRoute = () => {
  return (
    <Box as="main" height="full">
      <Outlet />
    </Box>
  )
}

export default PuzzlesRoute
