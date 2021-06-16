import { getManHour } from 'utils/date'

describe('getManHour', () => {
  it('in working hour', () => {
    const start = new Date('2021-04-15T00:00:00.000Z')
    const end = new Date('2021-04-15T09:00:00.000Z')
    const manHour = getManHour(start, end)
    expect(manHour).toBe(8)
  })
  it('out of working hour', () => {
    const start = new Date('2021-04-15T20:00:00.000Z')
    const end = new Date('2021-04-15T23:00:00.000Z')
    const manHour = getManHour(start, end)
    expect(manHour).toBe(0)
  })
  it('in and out', () => {
    const start = new Date('2021-04-15T08:00:00.000Z')
    const end = new Date('2021-04-15T10:00:00.000Z')
    const manHour = getManHour(start, end)
    expect(manHour).toBe(1)
  })
  it('from lunch time', () => {
    const start = new Date('2021-04-15T03:45:00.000Z')
    const end = new Date('2021-04-15T04:15:00.000Z')
    const manHour = getManHour(start, end)
    expect(manHour).toBe(0.25)
  })
  it('in and out 2 days', () => {
    const start = new Date('2021-04-15T08:00:00.000Z')
    const end = new Date('2021-04-16T01:00:00.000Z')
    const manHour = getManHour(start, end)
    expect(manHour).toBe(2)
  })
})
