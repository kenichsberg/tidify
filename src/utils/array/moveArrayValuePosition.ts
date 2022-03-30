import { insertToArray } from './'

export function moveArrayValuePosition(
  array: any[],
  //oldIndex: any,
  value: any,
  newIndex: number
) {
  /*
  const value = array[oldIndex]
  const filtered = array.filter((_, index) => index !== oldIndex)
  console.log(value, filtered, array, oldIndex, newIndex)
  const offset = oldIndex < newIndex ? -1 : 0
*/
  const oldIndex = array.indexOf(value)
  if (oldIndex === -1) throw new Error('value not found')

  const filtered = array.filter((_, index) => index !== oldIndex)
  //console.log(value, filtered, array, oldIndex, newIndex)
  const offset = oldIndex < newIndex ? -1 : 0

  return insertToArray(filtered, value, newIndex + offset)
}
