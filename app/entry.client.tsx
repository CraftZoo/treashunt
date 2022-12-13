import { startTransition, StrictMode } from 'react'

import { RemixBrowser } from '@remix-run/react'

import { CacheProvider } from '@emotion/react'
import { hydrateRoot } from 'react-dom/client'

import createEmotionCache from './createEmotionCache'

const hydrate = () => {
  const emotionCache = createEmotionCache()

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <CacheProvider value={emotionCache}>
          <RemixBrowser />
        </CacheProvider>
      </StrictMode>
    )
  })
}

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate)
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  window.setTimeout(hydrate, 1)
}
