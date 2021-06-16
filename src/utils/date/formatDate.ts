export const formatDatetimeDisplay = (
  dateStrISO: string | undefined
): string => {
  if (dateStrISO == undefined || dateStrISO === '') return '--- --, ----, --:--'
  const date = new Date(dateStrISO)
  const options = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    hour12: false,
    minute: 'numeric',
  }
  return date.toLocaleString('en-US', options)
}

export const formatDateDisplay = (dateStrISO: string | undefined): string => {
  if (dateStrISO == undefined) return '--- --'
  const date = new Date(dateStrISO)
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }
  return date.toLocaleString('en-US', options)
}
