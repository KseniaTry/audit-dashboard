import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import Input from "./ui/Input"
import Switch from "./ui/Switch"

const ChangeModal = () => {
    const { t } = useTranslation()

    const borderClass = "border border-border-warm bg-light p-4"
    const titleClass = "tracking-widest uppercase text-[14px]"
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
            <Input
                type={'text'}
                labelText={t('table.scheduledDateFull')}
                id={'scheduled-date'}
                wrapperExtraClass={'w-auto'}
                readOnly={true} />

            {/* ДАТА ИСПОЛНЕНИЯ */}
            <Input
                type={'date'}
                labelText={t('table.executionDateFull')}
                id={'execution-date'}
                wrapperExtraClass={'w-auto'}
                required={true} />

            {/* ПЕРЕКЛЮЧЕНИЕ НА СТАТУС "СНЯТО" */}
            <div className={twMerge(borderClass, "bg-field-bg flex flex-col gap-3")}>
                <p className={titleClass}>{t('status')} "{t('statuses.removed')}"</p>
                <Switch
                    text={t('changeModal.switchToRemoved')}
                    id={'removed-switch'}
                    name={'removed-switch'} />
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