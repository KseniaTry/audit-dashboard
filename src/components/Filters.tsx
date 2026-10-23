import { useTranslation } from "react-i18next"
import { Variants } from "../types";
import { Statuses, RiskLevels } from "../types";
import Button from "./ui/Button";
import SelectInput from "./ui/SelectInput";
import Input from "./ui/Input";
import { twMerge } from "tailwind-merge";
import { FilterState } from "../types";
import Checkbox from "./ui/Checkbox";
interface FiltersProps {
    filters: FilterState,
    onChange: (key: keyof FilterState, value: string[] | null | RiskLevels[] | Statuses[]) => void,
    onReset: () => void,
    inspections: string[];
    statuses: Statuses[],
    riskLevels: RiskLevels[],
    departments: string[]
}

const Filters = ({ filters, onChange, onReset, inspections, statuses, riskLevels, departments }: FiltersProps) => {
    const { t } = useTranslation()

    const widthClass = "w-full md:flex-1 min-w-0 max-w-full"
    const inputClass = "h-[36px] text-[10px] md:text-[13px]"

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

                    <div className="flex flex-col md:flex-row gap-2 w-full">
                        {/* ПОИСК */}
                        <Input
                            type='text'
                            id='search'
                            name='search'
                            value={filters.search ?? ''}
                            onChange={(e) => onChange('search', e.target.value)}
                            className={twMerge(inputClass, "p-[7px] px-3 text-text-main")}
                            wrapperExtraClass={widthClass}
                            placeholder={t('filters.search')}
                        />
                        {/* ПРОВЕРКИ */}
                        <Checkbox
                            optionsArrayData={['Все проверки', ...inspections]}
                            className={widthClass}
                            onChange={(data: string[]) => onChange('inspections', data)}
                        />
                        {/* ОТДЕЛЫ */}
                        <Checkbox
                            optionsArrayData={[t('filters.allDepartments'), ...departments]}
                            className={widthClass}
                            onChange={(data: string[]) => onChange('departments', data)} />
                        {/* ГОДЫ ПРОВЕРОК */}
                        <SelectInput
                            name="years-filter"
                            className={inputClass}
                            widthClass={widthClass}
                            value={filters.inspectionYear ?? ''}
                            onChange={(e) => onChange('inspectionYear', e.target.value)}
                            optionsArrayData={[t('filters.allYears'), '2025', '2026']}
                        />
                    </div>

                    {/* СТАТУСЫ */}
                    <div className="flex md:w-full gap-2 flex-wrap whitespace-normal">
                        <Button
                            type="button"
                            isActive={filters.status === null}
                            onClick={() => onChange('status', null)}
                            className="text-[10px] md:text-[12px]">
                            {t('filters.allStatuses')}
                        </Button>
                        {statuses.map((status) => {
                            const variant = statusVariants[status]
                            return (<Button
                                type='button'
                                key={status}
                                variant={variant}
                                isActive={filters.status === status}
                                onClick={() => onChange('status', status)}
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
                            isActive={filters.riskLevel === null}
                            onClick={() => onChange('riskLevel', null)}
                            className="text-[10px] md:text-[12px]">
                            {t('filters.allRiskLevels')}
                        </Button>

                        {riskLevels.map((riskLevel) => {
                            const variant = riskLevelVariants[riskLevel]
                            return (<Button
                                type="button"
                                isActive={filters.riskLevel === riskLevel}
                                onClick={() => onChange('riskLevel', riskLevel)}
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