import { request } from 'graphql-request'
import { GraphQLResponse } from 'graphql-request/dist/types'

export const API = process.env.NEXT_PUBLIC_END_POINT ?? ''

export function fetcher<T = any>(query: string): Promise<GraphQLResponse<T>> {
  return request(API, query)
}
