import { Box, keyframes, theme } from '@chakra-ui/react'

const loading = keyframes`
  to {
    background-position-x: -20%;
  }
`

const EditorSkeleton = () => {
  return (
    <Box
      borderRadius="xl"
      boxShadow="sm"
      height="232px"
      border="1px solid"
      borderColor="gray.200"
      backgroundColor="gray.100"
      background={`linear-gradient(100deg, transparent 40%, ${theme.colors.whiteAlpha[600]} 50%, transparent 60%) var(--chakra-colors-gray-100)`}
      backgroundSize="200% 100%"
      animation={`1s ${loading} ease-in-out infinite`}
      css={`
        background-position-x: 180%;
      `}
    />
  )
}

export default EditorSkeleton
