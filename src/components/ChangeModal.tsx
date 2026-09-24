import { useTranslation } from "react-i18next"
import Close from "./icons/Close"
import { twMerge } from "tailwind-merge"

const ChangeModal = () => {
    const { t } = useTranslation()
    const headerClass = "bg-light p-4 border-b border-b-border-warm"
    const closeButtonClass = "flex items-center justify-center w-10 h-10 cursor-pointer"
    const headerTitleClass = "w-full text-[23px]"
    const headerWrapperClass = "flex flex-wrap items-center justify-between gap-3 md:gap-2"
    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const borderClass = "border border-border-warm bg-light p-4"
    const titleClass = "tracking-widest uppercase text-[14px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"
    const statusStyles = {
        open: "p-1 bg-status-open/5 text-status-open border border-status-open uppercase",
        closed: "p-1 bg-status-closed/5 border border-status-closed text-status-closed uppercase",
        removed: "p-1 bg-status-removed/5 text-status-removed line-through-none uppercase",
        overdue: "p-1 bg-status-overdue/5 text-text-light border border-status-overdue uppercase"
    }
    const buttonBaseClass = "flex items-center gap-1 p-2 border border-border-dark w-max uppercase tracking-widest text-[14px] hover:bg-secondary-btn-bg/20 hover:border-secondary-btn-bg  hover:text-text-main transition-colors cursor-pointer"

    return (
        <div className={`hidden flex fixed inset-0 z-50 justify-center md:items-center md:p-4 bg-black/50 backdrop-blur-sm`}>
            <div className="w-full h-full flex flex-col justify-between md:w-[50%] md:h-max bg-field-bg border rounded-xl overflow-y-auto">
                {/* ШАПКА */}
                <header className={headerClass}>
                    <div className={headerWrapperClass}>
                        <div>
                            <p className="tracking-widest uppercase text-[10px] md:text-[11px] text-accent font-semibold">{t('changeModal.edit')}</p>
                            <h1 className={headerTitleClass}>{t('addModal.title')}</h1>
                        </div>
                        <button className={closeButtonClass} type="button">
                            <Close className="text-text-muted hover:text-accent transition-colors w-5 h-5" />
                        </button>
                    </div>
                </header>
                {/* ФОРМА */}
                <form className="flex flex-col gap-3 p-5 h-full">
                    {/* НАЗВАНИЕ ПРОВЕРКИ */}
                    <div className={twMerge(borderClass, 'flex flex-col gap-1')}>
                        <p className={titleClass}>{t('table.inspection')}</p>
                        <p>{t('table.number')} Номер проверки - Название текущей проверки</p>
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
                    <div className={twMerge(borderClass, "bg-field-bg flex flex-col gap-3")}>
                        <p className={titleClass}>{t('status')} "{t('statuses.removed')}"</p>
                        <label className={twMerge('flex justify-start items-center flex-wrap cursor-pointer')} htmlFor="removed-switch" >
                            <input className="sr-only peer" id="removed-switch" name="removed-switch" type="checkbox"></input>
                            <div className={`relative border w-[49px] h-[23px] rounded-xl border-border-warm bg-border-warm 
                               peer-checked:bg-accent peer-checked:border-accent transition-colors duration-200
                                after:content-[''] after:absolute after:top-[1px] after:left-[2px] after:w-[20px] after:h-[19px] after:bg-base-btn-bg after:border 
                                after:rounded-full after:border-field-bg peer-checked:after:translate-x-6 after:transition-transform after:duration-200`}></div>
                            <span className="ml-5 text-text-muted tracking-wide font-semibold ">{t('changeModal.switchToRemoved')}</span>
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
                <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
                    <button className={twMerge(buttonBaseClass)} type="button">
                        <span>{t('cancel')}</span>
                    </button>
                    <button className={twMerge(buttonBaseClass, 'bg-btn-dark', 'text-text-light')} type="submit">
                        <span>{t('save')}</span>
                    </button>
                </footer>
            </div >
        </div >
    )
}

export default ChangeModal