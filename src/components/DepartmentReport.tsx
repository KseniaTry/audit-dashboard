import { useTranslation } from 'react-i18next';
import SelectInput from './ui/SelectInput';
import Button from './ui/Button';
import Input from './ui/Input';
import { deepEqual } from '../utils';
import { exportToExcel } from '../exportIssuesToExcel';
import { Issue } from '../types';
import { useState } from 'react';
import { DepartmentReportData } from '../types';
import { useDispatch } from 'react-redux';
import { setReportDate } from '../slices/issuesSlice';

interface DepartmentReportProps {
  departments: string[];
  onClose: () => void;
  issues: Issue[],
  departmentReportData: DepartmentReportData;
  updateDepartmentReportData: (key: keyof DepartmentReportData, value: string) => void;
}

interface DepartmentReportErrorsData {
  department: string,
  reportDate: string,
}

const departmentReportErrorsInitial = {
  department: '',
  reportDate: ''
}

const DepartmentReport = ({ departments, onClose, issues, departmentReportData, updateDepartmentReportData }: DepartmentReportProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const [errors, setErrors] = useState<DepartmentReportErrorsData>(departmentReportErrorsInitial)

  const validateForm = () => {
    const newErrors: DepartmentReportErrorsData = { ...departmentReportErrorsInitial };
    if (departmentReportData.department === '') {
      newErrors.department = t('errors.singleDepartment')
    }
    if (departmentReportData.reportDate === '') {
      newErrors.reportDate = t('errors.reportDate')
    }
    setErrors(newErrors);
    return deepEqual(newErrors, departmentReportErrorsInitial);
  }

  const handleDownload = async () => {
    if (validateForm()) {
      const translateFn = (key: string, word: string) => t(`${key}.${word}`)
      const fileName = `Отчет по поручениям (${departmentReportData.department})`
      await exportToExcel({ issues, fileName, translateFn })
    }
  }

  return (
    <form>
      <div className="flex flex-col flex-wrap p-5 gap-4">
        <p className="tracking-wide">{t('departmentReport.text')}</p>
        <Input
          type="date"
          labelText={t('reportDate')}
          value={departmentReportData.reportDate}
          onChange={(e) => {
            updateDepartmentReportData('reportDate', e.target.value)
            setErrors((prev) => ({ ...prev, reportDate: '' }))
            dispatch(setReportDate(e.target.value))
          }}
          wrapperExtraClass="flex-row items-center flex-nowrap"
          labelClass='text-[13px]'
          className="w-auto"
          required={true}
          errorText={errors.reportDate}
        />
        <SelectInput
          labelText={t('table.responsibleDepartment')}
          name={'department'}
          optionsArrayData={departments}
          widthClass={'w-full'}
          placeholder={t('filters.allDepartments')}
          value={departmentReportData.department}
          onChange={(e) => {
            updateDepartmentReportData('department', e.target.value)
            setErrors((prev) => ({ ...prev, department: '' }));
          }}
          required={true}
          errorText={errors.department}
        />
      </div>
      {/* ФУТЕР: КНОПКИ */}
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

export default DepartmentReport;
