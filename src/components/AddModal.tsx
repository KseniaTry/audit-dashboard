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
    const modalMainClass = "w-full h-full md:w-[50%] md:h-[90%] bg-white border rounded-xl overflow-y-auto"
    const headerClass = "bg-[#F4F3EF] p-4 border-b border-b-[#EAE9E2]"
    const headerWrapperClass = "flex flex-wrap items-center justify-between gap-3 md:gap-2"
    const headerTitleClass = "text-[20px] w-full max-[768px]:text-[23px]"
    const closeButtonClass = "flex items-center justify-center w-10 h-10 hover:text-[#1E40AF] cursor-pointer"
    const formClass = "flex flex-wrap justify-between items-center p-5 gap-3"
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest text-[13px]"
    const inputClass = "w-full border border-[#EAE9E2] md:min-w-[150px] border-2 p-2 bg-white uppercase cursor-pointer text-[12px]"
    const buttonBaseClass = "flex items-center gap-1 p-2 border border-black w-max uppercase tracking-widest text-[12px] cursor-pointer"


    return (
        <div className={`${modalDisplayClass} hidden fixed inset-0 z-50 justify-center md:items-center md:p-4 bg-black/50 backdrop-blur-sm`}>
            <div className={modalMainClass}>
                <header className={headerClass}>
                    <div className={headerWrapperClass}>
                        <div>
                            <p className="tracking-widest uppercase text-[10px] text-[#1E40AF] font-semibold">{t('addModal.secondTitle')}</p>
                            <h1 className={headerTitleClass}>{t('addModal.title')}</h1>
                        </div>
                        <button className={closeButtonClass} type="button">
                            <Close className="text-[#9E9E9E] w-5 h-5" />
                        </button>
                    </div>
                </header>


                <form className={formClass}>
                    {/* ВЫБОР ПРОВЕРКИ */}
                    <div className={twMerge(wrapperClass, 'w-full')}>
                        <ul className="hidden">
                            {/* поменять на проверки!!!! */}
                            {departments.map((department) => {
                                return <li>{department}</li>
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
                                return <option>{t(`riskLevels.${riskLevel}`)}</option>
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
                                return <option>{department}</option>
                            })}
                        </select>
                        <button className={twMerge(buttonBaseClass, 'bg-blue-100', 'border-[#1E40AF]')} type="button">
                            <Plus className="w-4 h-4 text-[#1E40AF]" />
                            <span className=" text-[#1E40AF]">{t('add')}</span>
                        </button>
                    </div>

                    {/* ОТВЕТСТВЕННОЕ ЛИЦО */}
                    <div className={twMerge(wrapperClass, 'w-full')}>
                        <label className={titleClass} htmlFor="responsiblePerson">{t('table.responsiblePerson')}</label>
                        <input className={inputClass} id='inspection' name='inspection' type='text' placeholder="" required></input>
                        <button
                            className={twMerge(buttonBaseClass, 'bg-blue-100', 'border-[#1E40AF]')}
                            type="button"
                        >
                            <Plus className="w-4 h-4 text-[#1E40AF]" />
                            <span className=" text-[#1E40AF]">{t('add')}</span>
                        </button>
                    </div>
                </form>
                {/* КНОПКИ */}
                <footer className="flex justify-end items-center gap-3 border-t border-[#EAE9E2] p-4">
                    <button className={twMerge(buttonBaseClass)} type="button">
                        <span>{t('cancel')}</span>
                    </button>
                    <button className={twMerge(buttonBaseClass, 'bg-black', 'text-white')} type="submit">
                        <span>{t('add')}</span>
                    </button>
                </footer>
            </div >
        </div >
    )
}

export default AddModal