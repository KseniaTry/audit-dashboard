import { useTranslation } from "react-i18next"
import Close from "./icons/Close"
import { twMerge } from "tailwind-merge"

const ChangeModal = () => {
    const { t } = useTranslation()
    const headerClass = "bg-[#F4F3EF] p-4 border-b border-b-[#EAE9E2]"
    const closeButtonClass = "flex items-center justify-center w-10 h-10 cursor-pointer"
    const headerTitleClass = "text-[20px] w-full max-[768px]:text-[23px]"
    const headerWrapperClass = "flex flex-wrap items-center justify-between gap-3 md:gap-2"
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const borderClass = "border border-[#EAE9E2] bg-[#F4F3EF] p-4"
    const titleClass = "tracking-widest uppercase text-[14px]"
    const inputClass = "w-full border border-[#EAE9E2] md:min-w-[150px] border-2 p-2 bg-white uppercase cursor-pointer text-[15px]"
    const statusStyles = {
        open: "p-1 bg-blue-50 text-blue-700 border border-blue-500 uppercase",
        closed: "p-1 bg-green-100 border border-green-100 text-green-800 uppercase",
        removed: "p-1 bg-gray-100 text-gray-500 line-through-none uppercase",
        overdue: "p-1 bg-rose-600 text-white border border-rose-300 uppercase"
    }
    const buttonBaseClass = "flex items-center gap-1 p-2 border border-black w-max uppercase tracking-widest text-[12px] hover:bg-[#9E9E9E] hover:border-[#9E9E9E] hover:text-white transition-colors cursor-pointer"

    return (
        <div className={`flex fixed inset-0 z-50 justify-center md:items-center md:p-4 bg-black/50 backdrop-blur-sm`}>
            <div className="w-full h-full flex flex-col justify-between md:w-[50%] md:h-[90%] bg-white border rounded-xl overflow-y-auto">
                {/* ШАПКА */}
                <header className={headerClass}>
                    <div className={headerWrapperClass}>
                        <div>
                            <p className="tracking-widest uppercase text-[10px] text-[#1E40AF] font-semibold">{t('changeModal.edit')}</p>
                            <h1 className={headerTitleClass}>{t('addModal.title')}</h1>
                        </div>
                        <button className={closeButtonClass} type="button">
                            <Close className="text-[#9E9E9E] hover:text-blue-800 transition-colors w-5 h-5" />
                        </button>
                    </div>
                </header>
                {/* ФОРМА */}
                <form className="flex flex-col gap-3 p-5 h-[100%]">
                    {/* НАЗВАНИЕ ПРОВЕРКИ */}
                    <div className={borderClass}>
                        <p className={titleClass}>{t('table.inspection')}</p>
                        <p>Название текущей проверки</p>
                    </div>
                    {/* ПЛАНОВАЯ ДАТА (ДЛЯ ИНФО - ТОЛЬКО ДЛЯ ЧТЕНИЯ) */}
                    <div className={twMerge(wrapperClass, 'w-auto')}>
                        <label className={titleClass} htmlFor="date-start">{t('table.scheduledDateFull')}</label>
                        <input className={inputClass} id='date-start' name='date-start' type='text' readOnly></input>
                    </div>
                    {/* ДАТА ИСПОЛНЕНИЯ */}
                    <div className={twMerge(wrapperClass, 'w-auto')}>
                        <label className={titleClass} htmlFor="date-start">{t('table.executionDateFull')}</label>
                        <input className={inputClass} id='date-start' name='date-start' type='date'></input>
                    </div>
                    {/* ПЕРЕКЛЮЧЕНИЕ НА СТАТУС "СНЯТО" */}
                    <div className={twMerge(borderClass, "bg-white flex flex-col gap-3")}>
                        <p className={titleClass}>{t('status')} "{t('statuses.removed')}"</p>
                        <label className={twMerge('flex justify-start items-center flex-wrap cursor-pointer')} htmlFor="removed-switch" >
                            <input className="sr-only peer" id="removed-switch" name="removed-switch" type="checkbox"></input>
                            <div className={`relative border w-[49px] h-[23px] rounded-xl border-[#EAE9E2] bg-[#EAE9E2] 
                               peer-checked:bg-green-500 peer-checked:border-green-500 transition-colors duration-200
                                after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:w-[20px] after:h-[19px] after:bg-white after:border after:rounded-full after:border-white
                                 peer-checked:after:translate-x-6 after:transition-transform after:duration-200`}></div>
                            <span className="ml-5">{t('changeModal.switchToRemoved')}</span>
                            {/* добавить смену текста если выбран чекбокс */}
                        </label>
                    </div>
                    {/* ПОКАЗ ТЕКУЩЕГО СТАТУСА */}
                    <div className={borderClass}>
                        <p className={titleClass}>
                            {t('changeModal.currentStatus')}
                            <span className={`${statusStyles.open}`}>Открыто</span>
                        </p>
                    </div>
                </form>
                {/* КНОПКИ */}
                <footer className="flex justify-end items-center gap-3 border-t border-[#EAE9E2] p-4">
                    <button className={twMerge(buttonBaseClass)} type="button">
                        <span>{t('cancel')}</span>
                    </button>
                    <button className={twMerge(buttonBaseClass, 'bg-black', 'text-white')} type="submit">
                        <span>{t('save')}</span>
                    </button>
                </footer>
            </div >
        </div >
    )

}

export default ChangeModal