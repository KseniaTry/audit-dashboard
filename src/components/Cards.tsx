import { mockIssues } from "../mockData"
import { useTranslation } from "react-i18next"

const Cards = () => {
    const { t } = useTranslation()

    return (
        mockIssues.map((issue) => {
            return <div className='hidden break-words md:grid w-max grid-cols-[40px_120px_180px_180px_100px_100px_120px_120px_100px_100px] p-4 text-gray-700 border-b border-gray-200 text-sm'>
                <div className="px-1 text-gray-400">{issue.id}</div>
                <div className="px-1">{issue.inspection}</div>
                <div className="px-1 text-xs">{issue.auditViolation}</div>
                <div className="px-1 text-xs">{issue.recommendation}</div>
                <div className="px-1">{t(`statuses.${issue.status}`)}</div>
                <div className="px-1">{t(`riskLevels.${issue.riskLevel}`)}</div>
                <div className="px-1">
                    {issue.responsibleUnit.map((unit) => {
                        return <div className="border border-gray-300 text-xs bg-[#F3F4F6] px-2 py-1 my-2 rounded">{unit}</div>
                    })} </div>
                <div className="px-1">
                    {issue.responsiblePerson.map((person) => {
                        return <div className="border border-gray-300 text-xs bg-[#F3F4F6] px-2 py-1 my-2 rounded">{person}</div>
                    })}
                </div>
                <div className="px-1">{issue.scheduledDate}</div>
                <div className="px-1">{issue.executionDate}</div>
            </div >
        })

    )
}

export default Cards