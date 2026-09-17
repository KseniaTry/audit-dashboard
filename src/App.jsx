
import Table from './components/Table'
import Filters from './components/Filters'
import { mockIssues, RISK_LEVELS, STATUSES } from './mockData'
import Analytics from './components/Analytics'

function App() {

  return (
    <>
    <Analytics riskLevels={RISK_LEVELS} statuses={STATUSES} years={[2023, 2024, 2025, 2026]} />
    <Filters inspections={mockIssues} />
    <Table />
    </>
  )
}

export default App
