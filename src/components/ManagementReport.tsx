import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import { Statuses } from "../mockData"
import Input from "./ui/Input"

interface ManagementReportData {
    statuses: Statuses[]
}

const ManagementReport = ({ statuses }: ManagementReportData) => {
    const { t } = useTranslation()

    const countBaseClass = "text-[17px] font-bold"
    const listItemClass = "flex justify-between items-center bg-field-bg p-4 border border-border-warm tracking-wide"
    const countClass = {
        open: "text-status-open ",
        closed: "text-status-closed",
        removed: "text-text-main",
        overdue: "text-status-overdue"
    }

    return (
        <div className="flex flex-col flex-wrap p-5 gap-4">
            <p className="tracking-wide">{t('managementReport.text', { reportDate: '01.01.2026' })}</p>

            <Input
                type={'date'}
                labelText={t('reportDate')}
                id={'report-date'}
                wrapperExtraClass={'w-auto'}
                required={true} />

            <div className="border border-border-warm bg-light p-1">
                <h2 className="tracking-widest uppercase text-[14px] p-1 my-2">Предпросмотр статистики</h2>
                <ul>
                    <li className={listItemClass}>
                        <p>Всего рекомендаций:</p>
                        <p className={countBaseClass}>19</p>
                    </li>
                    {statuses.map((status) => {
                        return (
                            <li key={status} className={listItemClass}>
                                <p>{t(`statuses.${status}`)}:</p>
                                <p className={twMerge(countBaseClass, countClass[status])}>9</p>
                            </li>
                        )
                    })}
                    <li className={listItemClass}>
                        <p>Процент исполнения:</p>
                        <p className={countBaseClass}>45%</p>
                    </li>
                </ul>
            </div >
        </div >
    )
}

export default ManagementReport