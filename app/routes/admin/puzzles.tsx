import { Outlet } from '@remix-run/react'

import { Box } from '@chakra-ui/react'

const PuzzlesRoute = () => {
  return (
    <Box as="main">
      <Outlet />
    </Box>
  )
}

export default PuzzlesRoute
