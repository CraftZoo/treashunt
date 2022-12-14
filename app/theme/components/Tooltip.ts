import { Tooltip } from '@chakra-ui/react'

export default Tooltip.defaultProps = {
  ...Tooltip.defaultProps,
  arrowSize: 8,
  bg: 'arsenic',
  borderRadius: 'md',
  fontWeight: 600,
  hasArrow: true,
  p: 2,
}
