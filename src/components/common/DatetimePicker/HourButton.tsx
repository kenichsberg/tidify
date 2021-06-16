import { FC, useRef } from 'react'

type Props = {
  radialCoord: number
  polarAngle: number
  buttonRadius: number
  hour: string
  isSmaller?: boolean
  isSelected: boolean
  onClick: () => void
}

export const HourButton: FC<Props> = ({
  radialCoord,
  polarAngle,
  buttonRadius,
  hour,
  isSmaller = false,
  isSelected,
  onClick,
}) => {
  // for button
  const radian = (polarAngle * Math.PI) / 180
  const buttonX = Math.round(radialCoord * Math.cos(radian))
  const buttonY = -1 * Math.round(radialCoord * Math.sin(radian))

  const text = isSmaller ? ' text-md' : ' text-lg'
  const buttonColor = isSelected
    ? ' bg-bluegray-800 text-bluegray-100'
    : ' bg-opacity-0 hover:bg-opacity-100 hover:bg-bluegray-400 active:bg-bluegray-800 hover:text-bluegray-100'
  const textColor = isSmaller && !isSelected ? ' text-bluegray-500' : ''

  // for clock hand
  const w = 2
  const sign = getSign(polarAngle)
  const handX = sign.x * ((w / 2) * Math.sin(radian))
  const handY = sign.y * ((w / 2) * Math.cos(radian))

  const clockHandBorder = isSelected ? ` border-l-${w} border-bluegray-800` : ''
  const focus = isSelected
    ? ''
    : ` focus:border-l-${w} focus:border-bluegray-400`

  return (
    <div className="group">
      <div
        className={`absolute flex items-center justify-center rounded-full${buttonColor}${text}${textColor} top-1/2 left-1/2 transform origin-center`}
        style={{
          width: `${buttonRadius * 2}px`,
          height: `${buttonRadius * 2}px`,
          marginTop: `${-1 * buttonRadius}px`,
          marginLeft: `${-1 * buttonRadius}px`,
          transform: `translate(${buttonX}px, ${buttonY}px)`,
        }}
        onClick={() => onClick()}
      >
        {hour}
      </div>
      <div
        className={`absolute${clockHandBorder}${focus} top-1/2 left-1/2 w-1 h-48 transform origin-bottom-left`}
        style={{
          width: '10px',
          height: `${radialCoord - buttonRadius}px`,
          marginTop: `${buttonRadius}px`,
          transform: `translate(0px, ${-1 * radialCoord}px) rotate(${
            90 - polarAngle
          }deg) translate(${handX}px, ${handY}px)`,
        }}
      ></div>
    </div>
  )
}

const getSign = (angle: number) => {
  switch (true) {
    case 0 <= angle:
      return { x: -1, y: -1 }
    case -90 <= angle:
      return { x: 1, y: -1 }
    case -180 <= angle:
      return { x: 1, y: 1 }
    default:
      return { x: -1, y: 1 }
  }
}
