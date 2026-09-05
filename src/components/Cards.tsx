import { mockIssues } from "../mockData"

const Cards = () => {

    return (
        mockIssues.map((issue) => {
            return <div className='hidden md:grid w-max grid-cols-[80px_180px_120px_120px_120px_120px_120px_120px_120px] p-4 text-gray-700 border-b border-gray-200 text-sm'>
                <div>{issue.id}</div>
                <div>{issue.inspection}</div>
                <div>{issue.auditViolation}</div>
                <div>{issue.recommendation}</div>
                <div>{issue.status}</div>
                <div>{issue.riskLevel}</div>
                <div>{issue.responsibleUnit}</div>
                <div>{issue.responsiblePerson}</div>
                <div>{issue.scheduledDate}</div>
                <div>{issue.executionDate}</div>
            </div>
        })

    )
}

export default Cards