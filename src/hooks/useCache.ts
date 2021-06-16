import useSWR, { Key, SWRResponse } from 'swr'

export function useCache<Data = any, Error = any>(
  key: Key,
  initialValue?: Data
): SWRResponse<Data, Error> {
  const swrResponse = useSWR<Data, Error>(key, null, {
    revalidateOnFocus: false,
    revalidateOnMount: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
  })

  if (initialValue !== undefined && swrResponse.data === undefined) {
    swrResponse.mutate(initialValue)
  }

  return swrResponse
}
