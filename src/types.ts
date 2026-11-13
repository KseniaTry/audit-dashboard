export type Statuses = 'open' | 'overdue' | 'closed' | 'removed';
export type RiskLevels = 'high' | 'medium' | 'low';
export type Variants = 'danger' | 'warning' | 'success' | 'neutral';
export type ModalActiveType = 'change' | 'add' | 'departmentReport' | 'managementReport' | null;
export type FiltersData = string[] | Statuses[] | RiskLevels[];
export type AddModalData = string | RiskLevels | string[]

export interface FilterState {
  search: string;
  inspections: string[];
  departments: string[];
  persons: string[];
  inspectionYears: string[];
  statuses: Statuses[];
  riskLevels: RiskLevels[];
}

export type Issue = {
  id: string;
  inspection: string;
  startInspectionDate: string;
  endInspectionDate: string;
  auditViolation: string;
  recommendation: string;
  riskLevel: RiskLevels | ''; // null для того чтобы добавить в селект "выберите уровень риска" в addModal
  responsibleDepartment: string[];
  responsiblePerson: string[];
  scheduledDate: string;
  executionDate?: string | null;
  status?: Statuses;
  isRemoved?: boolean;
};
