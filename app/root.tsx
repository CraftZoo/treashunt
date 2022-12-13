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

import sourceSansPro400 from '@fontsource/source-sans-pro/400.css'
import sourceSansPro600 from '@fontsource/source-sans-pro/600.css'
import Fonts from './theme/fonts'
import theme from './theme'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: sourceSansPro400 },
    { rel: 'stylesheet', href: sourceSansPro600 },
  ]
}

function Document({
  children,
  title = 'App title',
}: {
  children: React.ReactNode
  title?: string
}) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <Links />
        <script src="/vendor/snow.js" defer></script>
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

export default function App() {
  // throw new Error("💣💥 Booooom");

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
