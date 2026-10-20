import { Issue, RiskLevels, Statuses } from "../const"
import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge";
import Button from "./ui/Button";
import { VARIANTS } from "../const";
import { useSelector } from "react-redux";
import { selectIssuesWithStatuses, selectTotalIssues } from "../slices/issuesSlice";
import { useState } from "react";

interface AnalyticsProps {
    riskLevels: RiskLevels[];
    statuses: Statuses[];
    years: number[] | string[];
}

const calculateRisksPercents = (counts: Record<RiskLevels, number>, totalCount: number) => {
    if (totalCount === 0) {
        return { low: 0, medium: 0, high: 0 };
    }
    return {
        low: (counts.low / totalCount) * 100,
        medium: (counts.medium / totalCount) * 100,
        high: (counts.high / totalCount) * 100,
    }
}

const calculateStatusesPercents = (counts: Record<Statuses, number>, totalCount: number) => {
    if (totalCount === 0) {
        return { low: 0, medium: 0, high: 0 };
    }
    return {
        open: (counts.open / totalCount) * 100,
        closed: (counts.closed / totalCount) * 100,
        removed: (counts.removed / totalCount) * 100,
        overdue: (counts.overdue / totalCount) * 100
    }
}

const calculateCount = <K extends 'riskLevel' | 'status'>(
    issues: Issue[],
    category: K) => {
    type PropertyValue = Issue[K] & string
    return issues.reduce((acc, issue) => {
        const key = issue[category] as PropertyValue

        if (!key) return acc

        if (key in acc) {
            acc[key] += 1
        } else {
            acc[key] = 1
        }
        return acc
    }, {} as Record<PropertyValue, number>)
}

const Analytics = ({ riskLevels, statuses, years }: AnalyticsProps) => {
    const { t } = useTranslation()
    const allIssues = useSelector(selectIssuesWithStatuses)
    const allActiveIssues = allIssues.reduce((acc, issue) => {
        if (issue.status === 'open' || issue.status === 'overdue') {
            acc.push(issue)
        }
        return acc
    }, [] as Issue[])

    const [tabActive, setTabActive] = useState<'all' | 'active'>('all')

    const totalIssues = useSelector(selectTotalIssues)
    const totalActiveIssues = allActiveIssues.length

    const allStatusesCounts = calculateCount(allIssues, 'status')
    const allRisksCounts = calculateCount(allIssues, 'riskLevel')
    const activeStatusesCounts = calculateCount(allActiveIssues, 'status')
    const activeRisksCounts = calculateCount(allActiveIssues, 'riskLevel')

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
            {/* ТАБЫ */}
            <div className="flex gap-3">
                <Button type='button' isActive={tabActive === 'all'} onClick={() => setTabActive('all')}>{t('analytics.totalIssues')} <span>({totalIssues})</span></Button>
                <Button type='button' isActive={tabActive === 'active'} onClick={() => setTabActive('active')}>{t('analytics.totalActiveIssues')} <span>({totalActiveIssues})</span></Button>
            </div>

            {/* ВСЕ РИСКИ */}
            <div className={blockWrapperClass}>
                {/* блоки */}
                <h2 className={titleClass}>{t('analytics.allRisks')}</h2>
                <div className={cardsWrapperClass}>
                    {riskLevels.map((riskLevel) => {
                        const variant = riskLevelVariants[riskLevel]
                        const array = tabActive === 'all' ? allRisksCounts : activeRisksCounts
                        const count = array[riskLevel] ?? 0
                        return <div
                            key={riskLevel}
                            className={twMerge(cardClass)}>
                            <h3 className={cardTitleClass}>{t(`riskLevels.${riskLevel}`)}</h3>
                            <p className={twMerge(violationCountClass, colorClasses[variant], 'bg-field-bg')}>{count}</p>
                        </div>
                    })}
                </div>
                {/* полоса */}
                <div className={stripeWrapperClass}>
                    {riskLevels.map((riskLevel) => {
                        const variant = riskLevelVariants[riskLevel]
                        const percents = tabActive === 'all' ? calculateRisksPercents(allRisksCounts, totalIssues) : calculateRisksPercents(activeRisksCounts, totalActiveIssues)
                        return <div
                            key={riskLevel}
                            style={{ width: `${percents[riskLevel]}%` }}
                            className={twMerge(colorClasses[variant], "h-full")}></div>
                    })}
                </div>
            </div>

            {/* ВСЕ СТАТУСЫ */}
            <div className={blockWrapperClass}>
                {/* блоки */}
                <h2 className={titleClass}>{t('analytics.allStatuses')}</h2>
                <div className={twMerge(cardsWrapperClass, cardsWrapperMobileClass)}>
                    {statuses.map((status) => {
                        const variant = statusVariants[status]
                        const array = tabActive === 'all' ? allStatusesCounts : activeStatusesCounts
                        const statusCount = array[status] ?? 0
                        return <div
                            key={status}
                            className={twMerge(cardClass, colorClasses[variant], "border-l-2 bg-field-bg text-text-dark h-[80px]")}>
                            <h4 className={cardTitleClass}> {t(`statuses.${status}`)}</h4>
                            <p className={twMerge(violationCountClass, colorClasses[variant], "bg-transparent")}>{statusCount}</p>
                        </div>
                    })}
                </div>
                {/* полоса */}
                <div className={stripeWrapperClass}>
                    {statuses.map((status) => {
                        const variant = statusVariants[status]
                        const percents = tabActive === 'all' ? calculateStatusesPercents(allStatusesCounts, totalIssues) : calculateStatusesPercents(activeStatusesCounts, totalActiveIssues)
                        return <div
                            key={status}
                            style={{ width: `${percents[status]}%` }}
                            className={twMerge(colorClasses[variant], "h-full")}>
                        </div>
                    })}
                </div>
            </div>
        </section >
    )
}

export default Analytics