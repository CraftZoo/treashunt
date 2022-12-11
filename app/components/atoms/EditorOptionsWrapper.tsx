import type { BoxProps } from '@chakra-ui/react'
import { Box, Flex } from '@chakra-ui/react'
import type { ReactNode } from 'react'

type EditorOptionsWrapperProps = {
  children: ReactNode
} & BoxProps

const EditorOptionsWrapper = ({
  children,
  ...rest
}: EditorOptionsWrapperProps) => {
  return (
    <Box transition="visibility 0s linear 0s, opacity 300ms" {...rest}>
      <Flex
        bg="white"
        alignItems="center"
        h={10}
        gap={1}
        p={2}
        borderRadius="xl"
      >
        {children}
      </Flex>
    </Box>
  )
}

export default EditorOptionsWrapper
