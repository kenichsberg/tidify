import { getDatesDisplay } from 'components/common'

describe('components/common/DatetimePicker', () => {
  it('getDatesDisplay', () => {
    const year = 2021
    const month = 3
    const correct = [...Array(35)].map((_, index) => {
      const date = new Date('2021-03-29')
      date.setDate(date.getDate() + index)
      return date
    })
    const dates = getDatesDisplay(year, month)
    console.log(correct, dates)
    const _correct = correct.map((date) => date.toISOString())
    const _dates = dates.map((dateObj) => dateObj.date.toISOString())
    expect(_dates).toBe(_correct)
  })
})
