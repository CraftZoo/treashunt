import type { ReactNode } from 'react'

export type BoldProps = {
  children: ReactNode
}

const Bold = ({ children }: BoldProps) => {
  return <b>{children}</b>
}

export default Bold
