interface IsRoundCorners {
  leftTop: boolean
  leftBottom: boolean
  rightTop: boolean
  rightBottom: boolean
}
interface RectProps {
  x: number
  y: number
  width: number
  height: number
  radius: number
}

type Props = {
  className?: string
  isRoundCorners: IsRoundCorners
  rectProps: RectProps
  fillOpacity?: string
}

export function RoundRect({
  className = '',
  isRoundCorners,
  rectProps,
  fillOpacity = '100%',
}: Props): JSX.Element {
  return (
    <path
      className={className}
      d={getRectPathString(isRoundCorners, rectProps)}
      fillOpacity={fillOpacity}
    ></path>
  )
}

// Create path of a corner of rect in order,
// from left-top counterclockwise
function getRectPathString(
  isRoundCorners: IsRoundCorners,
  rectProps: RectProps
): string {
  const leftTopCorner = isRoundCorners.leftTop
    ? ` M ${rectProps.x + rectProps.radius} ${rectProps.y}` +
      ` q -${rectProps.radius} 0 -${rectProps.radius} ${rectProps.radius}` +
      ` v ${rectProps.height - rectProps.radius * 2}`
    : ` M ${rectProps.x + rectProps.radius} ${rectProps.y}` +
      ` h -${rectProps.radius}` +
      ` v ${rectProps.height - rectProps.radius}`

  const leftBottomCorner = isRoundCorners.leftBottom
    ? ` q 0 ${rectProps.radius} ${rectProps.radius} ${rectProps.radius}` +
      ` h ${rectProps.width - rectProps.radius * 2}`
    : ` v ${rectProps.radius}` + ` h ${rectProps.width - rectProps.radius}`

  const rightBottomCorner = isRoundCorners.rightBottom
    ? ` q ${rectProps.radius} 0 ${rectProps.radius} -${rectProps.radius}` +
      ` v ${-1 * (rectProps.height - rectProps.radius * 2)}`
    : ` h ${rectProps.radius}` +
      ` v ${-1 * (rectProps.height - rectProps.radius)}`

  const rightTopCorner = isRoundCorners.rightTop
    ? ` q 0 -${rectProps.radius} -${rectProps.radius} -${rectProps.radius}` +
      ` h -${rectProps.width - rectProps.radius * 2}` +
      ' Z'
    : ` v -${rectProps.radius}` +
      ` h -${rectProps.width - rectProps.radius}` +
      ' Z'

  return leftTopCorner + leftBottomCorner + rightBottomCorner + rightTopCorner
}
