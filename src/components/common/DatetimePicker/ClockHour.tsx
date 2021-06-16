import { FC, MutableRefObject } from 'react'
import { HourButton, Datetime } from './'

type Props = {
  date: Date | undefined
  datetimeRef: MutableRefObject<Datetime>
  setNextPage: () => void
}

export const ClockHour: FC<Props> = ({ date, datetimeRef, setNextPage }) => {
  const selectedHour = date?.getHours()
  const getOnClick = (hour: number) => () => {
    datetimeRef.current.hour = hour
    setNextPage()
  }
  return (
    <>
      <div className="relative w-80 h-80 rounded-full bg-bluegray-300">
        {amHours.map((hour, index) => (
          <HourButton
            key={hour}
            radialCoord={120}
            polarAngle={90 - index * (360 / amHours.length)}
            buttonRadius={27}
            hour={hour}
            isSelected={+hour === selectedHour}
            onClick={getOnClick(+hour)}
          />
        ))}
        {pmHours.map((hour, index) => (
          <HourButton
            key={hour}
            radialCoord={80}
            polarAngle={90 - index * (360 / pmHours.length)}
            buttonRadius={22}
            hour={hour}
            isSmaller={true}
            isSelected={+hour === selectedHour}
            onClick={getOnClick(+hour)}
          />
        ))}
      </div>
    </>
  )
}

const amHours = [...Array(12)].map((_, index) => {
  if (index === 0) return '12'
  return '' + index
})

const pmHours = [...Array(12)].map((_, index) => {
  if (index === 0) return '00'
  return '' + (index + 12)
})
