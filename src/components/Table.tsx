import { useTranslation } from "react-i18next"
import { Issue } from "../const"
import Card from "./Card"
import Pagination from "./Pagination"
import Input from "./ui/Input"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { setReportDate } from "../slices/issuesSlice"
interface TableData {
    allIssues: Issue[],
    onIssueClick: (id: number | null) => void
}

const Table = ({ allIssues, onIssueClick }: TableData) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const reportDate = useSelector((state: RootState) => state.issues.reportDate)

    const wrapperClass = "p-4 w-full overflow-x-auto"
    const tableClass = `hidden md:break-words md:border-l-4 md:border-l-accent
        md:text-[12px] md:grid md:w-max 
        md:grid-cols-[40px_120px_90px_90px_180px_180px_110px_100px_120px_120px_100px_100px] 
        md:bg-table-header/5 md:gap-2 md:p-4 md:font-bold 
        md:text-table-header md:uppercase md:border-b md:border-border-warm`

    return (
        <>
            <section>
                <div className="px-4 gap-3 flex md:justify-between items-center flex-col md:flex-row">
                    <Input
                        type='date'
                        labelText={t('reportDate')}
                        value={reportDate}
                        onChange={(e) => dispatch(setReportDate(e.target.value))}
                        wrapperExtraClass="flex-row items-center normal-case flex-nowrap"
                        className="w-auto" />
                    <Pagination currentPage={1} totalPages={5} itemsPerPage={10} />
                </div>
                <div className={wrapperClass}>
                    {/* шапка таблицы */}
                    <div className={tableClass}>
                        <div>{t('table.number')}</div>
                        <div>{t('table.inspection')}</div>
                        <div>{t('table.startInspectionDate')}</div>
                        <div>{t('table.endInspectionDate')}</div>
                        <div>{t('table.violation')}</div>
                        <div>{t('table.recommendation')}</div>
                        <div>{t('table.status')}</div>
                        <div>{t('table.riskLevel')}</div>
                        <div>{t('table.responsibleDepartment')}</div>
                        <div>{t('table.responsiblePerson')}</div>
                        <div>{t('table.scheduledDate')}</div>
                        <div>{t('table.executionDate')}</div>
                    </div>
                    {allIssues.map((issue) => {
                        return <Card key={issue.id} issue={issue} onIssueClick={onIssueClick} />
                    })}
                </div>
            </section>
        </>
    )
}
export default Table