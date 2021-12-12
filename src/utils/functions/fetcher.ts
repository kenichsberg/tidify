export async function fetcher(url: string) {
  const data = await fetch(url)
  return await data.json()
}
