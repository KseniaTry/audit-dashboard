import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { Statuses } from '../types';
import Input from './ui/Input';
import Button from './ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setReportDate } from '../slices/issuesSlice';
import { format, differenceInCalendarDays, parseISO } from 'date-fns';
import { calculateCount, deepEqual } from '../utils';
import { selectIssuesWithStatuses } from '../slices/issuesSlice';
import { useState } from 'react';

interface ManagementReportData {
  statuses: Statuses[];
  onClose: () => void;
}

interface ManagementReportErrorsData {
  reportDate: string
}

const ManagementReport = ({ statuses, onClose }: ManagementReportData) => {
  const { t } = useTranslation();
  const initialManagementReportError = {
    reportDate: ''
  }
  const dispatch = useDispatch()
  const reportDate = useSelector((state: RootState) => state.issues.reportDate);
  const allIssues = useSelector(selectIssuesWithStatuses);
  const formattedReportDate = reportDate ? format(parseISO(reportDate), 'dd.MM.yyyy') : `-`
  // пересчитываем данные если дата отчета ранее даты окончания проверки 
  const modifiedIssues = reportDate ? allIssues.filter((issue) => differenceInCalendarDays(parseISO(reportDate), parseISO(issue.endInspectionDate)) >= 0) : []
  const statusesCounts = calculateCount(modifiedIssues, 'status')
  const totalCount = modifiedIssues.length
  const completionPercents = totalCount > 0 ? Math.round((1 - (((statusesCounts.open ?? 0) + (statusesCounts.overdue ?? 0)) / totalCount)) * 100) : 0
  const [errors, setErrors] = useState<ManagementReportErrorsData>(initialManagementReportError)

  const validateForm = () => {
    const newErrors: ManagementReportErrorsData = { ...initialManagementReportError }
    if (reportDate === '') {
      newErrors.reportDate = t('errors.reportDate')
    }
    setErrors(newErrors)
    return deepEqual(newErrors, initialManagementReportError)
  }

  const handleDownload = () => {
    if (validateForm()) {
      console.log('correct')
    }
  }

  // классы
  const countBaseClass = 'text-[17px] font-bold';
  const listItemClass =
    'flex justify-between items-center bg-field-bg p-4 border border-border-warm tracking-wide';
  const countClass = {
    open: 'text-status-open ',
    closed: 'text-status-closed',
    removed: 'text-text-main',
    overdue: 'text-status-overdue',
  };

  return (
    <form>
      <div className="flex flex-col flex-wrap p-5 gap-4">
        <p className="tracking-wide">{t('managementReport.text', { reportDate: formattedReportDate })}</p>
        <Input
          type={'date'}
          labelText={t('reportDate')}
          id={'report-date'}
          value={reportDate}
          onChange={(e) => {
            dispatch(setReportDate(e.target.value))
            setErrors((prev) => ({ ...prev, reportDate: '' }))
          }}
          wrapperExtraClass={'w-auto'}
          required={true}
          errorText={errors.reportDate}
        />

        <div className="border border-border-warm bg-light p-1">
          <h2 className="tracking-widest uppercase text-[14px] p-1 my-2">
            {t('managementReport.preview')}
          </h2>
          <ul>
            <li className={listItemClass}>
              <p>{t('managementReport.total')}:</p>
              <p className={countBaseClass}>{totalCount}</p>
            </li>
            {statuses.map((status) => {
              const count = statusesCounts[status] ? statusesCounts[status] : 0
              return (
                <li key={status} className={listItemClass}>
                  <p>{t(`statuses.${status}`)}:</p>
                  <p className={twMerge(countBaseClass, countClass[status])}>{count}</p>
                </li>
              );
            })}
            <li className={listItemClass}>
              <p>{t('managementReport.percents')}:</p>
              <p className={countBaseClass}>{completionPercents}%</p>
            </li>
          </ul>
        </div>
      </div>
      <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
        <Button type="button" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button
          type="button"
          onClick={handleDownload}
          variant="secondary"
        >
          {t('download')}
        </Button>
      </footer>
    </form>
  );
};

export default ManagementReport;
