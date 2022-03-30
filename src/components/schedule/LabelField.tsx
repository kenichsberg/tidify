import { LabelRow, RoundRect } from '@/components/schedule'
import { useCache } from '@/hooks/index'
import { useProjects } from '@/contexts/project'

export function LabelField(): JSX.Element {
  const { state: projects } = useProjects()
  if (!projects) throw new Error('context value undefined')

  const { data: _chartHeight } = useCache<number>('chartHeight')

  const chartHeight = _chartHeight ?? 0

  return (
    <svg width={LABEL_FIELD_WIDTH} height={chartHeight}>
      <g>
        <RoundRect
          className="fill-gray-50"
          isRoundCorners={{
            leftTop: true,
            leftBottom: true,
            rightTop: false,
            rightBottom: false,
          }}
          rectProps={{
            x: 0,
            y: 0,
            width: LABEL_FIELD_WIDTH,
            height: chartHeight,
            radius: 20,
          }}
        />
      </g>
      {projects.map((project, index, array) => {
        const previousRowsCount = array
          .slice(0, index)
          .reduce<number>((acc, current) => acc + current.tasks.length, 0)
        return (
          <LabelRow
            tasks={project.tasks}
            projectName={project.name}
            previousRowsCount={previousRowsCount}
          />
        )
      })}
      <g>
        <RoundRect
          className="stroke-gray-200"
          isRoundCorners={{
            leftTop: true,
            leftBottom: true,
            rightTop: false,
            rightBottom: false,
          }}
          rectProps={{
            x: 0,
            y: 0,
            width: LABEL_FIELD_WIDTH,
            height: chartHeight,
            radius: 20,
          }}
          fillOpacity="0%"
        />
      </g>
    </svg>
  )
}

const LABEL_FIELD_WIDTH = 250
