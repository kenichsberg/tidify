import { useState } from 'react'
import { Plus, Grid, Calendar } from 'react-feather'

import { GridView, ChartView, ProjectFormModal } from '@/components/project'
import { useProjectModal } from '@/contexts/project'

type View = 'grid' | 'chart'

export function ProjectSection(): JSX.Element {
  const { state: modalState, dispatch: dispatchModalState } = useProjectModal()
  if (!modalState || !dispatchModalState) {
    throw new Error('context value undefined')
  }

  const [view, setView] = useState<View>('grid')

  const setClose = () => dispatchModalState({ type: 'close' })

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
      {getView(view)}
      <button
        type="button"
        title="Create New Project"
        className="z-10 fixed right-10 lg:right-2/5 lg:transform lg:-translate-x-1/2 xl:translate-x-0 bottom-10 lg:bottom-20 flex-shrink-0 rounded-full shadow-xl h-20 w-20 flex items-center justify-center bg-cyan-500 bg-opacity-90 text-bluegray-100 hover:bg-cyan-400 hover:text-bluegray-200 focus:outline-none"
        onClick={() => dispatchModalState({ type: 'open', data: null })}
      >
        <Plus size={32} />
      </button>
      <ProjectFormModal
        //project={null}
        show={modalState.showModal}
        setClose={setClose}
      />
    </section>
  )
}

function getView(view: View) {
  switch (view) {
    case 'grid':
      return <GridView />
    case 'chart':
      return <ChartView />
    default:
      throw new Error(`view ${view} not found`)
  }
}
