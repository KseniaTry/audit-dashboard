
import Table from './components/Table'
import Filters from './components/Filters'
import { mockIssues } from './mockData'

function App() {

  return (
    <>
    <Filters inspections={mockIssues} />
    <Table />
    </>
  )
}

export default App
