import { RiskLevels, Statuses } from "../mockData"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge";

interface AnalyticsProps {
    riskLevels: RiskLevels[];
    statuses: Statuses[];
    years: number[];
}

const Analytics = ({ riskLevels, statuses, years }: AnalyticsProps) => {
    const { t } = useTranslation()
    const blockWrapperClass = "w-full flex flex-wrap gap-[0px]"
    const cardClass = "w-full h-[130px] border border-border-warm border-2 p-2 rounded-xl bg-card-bg max-[450px]:w-[48%]"
    const cardsWrapperClass = "flex gap-2 flex-nowrap w-full"
    const cardsWrapperMobileClass = "max-[450px]:flex-wrap max-[450px]:gap-1 max-[450px]:justify-between" // отдельный класс для того чтобы применить перенос карточек только для статусов, а для рисков - оставить 
    const cardTitleClass = "font-bold uppercase tracking-widest text-[10px] md:text-[16px]"
    const violationCountClass = "md:text-[25px] tracking-widest text-[18px]"
    const buttonsWrapperClass = "flex w-full gap-2 flex-wrap whitespace-normal text-[13px] max-[768px]:text-[10px]"
    const bordersClass = "border border-border-warm border-2 p-2 bg-field-bg uppercase cursor-pointer"
    const buttonsClass = "text-text-muted hover:border hover:border-2 hover:border-accent"
    const activeButtonClass = "bg-accent text-text-light"
    const riskLevelsClass = {
        low: "bg-risk-low/10 border-risk-low/20 text-risk-low",
        medium: "bg-risk-medium/10 border-risk-medium/20 text-risk-medium",
        high: "bg-risk-high/10 border-risk-high/20 text-risk-high"
    }
    const statusesClass = {
        open: "bg-status-open/5 border border-status-open/20 text-status-open",
        closed: "bg-status-closed/5 border border-status-closed/20 text-status-closed",
        removed: "bg-status-removed/10 text-status-removed/80 border border-status-removed/20 line-through-none",
        overdue: "bg-status-overdue/5 border border-status-overdue/20 text-status-overdue"
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

    const stripeWrapperClass = "flex h-[7px] rounded-full overflow-hidden mt-1 w-full"
    const riskLevelsStripeColorsClass = {
        low: "bg-risk-low transition-all duration-500",
        medium: "bg-risk-medium transition-all duration-500",
        high: "bg-risk-high transition-all duration-500"
    }
    const statusesStripeColorsClass = {
        open: "bg-status-open",
        closed: "bg-status-closed/80",
        removed: "bg-status-removed/20",
        overdue: "bg-status-overdue"
    }

    return (
        <section className="p-4 flex flex-wrap gap-[20px] w-full">
            {/* ГОДЫ */}
            <div className={buttonsWrapperClass}>
                <button className={twMerge(bordersClass, buttonsClass, activeButtonClass)} type="button">{t('filters.allYears')}</button>
                {years.map((year) => {
                    return <button key={year} className={twMerge(bordersClass, buttonsClass)}>{year}</button>
                })
                }
            </div>
            {/* РИСКИ */}
            <div className={blockWrapperClass}>
                {/* блоки */}
                <div className={cardsWrapperClass}>
                    {riskLevels.map((riskLevel) => {
                        return <div key={riskLevel} className={twMerge(cardClass, riskLevelsClass[riskLevel])}>
                            <h3 className={cardTitleClass}>{t(`riskLevels.${riskLevel}`)}</h3>
                            <p className={violationCountClass}>5</p>
                        </div>
                    })}
                </div>
                {/* полоса */}
                <div className={stripeWrapperClass}>
                    {riskLevels.map((riskLevel) => {
                        return <div key={riskLevel} style={{ width: `${riskLevelsPercents[riskLevel]}%` }} className={twMerge(riskLevelsStripeColorsClass[riskLevel], "h-full")}></div>
                    })}
                </div>
            </div>

            {/* СТАТУСЫ */}
            <div className={blockWrapperClass}>
                {/* блоки */}
                <div className={twMerge(cardsWrapperClass, cardsWrapperMobileClass)}>
                    {statuses.map((status) => {
                        return <div key={status} className={twMerge(cardClass, statusesClass[status], "h-[80px]")}>
                            <h4 className={cardTitleClass}> {t(`statuses.${status}`)}</h4>
                            <p className={violationCountClass}>10</p>
                        </div>
                    })}
                </div>
                {/* полоса */}
                <div className={stripeWrapperClass}>
                    {statuses.map((status) => {
                        return <div key={status} style={{ width: `${statusesPercents[status]}%` }} className={twMerge(statusesStripeColorsClass[status], "h-full")}></div>
                    })}
                </div>
            </div>
        </section >
    )
}

export default Analytics