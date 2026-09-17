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
    const cardClass = "w-full h-[130px] border border-[#EAE9E2] border-2 p-2 rounded-xl bg-white max-[450px]:w-[48%]"
    const cardsWrapperClass = "flex gap-2 flex-nowrap w-full"
    const cardsWrapperMobileClass = "max-[450px]:flex-wrap max-[450px]:gap-1 max-[450px]:justify-between" // отдельный класс для того чтобы применит перенос карточек тольок для статусов, а для рисков оставить 
    const cardTitleClass = "font-bold uppercase tracking-widest max-[768px]:text-[10px]"
    const violationCountClass = "text-[25px] tracking-widest max-[768px]:text-[18px]"
    const buttonsWrapperClass = "flex w-full gap-2 flex-wrap whitespace-normal text-[13px] max-[768px]:text-[10px]"
    const bordersClass = "border border-[#EAE9E2] border-2 p-2 bg-white uppercase cursor-pointer"
    const buttonsClass = "text-[#9E9E9E] hover:border hover:border-2 hover:border-[#1E40AF]"
    const activeButtonClass = "bg-[#1E40AF] text-white"
    const riskLevelsClass = {
        low: "bg-emerald-50 border-emerald-200 text-emerald-700",
        medium: "bg-orange-50 border-orange-200 text-orange-700",
        high: "bg-red-50 border-red-200 text-red-700"
    }
    const statusesClass = {
        open: "text-blue-700 border border-blue-50",
        closed: "border border-green-100 text-green-800",
        removed: "text-gray-500 line-through-none",
        overdue: "bg-rose-50 text-rose-600 border border-rose-100"
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
        low: "bg-emerald-400 transition-all duration-500",
        medium: "bg-orange-400 transition-all duration-500",
        high: "bg-red-400 transition-all duration-500"
    }
    const statusesStripeColorsClass = {
        open: "bg-blue-300",
        closed: "bg-green-600",
        removed: "bg-gray-300",
        overdue: "bg-rose-400"
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
                        return <div style={{ width: `${riskLevelsPercents[riskLevel]}%` }} className={twMerge(riskLevelsStripeColorsClass[riskLevel], "h-full")}></div>
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
                        return <div style={{ width: `${statusesPercents[status]}%` }} className={twMerge(statusesStripeColorsClass[status], "h-full")}></div>
                    })}
                </div>
            </div>
        </section >
    )
}

export default Analytics