export type Statuses = 'open' | 'overdue' | 'closed' | 'removed'
export type RiskLevels = 'high' | 'medium' | 'low'
export type Variants = 'danger' | 'warning' | 'success' | 'neutral'
export type ModalActiveType = 'change' | 'add' | 'departmentReport' | 'managementReport' | null;

export interface FilterState {
    search: string | null,
    inspection: string | null,
    department: string | null,
    inspectionYear: string | null,
    status: Statuses | null,
    riskLevel: RiskLevels | null,
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