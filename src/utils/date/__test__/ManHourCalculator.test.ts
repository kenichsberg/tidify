import { ManHourCalculator } from '@/utils/date'

describe('utils/date/', () => {
  it('endDatetime1', () => {
    const start = new Date('2022-02-14T00:00:00.000Z')
    const totalManHour = 15

    const calc = new ManHourCalculator()
    const projectEndDatetime = calc.getEndDatetimeByManHour(start, totalManHour)
    const expected = new Date('2022-02-15T17:00:00.000Z')

    expect(projectEndDatetime).toEqual(expected)
  })

  it('endDatetime2', () => {
    const start = new Date('2022-02-14T00:00:00.000Z')
    const totalManHour = 248

    const calc = new ManHourCalculator()
    const projectEndDatetime = calc.getEndDatetimeByManHour(start, totalManHour)
    const expected = new Date('2022-03-28T18:00:00.000Z')

    expect(projectEndDatetime).toEqual(expected)
  })

  it('manHour1', () => {
    const start = new Date('2022-02-14T19:00:00.000Z')
    const end = new Date('2022-02-22T08:00:00.000Z')

    const calc = new ManHourCalculator()
    const manHour = calc.getManHour(start, end)
    const expected = 40

    expect(manHour).toBe(expected)
  })

  it('manHour2', () => {
    const start = new Date('2022-02-14T11:00:00.000Z')
    const end = new Date('2022-02-15T02:00:00.000Z')

    const calc = new ManHourCalculator()
    const manHour = calc.getManHour(start, end)
    const expected = 6

    expect(manHour).toBe(expected)
  })
})
