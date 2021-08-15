type DataType = 'projects' | 'tasks'
type Props = {
  dataType: DataType
}

export function NoData({ dataType }: Props): JSX.Element {
  return <div className="font-mono">There is no {dataType}.</div>
}
