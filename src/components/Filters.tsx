import { useTranslation } from "react-i18next"
import { Mock } from "../mockData"
import { VARIANTS } from "../mockData";
import { Statuses, RiskLevels } from "../mockData";
import Button from "./ui/Button";
import SelectInput from "./ui/SelectInput";
interface FiltersProps {
    inspections: Mock[];
    statuses: Statuses[],
    riskLevels: RiskLevels[],
    departments: string[]
}

const Filters = ({ inspections, statuses, riskLevels, departments }: FiltersProps) => {
    const { t } = useTranslation()
    const fieldsetClass = "border border-border-warm rounded-xl px-4 pb-4 pt-2.5 bg-field-bg shadow-sm w-full"
    const legendClass = "px-2 text-[11px] font-bold text-text-muted uppercase tracking-widest"
    const bordersClass = "border border-border-warm border-2 p-2 bg-field-bg uppercase cursor-pointer"
    const formClass = "relative flex p-4 gap-4 flex-wrap justify-between items-center tracking-widest text-[10px] md:text-[12px]"
    const buttonsWrapperClass = "flex md:w-full gap-2 flex-wrap whitespace-normal"
    const selectsWrapperClass = "flex flex-col md:flex-row gap-2 w-full"
    const resetButtonWrapperClass = "absolute right-0 top-[-15px] -translate-y-1/2 px-2 h-[14px] flex items-center"

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

    return (
        <section className="p-4">
            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>
                    <h2>{t('filters.title')}</h2>
                </legend>

                <form className={formClass}>
                    <div className={resetButtonWrapperClass}>
                        <Button
                            type='reset'
                            className="md:ml-auto md:w-auto text-[11px] font-semibold text-accent hover:text-accent md:text-text-muted md:bg-transparent text-accent rounded-lg px-3 py-1.5 border-accent md:border-none">
                            {t('filters.reset')}
                        </Button>
                    </div>

                    <div className={selectsWrapperClass}>
                        <div className="w-auto">
                            <label htmlFor="search"></label>
                            <input className={`${bordersClass} p-[7px] w-full px-3 text-black`} id="search" type="text" placeholder={t('filters.search')}></input>
                        </div>

                        <SelectInput
                            name="inspections-filter"
                            className="h-[36px] text-[10px] md:text-[13px]"
                            widthClass="w-full md:flex-1 min-w-0 max-w-full"
                            optionsArrayData={['Все проверки', 'Проверка 1', 'Проверка 2']}
                        />

                        <SelectInput
                            name="departments-filter"
                            className="h-[36px] text-[10px] md:text-[13px]"
                            widthClass="w-full md:flex-1 min-w-0 max-w-full"
                            optionsArrayData={[t('filters.allDepartments'), ...departments]}
                        />

                        <SelectInput
                            name="years-filter"
                            className="h-[36px] text-[10px] md:text-[13px]"
                            widthClass="w-full md:flex-1 min-w-0 max-w-full"
                            optionsArrayData={[t('filters.allYears'), '2025', '2026']}
                        />
                    </div>

                    <div className={buttonsWrapperClass}>
                        <Button
                            type="button"
                            isActive={true}
                            className="text-[10px] md:text-[12px]">
                            {t('filters.allStatuses')}
                        </Button>

                        {statuses.map((status) => {
                            const variant = statusVariants[status]
                            return (<Button
                                key={status}
                                variant={variant}
                                className="text-[10px] md:text-[12px]">
                                {t(`statuses.${status}`)}
                            </Button>)
                        })
                        }
                    </div>

                    <div className={buttonsWrapperClass}>
                        <Button
                            type="button"
                            isActive={true}
                            className="text-[10px] md:text-[12px]">
                            {t('filters.allRiskLevels')}
                        </Button>

                        {riskLevels.map((riskLevel) => {
                            const variant = riskLevelVariants[riskLevel]
                            return (<Button
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