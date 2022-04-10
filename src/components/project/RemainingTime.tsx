import { FC } from 'react'

import { diffDate, getOptimalDateDiffUnit } from '@/utils/date'

type Props = {
  targetDate: Date | undefined
  className?: string
}

const REMAINING_NONE = 0
const REMAINING_LITTLE = 24 * 3
const REMAINING_MUCH = 24 * 7

export const RemainingTime: FC<Props> = ({ targetDate, className }) => (
  <div
    className={`rounded-full${getFilledColor(targetDate)} text-xs${getTextColor(
      targetDate
    )} p-3 ${className ? ' ' + className : ''}`}
  >
    {getDisplayStr(targetDate)}
  </div>
)

function getFilledColor(targetDate: Date | undefined) {
  const hours = getRemainingHours(targetDate)
  if (hours === undefined) {
    return ' bg-gray-200'
  }

  switch (true) {
    case hours === undefined:
    case hours < REMAINING_NONE:
      return ' bg-rose-100'
    case hours < REMAINING_LITTLE:
      return ' bg-orange-100'
    case hours < REMAINING_MUCH:
      return ' bg-sky-100'
    default:
      return ' bg-emerald-100'
  }
}

function getTextColor(targetDate: Date | undefined) {
  const hours = getRemainingHours(targetDate)
  if (hours === undefined) {
    return ' text-gray-600'
  }
  switch (true) {
    case hours < REMAINING_NONE:
      return ' text-rose-700'
    case hours < REMAINING_LITTLE:
      return ' text-orange-700'
    case hours < REMAINING_MUCH:
      return ' text-sky-700'
    default:
      return ' text-emerald-700'
  }
}

function getDisplayStr(targetDate: Date | undefined) {
  const hours = getRemainingHours(targetDate)

  if (targetDate === undefined || hours === undefined) {
    return '----'
  } else if (hours < REMAINING_NONE) {
    return getTimeStr(targetDate) + ' over'
  } else {
    return getTimeStr(targetDate) + ' left'
  }
}

function getTimeStr(targetDate: Date) {
  const now = new Date()
  const unit = getOptimalDateDiffUnit(targetDate, now)
  const diff = Math.abs(Math.trunc(diffDate(targetDate, now, unit)))
  const s = diff === 1 ? '' : 's'

  return `${diff} ${unit}${s}`
}

function getRemainingHours(endDate: Date | undefined): number | undefined {
  if (!endDate) return undefined

  const now = new Date()
  return diffDate(now, endDate, 'hour')
}
