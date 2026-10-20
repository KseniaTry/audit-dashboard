import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"
import Input from "./ui/Input"
import Switch from "./ui/Switch"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { RootState } from "../store"
import React from "react"
import { format } from "date-fns"
import Button from "./ui/Button"
import { changeIssue, deleteIssue } from "../slices/issuesSlice"
import { getStatus } from "../utils"

interface ChangeModalData {
    issueId: number,
    onClose: () => void
}

const ChangeModal = ({ issueId, onClose }: ChangeModalData) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const [switchActive, setSwitchActive] = useState<boolean>(false)
    const activeIssue = useSelector((state: RootState) => state.issues.entities[issueId])
    const reportDate = useSelector((state: RootState) => state.issues.reportDate)
    const [currentScheduledDate, setSheduledDate] = useState<string>(activeIssue?.scheduledDate)
    const [currentExecutionDate, setExecutionDate] = useState<string>(activeIssue?.executionDate ?? '')

    if (!activeIssue) return null

    const activeStatus = getStatus(currentScheduledDate, currentExecutionDate, reportDate, switchActive)

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSwitchActive(e.target.checked)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const changes = {
            id: issueId,
            changes: {
                scheduledDate: format(new Date(currentScheduledDate), 'yyyy-MM-dd'),
                executionDate: currentExecutionDate === '' ? null : format(new Date(currentExecutionDate), 'yyyy-MM-dd'),
                isRemoved: switchActive
            }
        }

        dispatch(changeIssue(changes))
        onClose()
    }

    const borderClass = "border border-border-warm bg-light p-4"
    const titleClass = "tracking-widest uppercase text-[14px]"
    const statusStyles = {
        open: "p-1 bg-warning/10 text-status-warning border border-open uppercase",
        closed: "p-1 bg-success/10 border border-success text-success uppercase",
        removed: "p-1 bg-neutral/10 text-neutral line-through-none uppercase",
        overdue: "p-1 bg-danger/10 text-danger border border-danger uppercase"
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-5 h-full">
            {/* НАЗВАНИЕ ПРОВЕРКИ */}
            <div className={twMerge(borderClass, 'flex flex-col gap-1')}>
                <p className={titleClass}>{t('table.inspection')}</p>
                <p>{t('table.number')} {issueId} - {activeIssue.inspection}</p>
            </div>
            {/* ПЛАНОВАЯ ДАТА (ДЛЯ ИНФО - ТОЛЬКО ДЛЯ ЧТЕНИЯ) */}
            <Input
                type={'date'}
                labelText={t('table.scheduledDateFull')}
                id={'scheduled-date'}
                value={currentScheduledDate}
                onChange={(e) => setSheduledDate(e.target.value)}
                wrapperExtraClass={'w-auto'}
            />

            {/* ДАТА ИСПОЛНЕНИЯ */}
            <Input
                type={'date'}
                labelText={t('table.executionDateFull')}
                id={'execution-date'}
                value={currentExecutionDate}
                onChange={(e) => setExecutionDate(e.target.value)}
                wrapperExtraClass={'w-auto'}
            />

            {/* ПЕРЕКЛЮЧЕНИЕ НА СТАТУС "СНЯТО" */}
            <div className={twMerge(borderClass, "bg-field-bg flex flex-col gap-3")}>
                <p className={titleClass}>{t('status')} "{t('statuses.removed')}"</p>
                <Switch
                    text={t('changeModal.switchToRemoved')}
                    id={'removed-switch'}
                    name={'removed-switch'}
                    onChange={handleSwitchChange}
                    checked={switchActive} />
            </div>
            {/* ПОКАЗ ТЕКУЩЕГО СТАТУСА */}
            <div className={borderClass}>
                <p className={titleClass}>
                    {t('changeModal.currentStatus')}
                    <span className={statusStyles[activeStatus]}>{t(`statuses.${activeStatus}`)}</span>
                </p>
            </div>
            {/* КНОПКИ */}
            <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
                <Button
                    type='button'
                    onClick={onClose}
                >
                    {t('cancel')}
                </Button>
                <Button
                    variant="delete"
                    onClick={() => {
                        onClose()
                        dispatch(deleteIssue(issueId))
                    }}>
                    {t('delete')}
                </Button>
                <Button
                    type='submit'
                    variant="secondary"
                >
                    {t('save')}
                </Button>
            </footer>
        </form>
    )
}

export default ChangeModal