import { useTranslation } from 'react-i18next';
import { Issue, RiskLevels, AddModalData } from '../types';
import { useState } from 'react';
import React from 'react';
import Input from './ui/Input';
import SelectInput from './ui/SelectInput';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { addIssue, selectAllIssues } from '../slices/issuesSlice';
import { differenceInDays, parseISO } from 'date-fns';
import { nanoid } from '@reduxjs/toolkit';
import { deepEqual } from '../utils';

interface AddModalProps {
  riskLevels: RiskLevels[];
  departments: string[];
  inspections: string[];
  persons: string[];
  onClose: () => void;
  updateNewIssueData: (key: keyof Issue, value: AddModalData) => void;
  newIssueData: Issue;
  resetData: () => void;
}

interface ErrorsData {
  inspection?: string;
  startInspectionDate?: string;
  endInspectionDate?: string;
  violation?: string;
  recommendation?: string;
  riskLevel?: string;
  scheduledDate?: string;
  departments?: string;
  persons?: string;
}

// стейт errors для валидации кастомных чекбоксов
const errorsInitialState = {
  inspection: '',
  startInspectionDate: '',
  endInspectionDate: '',
  violation: '',
  recommendation: '',
  riskLevel: '',
  scheduledDate: '',
  departments: '',
  persons: '',
};

const AddModal = ({
  riskLevels,
  departments,
  inspections,
  persons,
  onClose,
  updateNewIssueData,
  newIssueData,
  resetData,
}: AddModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [checkboxOpen, setCheckboxOpen] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrorsData>(errorsInitialState);
  const [inspectionType, setInspectionType] = useState<'existed' | 'new'>('new');
  const allIssues = useSelector(selectAllIssues);

  const validateForm = () => {
    const startDate = parseISO(newIssueData.startInspectionDate);
    const endDate = parseISO(newIssueData.endInspectionDate);
    const scheduledDate = parseISO(newIssueData.scheduledDate);
    const newErrors: ErrorsData = { ...errorsInitialState };

    if (newIssueData.inspection.trim() === '') {
      newErrors.inspection = t('errors.inspection');
    }
    if (newIssueData.startInspectionDate === '') {
      newErrors.startInspectionDate = t('errors.startInspectionDate');
    }
    if (newIssueData.endInspectionDate === '') {
      newErrors.endInspectionDate = t('errors.endInspectionDate');
    }
    if (
      newIssueData.startInspectionDate !== '' &&
      newIssueData.endInspectionDate !== '' &&
      differenceInDays(endDate, startDate) < 0
    ) {
      newErrors.endInspectionDate = t('errors.endInspectionDateLength');
    }
    if (newIssueData.auditViolation.trim() === '') {
      newErrors.violation = t('errors.violation');
    }
    if (newIssueData.recommendation.trim() === '') {
      newErrors.recommendation = t('errors.recommendation');
    }
    if (newIssueData.riskLevel === '') {
      newErrors.riskLevel = t('errors.riskLevel');
    }
    if (newIssueData.scheduledDate === '') {
      newErrors.scheduledDate = t('errors.scheduledDate');
    }
    if (
      newIssueData.scheduledDate !== '' &&
      newIssueData.endInspectionDate !== '' &&
      differenceInDays(scheduledDate, endDate) < 0
    ) {
      newErrors.scheduledDate = t('errors.scheduledDateLength');
    }
    if (newIssueData.responsibleDepartment.length === 0) {
      newErrors.departments = t('errors.departments');
    }
    if (newIssueData.responsiblePerson.length === 0) {
      newErrors.persons = t('errors.persons');
    }

    setErrors(newErrors);
    return deepEqual(newErrors, errorsInitialState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addIssue({ ...newIssueData, id: nanoid() }));
      resetData();
      onClose();
    }
  };

  const handleInspectionType = (type: 'new' | 'existed') => {
    setInspectionType(type);
    updateNewIssueData('inspection', '');
    updateNewIssueData('startInspectionDate', '');
    updateNewIssueData('endInspectionDate', '');
    setErrors((prev) => ({
      ...prev,
      inspection: '',
      startInspectionDate: '',
      endInspectionDate: '',
    }));
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-wrap justify-between items-center p-5 gap-3">
        {/* ПРОВЕРКА */}
        <div className="flex gap-2 p-1">
          <Button
            type="button"
            onClick={() => handleInspectionType('existed')}
            className="p-1"
            isActive={inspectionType === 'existed'}
            disabled={allIssues.length === 0}
          >
            {t('addModal.existedInspection')}
          </Button>
          <Button
            type="button"
            onClick={() => handleInspectionType('new')}
            className="p-1"
            isActive={inspectionType === 'new'}
          >
            {t('addModal.newInspection')}
          </Button>
        </div>
        {inspectionType === 'new' ? (
          <Input
            type={'text'}
            labelText={t('table.inspection')}
            id={'inspection'}
            value={newIssueData.inspection}
            onChange={(e) => {
              updateNewIssueData('inspection', e.target.value);
              setErrors((prev) => ({ ...prev, inspection: '' }));
            }}
            wrapperExtraClass="w-full"
            placeholder={t('addModal.inspectionPlaceholder')}
            required={true}
            errorText={errors.inspection}
            className={'normal-case'}
          />
        ) : (
          <SelectInput
            labelText={t('table.inspection')}
            name={'inspection'}
            optionsArrayData={inspections}
            placeholder={t('addModal.addInspection')}
            value={newIssueData.inspection}
            onChange={(e) => {
              updateNewIssueData('inspection', e.target.value);
              setErrors((prev) => ({
                ...prev,
                inspection: '',
                startInspectionDate: '',
                endInspectionDate: '',
              }));
              const inspectionData = allIssues.find(
                (issue: Issue) => issue.inspection === e.target.value,
              );
              updateNewIssueData('startInspectionDate', inspectionData?.startInspectionDate ?? '');
              updateNewIssueData('endInspectionDate', inspectionData?.endInspectionDate ?? '');
            }}
            required={true}
            errorText={errors.inspection}
          />
        )}

        {/* ДАТА НАЧАЛА ПРОВЕРКИ */}
        <Input
          type={'date'}
          labelText={t('table.startInspectionDate')}
          id={'date-start'}
          value={newIssueData.startInspectionDate}
          onChange={(e) => {
            updateNewIssueData('startInspectionDate', e.target.value);
            setErrors((prev) => ({ ...prev, startInspectionDate: '', endInspectionDate: '' }));
          }}
          wrapperExtraClass={'md:w-[45%] w-full'}
          required={true}
          errorText={errors.startInspectionDate}
          disabled={inspectionType === 'existed'}
        />

        {/* ДАТА ОКОНЧАНИЯ ПРОВЕРКИ */}
        <Input
          type={'date'}
          labelText={t('table.endInspectionDate')}
          id={'date-end'}
          value={newIssueData.endInspectionDate}
          onChange={(e) => {
            updateNewIssueData('endInspectionDate', e.target.value);
            setErrors((prev) => ({ ...prev, endInspectionDate: '', scheduledDate: '' }));
          }}
          wrapperExtraClass={'md:w-[45%] w-full'}
          required={true}
          errorText={errors.endInspectionDate}
          disabled={inspectionType === 'existed'}
        />

        {/* НАРУШЕНИЕ */}
        <Textarea
          labelText={t('table.violation')}
          name={'violation'}
          placeholder={t('addModal.violationPlaceholder')}
          value={newIssueData.auditViolation}
          onChange={(e) => {
            updateNewIssueData('auditViolation', e.target.value);
            setErrors((prev) => ({ ...prev, violation: '' }));
          }}
          rows={5}
          required={true}
          widthClass={'w-full'}
          className={'normal-case'}
          errorText={errors.violation}
        />

        {/* РЕКОМЕНДАЦИЯ */}
        <Textarea
          labelText={t('table.recommendation')}
          name={'recommendation'}
          placeholder={t('addModal.recommendationPlaceholder')}
          value={newIssueData.recommendation}
          onChange={(e) => {
            updateNewIssueData('recommendation', e.target.value);
            setErrors((prev) => ({ ...prev, recommendation: '' }));
          }}
          rows={5}
          required={true}
          widthClass={'w-full'}
          className={'normal-case'}
          errorText={errors.recommendation}
        />

        {/* УРОВНИ РИСКА */}
        <SelectInput
          labelText={t('table.riskLevel')}
          name={'risk-level'}
          optionsArrayData={riskLevels}
          placeholder={t('riskLevels.none')}
          value={newIssueData.riskLevel}
          onChange={(e) => {
            updateNewIssueData('riskLevel', e.target.value);
            setErrors((prev) => ({ ...prev, riskLevel: '' }));
          }}
          widthClass={'md:w-[45%] w-full'}
          translateFn={(word) => t(`riskLevels.${word}`)}
          required={true}
          errorText={errors.riskLevel}
        />

        {/* ПЛАНОВАЯ ДАТА */}
        <Input
          type={'date'}
          labelText={t('table.scheduledDate')}
          id={'sheduled-date'}
          value={newIssueData.scheduledDate}
          onChange={(e) => {
            updateNewIssueData('scheduledDate', e.target.value);
            setErrors((prev) => ({ ...prev, scheduledDate: '' }));
          }}
          wrapperExtraClass={'md:w-[45%] w-full'}
          required={true}
          errorText={errors.scheduledDate}
        />

        {/* ОТВЕТСТВЕННОЕ ССП */}
        <Checkbox
          id={'departments'}
          options={departments}
          placeholder={t('addModal.addDepartment')}
          className={'md:text-[15px]'}
          value={newIssueData.responsibleDepartment}
          onChange={(data: string[]) => {
            updateNewIssueData('responsibleDepartment', data);
            setErrors((prev) => ({ ...prev, departments: '' }));
          }}
          isOpen={checkboxOpen === 'departments'}
          labelText={t('table.responsibleDepartment')}
          setCheckboxOpen={setCheckboxOpen}
          isBottom={true}
          isHeightFitContent={true}
          isRequired={true}
          errorText={errors.departments}
        />

        {/* ОТВЕТСТВЕННОЕ ЛИЦО */}
        <Checkbox
          id={'person'}
          options={persons}
          placeholder={t('addModal.addPerson')}
          className={'md:text-[15px]'}
          value={newIssueData.responsiblePerson}
          onChange={(data: string[]) => {
            updateNewIssueData('responsiblePerson', data);
            setErrors((prev) => ({ ...prev, persons: '' }));
          }}
          labelText={t('table.responsiblePerson')}
          isOpen={checkboxOpen === 'person'}
          setCheckboxOpen={setCheckboxOpen}
          isBottom={true}
          isHeightFitContent={true}
          isRequired={true}
          errorText={errors.persons}
        />
      </div>

      {/* ФУТЕР: КНОПКИ */}
      <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
        <Button
          type="button"
          onClick={() => {
            resetData();
            onClose();
          }}
        >
          {t('cancel')}
        </Button>

        <Button type="submit" variant="secondary">
          {t('save')}
        </Button>
      </footer>
    </form>
  );
};

export default AddModal;
