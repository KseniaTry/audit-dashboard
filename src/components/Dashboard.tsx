import Table from './Table'
import Filters from './Filters'
import { mockIssues, RISK_LEVELS, STATUSES } from '../mockData'
import Analytics from './Analytics'
import Header from './Header'

const Dashboard = () => {

    return (
        <>
            <Header />
            <Analytics riskLevels={RISK_LEVELS} statuses={STATUSES} years={[2023, 2024, 2025, 2026]} />
            <Filters inspections={mockIssues} />
            <Table />
        </>
    )
}

export default Dashboard