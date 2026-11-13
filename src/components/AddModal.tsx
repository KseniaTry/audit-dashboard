import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import { Issue, RiskLevels, AddModalData } from '../types';
import { useState } from 'react';
import React from 'react';
import Input from './ui/Input';
import SelectInput from './ui/SelectInput';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import Checkbox from './ui/Checkbox';
import { useDispatch } from 'react-redux';
import { addIssue } from '../slices/issuesSlice';
import { differenceInDays, parseISO } from 'date-fns';
import { nanoid } from '@reduxjs/toolkit';
import { deepEqual } from '../utils';

interface AddModalProps {
  riskLevels: RiskLevels[];
  departments: string[];
  persons: string[];
  onClose: () => void;
  updateNewIssueData: (key: keyof Issue, value: AddModalData) => void;
  newIssueData: Issue
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

const AddModal = ({ riskLevels, departments, persons, onClose, updateNewIssueData, newIssueData }: AddModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [checkboxOpen, setCheckboxOpen] = useState<string | null>(null)

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
  }

  const [errors, setErrors] = useState<ErrorsData>(errorsInitialState)
  console.log(newIssueData)

  const validateForm = () => {
    const startDate = parseISO(newIssueData.startInspectionDate)
    const endDate = parseISO(newIssueData.endInspectionDate)
    const scheduledDate = parseISO(newIssueData.scheduledDate)
    const newErrors: ErrorsData = { ...errorsInitialState }

    if (newIssueData.inspection.trim() === '') {
      newErrors.inspection = 'Введите название проверки'
    }
    if (newIssueData.startInspectionDate === '') {
      newErrors.startInspectionDate = 'Введите дату начала проверки'
    }
    if (newIssueData.endInspectionDate === '') {
      newErrors.endInspectionDate = 'Введите дату окончания проверки'
    }
    if (differenceInDays(endDate, startDate) < 0) {
      newErrors.endInspectionDate = 'Дата окончания проверки должна быть позднее даты начала проверки'
    }
    if (newIssueData.auditViolation.trim() === '') {
      newErrors.violation = 'Опишите выявленное нарушение'
    }
    if (newIssueData.recommendation.trim() === '') {
      newErrors.recommendation = 'Опишите рекомендацию'
    }
    if (newIssueData.riskLevel === '') {
      newErrors.riskLevel = 'Выберите уровень риска'
    }
    if (newIssueData.scheduledDate === '') {
      newErrors.scheduledDate = 'Введите плановую дату исполнения поручения'
    }
    if (differenceInDays(scheduledDate, endDate) < 0) {
      newErrors.endInspectionDate = 'Плановая дата исполнения поручения должна быть позднее даты окончания проверки'
    }
    if (newIssueData.responsibleDepartment.length === 0) {
      newErrors.departments = 'Выберите хотя бы одно ответственное ССП'
    }
    if (newIssueData.responsiblePerson.length === 0) {
      newErrors.persons = 'Выберите хотя бы одно ответственное лицо'
    }

    setErrors(newErrors)
    return deepEqual(newErrors, errorsInitialState)
  }

  const wrapperClass = 'flex flex-col flex-wrap gap-2';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(addIssue({ ...newIssueData, id: nanoid() }))
      onClose()
    } else {
      console.log(errors)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex flex-wrap justify-between items-center p-5 gap-3">
        {/* ВЫБОР ПРОВЕРКИ */}
        <div className={twMerge(wrapperClass, 'w-full')}>
          <ul className="hidden">
            {departments.map((department) => {
              return <li key={department}>{department}</li>;
            })}
          </ul>
          <Input
            type={'text'}
            labelText={t('table.inspection')}
            id={'inspection'}
            value={newIssueData.inspection}
            onChange={(e) => updateNewIssueData('inspection', e.target.value)}
            placeholder="Название проверки"
            required={true}
            className={'normal-case'}
          />
          <span className={errors.inspection === '' ? 'hidden' : 'block'}>{errors.inspection}</span>
        </div>

        {/* ДАТА НАЧАЛА ПРОВЕРКИ */}
        <Input
          type={'date'}
          labelText={t('table.startInspectionDate')}
          id={'date-start'}
          value={newIssueData.startInspectionDate}
          onChange={(e) => updateNewIssueData('startInspectionDate', e.target.value)}
          wrapperExtraClass={'w-[45%]'}
          required={true}
        />
        <span className={errors.startInspectionDate === '' ? 'hidden' : 'block'}>{errors.startInspectionDate}</span>

        {/* ДАТА ОКОНЧАНИЯ ПРОВЕРКИ */}
        <Input
          type={'date'}
          labelText={t('table.endInspectionDate')}
          id={'date-end'}
          value={newIssueData.endInspectionDate}
          onChange={(e) => updateNewIssueData('endInspectionDate', e.target.value)}
          wrapperExtraClass={'w-[45%]'}
          required={true}
        />
        <span className={errors.endInspectionDate === '' ? 'hidden' : 'block'}>{errors.endInspectionDate}</span>

        {/* НАРУШЕНИЕ */}
        <Textarea
          labelText={t('table.violation')}
          name={'violation'}
          placeholder={t('addModal.violationPlaceholder')}
          value={newIssueData.auditViolation}
          onChange={(e) => updateNewIssueData('auditViolation', e.target.value)}
          rows={5}
          required={true}
          widthClass={'w-full'}
          className={'normal-case'}
        />
        <span className={errors.violation === '' ? 'hidden' : 'block'}>{errors.violation}</span>

        {/* РЕКОМЕНДАЦИЯ */}
        <Textarea
          labelText={t('table.recommendation')}
          name={'recommendation'}
          placeholder={t('addModal.recommendationPlaceholder')}
          value={newIssueData.recommendation}
          onChange={(e) => updateNewIssueData('recommendation', e.target.value)}
          rows={5}
          required={true}
          widthClass={'w-full'}
          className={'normal-case'}
        />
        <span className={errors.recommendation === '' ? 'hidden' : 'block'}>{errors.recommendation}</span>

        {/* УРОВНИ РИСКА */}
        <SelectInput
          labelText={t('table.riskLevel')}
          name={'risk-level'}
          optionsArrayData={riskLevels}
          placeholder={t('riskLevels.all')}
          value={newIssueData.riskLevel}
          onChange={(e) => updateNewIssueData('riskLevel', e.target.value)}
          widthClass={'w-[45%]'}
          translateFn={(word) => t(`riskLevels.${word}`)}
          required={true}
        />
        <span className={errors.riskLevel === '' ? 'hidden' : 'block'}>{errors.riskLevel}</span>

        {/* ПЛАНОВАЯ ДАТА */}
        <Input
          type={'date'}
          labelText={t('table.scheduledDate')}
          id={'sheduled-date'}
          value={newIssueData.scheduledDate}
          onChange={(e) => updateNewIssueData('scheduledDate', e.target.value)}
          wrapperExtraClass={'w-[45%]'}
          required={true}
        />
        <span className={errors.scheduledDate === '' ? 'hidden' : 'block'}>{errors.scheduledDate}</span>

        {/* ОТВЕТСТВЕННОЕ ССП */}
        <div className={twMerge(wrapperClass, 'w-full')}>
          <p className="tracking-widest uppercase text-[14px]">
            {t('table.responsibleDepartment')}
            <span className="text-red-500 ml-1">*</span>
            <span className={errors.departments === '' ? 'hidden' : 'block'}>{errors.departments}</span>
          </p>
          <Checkbox
            id={'departments'}
            options={departments}
            placeholder={t('addModal.addDepartment')}
            className={'md:text-[15px]'}
            value={newIssueData.responsibleDepartment}
            onChange={(data: string[]) => updateNewIssueData('responsibleDepartment', data)}
            isOpen={checkboxOpen === 'departments'}
            setCheckboxOpen={setCheckboxOpen}
            isBottom={true}
            isHeightFitContent={true}
          />
        </div>

        {/* ОТВЕТСТВЕННОЕ ЛИЦО */}
        <div className={twMerge(wrapperClass, 'w-full')}>
          <p className="tracking-widest uppercase text-[14px]">
            {t('table.responsiblePerson')}
            <span className="text-red-500 ml-1">*</span>
            <span className={errors.persons === '' ? 'hidden' : 'block'}>{errors.persons}</span>
          </p>
          <Checkbox
            id={'person'}
            options={persons}
            placeholder={t('addModal.addPerson')}
            className={'md:text-[15px]'}
            value={newIssueData.responsiblePerson}
            onChange={(data: string[]) => updateNewIssueData('responsiblePerson', data)}
            isOpen={checkboxOpen === 'person'}
            setCheckboxOpen={setCheckboxOpen}
            isBottom={true}
            isHeightFitContent={true}
          />
        </div>
      </div>

      {/* ФУТЕР: КНОПКИ */}
      <footer className="flex justify-end items-center gap-3 border-t border-border-warm p-4">
        <Button type="button" onClick={onClose}>
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
