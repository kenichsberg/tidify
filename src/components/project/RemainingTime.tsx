import { FC } from 'react'

type Props = {
  remainingHours: number | undefined
  className?: string
}

export const RemainingTime: FC<Props> = ({ remainingHours, className }) => (
  <div
    className={`rounded-full${getFilledColor(
      remainingHours
    )} text-xs${getTextColor(remainingHours)} p-3 ${
      className ? ' ' + className : ''
    }`}
  >
    {getDisplayStr(remainingHours)}
  </div>
)

const remainingNone = 0
const remainingLittle = 24 * 3
const remainingMuch = 24 * 7

const getFilledColor = (hours: number | undefined) => {
  if (hours === undefined) {
    return ' bg-gray-200'
  }
  switch (true) {
    case hours < remainingNone:
      return ' bg-rose-100'
    case hours < remainingLittle:
      return ' bg-orange-100'
    case hours < remainingMuch:
      return ' bg-lightblue-100'
    default:
      return ' bg-emerald-100'
  }
}

const getTextColor = (hours: number | undefined) => {
  if (hours === undefined) {
    return ' text-gray-400'
  }
  switch (true) {
    case hours < remainingNone:
      return ' text-rose-400'
    case hours < remainingLittle:
      return ' text-orange-400'
    case hours < remainingMuch:
      return ' text-lightblue-400'
    default:
      return ' text-emerald-400'
  }
}

const getDisplayStr = (hours: number | undefined) => {
  if (hours === undefined) {
    return '----'
  } else if (hours < remainingNone) {
    return getTimeStr(Math.abs(hours)) + ' over'
  } else {
    return getTimeStr(hours) + ' left'
  }
}

const getTimeStr = (hours: number) => {
  switch (true) {
    case hours < 24:
      return `${Math.trunc(hours)} hours`
    case hours < 48:
      return '1 day'
    default:
      return `${Math.trunc(hours / 24)} days`
  }
}
