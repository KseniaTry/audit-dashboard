export type Statuses = 'open' | 'overdue' | 'closed' | 'removed'
export type RiskLevels = 'high' | 'medium' | 'low'
export type VARIANTS = 'danger' | 'warning' | 'success' | 'neutral'
export type ModalActiveType = 'change' | 'add' | 'departmentReport' | 'managementReport' | null;

export const RISK_LEVELS: RiskLevels[] = ['low', 'medium', 'high']
export const STATUSES: Statuses[] = ['open', 'overdue', 'closed', 'removed']
export const DEPARTMENTS: string[] = [
    "IT-отдел",
    "АХО",
    "Группа регистрации",
    "Департамент изъятого имущества",
    "Департамент казначейства",
    "Департамент мониторинга рисков",
    "Маркетинг и PR-служба",
    "Отдел взыскания задолженности",
    "Отдел кадрового учета и подбора персонала (HR)",
    "Отдел клиентского сервиса и контроля качества",
    "Отдел логистики и оценки имущества",
    "Отдел страхования",
    "Служба внутреннего аудита",
    "Служба комплаенс-контроля",
    "Сопровождение сделок",
    "Управление безопасности",
    "Управление бухгалтерского учета и отчетности",
    "Управление продаж и партнерских программ",
    "Управление риск-менеджмента",
    "Управление фондирования и связей с инвесторами",
    "Финансово-аналитический департамент",
    "Юридический департамент"
];

export type Issue = {
    id: number,
    inspection: string,
    startInspectionDate: string,
    endInspectionDate: string,
    auditViolation: string,
    recommendation: string,
    status: Statuses,
    riskLevel: RiskLevels,
    responsibleDepartment: string[],
    responsiblePerson: string[],
    scheduledDate: string,
    executionDate: string | null
}

