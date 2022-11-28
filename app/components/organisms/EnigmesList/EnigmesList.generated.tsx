import * as Types from '../../../graphql/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EnigmesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EnigmesQuery = { __typename?: 'Query', enigmeCollection?: { __typename?: 'EnigmeCollection', items: Array<{ __typename?: 'Enigme', label?: string | null, answer?: string | null, sys: { __typename?: 'Sys', id: string }, question?: { __typename?: 'EnigmeQuestion', json: any } | null } | null> } | null };


export const EnigmesDocument = gql`
    query enigmes {
  enigmeCollection {
    items {
      sys {
        id
      }
      label
      question {
        json
      }
      answer
    }
  }
}
    `;

/**
 * __useEnigmesQuery__
 *
 * To run a query within a React component, call `useEnigmesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnigmesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnigmesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEnigmesQuery(baseOptions?: Apollo.QueryHookOptions<EnigmesQuery, EnigmesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnigmesQuery, EnigmesQueryVariables>(EnigmesDocument, options);
      }
export function useEnigmesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnigmesQuery, EnigmesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnigmesQuery, EnigmesQueryVariables>(EnigmesDocument, options);
        }
export type EnigmesQueryHookResult = ReturnType<typeof useEnigmesQuery>;
export type EnigmesLazyQueryHookResult = ReturnType<typeof useEnigmesLazyQuery>;
export type EnigmesQueryResult = Apollo.QueryResult<EnigmesQuery, EnigmesQueryVariables>;