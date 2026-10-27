import { useTranslation } from "react-i18next"
import { FiltersData, Variants } from "../types";
import { Statuses, RiskLevels } from "../types";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { FilterState } from "../types";
import Checkbox from "./ui/Checkbox";
import { RISK_LEVELS, STATUSES } from "../const";
import Close from "./icons/Close";

interface FiltersProps {
    filters: FilterState,
    onChange: (key: keyof FilterState, value: FiltersData | string) => void, // изменение стейта выбранных фильтров
    onReset: () => void,
    inspections: string[];
    statuses: Statuses[],
    riskLevels: RiskLevels[],
    departments: string[],
    years: string[]
}

const Filters = ({ filters, onChange, onReset, inspections, statuses, riskLevels, departments, years }: FiltersProps) => {
    const { t } = useTranslation()

    const handleButtonClick = <T extends string>(value: T, allItems: T[], key: keyof FilterState) => {
        let newValue: T[]
        const currentValues = filters[key] as T[] // сужение типов, чтобы TS не думал, что я могу передать в key 'search' или 'departments' 
        if (currentValues.includes(value)) {
            newValue = currentValues.filter((item) => item !== value)
        } else {
            newValue = [...currentValues, value]
        }

        if (allItems.length === newValue.length) {
            newValue = []
        }
        onChange(key, newValue)
    }

    const widthClass = "w-full md:flex-1 min-w-0 max-w-full"

    const statusVariants: Record<string, Variants> = {
        open: 'warning',
        closed: 'success',
        removed: 'neutral',
        overdue: 'danger'
    }

    const riskLevelVariants: Record<string, Variants> = {
        low: 'success',
        medium: 'warning',
        high: 'danger'
    }

    return (
        <section className="p-4">
            <fieldset className="border border-border-warm rounded-xl px-4 pb-4 pt-2.5 bg-field-bg shadow-sm w-full">
                <legend className="px-2 text-[11px] font-bold text-text-muted uppercase tracking-widest">
                    <h2>{t('filters.title')}</h2>
                </legend>

                <form
                    className="relative flex p-4 gap-4 flex-wrap justify-between items-center tracking-widest text-[10px] md:text-[12px]">
                    <div className="absolute right-0 top-[-15px] -translate-y-1/2 px-2 h-[14px] flex items-center">
                        <Button
                            type='reset'
                            onClick={() => onReset()}
                            className="md:ml-auto md:w-auto text-[11px] font-semibold text-accent hover:text-accent md:text-text-muted md:bg-transparent text-accent rounded-lg px-3 py-1.5 border-accent md:border-none">
                            {t('filters.reset')}
                        </Button>
                    </div>

                    {/* <div className="flex flex-col md:flex-row gap-2 w-full"> */}
                    {/* ПОИСК */}
                    <div className="w-full flex flex-wrap gap-3">
                        <div className="w-full flex gap-3">
                            <Input
                                type='text'
                                id='search'
                                name='search'
                                value={filters.search ?? ''}
                                onChange={(e) => onChange('search', e.target.value)}
                                className="text-[10px] md:text-[13px] h-8 p-[7px] px-3 text-text-main"
                                wrapperExtraClass={widthClass}
                                placeholder={t('filters.search')}
                            />
                            <Button
                                type='button'
                                className="border-none h-[36px]"
                                onClick={() => onChange('search', '')}
                            >
                                <Close className="text-text-muted hover:text-accent transition-colors h-5 w-5" />
                            </Button>
                        </div>
                        {/* ПРОВЕРКИ */}
                        <div className="w-full flex gap-3 flex-wrap">
                            <Checkbox
                                options={inspections}
                                placeholder={'все проверки'}
                                value={filters.inspections ?? ''}
                                className={widthClass}
                                onChange={(data: string[]) => onChange('inspections', data)}
                            />
                            {/* ОТДЕЛЫ */}
                            <Checkbox
                                options={departments}
                                placeholder={t('filters.allDepartments')}
                                value={filters.departments}
                                className={widthClass}
                                onChange={(data: string[]) => onChange('departments', data)} />
                            {/* ГОДЫ ПРОВЕРОК */}
                            <Checkbox
                                options={years}
                                className={widthClass}
                                placeholder={t('filters.allYears')}
                                value={filters.inspectionYears}
                                onChange={(years) => onChange('inspectionYears', years)}
                            />
                        </div>
                    </div>
                    {/* СТАТУСЫ */}
                    <div className="flex md:w-full gap-2 flex-wrap whitespace-normal">
                        <Button
                            type="button"
                            isActive={filters.statuses.length === 0}
                            onClick={() => onChange('statuses', [])}
                            className="text-[10px] md:text-[12px]">
                            {t('filters.allStatuses')}
                        </Button>
                        {statuses.map((status) => {
                            const variant = statusVariants[status]
                            return (<Button
                                type='button'
                                key={status}
                                variant={variant}
                                isActive={filters.statuses.includes(status)}
                                onClick={() => handleButtonClick(status, STATUSES, 'statuses')}
                                className="text-[10px] md:text-[12px]">
                                {t(`statuses.${status}`)}
                            </Button>)
                        })
                        }
                    </div>

                    {/* РИСКИ */}
                    <div className="flex md:w-full gap-2 flex-wrap whitespace-normal">
                        <Button
                            type="button"
                            isActive={filters.riskLevels.length === 0}
                            onClick={() => onChange('riskLevels', [])}
                            className="text-[10px] md:text-[12px]">
                            {t('filters.allRiskLevels')}
                        </Button>

                        {riskLevels.map((riskLevel) => {
                            const variant = riskLevelVariants[riskLevel]
                            return (<Button
                                type="button"
                                isActive={filters.riskLevels.includes(riskLevel)}
                                onClick={() => handleButtonClick(riskLevel, RISK_LEVELS, 'riskLevels')}
                                key={riskLevel}
                                variant={variant}
                                className="text-[10px] md:text-[12px]">
                                {t(`riskLevels.${riskLevel}`)}
                            </Button>)
                        })
                        }
                    </div>
                </form>
            </fieldset >
        </section >
    )
}

export default Filters