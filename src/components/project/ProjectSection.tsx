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

  const viewWidth =
    view === 'grid' ? ' lg:w-[97%] xl:w-[98%]' : 'lg:w-[163%] 2xl:w-[164%]'
  return (
    <section
      className={`w-full h-full bg-gradient-to-b from-bluegray-50 to-bluegray-100 rounded-[60px] overflow-auto px-4 lg:px-10 py-10 transition-[width,z-index,box-shadow] duration-[.5s,2s,.25s] ease-out z-[2] shadow lg:absolute lg:z-[5] lg:hover:shadow-2xl ${viewWidth}`}
    >
      <div className="flex flex-row justify-stretch items-center mt-1 mb-7">
        <h2
          id="projectSectionLabel"
          className="flex-grow font-mono text-2xl font-bold text-bluegray-500 ml-4"
        >
          Projects
        </h2>
        <div className="absolute right-[20px] sm:left-[200px] lg:fixed lg:left-3/5 lg:z-[10] lg:-translate-x-[250px] group w-36 sm:w-48 h-10 bg-gradient-to-br from-bluegray-100/90 to-bluegray-200 rounded-full shadow">
          <div className="relative">
            <input
              id="toggleView"
              type="checkbox"
              name="view-toggle-switch"
              value="grid"
              className="peer absolute inline-block appearance-none"
              aria-labelledby="projectSectionLabel"
              defaultChecked={false}
              onChange={() => setView(view === 'grid' ? 'chart' : 'grid')}
            />
            <label
              htmlFor="toggleView"
              className="absolute w-full h-full rounded-full text-bluegray-200 cursor-pointer peer-checked:text-bluegray-600 before:absolute before:top-1 before:left-4 before:w-[56px] before:sm:w-20 before:h-8 before:bg-gradient-to-br before:from-bluegray-700 before:to-bluegray-900 before:rounded-full before:transition before:duration-500 before:peer-checked:translate-x-[56px] before:sm:peer-checked:translate-x-[80px]" /* after:absolute after:top-2 after:right-3 after:w-20 after:h-8 after:content-[''] after:bg-transparent after:rounded-full after:text-bluegray-600 after:transition after:peer-checked:text-bluegray-200 after:cursor-pointer"*/
            >
              <span className="hidden">toggle view</span>
              <span className="absolute w-1/2 top-[5px] left-2 text-center transition">
                <Grid className="inline" size={20} />
              </span>
            </label>
            <label
              htmlFor="toggleView"
              className="absolute right-0 w-1/2 rounded-full text-bluegray-600 peer-checked:text-bluegray-200"
            >
              <span className="absolute w-full h-[70%] top-[5px] right-2 text-center transition curor-pointer">
                <Calendar className="inline cursor-pointer" size={20} />
              </span>
            </label>
          </div>
        </div>
      </div>
      {getView(view)}
      <button
        type="button"
        title="Create New Project"
        className="z-[20] fixed right-10 lg:right-2/5 lg:-translate-x-1/2 xl:translate-x-0 bottom-10 lg:bottom-20 flex-shrink-0 rounded-full shadow-xl h-20 w-20 flex items-center justify-center bg-cyan-500 bg-opacity-90 text-bluegray-100 transition focus:outline-none hover:bg-cyan-400 hover:text-bluegray-200 hover:shadow-2xl hover:-translate-y-1 hover:scale-[103%] active:shadow-lg active:translate-y-2 active:scale-[97%] active:bg-cyan-600 active:text-bluegray-100"
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
