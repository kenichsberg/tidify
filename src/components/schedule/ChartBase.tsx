import { useCache } from '@/hooks/index'
import { RoundRect } from '@/components/schedule'

export function ChartBase(): JSX.Element {
  const { data: _ganttFieldWidth } = useCache<number>('ganttFieldWidth')
  const { data: _columnWidth } = useCache<number>('columnWidth')
  const { data: _chartHeight } = useCache<number>('chartHeight')

  const ganttFieldWidth = _ganttFieldWidth ?? 0
  const chartHeight = _chartHeight ?? 0

  return (
    <g>
      <RoundRect
        className="fill-gray-50"
        isRoundCorners={{
          leftTop: false,
          leftBottom: false,
          rightTop: true,
          rightBottom: true,
        }}
        rectProps={{
          x: 0,
          y: 0,
          width: ganttFieldWidth ?? 0,
          height: chartHeight ?? 0,
          radius: 20,
        }}
      />
    </g>
  )
}
