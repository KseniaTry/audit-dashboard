import { mockIssues } from "../mockData"
import { useTranslation } from "react-i18next"

const Cards = () => {
    const { t } = useTranslation()

    const cardsClass = `
            grid grid-cols-4 gap-[10px] text-[10px] p-[15px] mb-[15px] my-[5px] w-full mx-auto bg-[#FFFFFF] 
            border border-[#EAE9E2] shadow-sm break-words border-l-4 border-l-[#1E40AF]
            md:grid-cols-[40px_120px_80px_90px_180px_180px_110px_100px_120px_120px_100px_100px] 
            md:gap-[5px] md:w-max md:max-w-none md:p-4 md:m-0 
            md:text-xs md:text-gray-700 md:bg-white
            md:rounded-none md:shadow-none md:border-l-[#1E40AF]
         md:border-r-0 md:border-t md:border-b md:border-[#EAE9E2]`
    const labelClass = "md:hidden mb-[5px] text-[10px] text-[#9E9E9E] font-medium uppercase block tracking-wider"
    const inspectionMobileWrapper = "flex items-baseline gap-2 col-start-1 col-end-4 row-start-1 md:contents"
    const inspectionDatesClass = "flex gap-[5px] items-center"
    const inspectionClass = "md:text-[#1A1A1A] md:font-normal text-[#9E9E9E] text-[14px] font-semibold tracking-tight leading-snug"
    const recommendationClass = "mb-[5px] text-[13px] md:text-[12px] md:mb-0"
    const violationClass = "md:font-normal md:mb-0 font-bold mb-[5px] text-[12px]"
    const borderClass = "border-t border-[#EAE9E2] pt-4 md:border-none md:pt-0"
    const resetMdClass = "md:col-auto md:row-auto"
    const buttonClass = "md:hidden col-start-4 row-start-1 border border-[#1E40AF] rounded-lg font-bold w-[25px] h-[25px] ml-auto"
    // стили для рисков
    const riskLevelStyles = {
        high: "p-1 bg-red-50 text-red-700 border border-red-200 uppercase",
        medium: "p-1 bg-amber-50 text-amber-700 border border-amber-200 uppercase",
        low: "p-1 bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase"
    }
    // стили для статусов
    const statusStyles = {
        open: "p-1 bg-blue-50 text-blue-700 border border-blue-50 uppercase",
        closed: "p-1 bg-green-100 border border-green-100 text-green-800 uppercase",
        removed: "p-1 bg-gray-100 text-gray-500 line-through-none uppercase",
        overdue: "p-1 bg-rose-600 text-white border border-rose-300 uppercase"
    }

    return (
        mockIssues.map((issue) => {
            return <div className={cardsClass}>
                {/* кнопка "добавить" на мобильной версии */}
                <button className={buttonClass}>+</button>
                {/* обертка для карточки на мобилке (чтобы № и название проверки были вплотную) */}
                <div className={`${inspectionMobileWrapper}`}>
                    <div className='font-bold text-gray-400'>
                        <p><span className="md:hidden">{t('table.number')}</span>{issue.id}</p>
                    </div>
                    <div>
                        <p className={inspectionClass}>{issue.inspection}</p>
                    </div>
                </div>
                {/* остальные колонки */}
                <div className="md:hidden col-start-1 col-end-2 row-start-2">
                    <p className={labelClass}>{t('table.inspectionPeriod')}</p>
                </div>
                <div className={`${resetMdClass} ${inspectionDatesClass} justify-end col-start-2 row-start-2`}>
                    <p className="md:hidden">c</p>
                    <p>{issue.startInspectionDate}</p>
                </div>
                <div className={`${resetMdClass} ${inspectionDatesClass} justify-start m-auto col-start-3 row-start-2`}>
                    <p className="md:hidden">по</p>
                    <p>{issue.endInspectionDate === null ? '-' : issue.endInspectionDate}</p>
                </div>
                <div className={`${resetMdClass} px-1 col-start-1 col-end-5 row-start-3`}>
                    <p className={violationClass}>{issue.auditViolation}</p>
                </div>
                <div className={`${borderClass} ${resetMdClass} ${recommendationClass} col-start-1 col-end-5 row-start-5`}>
                    <p className={labelClass}>{t('table.recommendation')}</p>
                    <p>{issue.recommendation}</p>
                </div>
                <div className={`${resetMdClass} max-w-[100px] max-[400px]:col-end-3 col-start-1 col-end-2 row-start-4`}>
                    <p className={statusStyles[issue.status]}>{t(`statuses.${issue.status}`)}</p>
                </div>
                <div className={`${resetMdClass} max-w-[90px] max-[400px]:col-start-3 col-start-2 col-end-3 row-start-4`}>
                    <p className={riskLevelStyles[issue.riskLevel]}>{t(`riskLevels.${issue.riskLevel}`)}</p>
                </div>
                <div className={`${resetMdClass} col-start-1 col-end-3 row-start-6`}>
                    <p className={labelClass}>{t('table.responsibleUnit')}</p>
                    {issue.responsibleUnit.map((unit) => {
                        return <p className="text-xs md:mb-2">{unit}</p>
                    })}
                </div>
                <div className={`${resetMdClass} col-start-3 col-end-5 row-start-6`}>
                    <p className={labelClass}>{t('table.responsiblePerson')}</p>
                    {issue.responsiblePerson.map((person) => {
                        return <div className="text-xs md:mb-2">{person}</div>
                    })}
                </div>
                <div className={`${resetMdClass} col-start-1 col-end-3 row-start-7`}>
                    <p className={labelClass}>{t('table.scheduledDate')}</p>
                    <p> {issue.scheduledDate}</p>
                </div>
                <div className={`${resetMdClass} col-start-3 col-end-5 row-start-7`}>
                    <p className={labelClass}>{t('table.executionDate')}</p>
                    <p>{issue.executionDate === null ? '-' : issue.executionDate}</p>
                </div>
            </div>
        })

    )
}

export default Cards