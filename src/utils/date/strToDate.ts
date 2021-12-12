/**
 * Parses a date string and returns a Date Object
 *
 * @param dateStr - date string to be parsed
 * @returns a Date Object | if dateStr is undefined, returns undefined
 */
export function strToDate(dateStr: string | undefined): Date | undefined {
  if (!dateStr) return undefined

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) {
    throw new Error('invalid date string was passed')
  }

  return date
}
