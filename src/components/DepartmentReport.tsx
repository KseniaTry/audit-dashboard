import { useTranslation } from "react-i18next"
import { twMerge } from "tailwind-merge"

interface DepartmentReport {
    departments: string[]
}

const DepartmentReport = ({ departments }: DepartmentReport) => {
    const { t } = useTranslation()

    const wrapperClass = "flex flex-col flex-wrap gap-2"
    const titleClass = "tracking-widest uppercase text-[13px]"
    const inputClass = "w-full border border-border-warm md:min-w-[150px] border-2 p-2 bg-field-bg uppercase cursor-pointer text-[15px]"

    return (
        <div className="flex flex-col flex-wrap p-5 gap-4">
            <p className="tracking-wide">{t('departmentReport.text')}</p>
            <div className={twMerge(wrapperClass, 'w-full')}>
                <label className={titleClass} htmlFor="department">{t('table.responsibleDepartment')}</label>
                <select className={inputClass} name="riskLevel">
                    {departments.map((department) => {
                        return <option key={department}>{department}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default DepartmentReport