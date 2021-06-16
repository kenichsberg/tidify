import { getGrossDays } from 'utils/date'

describe('utils/date/', () => {
  it('3 weekdays + 1 weekend', () => {
    const start = new Date('2021-04-14T00:00:00.000Z')
    const end = new Date('2021-04-17T09:00:00.000Z')
    const grossDays = getGrossDays(start, end)
    expect(grossDays).toBe(4)
  })
  it('test', () => {
    const start = new Date('2021-04-06T12:10:00.000Z')
    const end = new Date('2021-04-11T05:00:00.000Z')
    const grossDays = getGrossDays(start, end)
    expect(grossDays).toBe(4.5)
  })
})
