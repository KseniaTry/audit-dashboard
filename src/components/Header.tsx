import { useTranslation } from "react-i18next"
import Download from "./icons/Download"
import Plus from "./icons/Plus"
import { twMerge } from "tailwind-merge"

const Header = () => {
    const { t } = useTranslation()
    const headerClass = "p-4 bg-[#F4F3EF] border-b border-b-[#EAE9E2]"
    const headerWrapperClass = "flex flex-wrap items-center justify-between gap-3 md:gap-2"
    const logoClass = "flex justify-center items-center w-[20px] h-[20px] bg-[#1E40AF] text-white p-4"
    const headerTitleClass = "text-[11px] tracking-widest uppercase md:text-[15px]"
    const logoWrapperClass = "flex flex-nowrap items-center justify-between gap-1 w-full lg:w-auto md:gap-3 lg:w-auto"
    const buttonsWrapperClass = "flex gap-2 flex-wrap md:flex-nowrap"
    const buttonBaseClass = "flex items-center gap-1 p-2 uppercase tracking-widest text-[12px] w-full cursor-pointer sm:w-auto"
    const addButtonClass = "bg-[#11161B] text-white"
    const reportButtonClass = "bg-white border border-[#EAE9E2]"
    const reportIconClass = "text-black w-[30px] h-[30px]"
    const addIconClass = "text-white w-[30px] h-[30px]"

    return (
        <header className={headerClass}>
            <div className={headerWrapperClass}>
                {/* ЛОГО */}
                <div className={logoWrapperClass}>
                    <div className={logoClass}><p>{t('logoTitle')}</p></div>
                    <p className={headerTitleClass}>{t('headerTitle')}</p>
                </div>
                {/* КНОПКИ */}
                <div className={buttonsWrapperClass}>
                    <button className={twMerge(buttonBaseClass, addButtonClass)} type="button">
                        <Plus className={addIconClass} />
                        <span>{t('add')}</span>
                    </button>
                    <button className={twMerge(buttonBaseClass, reportButtonClass)} type="button">
                        <Download className={reportIconClass} />
                        {t('reports.reportForDepartments')}</button>
                    <button className={twMerge(buttonBaseClass, reportButtonClass)} type="button">
                        <Download className={reportIconClass} />
                        {t('reports.reportForManagement')}
                    </button>
                </div>
            </div>

        </header>
    )
}

export default Header