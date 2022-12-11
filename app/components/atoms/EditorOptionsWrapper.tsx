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
      {...rest}
    >
      <Flex
        bg="gray.50"
        alignItems="center"
        h={10}
        borderTopRadius="xl"
        border="1px solid"
        borderColor="gray.100"
        sx={{
          '& > *:first-child': {
            borderTopLeftRadius: 'xl',
          },
        }}
      >
        {children}
      </Flex>
    </Box>
  )
}

export default EditorOptionsWrapper
