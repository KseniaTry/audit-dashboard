import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

const ChangeModal = () => {

    const { t } = useTranslation()
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

    return (
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
    )
}

export default ChangeModal