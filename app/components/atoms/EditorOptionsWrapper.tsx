import type { ReactNode } from 'react'

import type { BoxProps } from '@chakra-ui/react'
import { Box, Flex } from '@chakra-ui/react'

type EditorOptionsWrapperProps = {
  children: ReactNode
} & BoxProps

const EditorOptionsWrapper = ({
  children,
  ...rest
}: EditorOptionsWrapperProps) => {
  return (
    <Box
      transition="visibility 0s linear 0s, opacity 300ms"
      borderTopRadius="xl"
      border="1px solid"
      borderColor="gray.100"
      {...rest}
    >
      <Flex
        bg="white"
        flexWrap="wrap"
        px={2}
        py={1}
        gap={2}
        borderTopRadius="xl"
      >
        {children}
      </Flex>
    </Box>
  )
}

export default EditorOptionsWrapper
