import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  watch: true,
  schema: [
    {
      [`${process.env.GRAPHQL_API_URL}`]: {
        headers: {
          Authorization: `Bearer ${process.env.GRAPHQL_API_TOKEN}`,
        },
      },
    },
  ],
  documents: 'app/**/*.gql',
  generates: {
    'graphql/types.ts': {
      plugins: ['typescript'],
    },
    'graphql/introspection.ts': {
      plugins: ['fragment-matcher'],
    },
    'app/': {
      preset: 'near-operation-file',
      presetConfig: {
        baseTypesPath: 'graphql/types.ts',
        extension: '.generated.tsx',
      },
      plugins: ['typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
      },
    },
  },
}

export default config
