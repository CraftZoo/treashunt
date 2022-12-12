import { Box } from '@chakra-ui/react'
import { Outlet } from '@remix-run/react'

const PuzzlesRoute = () => {
  return (
    <Box as="main">
      <Outlet />
    </Box>
  )
}

export default PuzzlesRoute
