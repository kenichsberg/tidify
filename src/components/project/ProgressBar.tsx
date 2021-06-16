import { FC } from 'react'

type Props = {
  percent: number | undefined
  className?: string
}

export const ProgressBar: FC<Props> = ({ percent, className }) => (
  <div
    className={`overflow-hidden h-2 flex rounded${getBgColor(percent)}${
      className === undefined ? '' : ' ' + className
    }`}
  >
    {percent !== undefined ? (
      <div
        style={{ width: `${percent}%` }}
        className={`${getFilledColor(percent)}`}
      ></div>
    ) : null}
  </div>
)

const thresholdLow = 15
const thresholdMiddle = 30
const thresholdHigh = 70

const getBgColor = (percent: number | undefined) => {
  if (percent === undefined) {
    return ' bg-gray-200'
  }
  switch (true) {
    case percent < thresholdLow:
      return ' bg-rose-200'
    case percent < thresholdMiddle:
      return ' bg-orange-200'
    case percent < thresholdHigh:
      return ' bg-lightblue-200'
    default:
      return ' bg-emerald-200'
  }
}

const getFilledColor = (percent: number | undefined) => {
  if (percent === undefined) {
    return ''
  }
  switch (true) {
    case percent < thresholdLow:
      return ' bg-rose-500'
    case percent < thresholdMiddle:
      return ' bg-orange-500'
    case percent < thresholdHigh:
      return ' bg-lightblue-500'
    default:
      return ' bg-emerald-500'
  }
}
