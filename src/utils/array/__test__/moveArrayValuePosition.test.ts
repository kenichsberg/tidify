import { moveArrayValuePosition, insertToArray } from 'utils/array'

let array: string[] = []

beforeEach(() => {
  array = ['a', 'b', 'c', 'd', 'e']
})

describe('moveArrayValuePosition', () => {
  it('move forward', () => {
    const oldIndex = 0
    const newIndex = 3
    const moved = moveArrayValuePosition(array, oldIndex, newIndex)
    expect(moved).toEqual(['b', 'c', 'a', 'd', 'e'])
  })
  it('move backward', () => {
    const oldIndex = 3
    const newIndex = 1
    const moved = moveArrayValuePosition(array, oldIndex, newIndex)
    expect(moved).toEqual(['a', 'd', 'b', 'c', 'e'])
  })
  it('move to next', () => {
    const oldIndex = 2
    const newIndex = 4
    const moved = moveArrayValuePosition(array, oldIndex, newIndex)
    expect(moved).toEqual(['a', 'b', 'd', 'c', 'e'])
  })
  it('move to previous', () => {
    const oldIndex = 4
    const newIndex = 3
    const moved = moveArrayValuePosition(array, oldIndex, newIndex)
    expect(moved).toEqual(['a', 'b', 'c', 'e', 'd'])
  })
})
