import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from '@remix-run/react'
import { Box, ChakraProvider, Code, Heading } from '@chakra-ui/react'
import { useContext, useEffect } from 'react'
import { ServerStyleContext, ClientStyleContext } from './context'
import { withEmotionCache } from '@emotion/react'
import theme from './theme'

import sourceSansPro400 from '@fontsource/source-sans-pro/400.css'
import sourceSansPro600 from '@fontsource/source-sans-pro/600.css'
import Fonts from './theme/fonts'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
})

export let links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: sourceSansPro400 },
    { rel: 'stylesheet', href: sourceSansPro600 },
  ]
}

interface DocumentProps {
  children: React.ReactNode
  title?: string
}

const Document = withEmotionCache(
  ({ children, title }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext)
    const clientStyleData = useContext(ClientStyleContext)

    useEffect(() => {
      emotionCache.sheet.container = document.head
      const tags = emotionCache.sheet.tags
      emotionCache.sheet.flush()
      tags.forEach(tag => {
        ;(emotionCache.sheet as any)._insertTag(tag)
      })
      clientStyleData?.reset()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
      <html lang="fr">
        <head>
          <Meta />
          <title>{title}</title>
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    )
  }
)

export default function App() {
  return (
    <Document>
      <ChakraProvider resetCSS theme={theme}>
        <Fonts />
        <Outlet />
      </ChakraProvider>
    </Document>
  )
}

export const CatchBoundary = () => {
  const caught = useCatch()

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <ChakraProvider>
        <Box>
          <Heading as="h1">
            Oups ! On dirait bien qu'on a une erreur 🤯🤯🤯
          </Heading>
          {process.env.NODE_ENV === 'development' ? (
            <Code colorScheme="red">
              <strong>[CatchBoundary]: </strong>
              {caught.status} {caught.statusText}
            </Code>
          ) : null}
        </Box>
      </ChakraProvider>
    </Document>
  )
}

export const ErrorBoundary = ({ error }: { error: Error }) => {
  return (
    <Document title="Erreur !">
      <ChakraProvider>
        <Box>
          <Heading as="h1">
            Oups ! On dirait bien qu'on a une erreur 😱😱😱
          </Heading>
          {process.env.NODE_ENV === 'development' ? (
            <Code colorScheme="red">
              <strong>[ErrorBoundary]: </strong>
              {error.message}
            </Code>
          ) : null}
        </Box>
      </ChakraProvider>
    </Document>
  )
}
