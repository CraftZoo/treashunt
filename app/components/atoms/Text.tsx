import type { ReactNode } from 'react'

export type TextProps = {
  children: ReactNode
}

const Text = ({ children }: TextProps) => {
  return <p>{children}</p>
}

export default Text
