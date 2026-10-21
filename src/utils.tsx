
import { differenceInDays, isAfter } from 'date-fns';
import { Statuses } from './const';

export const getStatus = (
    scheduledDate: string,
    executionDate: string | null | undefined,
    reportDate: number | string,
    isRemoved: boolean): Statuses => {
    // if (!reportDate) {
    //     throw new Error
    // }

    if (isRemoved) {
        return 'removed'
    }

    const isOverdue = isAfter(reportDate, scheduledDate)

    if (executionDate === null && isOverdue) {
        return 'overdue'
    }

    if (executionDate === null && !isOverdue) {
        return 'open'
    }

    const formattedSheduledDate = new Date(scheduledDate)
    const formattedExecutionDate = executionDate ? new Date(executionDate) : ''
    const difference = differenceInDays(formattedExecutionDate, formattedSheduledDate)

    return difference <= 0 ? 'closed' : 'overdue'
}