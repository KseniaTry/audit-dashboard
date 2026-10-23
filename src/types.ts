export type Statuses = 'open' | 'overdue' | 'closed' | 'removed'
export type RiskLevels = 'high' | 'medium' | 'low'
export type Variants = 'danger' | 'warning' | 'success' | 'neutral'
export type ModalActiveType = 'change' | 'add' | 'departmentReport' | 'managementReport' | null;

export interface FilterState {
    search: string,
    inspections: string[],
    departments: string[],
    inspectionYears: string[],
    statuses: Statuses[],
    riskLevels: RiskLevels[],
}

export type Issue = {
    id: number,
    inspection: string,
    startInspectionDate: string,
    endInspectionDate: string,
    auditViolation: string,
    recommendation: string,
    riskLevel: RiskLevels,
    responsibleDepartment: string[],
    responsiblePerson: string[],
    scheduledDate: string,
    executionDate?: string | null,
    status?: Statuses,
    isRemoved?: boolean
}