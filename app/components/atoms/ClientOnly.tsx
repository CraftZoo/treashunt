import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'

interface ClientOnlyProps {
  children: () => ReactNode
  fallback?: ReactNode
}

let hydrating = true

const ClientOnly = ({ children, fallback = null }: ClientOnlyProps) => {
  const [hydrated, setHydrated] = useState(() => !hydrating)

  useEffect(function hydrate() {
    hydrating = false
    setHydrated(true)
  }, [])

  return hydrated ? <>{children()}</> : <>{fallback}</>
}

export default ClientOnly
