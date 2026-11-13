import { RiskLevels, Statuses, Variants } from './types';

export const RISK_LEVELS: RiskLevels[] = ['low', 'medium', 'high'];
export const STATUSES: Statuses[] = ['open', 'overdue', 'closed', 'removed'];
export const DEPARTMENTS: string[] = [
  'IT-отдел',
  'АХО',
  'Группа регистрации',
  'Департамент изъятого имущества',
  'Департамент казначейства',
  'Департамент мониторинга рисков',
  'Маркетинг и PR-служба',
  'Отдел взыскания задолженности',
  'Отдел кадрового учета и подбора персонала (HR)',
  'Отдел клиентского сервиса и контроля качества',
  'Отдел логистики и оценки имущества',
  'Отдел страхования',
  'Служба внутреннего аудита',
  'Служба комплаенс-контроля',
  'Сопровождение сделок',
  'Управление безопасности',
  'Управление бухгалтерского учета и отчетности',
  'Управление продаж и партнерских программ',
  'Управление риск-менеджмента',
  'Управление фондирования и связей с инвесторами',
  'Финансово-аналитический департамент',
  'Юридический департамент',
].sort();
export const PERSONS: string[] = [
  'Васильев Н.О.',
  'Григорьев Д.А.',
  'Дмитриева М.В.',
  'Иванов И.И.',
  'Козлов В.П.',
  'Кузнецов Е.В.',
  'Морозов К.Э.',
  'Павлова Е.Д.',
  'Петрова А.В.',
  'Сидоров С.С.',
  'Смирнов Ю.Б.',
  'Тихонов И.А.',
  'Федоров А.М.',
  'Яковлев С.Н.',
  'Алексеева О.В.',
  'Белов Р.С.',
  'Волкова Т.М.',
  'Голубев А.П.',
  'Егорова Н.И.',
  'Зайцев Д.В.',
  'Киселева М.А.',
  'Лебедев П.Г.',
  'Макарова Е.С.',
  'Новиков В.А.',
  'Орлова К.Д.',
  'Попов С.М.',
  'Романова И.В.',
  'Соколов А.Н.',
  'Тарасова Л.Ю.',
  'Чернов О.Б.',
].sort();


// pagination
export const ITEMS_PER_PAGE = 10;
export const PAGINATION_STUB = '...';
export const DEFAULT_PAGE = 1;

// analytics
export const statusVariants: Record<string, Variants> = {
  open: 'warning',
  closed: 'success',
  removed: 'neutral',
  overdue: 'danger',
};

export const riskLevelVariants: Record<string, Variants> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
};

export const colorClasses: Record<string, string> = {
  warning: 'text-warning bg-warning/30 border-warning',
  danger: 'text-danger bg-danger/30 border-danger',
  success: 'text-success bg-success/30 border-success',
  neutral: 'text-neutral bg-neutral/30 border-neutral',
};