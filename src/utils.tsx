import { differenceInDays, isAfter } from 'date-fns';
import { Statuses, Issue } from './types';

export const getStatus = (
  scheduledDate: string,
  executionDate: string | null | undefined,
  reportDate: number | string,
  isRemoved: boolean,
): Statuses => {
  if (isRemoved) {
    return 'removed';
  }

  const isOverdue = isAfter(reportDate, scheduledDate);

  if (executionDate === null && isOverdue) {
    return 'overdue';
  }

  if (executionDate === null && !isOverdue) {
    return 'open';
  }

  const formattedSheduledDate = new Date(scheduledDate);
  const formattedExecutionDate = executionDate ? new Date(executionDate) : '';
  const difference = differenceInDays(formattedExecutionDate, formattedSheduledDate);

  return difference <= 0 ? 'closed' : 'overdue';
};

export const divideIssues = (issues: Issue[], size: number): Issue[][] => {
  const result: Issue[][] = [];
  for (let i = 0; i < issues.length; i += size) {
    result.push(issues.slice(i, i + size));
  }
  return result;
};

// для глубокого сравнения объектов
export const deepEqual = (obj1, obj2): boolean => {
  if (obj1 === obj2) return true;

  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

// analytics для расчета процентов и общего кол-ва issues
export const calculatePercents = <T extends string>(keys: T[], counts: Record<T, number>, totalCount: number) => {
  const result = {} as Record<T, number>

  for (const key of keys) {
    result[key] = totalCount === 0 ? 0 : (counts[key] ?? 0) / totalCount * 100
  }
  return result
}

export const calculateCount = <K extends 'riskLevel' | 'status'>(issues: Issue[], category: K) => {
  type PropertyValue = Issue[K] & string;
  return issues.reduce(
    (acc, issue) => {
      const key = issue[category] as PropertyValue;

      if (!key) return acc;

      if (key in acc) {
        acc[key] += 1;
      } else {
        acc[key] = 1;
      }
      return acc;
    },
    {} as Record<PropertyValue, number>,
  );
};