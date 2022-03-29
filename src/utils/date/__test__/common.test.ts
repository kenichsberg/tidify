//import { render, fireEvent } from 'test/testUtils'
import {
  isSameDay,
  getNextDate,
  getMinDate,
  getMaxDate,
  diffDate,
  getMonthsBetween,
  getYearsBetween,
  getOptimalDateDiffUnit,
} from '@/utils/date'

describe('utils/date/common', () => {
  describe('isSameDay', () => {
    it('same', () => {
      const dateA = new Date('2021-01-01')
      const dateB = new Date('2021-01-01')
      expect(isSameDay(dateA, dateB)).toBe(true)
    })
    it('same', () => {
      const dateA = new Date('2021-01-01')
      const dateB = new Date('2021-01-02')
      expect(isSameDay(dateA, dateB)).toBe(false)
    })
  })

  describe('getNextDate', () => {
    it('gives next date', () => {
      const dateA = new Date('2020-12-31')
      const dateB = new Date('2021-01-01')
      expect(getNextDate(dateA)).toEqual(dateB)
    })
  })

  describe('getMinDate', () => {
    it('gives min date', () => {
      const dates = [
        new Date('2020-11-01'),
        new Date('2020-11-02'),
        new Date('2020-11-03'),
        new Date('2020-11-04'),
        new Date('2020-11-05'),
      ]
      const minDate = getMinDate(dates)
      expect(minDate).toEqual(new Date('2020-11-01'))
    })
  })

  describe('getMaxDate', () => {
    it('gives max date', () => {
      const dates = [
        new Date('2020-11-01'),
        new Date('2020-11-02'),
        new Date('2020-11-03'),
        new Date('2020-11-04'),
        new Date('2020-11-05'),
      ]
      const maxDate = getMaxDate(dates)
      expect(maxDate).toEqual(new Date('2020-11-05'))
    })
  })

  describe('diffDate', () => {
    it('msec', () => {
      const dateA = new Date('2020-12-31 00:00:00')
      const dateB = new Date('2021-01-02 00:00:00')
      const diff = diffDate(dateA, dateB)
      expect(diff).toBe(2 * 24 * 60 * 60 * 1000)
    })

    it('week', () => {
      const dateA = new Date('2020-12-31 00:00:00')
      const dateB = new Date('2021-01-14 00:00:00')
      const diff = diffDate(dateA, dateB, 'week')
      expect(diff).toBe(2)
    })
  })

  describe('monthBetween', () => {
    it('b < a', () => {
      const dateA = new Date('2022-04-14 00:00:00')
      const dateB = new Date('2022-02-14 00:00:00')
      const diff = getMonthsBetween(dateA, dateB)
      expect(diff === -2).toBeTruthy()
    })
  })

  describe('yearBetween', () => {
    it('a < b', () => {
      const dateA = new Date('2020-04-14 00:00:00')
      const dateB = new Date('2022-03-14 00:00:00')
      const diff = getYearsBetween(dateA, dateB)
      expect(diff === 1).toBeTruthy()
    })
    it('b < a', () => {
      const dateA = new Date('2022-04-14 00:00:00')
      const dateB = new Date('2022-03-14 00:00:00')
      const diff = getYearsBetween(dateA, dateB)
      expect(diff === 0).toBeTruthy()
    })
    it('b < a', () => {
      const dateA = new Date('2022-04-14 00:00:00')
      const dateB = new Date('2020-03-14 00:00:00')
      const diff = getYearsBetween(dateA, dateB)
      expect(diff === -2).toBeTruthy()
    })
  })
})
