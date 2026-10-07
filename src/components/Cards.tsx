import { Issue } from "../mockData"
import { useTranslation } from "react-i18next"
import Button from "./ui/Button"
import Plus from "./icons/Plus"
import { VARIANTS } from "../mockData"
import { twMerge } from "tailwind-merge"

interface CardsData {
    issues: Issue[]
}

const Cards = ({ issues }: CardsData) => {
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
    const inspectionDatesClass = "flex gap-[5px] items-center"
    const recommendationClass = "mb-[5px] text-[13px] md:text-[12px] md:mb-0"
    const violationClass = "md:font-normal md:mb-0 font-bold mb-[5px] text-[12px]"
    const borderClass = "border-t border-border-warm pt-4 md:border-none md:pt-0"
    const resetMdClass = "md:col-auto md:row-auto"

    const statusVariants: Record<string, VARIANTS> = {
        open: 'warning',
        closed: 'success',
        removed: 'neutral',
        overdue: 'danger'
    }

    const riskLevelVariants: Record<string, VARIANTS> = {
        low: 'success',
        medium: 'warning',
        high: 'danger'
    }

    const baseBadgeClass = "p-1 uppercase border border-none font-bold rounded-xl text-center"
    const colorClasses = {
        warning: 'bg-warning/10 text-warning',
        danger: ' bg-danger/10 text-danger',
        success: 'bg-success/10 text-success',
        neutral: 'bg-neutral/10 text-neutral'
    }

    return (
        issues.map((issue) => {
            const statusVariant = statusVariants[issue.status]
            const riskLevelVariant = riskLevelVariants[issue.riskLevel]

            return (<div key={issue.id} className={cardsClass}>
                {/* кнопка "добавить" на мобильной версии */}
                <Button
                    type='button'
                    className="md:hidden p-1 col-start-4 row-start-1 border-accent rounded-lg font-bold w-[25px] h-[25px] ml-auto"
                >
                    <Plus className='text-accent' />
                </Button>
                {/* обертка для карточки на мобилке (чтобы № и название проверки были вплотную) */}
                <div className="flex items-baseline gap-2 col-start-1 col-end-4 row-start-1 md:contents">
                    <div className='font-bold text-gray-400'>
                        <p><span className="md:hidden">{t('table.number')}</span>{issue.id}</p>
                    </div>
                    <div>
                        <p className="md:text-text-main md:text-[13px] text-text-muted text-[14px] font-semibold tracking-tight leading-snug">
                            {issue.inspection}
                        </p>
                    </div>
                </div>
                {/* остальные колонки */}
                <div className="md:hidden col-start-1 col-end-2 row-start-2">
                    <p className={labelClass}>{t('table.inspectionPeriod')}</p>
                </div>
                {/* ДАТА НАЧАЛА ПРОВЕРКИ */}
                <div className={twMerge(resetMdClass, inspectionDatesClass, "justify-end col-start-2 row-start-2")}>
                    <p className="md:hidden">c</p>
                    <p>{issue.startInspectionDate}</p>
                </div>
                {/* ДАТА ОКОНЧАНИЯ ПРОВЕРКИ */}
                <div className={twMerge(resetMdClass, inspectionDatesClass, "justify-start m-auto col-start-3 row-start-2")}>
                    <p className="md:hidden">по</p>
                    <p>{issue.endInspectionDate === null ? '-' : issue.endInspectionDate}</p>
                </div>
                {/* НАРУШЕНИЕ */}
                <div className={twMerge(resetMdClass, "px-1 col-start-1 col-end-5 row-start-3")}>
                    <p className={violationClass}>{issue.auditViolation}</p>
                </div>
                {/* РЕКОМЕНДАЦИЯ */}
                <div className={twMerge(borderClass, resetMdClass, recommendationClass, "col-start-1 col-end-5 row-start-5")}>
                    <p className={labelClass}>{t('table.recommendation')}</p>
                    <p>{issue.recommendation}</p>
                </div>
                {/* СТАТУСЫ */}
                <div className={twMerge(resetMdClass, 'max-w-[100px] max-[400px]:col-end-3 col-start-1 col-end-2 row-start-4')}>
                    <p className={twMerge(baseBadgeClass, colorClasses[statusVariant])}>{t(`statuses.${issue.status}`)}</p>
                </div>
                {/* РИСКИ */}
                <div className={twMerge(resetMdClass, "max-w-[90px] max-[400px]:col-start-3 col-start-2 col-end-3 row-start-4")}>
                    <p className={twMerge(baseBadgeClass, colorClasses[riskLevelVariant])}>{t(`riskLevels.${issue.riskLevel}`)}</p>
                </div>
                {/* ОТВЕТСТВЕННОЕ ПОДРАЗДЕЛЕНИЕ */}
                <div className={twMerge(resetMdClass, "col-start-1 col-end-3 row-start-6")}>
                    <p className={labelClass}>{t('table.responsibleDepartment')}</p>
                    {issue.responsibleDepartment.map((department) => {
                        return <p key={department} className="text-xs md:mb-2">{department}</p>
                    })}
                </div>
                {/* ОТВЕТСТВЕННОЕ ЛИЦО */}
                <div className={twMerge(resetMdClass, "col-start-3 col-end-5 row-start-6")}>
                    <p className={labelClass}>{t('table.responsiblePerson')}</p>
                    {issue.responsiblePerson.map((person) => {
                        return <div key={person} className="text-xs md:mb-2">{person}</div>
                    })}
                </div>
                {/* ПЛАНОВАЯ ДАТА ИСПОЛНЕНИЯ */}
                <div className={twMerge(resetMdClass, "col-start-1 col-end-3 row-start-7")}>
                    <p className={labelClass}>{t('table.scheduledDate')}</p>
                    <p> {issue.scheduledDate}</p>
                </div>
                {/* ФАКТИЧЕСКАЯ ДАТА ИСПОЛНЕНИЯ */}
                <div className={twMerge(resetMdClass, "col-start-3 col-end-5 row-start-7")}>
                    <p className={labelClass}>{t('table.executionDate')}</p>
                    <p>{issue.executionDate === null ? '-' : issue.executionDate}</p>
                </div>
            </div>)
        })
    )
}

export default Cards