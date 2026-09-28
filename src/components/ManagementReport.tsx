import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import { Statuses } from "../mockData"

interface ManagementReportData {
    statuses: Statuses[]
}

const ManagementReport = ({ statuses }: ManagementReportData) => {
    const { t } = useTranslation()

    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const borderClass = "border border-border-warm bg-light p-1"
    const titleClass = "tracking-widest uppercase text-[14px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"
    const countBaseClass = "text-[17px] font-bold"
    const countClass = {
        open: "text-status-open ",
        closed: "text-status-closed",
        removed: "text-text-main",
        overdue: "text-status-overdue"
    }

    return (
        <div className="flex flex-col flex-wrap p-5 gap-4">
            <p className="tracking-wide">{t('managementReport.text', { reportDate: '01.01.2026' })}</p>

            <div className={twMerge(wrapperClass, 'w-auto')}>
                <label className={titleClass} htmlFor="report-date">{t('reportDate')}</label>
                <input className={inputClass} id='report-date' name='report-date' type='date' required></input>
            </div>

            <div className={borderClass}>
                <h2 className={twMerge(titleClass, 'p-1 my-2')}>Предпросмотр статистики</h2>
                <ul>
                    <li className="flex justify-between items-center bg-field-bg p-4 border border-border-warm tracking-wide">
                        <p>Всего рекомендаций:</p>
                        <p className={countBaseClass}>19</p>
                    </li>
                    {statuses.map((status) => {
                        return (
                            <li key={status} className="flex justify-between items-center bg-field-bg p-4 border border-border-warm tracking-wide">
                                <p>{t(`statuses.${status}`)}:</p>
                                <p className={twMerge(countBaseClass, countClass[status])}>9</p>
                            </li>
                        )
                    })}
                    <li className="flex justify-between items-center bg-field-bg p-4 border border-border-warm tracking-wide">
                        <p>Процент исполнения:</p>
                        <p className={countBaseClass}>45%</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ManagementReport