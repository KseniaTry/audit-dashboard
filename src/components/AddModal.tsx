import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import { RiskLevels } from "../mockData"
import Plus from "./icons/Plus"
import Input from "./Input"
import SelectInput from "./SelectInput"

interface AddModalProps {
    riskLevels: RiskLevels[],
    departments: string[]
}

const AddModal = ({ riskLevels, departments }: AddModalProps) => {
    const { t } = useTranslation()
    const formClass = "flex flex-wrap justify-between items-center p-5 gap-3"
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest uppercase text-[13px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[12px]"
    const buttonBaseClass = "flex items-center gap-1 p-2 border border-border-dark w-max uppercase tracking-widest text-[12px] hover:bg-secondary-btn-bg/40 hover:text-text-main hover:border-secondary-btn-bg transition-colors cursor-pointer"

    return (
        <form className={formClass}>
            {/* ВЫБОР ПРОВЕРКИ */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <ul className="hidden">
                    {/* поменять на проверки!!!! */}
                    {departments.map((department) => {
                        return <li key={department}>{department}</li>
                    })
                    }

                </ul>
                <Input type={'text'} labelText={t('table.inspection')} id={'inspection'} placeholder="Название проверки" required={true} />
            </div>

            {/* ДАТА НАЧАЛА ПРОВЕРКИ */}
            <Input type={'date'} labelText={t('table.startInspectionDate')} id={'date-start'} widthClass={'w-[45%]'} required={true} />

            {/* ДАТА ОКОНЧАНИЯ ПРОВЕРКИ */}
            <Input type={'date'} labelText={t('table.endInspectionDate')} id={'date-end'} widthClass={'w-[45%]'} required={true} />

            {/* НАРУШЕНИЕ */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <label className={titleClass}>{t('table.violation')}</label>
                <textarea className={inputClass}
                    placeholder="Опишите выявленное нарушение"
                    rows={5}
                    required
                ></textarea>
            </div>
            {/* РЕКОМЕНДАЦИЯ */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <label className={titleClass}>{t('table.recommendation')}</label>
                <textarea className={inputClass}
                    placeholder="Опишите рекомендацию"
                    rows={5}
                    required
                ></textarea>
            </div>
            {/* УРОВНИ РИСКА */}
            <SelectInput labelText={t('table.riskLevel')} name={'risk-level'} optionsArrayData={riskLevels} widthClass={'w-[45%]'} translateFn={(word) => t(`riskLevels.${word}`)} required={true} />

            {/* ПЛАНОВАЯ ДАТА */}
            <Input type={'date'} labelText={t('table.scheduledDate')} id={'sheduled-date'} widthClass={'w-[45%]'} required={true} />

            {/* ОТВЕТСТВЕННОЕ ССП */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <SelectInput labelText={t('table.responsibleDepartment')} name={'department'} optionsArrayData={departments} required={true} />

                <button className={twMerge(buttonBaseClass, 'bg-accent/10', 'border-accent')} type="button">
                    <Plus className="w-4 h-4 text-accent" />
                    <span className=" text-accent">{t('add')}</span>
                </button>
            </div>

            {/* ОТВЕТСТВЕННОЕ ЛИЦО */}
            <div className={twMerge(wrapperClass, 'w-full')}>
                <Input type={'text'} labelText={t('table.responsiblePerson')} id={'responsible'} placeholder={t('addModal.responsiblePerson')} required={true} />
                <button
                    className={twMerge(buttonBaseClass, 'bg-accent/10', 'border-accent')}
                    type="button"
                >
                    <Plus className="w-4 h-4 text-accent" />
                    <span className="text-accent">{t('add')}</span>
                </button>
            </div>
        </form>
    )
}

export default AddModal