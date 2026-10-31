
import { differenceInDays, isAfter } from 'date-fns';
import { Statuses, Issue } from './types';

export const getStatus = (
    scheduledDate: string,
    executionDate: string | null | undefined,
    reportDate: number | string,
    isRemoved: boolean): Statuses => {
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

export const divideIssues = (issues: Issue[], size: number): Issue[][] => {
    const result: Issue[][] = [];
    for (let i = 0; i < issues.length; i += size) {
        result.push(issues.slice(i, i + size));
    }
    return result
}

