import type { LinksFunction, LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from '@remix-run/react'

import { Box, ChakraProvider, Code, Heading } from '@chakra-ui/react'

import sourceSansPro400 from '@fontsource/source-sans-pro/400.css'
import sourceSansPro600 from '@fontsource/source-sans-pro/600.css'
import leaflet from 'leaflet/dist/leaflet.css'

import { useToast } from './hooks'
import { getMessage } from './session.server'
import styles from './tailwind.css'
import theme from './theme'
import Fonts from './theme/fonts'
export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => {
  return [
    { rel: 'stylesheet', href: sourceSansPro400 },
    { rel: 'stylesheet', href: sourceSansPro600 },
    { rel: 'stylesheet', href: leaflet },

    { rel: 'stylesheet', href: styles },

    { rel: 'apple-touch-icon', sizes: '60x60', href: '/apple-touch-icon.png' },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
  ]
}

export const loader = async ({ request }: LoaderArgs) => {
  const [toastMessage, headers] = await getMessage(request)

  if (!toastMessage) return json({ toastMessage: null })
  if (!toastMessage.status) throw new Error('Message should have a status')

  return json({ toastMessage }, { headers })
}

function Document({
  children,
  title = 'TreasHunt',
}: {
  children: React.ReactNode
  title?: string
}) {
  const { toastMessage } = useLoaderData<typeof loader>()
  useToast(toastMessage)

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
