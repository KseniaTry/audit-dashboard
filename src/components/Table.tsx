
import Cards from "./Cards"
import { useTranslation } from "react-i18next"

const Table = () => {
    const { t } = useTranslation()
    const wrapperClass = "p-4 w-full overflow-x-auto bg-gray-50"
    const tableClass = `hidden md:break-words md:border-l-4 md:border-l-[#1E40AF]
        md:text-[12px] md:grid md:w-max 
        md:grid-cols-[40px_120px_90px_90px_180px_180px_110px_100px_120px_120px_100px_100px] 
        md:bg-gray-100 md:gap-2 md:p-4 md:font-bold 
        md:text-gray-700 md:uppercase md:border-b md:border-gray-200`

    return (
        <>
            <section>
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
                    <Cards />
                </div>
            </section>
        </>
    )
}
export default Table