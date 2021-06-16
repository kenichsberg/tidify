import { FC } from 'react'
import { useCache } from 'hooks/index'
import { RoundRect } from './'

type Props = {
  weekCount: number
  chartStartDate: Date
}

export const ChartColumn: FC<Props> = ({ weekCount, chartStartDate }) => {
  const { data: _columnWidth } = useCache<number>('columnWidth')
  const { data: _chartHeight } = useCache<number>('chartHeight')

  const chartHeight = _chartHeight ?? 0
  const columnWidth = _columnWidth ?? 0

  const totalDayCount = 7 * weekCount

  return (
    <g>
      {[...Array(totalDayCount).keys()].map((number) => {
        const date = new Date(chartStartDate.getTime())
        date.setDate(date.getDate() + number)

        const options = {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }
        const dateString = date.toLocaleString('en-us', options)
        const partialDates = dateString.split(',')
        const weekday = partialDates[0]
        const monthDay = partialDates[1]

        return (
          <g key={number}>
            <text
              className="fill-current text-gray-500"
              x={(columnWidth ?? 0) * number + WEEKDAY_TEXT_OFFSET_X}
              y={WEEKDAY_TEXT_OFFSET_Y}
              fill="#2a2f3c"
              fontSize="13px"
            >
              {weekday}
            </text>
            <text
              className="fill-current text-gray-500"
              x={columnWidth * number + MONTHDAY_TEXT_OFFSET_X}
              y={MONTH_DAY_TEXT_OFFSET_Y}
              fill="#2a2f3c"
              fontSize="13px"
            >
              {monthDay}
            </text>
            <RoundRect
              className="stroke-current text-gray-200"
              isRoundCorners={{
                leftTop: false,
                leftBottom: false,
                rightTop: number === totalDayCount - 1,
                rightBottom: number === totalDayCount - 1,
              }}
              rectProps={{
                x: columnWidth * number,
                y: 0,
                width: columnWidth,
                height: chartHeight,
                radius: 20,
              }}
              fillOpacity="0%"
            />
          </g>
        )
      })}
    </g>
  )
}

const WEEKDAY_TEXT_OFFSET_X = 20
const MONTHDAY_TEXT_OFFSET_X = 12
const WEEKDAY_TEXT_OFFSET_Y = 20
const MONTH_DAY_TEXT_OFFSET_Y = 40
