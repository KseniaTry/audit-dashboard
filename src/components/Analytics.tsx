import { RiskLevels, Statuses } from "../mockData"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge";
import Button from "./ui/Button";
import { VARIANTS } from "../mockData";

interface AnalyticsProps {
    riskLevels: RiskLevels[];
    statuses: Statuses[];
    years: number[];
}

const Analytics = ({ riskLevels, statuses, years }: AnalyticsProps) => {
    const { t } = useTranslation()
    const blockWrapperClass = "w-full flex flex-wrap gap-[0px]"
    const titleClass = 'uppercase tracking-widest font-bold text-[12px] mb-3'
    const cardClass = "w-full h-[130px] p-2 rounded-xl shadow-sm bg-card-bg max-[450px]:w-[48%]"
    const cardsWrapperClass = "flex gap-2 flex-nowrap w-full"
    const cardsWrapperMobileClass = "max-[450px]:flex-wrap max-[450px]:gap-1 max-[450px]:justify-between" // отдельный класс для того чтобы применить перенос карточек только для статусов, а для рисков - оставить 
    const cardTitleClass = "font-bold uppercase tracking-widest text-[10px] md:text-[16px]"
    const violationCountClass = "md:text-[27px] tracking-widest text-[20px] font-bold"
    const stripeWrapperClass = "flex h-[7px] rounded-full overflow-hidden mt-1 w-full"

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

    const colorClasses = {
        warning: 'text-warning bg-warning/30 border-warning',
        danger: 'text-danger bg-danger/30 border-danger',
        success: 'text-success bg-success/30 border-success',
        neutral: 'text-neutral bg-neutral/3 border-neutral'
    }

    const allViolations = 15
    const lowRiskCount = 2
    const mediumRiskCount = 4
    const highRiskCount = 9

    const openedCount = 6
    const closedCount = 4
    const overdueCount = 3
    const removedCount = 2

    const riskLevelsPercents = {
        low: (lowRiskCount / allViolations) * 100,
        medium: (mediumRiskCount / allViolations) * 100,
        high: (highRiskCount / allViolations) * 100,
    }

    const statusesPercents = {
        open: (openedCount / allViolations) * 100,
        closed: (closedCount / allViolations) * 100,
        removed: (removedCount / allViolations) * 100,
        overdue: (overdueCount / allViolations) * 100
    }

    return (
        <section className="p-4 flex flex-wrap gap-[20px] w-full">
            {/* ГОДЫ */}
            <div className="flex w-full gap-2 flex-wrap whitespace-normal">
                <Button
                    type="button"
                    isActive={true}
                    className="md:text-[12px] text-[10px]">
                    {t('filters.allYears')}
                </Button>
                {years.map((year) => {
                    return <Button
                        type="button"
                        key={year}
                        className="md:text-[12px] text-[10px]">
                        {year}
                    </Button>
                })
                }
            </div>
            {/* РИСКИ */}
            <div className={blockWrapperClass}>
                {/* блоки */}
                <h2 className={titleClass}>Сводка по рискам</h2>
                <div className={cardsWrapperClass}>
                    {riskLevels.map((riskLevel) => {
                        const variant = riskLevelVariants[riskLevel]
                        return <div
                            key={riskLevel}
                            className={twMerge(cardClass)}>
                            <h3 className={cardTitleClass}>{t(`riskLevels.${riskLevel}`)}</h3>
                            <p className={twMerge(violationCountClass, colorClasses[variant], 'bg-field-bg')}>5</p>
                        </div>
                    })}
                </div>
                {/* полоса */}
                <div className={stripeWrapperClass}>
                    {riskLevels.map((riskLevel) => {
                        const variant = riskLevelVariants[riskLevel]
                        return <div
                            key={riskLevel}
                            style={{ width: `${riskLevelsPercents[riskLevel]}%` }}
                            className={twMerge(colorClasses[variant], "h-full")}></div>
                    })}
                </div>
            </div>

            {/* СТАТУСЫ */}
            <div className={blockWrapperClass}>
                {/* блоки */}
                <h2 className={titleClass}>Сводка по статусам</h2>
                <div className={twMerge(cardsWrapperClass, cardsWrapperMobileClass)}>
                    {statuses.map((status) => {
                        const variant = statusVariants[status]
                        return <div
                            key={status}
                            className={twMerge(cardClass, colorClasses[variant], "border-l-2 bg-field-bg text-text-dark h-[80px]")}>
                            <h4 className={cardTitleClass}> {t(`statuses.${status}`)}</h4>
                            <p className={twMerge(violationCountClass, colorClasses[variant], "bg-transparent")}>10</p>
                        </div>
                    })}
                </div>
                {/* полоса */}
                <div className={stripeWrapperClass}>
                    {statuses.map((status) => {
                        const variant = statusVariants[status]
                        return <div
                            key={status}
                            style={{ width: `${statusesPercents[status]}%` }}
                            className={twMerge(colorClasses[variant], "h-full")}>
                        </div>
                    })}
                </div>
            </div>
        </section >
    )
}

export default Analytics