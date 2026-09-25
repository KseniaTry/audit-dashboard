import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import Close from "./icons/Close"

interface DepartmentReview {
    departments: string[]
}

const DepartmentReviewModal = ({ departments }: DepartmentReview) => {
    const { t } = useTranslation()

    const modalMainClass = "w-full h-max md:w-[50%] bg-modal-bg border border-border-warm rounded-xl overflow-y-auto"
    const headerClass = "bg-light p-4 border-b border-b-border-warm"
    const headerWrapperClass = "flex flex-wrap items-center justify-between gap-3 md:gap-2"
    const headerTitleClass = "text-[20px] w-full max-[768px]:text-[23px]"
    const closeButtonClass = "flex items-center justify-center w-10 h-10 hover:text-accent cursor-pointer"
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest uppercase text-[13px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"
    const buttonBaseClass = "flex items-center gap-1 p-2 border border-border-dark w-max uppercase tracking-widest text-[12px] hover:bg-secondary-btn-bg/40 hover:text-text-main hover:border-secondary-btn-bg transition-colors cursor-pointer "

    return (
        <div className={`flex fixed inset-0 z-50 items-end justify-center md:items-center md:p-4 bg-black/20 backdrop-blur-sm`}>
            <div className={modalMainClass}>
                <header className={headerClass}>
                    <div className={headerWrapperClass}>
                        <div>
                            <p className="tracking-widest uppercase text-[10px] text-accent font-semibold">{t('modals.review')}</p>
                            <h1 className={headerTitleClass}>{t('departmentReviewModal.title')}</h1>
                        </div>
                        <button className={closeButtonClass} type="button">
                            <Close className="text-text-muted hover:text-accent transition-colors h-5 w-5" />
                        </button>
                    </div>
                </header>
                <div className="flex flex-col flex-wrap p-5 gap-4">
                    <p className="tracking-wide">{t('departmentReviewModal.text')}</p>
                    <div className={twMerge(wrapperClass, 'w-full')}>
                        <label className={titleClass} htmlFor="department">{t('table.responsibleDepartment')}</label>
                        <select className={inputClass} name="riskLevel">
                            {departments.map((department) => {
                                return <option key={department}>{department}</option>
                            })}
                        </select>
                    </div>

                </div>


                <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
                    <button className={twMerge(buttonBaseClass)} type="button">
                        <span>{t('cancel')}</span>
                    </button>
                    <button className={twMerge(buttonBaseClass, 'bg-btn-dark', 'text-text-light')} type="submit">
                        <span>{t('download')}</span>
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default DepartmentReviewModal