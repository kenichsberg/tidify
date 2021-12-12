import { FC, useRef } from 'react'

type Props = {
  radialCoord: number
  polarAngle: number
  _buttonRadius: number
  minute: string
  isSmaller?: boolean
  isSelected: boolean
  onClick: () => void
}

export const MinuteButton: FC<Props> = ({
  radialCoord,
  polarAngle,
  _buttonRadius,
  minute,
  isSmaller = false,
  isSelected,
  onClick,
}) => {
  // for button
  const buttonRadius = isSmaller ? _buttonRadius * 0.5 : _buttonRadius
  const radian = (polarAngle * Math.PI) / 180
  const buttonX = Math.round(radialCoord * Math.cos(radian))
  const buttonY = -1 * Math.round(radialCoord * Math.sin(radian))

  const fontSize = isSmaller ? ' text-xs' : ' text-md'
  const buttonColor = isSelected
    ? ' bg-bluegray-800 text-bluegray-100'
    : ' hover:bg-bluegray-400 active:bg-bluegray-800'
  /*
  const textColor =
    isSmaller && !isSelected
      ? ' text-bluegray-100 text-opacity-0 hover:text-bluegray-100'
      : ' '
*/
  const getTextColor = (isSmaller: boolean, isSelected: boolean) => {
    switch (true) {
      case isSelected:
        return ''
      case isSmaller:
        return ' text-bluegray-100 text-opacity-0 hover:text-bluegray-100'
      default:
        return ' text-bluegray-800 hover:text-bluegray-100'
    }
  }

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
        className={`group absolute flex items-center justify-center rounded-full${buttonColor}${fontSize}${getTextColor(
          isSmaller,
          isSelected
        )} top-1/2 left-1/2 transform origin-center`}
        style={{
          width: `${buttonRadius * 2}px`,
          height: `${buttonRadius * 2}px`,
          marginTop: `${-1 * buttonRadius}px`,
          marginLeft: `${-1 * buttonRadius}px`,
          transform: `translate(${buttonX}px, ${buttonY}px)`,
        }}
        onClick={() => onClick()}
      >
        {
          //isSmaller ? '' : minute
        }
        {minute}
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
