import { useTranslation } from "react-i18next"
import { Issue } from "../types"
import Card from "./Card"
import Pagination from "./Pagination"
import Input from "./ui/Input"
import Button from "./ui/Button"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store"
import { setReportDate } from "../slices/issuesSlice"

interface TableData {
    issues: Issue[] | Issue[][],
    onIssueClick: (id: number | null) => void,
    onShowMoreClick: () => void,
    onPaginationClick: (page: number) => void,
    currentPage: number,
    totalPages: number
}

const Table = ({ issues, onIssueClick, onPaginationClick, onShowMoreClick, currentPage, totalPages }: TableData) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const reportDate = useSelector((state: RootState) => state.issues.reportDate)

    const tableClass = `hidden md:break-words md:border-l-4 md:border-l-accent
        md:text-[12px] md:grid md:w-max 
        md:grid-cols-[40px_120px_90px_90px_180px_180px_110px_100px_120px_120px_100px_100px] 
        md:bg-table-header/5 md:gap-2 md:p-4 md:font-bold 
        md:text-table-header md:uppercase md:border-b md:border-border-warm`

    return (
        <>
            <section>
                <div className="px-4 items-start gap-3 flex md:justify-between md:items-center flex-col md:flex-row">
                    <div className="flex flex-wrap items-center w-full gap-2 md:justify-start md:gap-5 md:justify-between">
                        <Input
                            type='date'
                            labelText={t('reportDate')}
                            value={reportDate}
                            onChange={(e) => dispatch(setReportDate(e.target.value))}
                            wrapperExtraClass="flex-row items-center normal-case flex-nowrap"
                            className="w-auto" />
                        <p className="normal-case tracking-widest text-[14px]">{t('totalIssues')}
                            <span className="font-semibold">{issues.length}</span>
                        </p>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onButtonClick={onPaginationClick} />
                </div>
                <div className='p-4 pb-0 w-full md:overflow-x-auto flex flex-col gap-[15px] md:block'>
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
                    {issues && issues[currentPage - 1] ?
                        issues[currentPage - 1].map((issue) => (<Card key={issue.id} issue={issue} onIssueClick={onIssueClick} />)) :
                        'Loading'}
                </div>
                <Button
                    type='button'
                    onClick={onShowMoreClick}
                    className="md:hidden mx-auto my-5"
                    disabled={currentPage === totalPages}>
                    {t('showMore')}
                </Button>
            </section>
        </>
    )
}
export default Table