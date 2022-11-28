import { ApolloClient, from, InMemoryCache, split } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getMainDefinition } from '@apollo/client/utilities'

import generatedIntrospection from './introspection'

const authLink = setContext(async (_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`,
    },
  }
})

const splitLink = split(({ query }) => {
  const definition = getMainDefinition(query)
  return (
    definition.kind === 'OperationDefinition' &&
    definition.operation === 'subscription'
  )
}, from([authLink]))

const client = new ApolloClient({
  link: splitLink,
  connectToDevTools: true,
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
  }),
})

export default client
