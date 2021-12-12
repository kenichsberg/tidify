import { FC, MutableRefObject } from 'react'
import { MinuteButton, Datetime } from './'

type Props = {
  date: Date | undefined
  datetimeRef: MutableRefObject<Datetime>
  setNextPage: () => void
}

export const ClockMinute: FC<Props> = ({ date, datetimeRef, setNextPage }) => {
  const selectedMinute = date?.getMinutes()
  const getOnClick = (minute: number) => () => {
    datetimeRef.current.minute = minute
    setNextPage()
  }
  return (
    <>
      <div className="relative w-80 h-80 rounded-full bg-bluegray-300">
        {minutes.map((minute, index) => (
          <MinuteButton
            key={minute}
            radialCoord={120}
            polarAngle={90 - index * (360 / minutes.length)}
            _buttonRadius={20}
            minute={minute}
            isSmaller={index % 5 !== 0}
            isSelected={+minute === selectedMinute}
            onClick={getOnClick(+minute)}
          />
        ))}
      </div>
    </>
  )
}

const minutes = [...Array(60)].map((_, index) => {
  if (index === 0) return '00'
  return '' + index
})
