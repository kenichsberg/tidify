export function insertToArray(array: any[], value: any, index: number) {
  return [...array.slice(0, index), value, ...array.slice(index)]
}
