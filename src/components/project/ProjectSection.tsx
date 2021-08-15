import { useState } from 'react'
import {
  GridView,
  ChartView,
  ProjectFormModal,
  ProjectForm,
} from 'components/project'
import { Plus, Grid, Calendar } from 'react-feather'

import { ProjectSchema } from 'schema/model/types'

type View = 'grid' | 'chart'

type Props = {
  projects: ProjectSchema[]
}

export function ProjectSection({ projects }: Props): JSX.Element {
  const [view, setView] = useState<View>('grid')
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <section className="h-full bg-gray-100 rounded-3xl overflow-auto px-2 sm:px-4 py-8 lg:py-6">
      <div className="flex flex-row justify-stretch items-center mt-1 mb-7">
        <h2 className="flex-grow font-mono text-2xl font-bold text-bluegray-500 ml-4">
          Projects
        </h2>
        <div className="w-48 h-10 rounded-full bg-bluegray-200 text-bluegray-400 flex flex-row p-1">
          <label title="Grid View" className="relative flex-1 cursor-pointer">
            <input
              id="grid-view"
              type="radio"
              name="view-toggle-switch"
              value="grid"
              className="appearance-none"
              defaultChecked={true}
              onChange={() => setView('grid')}
            />
            <span className="absolute left-0 top-0 w-full h-full rounded-full checked-sibling:bg-bluegray-800 checked-sibling:text-bluegray-200 flex flex-col items-center">
              <Grid className="flex-grow" size={20} />
            </span>
          </label>
          <label title="Chart View" className="relative flex-1 cursor-pointer">
            <input
              id="chart-view"
              type="radio"
              name="view-toggle-switch"
              value="chart"
              className="appearance-none"
              defaultChecked={false}
              onChange={() => setView('chart')}
            />
            <span className="absolute left-0 top-0 w-full h-full rounded-full checked-sibling:bg-bluegray-800 checked-sibling:text-bluegray-200 flex flex-col items-center">
              <Calendar className="flex-grow" size={20} />
            </span>
          </label>
        </div>
      </div>
      {getView(view, projects)}
      <button
        type="button"
        title="Create New Project"
        className="z-10 fixed right-6 lg:right-2/5 lg:transform lg:-translate-x-1/2 xl:translate-x-0 bottom-6 lg:bottom-10 flex-shrink-0 rounded-full h-16 w-16 flex items-center justify-center bg-cyan-500 text-bluegray-100 hover:bg-cyan-400 hover:text-bluegray-200 focus:outline-none"
        onClick={() => setShowModal(true)}
      >
        <Plus size={32} />
      </button>
      <ProjectFormModal
        show={showModal}
        setShow={setShowModal}
        title="Create New Project"
      >
        <ProjectForm project={null} />
      </ProjectFormModal>
    </section>
  )
}

function getView(view: View, projects: ProjectSchema[]) {
  switch (view) {
    case 'grid':
      return <GridView projects={projects} />
    case 'chart':
      return <ChartView projects={projects} />
    default:
      throw new Error('view not found')
  }
}
