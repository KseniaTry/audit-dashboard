import { Issue, RiskLevels, Statuses } from '../types';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';
import Button from './ui/Button';
import { useState } from 'react';
import { format } from 'date-fns';
import { statusVariants, riskLevelVariants, colorClasses } from '../const';

// блок аналитика показывает:
// 1. общую картину по статусам и рискам по всем выданным поручениям за выбранный год. 
// также можно посмотреть, какие поручения сейчас находятся на контроле (статус "в работе" и "просрочено")
// 2. отфильтрованные поручения. если пользователь выбрал хоть один фильтр, автоматически данные в палени аналитики переключаются на отфильтрованные, 
// при этом видно общее количество таких поручений (допустим 2/ 10)
interface AnalyticsProps {
  riskLevels: RiskLevels[];
  statuses: Statuses[];
  years: string[];
  issues: Issue[];
  isFilterActive?: boolean;
}

const calculateRisksPercents = (counts: Record<RiskLevels, number>, totalCount: number) => {
  if (totalCount === 0) {
    return { low: 0, medium: 0, high: 0 };
  }

  return {
    low: counts.low ? (counts.low / totalCount) * 100 : 0,
    medium: counts.medium ? (counts.medium / totalCount) * 100 : 0,
    high: counts.high ? (counts.high / totalCount) * 100 : 0,
  };
};

const calculateStatusesPercents = (counts: Record<Statuses, number>, totalCount: number) => {
  if (totalCount === 0) {
    return { open: 0, closed: 0, removed: 0, overdue: 0 };
  }
  console.log(counts.overdue / totalCount * 100)
  return {
    open: counts.open ? (counts.open / totalCount) * 100 : 0,
    closed: counts.closed ? (counts.closed / totalCount) * 100 : 0,
    removed: counts.removed ? (counts.removed / totalCount) * 100 : 0,
    overdue: counts.overdue ? (counts.overdue / totalCount) * 100 : 0,
  };
};

const calculateCount = <K extends 'riskLevel' | 'status'>(issues: Issue[], category: K) => {
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

const Analytics = ({ riskLevels, statuses, years, issues, isFilterActive }: AnalyticsProps) => {
  const { t } = useTranslation();
  const [activeYear, setActiveYear] = useState<null | string>(null);
  const [tabActive, setTabActive] = useState<'all' | 'active'>('all');
  let targetIssues: Issue[] // все issues
  let yearIssues: Issue[] // фильтрованный список по годам 

  // получаем данные по году если включен соответствующий фильтр в аналитике (по годам)
  if (activeYear !== null && !isFilterActive) {
    yearIssues = issues.filter(
      (issue) => format(new Date(issue.startInspectionDate), 'yyyy') === activeYear,
    );
  } else {
    yearIssues = issues
  }

  // получаем только активные issues по статусу open и overdue
  const activeIssues = yearIssues.filter((issue) => issue.status === 'open' || issue.status === 'overdue')

  // формируем целевой массив issues исходя из включенного фильтра (Filters) и (или) таба active / all
  if (isFilterActive) {
    targetIssues = issues
  } else if (tabActive === 'active') {
    targetIssues = activeIssues
  } else {
    targetIssues = yearIssues
  }

  const totalIssues = yearIssues.length
  const totalActiveIssues = activeIssues.length; // активные поручения в зависимости от выбранного таба

  const statusesCounts = calculateCount(targetIssues, 'status')
  const risksCounts = calculateCount(targetIssues, 'riskLevel')
  const statusesPercents = calculateStatusesPercents(statusesCounts, targetIssues.length)
  const risksPercents = calculateRisksPercents(risksCounts, targetIssues.length)

  // стили
  const blockWrapperClass = 'w-full flex flex-wrap gap-[0px]';
  const titleClass = 'uppercase tracking-widest font-bold text-[12px] mb-3';
  const cardClass = 'w-full h-[130px] p-2 rounded-xl shadow-sm bg-card-bg max-[450px]:w-[48%]';
  const cardsWrapperClass = 'flex gap-2 flex-nowrap w-full';
  const cardsWrapperMobileClass =
    'max-[450px]:flex-wrap max-[450px]:gap-1 max-[450px]:justify-between'; // отдельный класс для того чтобы применить перенос карточек только для статусов, а для рисков - оставить
  const cardTitleClass = 'font-bold uppercase tracking-widest text-[10px] md:text-[16px]';
  const violationCountClass = 'md:text-[27px] tracking-widest text-[20px] font-bold';
  const stripeWrapperClass = 'flex h-[7px] rounded-full overflow-hidden mt-1 w-full';
  const tabsHiddenClass = isFilterActive ? 'hidden' : 'flex'

  return (
    <section className="p-4 flex flex-wrap gap-[20px] w-full">
      <div className={twMerge('flex flex-col gap-2', tabsHiddenClass)}>
        {/* ГОДЫ */}
        <div className="flex w-full gap-2 flex-wrap whitespace-normal">
          <Button
            type="button"
            isActive={activeYear === null}
            onClick={() => setActiveYear(null)}
            className="md:text-[12px] text-[10px]"
          >
            {t('filters.allYears')}
          </Button>
          {years.map((year) => {
            return (
              <Button
                type="button"
                key={year}
                isActive={activeYear === year}
                onClick={() => setActiveYear(year)}
                className="md:text-[12px] text-[10px]"
              >
                {year}
              </Button>
            );
          })}
        </div>
        {/* ТАБЫ */}
        <div className="flex gap-3">
          <Button type="button" isActive={tabActive === 'all'} onClick={() => setTabActive('all')}>
            {t('analytics.totalIssues')} <span>({totalIssues})</span>
          </Button>
          <Button
            type="button"
            isActive={tabActive === 'active'}
            onClick={() => setTabActive('active')}
          >
            {t('analytics.totalActiveIssues')} <span>({totalActiveIssues})</span>
          </Button>
        </div>
      </div>

      {/* ВСЕ РИСКИ */}
      <div className={blockWrapperClass}>
        {/* блоки */}
        <h2 className={titleClass}>{isFilterActive ? t('analytics.filteredRisks') : t('analytics.allRisks')}</h2>
        <div className={cardsWrapperClass}>
          {riskLevels.map((riskLevel) => {
            const variant = riskLevelVariants[riskLevel];
            const count = risksCounts[riskLevel] ?? 0;
            return (
              <div key={riskLevel} className={twMerge(cardClass)}>
                <h3 className={cardTitleClass}>{t(`riskLevels.${riskLevel}`)}</h3>
                <p className={twMerge(violationCountClass, colorClasses[variant], 'bg-field-bg')}>
                  {isFilterActive ? `${count}/ ${issues.length}` : count}
                </p>
              </div>
            );
          })}
        </div>
        {/* полоса */}
        <div className={stripeWrapperClass}>
          {riskLevels.map((riskLevel) => {
            const variant = riskLevelVariants[riskLevel];
            return (
              <div
                key={riskLevel}
                style={{ width: `${risksPercents[riskLevel]}%` }}
                className={twMerge(colorClasses[variant], 'h-full')}
              ></div>
            );
          })}
        </div>
      </div>

      {/* ВСЕ СТАТУСЫ */}
      <div className={blockWrapperClass}>
        {/* блоки */}
        <h2 className={titleClass}>{isFilterActive ? t('analytics.filteredStatuses') : t('analytics.allStatuses')}</h2>
        <div className={twMerge(cardsWrapperClass, cardsWrapperMobileClass)}>
          {statuses.map((status) => {
            const variant = statusVariants[status];
            const statusCount = statusesCounts[status] ?? 0;
            return (
              <div
                key={status}
                className={twMerge(
                  cardClass,
                  colorClasses[variant],
                  'border-l-2 bg-field-bg text-text-dark h-[80px]',
                )}
              >
                <h4 className={cardTitleClass}> {t(`statuses.${status}`)}</h4>
                <p
                  className={twMerge(violationCountClass, colorClasses[variant], 'bg-transparent')}
                >
                  {isFilterActive ? `${statusCount}/ ${issues.length}` : statusCount}
                </p>
              </div>
            );
          })}
        </div>
        {/* полоса */}
        <div className={stripeWrapperClass}>
          {statuses.map((status) => {
            const variant = statusVariants[status];
            return (
              <div
                key={status}
                style={{ width: `${statusesPercents[status]}%` }}
                className={twMerge(colorClasses[variant], 'h-full')}
              ></div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Analytics;
