import { mockIssues } from "../mockData"
import { useTranslation } from "react-i18next"

const Cards = () => {
    const { t } = useTranslation()

    const cardsClass = `
            grid grid-cols-4 gap-[10px] text-[10px] p-[15px] mb-[15px] my-[5px] w-full mx-auto bg-[#FFFFFF] 
            border border-border-warm shadow-sm break-words border-l-4 border-l-accent
            md:grid-cols-[40px_120px_90px_90px_180px_180px_110px_100px_120px_120px_100px_100px] 
            md:gap-2 md:w-max md:p-4 md:m-0 md:break-words
            md:text-xs md:text-gray-700 md:bg-card-bg
            md:rounded-none md:shadow-none md:border-l-accent
            md:border-r-0 md:border-t md:border-b md:border-border-warm`
    const labelClass = "md:hidden mb-[5px] text-[10px] text-text-muted font-medium uppercase block tracking-wider"
    const inspectionMobileWrapper = "flex items-baseline gap-2 col-start-1 col-end-4 row-start-1 md:contents"
    const inspectionDatesClass = "flex gap-[5px] items-center"
    const inspectionClass = "md:text-text-main md:text-[13px] text-text-muted text-[14px] font-semibold tracking-tight leading-snug"
    const recommendationClass = "mb-[5px] text-[13px] md:text-[12px] md:mb-0"
    const violationClass = "md:font-normal md:mb-0 font-bold mb-[5px] text-[12px]"
    const borderClass = "border-t border-border-warm pt-4 md:border-none md:pt-0"
    const resetMdClass = "md:col-auto md:row-auto"
    const buttonClass = "md:hidden col-start-4 row-start-1 border border-accent rounded-lg font-bold w-[25px] h-[25px] ml-auto"
    // стили для рисков
    const riskLevelStyles = {
        low: "p-1 bg-risk-low/10 text-risk-low border border-risk-low/50 uppercase",
        medium: "p-1 bg-risk-medium/10 text-risk-medium border border-risk-medium/50 uppercase",
        high: "p-1 bg-risk-high/10 text-risk-high border border-risk-high/50 uppercase"
    }
    // стили для статусов
    const statusStyles = {
        open: "p-1 bg-status-open/10 text-status-open border border-status-open/10 uppercase",
        closed: "p-1 bg-status-closed/10 border border-status-closed/10 text-status-closed uppercase",
        removed: "p-1 bg-status-removed/10 text-status-removed line-through-none uppercase",
        overdue: "p-1 bg-status-overdue text-text-light border border-status-overdue uppercase"
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
                    <p className={labelClass}>{t('table.responsibleDepartment')}</p>
                    {issue.responsibleDepartment.map((department) => {
                        return <p className="text-xs md:mb-2">{department}</p>
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