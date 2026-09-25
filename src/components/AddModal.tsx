import { useTranslation } from "react-i18next"
import Close from "./icons/Close"
import { twMerge } from "tailwind-merge"
import { RiskLevels } from "../mockData"
import Plus from "./icons/Plus"

interface AddModalProps {
    isOpen: boolean,
    riskLevels: RiskLevels[],
    departments: string[]
}

const AddModal = ({ isOpen = false, riskLevels, departments }: AddModalProps) => {
    const { t } = useTranslation()
    const modalDisplayClass = isOpen ? 'flex' : 'hidden'
    const modalMainClass = "w-full h-full md:w-[50%] md:h-[90%] bg-modal-bg border rounded-xl overflow-y-auto"
    const headerClass = "bg-light p-4 border-b border-b-border-warm"
    const headerWrapperClass = "flex flex-wrap items-center justify-between gap-3 md:gap-2"
    const headerTitleClass = "text-[20px] w-full max-[768px]:text-[23px]"
    const closeButtonClass = "flex items-center justify-center w-10 h-10 hover:text-accent cursor-pointer"
    const formClass = "flex flex-wrap justify-between items-center p-5 gap-3"
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest text-[13px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[12px]"
    const buttonBaseClass = "flex items-center gap-1 p-2 border border-border-dark w-max uppercase tracking-widest text-[12px] hover:bg-secondary-btn-bg/40 hover:text-text-main hover:border-secondary-btn-bg transition-colors cursor-pointer "

    return (
        <div className={`${modalDisplayClass} hidden fixed inset-0 z-50 justify-center md:items-center md:p-4 bg-black/50 backdrop-blur-sm`}>
            <div className={modalMainClass}>
                <header className={headerClass}>
                    <div className={headerWrapperClass}>
                        <div>
                            <p className="tracking-widest uppercase text-[10px] text-accent font-semibold">{t('modals.new')}</p>
                            <h1 className={headerTitleClass}>{t('addModal.title')}</h1>
                        </div>
                        <button className={closeButtonClass} type="button">
                            <Close className="text-text-muted hover:text-accent transition-colors h-5 w-5" />
                        </button>
                    </div>
                </header>

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
                        <label className={titleClass} htmlFor="inspection">{t('table.inspection')}</label>
                        <input className={inputClass} id='inspection' name='inspection' type='text' placeholder="Название проверки" required></input>
                    </div>

                    {/* ДАТА НАЧАЛА ПРОВЕРКИ */}
                    <div className={twMerge(wrapperClass, 'w-[45%]')}>
                        <label className={titleClass} htmlFor="date-start">{t('table.startInspectionDate')}</label>
                        <input className={inputClass} id='date-start' name='date-start' type='date'></input>
                    </div>

                    {/* ДАТА ОКОНЧАНИЯ ПРОВЕРКИ */}
                    <div className={twMerge(wrapperClass, 'w-[45%]')}>
                        <label className={titleClass} htmlFor="date-end">{t('table.endInspectionDate')}</label>
                        <input className={inputClass} id='date-end' name='date-end' type='date'></input>
                    </div>

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
                    {/* СТАТУС */}
                    {/* <div className={wrapperClass}>
                        <label className={titleClass}>{t('table.status')}</label>
                        <select className={inputClass} name="status">
                            {statuses.map((status) => {
                                return <option>{t(`statuses.${status}`)}</option>
                            })}
                        </select>
                    </div> */}
                    {/* УРОВНИ РИСКА */}
                    <div className={twMerge(wrapperClass, 'w-[45%]')}>
                        <label className={titleClass}>{t('table.riskLevel')}</label>
                        <select className={inputClass} name="riskLevel">
                            {riskLevels.map((riskLevel) => {
                                return <option key={riskLevel}>{t(`riskLevels.${riskLevel}`)}</option>
                            })}
                        </select>
                    </div>
                    {/* ПЛАНОВАЯ ДАТА */}
                    <div className={twMerge(wrapperClass, 'w-[45%]')}>
                        <label className={titleClass} htmlFor="inspection">{t('table.scheduledDate')}</label>
                        <input className={inputClass} id='inspection' name='inspection' type='date' placeholder="" required></input>
                    </div>
                    {/* ОТВЕТСТВЕННОЕ ССП */}
                    <div className={twMerge(wrapperClass, 'w-full')}>
                        <label className={titleClass} htmlFor="department">{t('table.responsibleDepartment')}</label>
                        <select className={inputClass} name="riskLevel">
                            {departments.map((department) => {
                                return <option key={department}>{department}</option>
                            })}
                        </select>
                        <button className={twMerge(buttonBaseClass, 'bg-accent/10', 'border-accent')} type="button">
                            <Plus className="w-4 h-4 text-accent" />
                            <span className=" text-accent">{t('add')}</span>
                        </button>
                    </div>

                    {/* ОТВЕТСТВЕННОЕ ЛИЦО */}
                    <div className={twMerge(wrapperClass, 'w-full')}>
                        <label className={titleClass} htmlFor="responsiblePerson">{t('table.responsiblePerson')}</label>
                        <input className={inputClass} id='inspection' name='inspection' type='text' placeholder={t('addModal.responsiblePerson')} required></input>
                        <button
                            className={twMerge(buttonBaseClass, 'bg-accent/10', 'border-accent')}
                            type="button"
                        >
                            <Plus className="w-4 h-4 text-accent" />
                            <span className="text-accent">{t('add')}</span>
                        </button>
                    </div>
                </form>
                {/* КНОПКИ */}
                <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
                    <button className={twMerge(buttonBaseClass)} type="button">
                        <span>{t('cancel')}</span>
                    </button>
                    <button className={twMerge(buttonBaseClass, 'bg-btn-dark', 'text-text-light')} type="submit">
                        <span>{t('add')}</span>
                    </button>
                </footer>
            </div >
        </div >
    )
}

export default AddModal