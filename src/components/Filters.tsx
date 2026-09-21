import { useTranslation } from "react-i18next"
import { Mock } from "../mockData"
import { twMerge } from "tailwind-merge";

interface FiltersProps {
    inspections: Mock[];
}

const Filters = ({ inspections }: FiltersProps) => {
    const { t } = useTranslation()
    const fieldsetClass = "border border-[#EAE9E2] rounded-xl px-4 pb-4 pt-2.5 bg-white shadow-sm w-full"
    const legendClass = "px-2 text-[11px] font-bold text-[#9E9E9E] uppercase tracking-widest"
    const bordersClass = "border border-[#EAE9E2] border-2 p-2 bg-white uppercase cursor-pointer"
    const buttonsClass = "text-[#9E9E9E] hover:border hover:border-2 hover:border-[#1E40AF]"
    const activeButtonClass = "bg-[#1E40AF] text-white"
    const selectClass = "sm:w-auto md:w-full h-[36px]"
    const formClass = "relative flex p-4 gap-4 flex-wrap justify-between items-center tracking-widest text-[10px] md:text-[12px]"
    const buttonsWrapperClass = "flex w-full gap-2 flex-wrap whitespace-normal"
    const selectsWrapperClass = "flex w-full gap-2 justify-start items-center flex-wrap"
    const resetButtonWrapperClass = "absolute right-0 top-[-15px] -translate-y-1/2 px-2 h-[14px] flex items-center"
    const resetButtonClass = `flex items-center justify-center gap-1.5 px-3 py-1.5 w-full
        text-xs font-semibold uppercase tracking-widest text-[11px] text-[#1E40AF]
        transition-colors duration-150 cursor-pointer border border-[#1E40AF] rounded-lg bg-white
        md:ml-auto md:w-auto md:text-[#9E9E9E] md:border-none md:bg-transparent md:hover:text-[#1E40AF]`
    const statusesHoverClass: Record<string, string> = {
        open: "hover:text-blue-700  hover:border-blue-700",
        closed: "hover:text-green-800  hover:border-green-800",
        removed: "hover:text-black hover:border-black",
        overdue: "hover:text-rose-300 hover:border-rose-300"
    }
    const riskLevelsHoverClass: Record<string, string> = {
        low: "hover:text-emerald-700 hover:border-emerald-700",
        medium: "hover:text-amber-500 hover:border-amber-500",
        high: "hover:text-red-700 hover:border-red-700"
    }

    // временно 
    const allStatuses = ['open', 'closed', 'overdue', 'removed']
    const allRiskLevels = ['low', 'medium', 'high']

    const getAllResponsibleUnits = (inspections: Mock[]): string[] => {
        const allUnits = inspections.map(inspection => inspection.responsibleDepartment).flat()
        return [...new Set(allUnits)].sort()
    }

    const allUnits = getAllResponsibleUnits(inspections)

    return (
        <section className="p-4">
            <fieldset className={fieldsetClass}>
                <legend className={legendClass}>
                    <h2>{t('filters.title')}</h2>
                </legend>
                <form className={formClass}>
                    <div className={resetButtonWrapperClass}>
                        <button className={resetButtonClass} type='reset'>{t('filters.reset')}</button>
                    </div>

                    <div className={selectsWrapperClass}>
                        <div className="w-full">
                            <label htmlFor="search"></label>
                            <input className={`${bordersClass} p-[7px] w-full px-3 text-black`} id="search" type="text" placeholder={t('filters.search')}></input>
                        </div>

                        <select className={`${bordersClass} ${selectClass}`} name="inspections-filter">
                            <option value="" selected>{t('filters.allInspections')}</option>
                            <option value="1">Проверка 1</option>
                            <option value="2">Проверка 2</option>
                        </select>

                        <select className={`${bordersClass} ${selectClass}`} name="units-filter">
                            <option value="" selected>{t('filters.allDepartments')}</option>
                            {allUnits.map((unit) => {
                                return <option key={unit} value={unit}>{unit}</option>
                            })
                            }
                        </select>

                        <select className={`${bordersClass} ${selectClass}`} name="years-filter">
                            <option value="" selected>{t('filters.allYears')}</option>
                            <option value="1">2025</option>
                            <option value="2">2026</option>
                        </select>
                    </div>

                    <div className={buttonsWrapperClass}>
                        <button type="button" className={twMerge(bordersClass, buttonsClass, activeButtonClass, 'border-[#1E40AF]')}>{t('filters.allStatuses')}</button>
                        {allStatuses.map((status) => {
                            return <button key={status} type="button" className={`${bordersClass} ${buttonsClass} ${statusesHoverClass[status]}`}>{t(`statuses.${status}`)}</button>
                        })
                        }
                    </div>

                    <div className={buttonsWrapperClass}>
                        <button type="button" className={twMerge(bordersClass, buttonsClass, activeButtonClass, 'border-[#1E40AF]')}>{t('filters.allRiskLevels')}</button>
                        {allRiskLevels.map((riskLevel) => {
                            return <button key={riskLevel} className={`${bordersClass} ${buttonsClass} ${riskLevelsHoverClass[riskLevel]}`}>{t(`riskLevels.${riskLevel}`)}</button>
                        })
                        }
                    </div>
                </form>
            </fieldset >

        </section >
    )



}

export default Filters